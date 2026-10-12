---
title: "Rebuilding the *arr Media Stack on a Synology NAS with Docker"
date: 2026-10-13 00:00:00 +07:00
categories:
- Homelab
tags:
- Docker
- Synology
- Radarr
- Sonarr
- Prowlarr
- Jellyfin
- Self-Hosted
layout: post
toc: true
---

My *arr media stack lived in a single Docker container on the Synology NAS for years. One day the container vanished — recreated by the NAS, wiped clean. The good news: all the persistent data (configs, databases, downloaded media) survived on the bind mount. The bad news: the container was gone, and rebuilding it the old way (one giant container with supervisord) felt fragile.

So I rebuilt it properly: **one container per app**, all managed through the Portainer API, all state on a single bind mount. Here's what I learned.

## The Architecture

```
/volume1/video/          ← host bind mount (persists everything)
├── arrstack/
│   ├── opt/             ← app binaries (Radarr, Sonarr, Prowlarr, Jellyfin, Ombi, Seerr)
│   ├── config/          ← per-app config + SQLite databases
│   ├── bin/             ← static ffmpeg, node runtime
│   └── supervisor/      ← old supervisord configs (kept for reference)
├── movies/
├── tv/
└── downloads/
```

Each app runs in its own container with `NetworkMode: host`, so it binds directly to the NAS's ports. No port mapping, no bridge networking.

## The Critical Gotcha: Synology Bridge Port Publishing Is Broken

This cost me the most time. I created containers with standard Docker port bindings (`7878:7878`, etc.). The containers started, the apps listened inside, but **every connection from the LAN was refused**.

Checking `NetworkSettings.Ports` on the running containers showed `{}` — empty. The Synology Docker daemon (24.0.2 on kernel 4.4) simply does not publish bridge port bindings. The apps were listening on `172.17.0.x:7878` inside the bridge network, but nothing forwarded to the host.

**Fix:** `NetworkMode: host`. The app binds the NAS's own interface directly. No port mapping needed. This is actually the standard pattern for *arr apps on Synology anyway.

## Per-Container Setup

Each container runs `ubuntu:latest` with a startup command that installs dependencies and launches the app. The key dependencies:

**Servarr apps (Radarr, Sonarr, Prowlarr):**
```bash
apt-get install -y libicu78 libsqlite3-0 curl
exec /videos/arrstack/opt/Radarr/Radarr -nobrowser -data=/videos/arrstack/config/radarr
```

**Jellyfin** needs additional libraries for SkiaSharp (image processing):
```bash
apt-get install -y libicu78 libsqlite3-0 curl libfontconfig1 libfreetype6 libssl3
exec /videos/arrstack/opt/jellyfin/jellyfin/jellyfin \
  --datadir=/videos/arrstack/config/jellyfin/data \
  --configdir=/videos/arrstack/config/jellyfin/config \
  --cachedir=/videos/arrstack/config/jellyfin/cache \
  --logdir=/videos/arrstack/config/jellyfin/log \
  --webdir=/videos/arrstack/opt/jellyfin/jellyfin/jellyfin-web \
  --ffmpeg=/videos/arrstack/bin/ffmpeg
```

**Ombi** needs to run from its own directory (it looks for `appsettings.json` in the cwd):
```bash
cd /videos/arrstack/opt/ombi && exec ./Ombi --storage /videos/arrstack/config/ombi --host http://*:3579
```

**Seerr (Overseerr)** needs Node.js 22.19 — the exact version specified in its `package.json` engines field. Debian's repos don't have a `nodejs` package, so I extracted the official Node.js static binary to the bind mount:
```bash
# Extract node from the official tarball (Synology kernel breaks GNU tar)
python3 -c "
import tarfile as t
tf = t.open('/videos/arrstack/bin/node.tar.xz', 'r:xz')
for m in tf.getmembers():
    if m.isfile() and '/bin/node' in m.name:
        open('/videos/arrstack/bin/node', 'wb').write(tf.extractfile(m).read())
        break
tf.close()
"
chmod +x /videos/arrstack/bin/node
cd /videos/arrstack/opt/seerr-src && NODE_ENV=production \
  CONFIG_DIRECTORY=/videos/arrstack/config/seerr PORT=3001 \
  exec /videos/arrstack/bin/node dist/index.js
```

