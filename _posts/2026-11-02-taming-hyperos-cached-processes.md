---
title: "Taming HyperOS: Capping Background Processes on a Xiaomi 17 Pro"
date: 2026-11-02 00:00:00 +07:00
categories:
- Android
- Tuning
tags:
- HyperOS
- Xiaomi
- Android 16
- Magisk
layout: post
toc: true
---

Daily driver: Xiaomi 17 Pro, HyperOS, 16GB RAM, rooted, 140 third-party apps. Quick audit:

```bash
adb shell su -c 'dumpsys activity processes | grep -c "cached=true"'
```

100+ cached processes at any time. MIUI ships `max_cached_processes=1000` on high RAM devices, so effectively unlimited. Empty processes get held about 41 days. Every cached process can hold wakelocks, run jobs, and sync in the background. The freezer is off, so nothing pauses them.

## Why not the freezer

HyperOS has a `cached_apps_freezer` toggle. Kernel level cgroup freeze, zero CPU, instant resume. But it is all or nothing: every cached app gets frozen and push notifications for all of them gain latency. A few apps here (mesh radio, remote admin, messaging) genuinely need background reliability. So instead of freezing, we cap.

## The cap

`max_cached_processes` limits the cached LRU pool. New process cached while at the cap, oldest one gets killed. Apps you use stay warm, the tail of 100+ apps stops lingering.

```bash
adb shell su -c 'settings put global activity_manager_constants "{\"max_cached_processes\":48}"'
```

48 because the daily rotation is 15 to 20 apps, and system processes (GMS, MIUI services) are persistent, not cached, so they do not eat slots. Do not go below ~24.

## The trap

First reboot after setting it: the cap was back to 1000. The setting value survived, but MIUI's AMS does not honor this key at boot read time.

The nasty part: changing the value at runtime does work. AMS has a settings observer that re reads it dynamically. So the cap only activates when the setting changes, never at boot.

## The fix

One Magisk boot script re applies it every boot:

```bash
#!/system/bin/sh
while [ "$(getprop sys.boot_completed)" != "1" ]; do
    sleep 2
done
settings put global activity_manager_constants '{"max_cached_processes":48}'
```

Install (adb push runs as shell, so copy as root):

```bash
adb push 99cachecap.sh /data/local/tmp/
adb shell su -c 'cp /data/local/tmp/99cachecap.sh /data/adb/service.d/ && chmod 755 /data/adb/service.d/99cachecap.sh'
```

## What actually happened

```
boot churn:   114 cached   (cap not applied yet, pool grew freely)
MIUI sweep:     8          (its own memory management, unrelated)
regrowth:      18, 28, 46, 42, 26   (converged under the cap, never exceeded 48)
```

Two lessons:

The cap is not retroactive. An oversized pool converges gradually as new cached processes trigger LRU kills. Judging it in the first minutes after boot gives a false negative.

Count correctly. `grep -c cached` returns ~290 because it also matches `cached=false` lines. Real number is `grep -c "cached=true"`, around 52 to 102. A 5x inflated count makes a sane limit look drastic.

## Bonus: animation scales

```bash
adb shell su -c 'settings put global window_animation_scale 0.5; settings put global transition_animation_scale 0.5; settings put global animator_duration_scale 0.5'
```

Instant, no reboot. UI feels tighter immediately. Oldest trick in the book, still works on HyperOS 3.

## Pitfalls

- `activity_manager_constants` is honored on change, not on boot. Always pair it with a boot script.
- Do not judge the cap during boot churn.
- Count with `cached=true`, never bare `cached`.
- `adb push` to `/data/adb/` fails as shell user. Push to tmp, then `su -c cp`.
- ADB wireless drops every reboot on MIUI. Expect to re enable it and rescan for the new IP.

## Revert

```bash
adb shell su -c 'rm /data/adb/service.d/99cachecap.sh'
adb shell su -c 'settings put global window_animation_scale 1.0; settings put global transition_animation_scale 1.0; settings put global animator_duration_scale 1.0'
adb shell su -c 'settings delete global activity_manager_constants'
```

## Result

Two settings and one boot script. Background sprawl capped at 48, down from unlimited. UI latency cut in half. Survives reboots. The bottleneck was never RAM, it was HyperOS letting a hundred idle apps keep working. The fix is knowing which knob MIUI honors, and re applying the ones it does not.
