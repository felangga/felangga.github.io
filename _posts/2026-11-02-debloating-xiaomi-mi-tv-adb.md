---
title: "Debloating a Xiaomi Mi TV Over ADB, No Root"
date: 2026-11-02 00:00:00 +07:00
categories:
- Android
- Hacking
tags:
- Xiaomi
- MiTV
- Android TV
- ADB
- debloat
layout: post
---

My MiTV-MOSR4 (Android 11, Google TV) shipped with 140 packages, and a solid chunk of that was Xiaomi telemetry, an India-region cast app, and a retail demo mode. I cleaned it down to 112 over WiFi ADB without root. Here is the whole run, including the parts that failed first.

## Finding the TV

The box sits at 192.168.1.107. `ping` died immediately with "missing cap_net_raw" because this shell runs inside a container, and `nmap` is not installed on the NAS at all. So I wrote a 60 line Python threaded socket scanner and pointed it at the usual TV ports:

```python
PORTS = [5555, 8008, 8009, 6466, 6467, 8443, 9080, 1900, 1990, 3000, 3001, 7678, 8001, 8002, ...]
```

Seven ports answered: 5555 (ADB), 8008 and 8009 (Chromecast), 6466 and 6467 (Cast TLS), 8443, and 9080. One curl fingerprints the whole device:

```bash
curl -s http://192.168.1.107:8008/setup/eureka_info
```

That returned name "TV", cast build 3.72.446070, uptime 91553 seconds (about 25 hours), and confirmed it was a Google Cast endpoint. `adb connect 192.168.1.107:5555` came back `unauthorized`, which is expected: I approved the debugging dialog on the TV screen, and after that `getprop` gave the real identity: Xiaomi MiTV-MOSR4, Android 11.

## Triage before deleting anything

`pm list packages -f` showed 140 packages: 127 system, 13 user installed, 0 disabled. Before removing anything I checked three things that decide what is safe:

1. **Default launcher.** `cmd package resolve-activity -a android.intent.action.MAIN -c android.intent.category.HOME` returned `com.google.android.apps.tv.launcherx`. The Google TV launcher owns HOME, not the MiTV home stack, so the `com.mitv.tvhome.*` apps were removable.
2. **Tuner hardware.** The `live_tv` feature is declared, but `dumpsys tv_input` listed no hardware tuner service, only Google playback inputs. The LiveTV stack was dead weight.
3. **Bluetooth.** `settings get global bluetooth_on` returned 1, so `com.mi.bluetooth` stays, it handles the BT remote pairing.

That gave two tiers. Tier 1 (16 packages): telemetry (`com.miui.tv.analytics`, `com.xiaomi.statistic`), junk (`fusion.android.tv.demo` retail demo mode, vendor disclaimer splash, `milegal`, `toolhouse`), region apps (`com.xiaomi.mitv.smartshare`, an India build), dead Google apps (`play.games`, `feedback`), and the MiTV home tabs. Tier 2 (12 packages): the LiveTV stack, `dreamx` screensaver, `youtube.tvmusic`, `scenemode`, `tvqs`, `gtv.settings`, and friends.

## Removal

Tier 1 went clean, all 16:

```bash
adb shell pm uninstall -k --user 0 com.miui.tv.analytics   # -> Success
```

Tier 2 failed, every single one, with `Failure [not installed for 0]`. The trap: those 12 packages exist only in the system image and were never installed for user 0 in the first place, so there is nothing to uninstall for that user. Re-enabling first and retrying does not help either. Without root, `pm disable-user --user 0` is the ceiling, and it is enough, the packages vanish from the user's active package list.

Final state: 140 down to 112 active packages, critical apps verified intact (launcherx, gms, mi.bluetooth, upgrader, videoplayer, tvmanager, YouTube, Netflix, Jellyfin, SmartTube), then `adb reboot` to settle.

## Pitfalls worth keeping

- **`ping` needs `cap_net_raw`.** In a container without it, ping is dead on arrival. Go straight to a TCP connect scan.
- **`pm list packages -f` puts the package name *after* the `=`**, and `/data/app` entries use `==`. My first parse grabbed the APK path instead of the name, so every `dumpsys` call in the loop failed silently and I got 140 rows of empty labels.
- **`dumpsys package` does not expose app labels on this ROM.** `versionName` works fine, labels do not. Do not build a report pipeline around labels.
- **"not installed for 0" means never installed for that user**, not missing. For system-image-only packages, `disable-user` is the only non-root lever.
- **Always resolve the default launcher before touching any `tvhome` package.** Here the Google TV launcher owns HOME so MiTV home apps were safe. On a stock MiTV ROM those apps *are* the launcher, and removing them wrecks the UI.

## Revert

Anything removed comes back with one command:

```bash
adb shell cmd package install-existing <package>
```

## Result

28 bloat packages gone, 112 active packages left, OTA updater and BT remote untouched, TV rebooted clean. The whole thing ran over WiFi ADB with zero root.