## Hardware Transcoding: A Cautionary Tale

The NAS has an Intel Celeron J4125 with UHD 600 graphics — VAAPI-capable. I wanted hardware transcoding for HEVC 10-bit files that the CPU can't handle in software.

The path seemed simple: pass `/dev/dri` to the Jellyfin container, set `HardwareAccelerationType: vaapi` in `encoding.xml`, and point the encoder at a VAAPI-capable ffmpeg.

**What went wrong:** I replaced the static ffmpeg binary (which worked fine for software transcoding) with one extracted from the `linuxserver/ffmpeg` Docker image. That build has VAAPI compiled in, but it also needs 15+ shared libraries (`libdrm`, `libva`, `libplacebo`, `libvmaf`, etc.) that aren't in the minimal `ubuntu:latest` base. Jellyfin's startup check failed: `FFmpeg: Failed version check` → fatal error → container crash-looped.

**The correct approach** (which I'm still working on): install the `jellyfin-ffmpeg` package from Jellyfin's own apt repository inside the container. It ships with all the required VAAPI libraries. The package is ~40 MB and installs in about 2 minutes.

**Lesson:** don't swap binaries on a running system without checking `ldd` first. And always test with `ffmpeg -version` before restarting the service.

## Deprioritizing HEVC 10-bit

While hardware transcoding is being sorted, I configured both Sonarr and Radarr to deprioritize HEVC 10-bit releases. These files are the ones that fail to decode on the J4125.

In both apps, I created a Custom Format called **"Block HEVC 10 BIT"** with this regex:

```
(?i)(x265|h265|hevc).{0,20}(10.?bit|10bit)|\b(10.?bit|10bit).{0,20}(x265|h265|hevc)
```

Then set its score to **-1000** in every quality profile. This doesn't block HEVC entirely (if it's the only release available, it still downloads), but H.264 releases always win when both are available.

## Managing It All Remotely

The NAS has no SSH access from my workstation. Everything is managed through the **Portainer API** on port 9000. I wrote a Python script that creates, starts, and configures all containers via HTTP calls — no `docker` CLI needed on the NAS itself.

The script lives at `~/.hermes/scripts/arr_stack_provision.py` and can recreate any subset of the stack:
```bash
python3 arr_stack_provision.py radarr,sonarr    # just these two
python3 arr_stack_provision.py                  # all seven apps
```

## Final State

| Service | Port | Status |
|---|---|---|
| Radarr | 7878 | Running |
| Sonarr | 8989 | Running |
| Prowlarr | 9696 | Running |
| qBittorrent | 8080 | Running |
| Jellyfin | 8096 | Running (software transcode) |
| Ombi | 3579 | Running |
| Seerr | 3001 | Running |

All state persists on `/volume1/video/`. Containers can be recreated at any time without losing configuration, databases, or media.

## Lessons Learned

1. **Host networking > bridge networking** on Synology. Bridge port publishing is unreliable.
2. **One container per app** is easier to debug and recreate than a monolithic supervisord setup.
3. **Check `ldd` before swapping binaries.** A ffmpeg build with missing shared libraries will crash Jellyfin on startup.
4. **Apt inside containers is slow** (1-3 minutes per container). Be patient — empty logs during startup usually means apt is still running.
5. **The Portainer API is a viable management layer** for a headless NAS. No SSH required.
6. **Deprioritize what your hardware can't handle.** HEVC 10-bit on a J4125 without working VAAPI is a losing battle — configure your indexers to prefer H.264.
