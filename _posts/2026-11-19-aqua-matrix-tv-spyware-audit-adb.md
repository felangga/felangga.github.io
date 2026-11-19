---
title: "Spyware in a Cheap Android TV: Auditing the AQUA MatrixTV over ADB"
date: 2026-11-19 00:00:00 +07:00
categories:
- Android
- Security
tags:
- Android TV
- ADB
- spyware
- debloat
- reverse-engineering
- ACR
layout: post
toc: true
---

A relative bought an AQUA MatrixTV EE, Android 14, the kind of no-name box that undercuts the
big brands by half. It works fine as a TV. It also shipped with an automatic content recognition
package whose job is to listen to what is on screen and phone home about it, plus a stack of
over-permissioned OEM apps. I pulled the APKs, read the DEX, and removed what should not be there.
All of it over WiFi ADB, no root.

This is a companion to the [Xiaomi Mi TV debloat](/posts/debloating-xiaomi-mi-tv-adb/): same
method, different vendor, worse payload.

## Finding the TV

The box sat at 192.168.1.168 with ADB on. First connection came back `unauthorized`, which is
normal. I approved the prompt on screen and confirmed the identity:

```bash
adb connect 192.168.1.168:5555
adb shell getprop ro.product.model     # AQUA_00
adb shell getprop ro.build.version.release   # 14
adb shell id                            # uid=2000(shell), no su
```

`id` matters. `shell` uid means no root, so nothing here needs a bootloader unlock. System apps
can still be removed per-user with `pm uninstall --user 0`.

## Triage before pulling anything

Two things decide what is safe to touch. First, who owns HOME:

```bash
adb shell cmd package resolve-activity -a android.intent.action.MAIN -c android.intent.category.HOME
```

Second, what OEM packages actually exist:

```bash
adb shell pm list packages | grep -iE "haier|cvte|anoki|cltv|usmart|telink|hon\.|gamingbar"
```

That gave the target list: the ACR package, two factory-test apps, a gaming overlay, an e-manual,
a smart-home app, a "HON" service, a device-admin package, plus the BT remote stack (`com.telink.lt`)
and the display backlight service, which stay because removing them breaks the remote and the
screen.

## The actual spyware: Anoki ACR

The package name is `tv.anoki.acr.anokiacroptin`. The `acroutpt-in` on the end is the giveaway that
this is the "opt-in" build, except it is enabled by default and grants itself permissions the day
it installs. It is a priv-app at `/system/priv-app/AnokiACR/`, uid `1000000` (SHARED_UID_SYSTEM).

What it does, from the DEX strings and manifest:

- **Microphone and audio fingerprinting.** `RECORD_AUDIO`, `CAPTURE_AUDIO_OUTPUT`,
  `android.permission.ACCESS_MIC`, `MediaProjection`, `AudioFingerprint`, `startScreenCapture`.
- **Screen content.** `SYSTEM_ALERT_WINDOW` and `FOREGROUND_SERVICE_MEDIA_PROJECTION` let it overlay
  and capture what is displayed, including DRM-protected playback, since it is a platform-signed
  system uid.
- **Accessibility as a data tap.** `SpeechRecognitionService`, `AccessibilityService`, and reads
  browser history and cookies through `android.permission.READ_HISTORY_BOOKMARK`.
- **Silent updates.** `REQUEST_INSTALL_PACKAGES`, `INSTALL_PACKAGES`, `DELETE_PACKAGES`.
- **Stealth channel.** `FOREGROUND_SERVICE_SPECIAL_USE`, `startForegroundService` with no visible
  notification, its own `Network VPN` consent screen, and DoH (`DnsOverHttpsApi`) so lookups do not
  touch the LAN resolver.
- **Opt-out that is really opt-out.** `POST_NOTIFICATIONS`, `ACCESS_RESTRICTED_SETTINGS`,
  `MANAGE_APP_OPS_MODES`.

The network side is worse. The package contains the literal class
`com.anoki.tvACR.ExportDataUAgent.binary.ACRGlobals$AIStrmMicKeywordDoH` and targets
`aistrm.net` plus `acr-config.aistrm.net`, with `reportToGoogleApps` endpoints
(`googlesyndication.com/pagead/...`, `googleads.g.doubleclick.net/pagead/...`). In plain terms: it
sends captured-keyword and HA device-fingerprint data to Google Ads endpoints. An ACR package on a
cheap TV, exfiltrating viewing and audio fingerprints to an ad network.

Two things make this different from ordinary bloat. It bypasses DoH, so a Pi-hole sinkhole at the
router is not enough on its own. And it grants a foreground service type with no visible
notification, so there is no "app is using your microphone" indicator.

## Bloatware that is really spyware-shaped

The OEM apps are not clean either. Permission counts from `dumpsys package`, all `granted=true`:

| Package | Perms granted | What it can reach |
|---------|---------------|-------------------|
| `com.haier.gamingbar` | 49 | `READ_FRAMEBUFFER`, screen capture, live wallpapers from any image, full media |
| `com.haier.emanual9603` | 99 | full storage, location, camera, overlay, security alert, hack threat |
| `it.hon.service` | 23 | `REQUEST_INSTALL_PACKAGES`, `INSTALL_LOCATION_PROVIDER`, `LOCATION_HARDWARE` |
| `com.haierubic.usmartdevice` | 16 | mic, camera, location, SMS, contacts, cleartext to `haier-cloud.com` |
| `com.haier.hkcfac` | 11 | `WRITE_SECURE_SETTINGS`, full storage, WiFi AP control |
| `com.cvte.tv.at` | 12 | same factory-control surface |

`com.haier.gamingbar` is the standout. An OEM game overlay with `READ_FRAMEBUFFER` and
screen-capture, live-wallpaper-from-image, full storage, and an overlay channel, no user present, is
a ready-made RCE surface. `com.haier.emanual9603`, a manual, asks for 99 permissions including
location, camera, and `security alert` plus `hack threat` receivers.

`com.cltv.mal` is a different category again. It is a device-admin (`BATTERY_STATS`,
`SECURITY_SETTINGS_DEV`): force-lock, reset-password, monitor-unlock, always-on VPN, uninstall
requests. It is not a feature a TV owner needs.

## The factory junk

`com.haier.hkcfac` and `com.cvte.tv.at` are factory test apps. `WRITE_SECURE_SETTINGS`,
full storage, WiFi AP control. They are not needed in a living room, and they carry the same
"trusted system" status that makes them attractive pivot points.

## Removal

The working command per package, backed up first:

```bash
adb shell pm path com.haier.gamingbar
adb pull /system_ext/app/GamingBar/GamingBar.apk ./backup/
adb shell pm uninstall --user 0 com.haier.gamingbar   # -> Success
```

Eight packages came out: `tv.anoki.acr.anokiacroptin`, `com.haier.hkcfac`, `com.cvte.tv.at`,
`com.haier.emanual9603`, `com.haier.gamingbar`, `com.cltv.mal`, `com.haierubic.usmartdevice`,
and `it.hon.service`. Two stayed on purpose: `com.telink.lt` handles the Bluetooth remote, and
`com.cvte.autobacklight` drives the display backlight.

The trap that cost me a cycle: `pm uninstall --user 0` on Anoki reported `Success`, then the package
was back. The reason is that it was also installed for a second profile. `pm list users` showed
Owner (user 0) and `new_user` (user 10). Bare `pm list packages` spans every user, so the package
looked present even after the user-0 uninstall. The fix is to sweep each user:

```bash
for u in 0 10; do
  adb shell pm uninstall --user $u tv.anoki.acr.anokiacroptin
done
```

After the second pass it was gone from both. Same sweep for the rest.

One piece does not come out without root: the native HAL `vendor.anoki.acrservice@1.0-service` is
an init-started service, separate from the app package. `setprop ctl.stop` is refused to the shell
uid. It is inert once the app is gone, because the capture and exfil logic lived in the app process
and the HAL alone has no client to serve, but killing the process itself needs root.

## Result

Eight packages removed across both users, originals backed up to `removed_backup/` so anything can
be restored with `adb install -r` without a factory reset. Launcher, settings, ADB, the BT remote,
and the backlight all verified alive after the sweep. No boot loop.

If you take one thing from this: a cheap Android TV is not cheap because the hardware is generous.
The margin comes out somewhere, and on this box it came out as an automatic content recognition
package that listens, fingerprints, and ships the result to an ad network. The package name
literally says "opt-in." It was on by default.

## What is still open

- **The Anoki HAL survives app removal.** Without root it cannot be stopped. The practical kill is
  removing the app, which is done, plus a DNS sinkhole on `aistrm.net` and `acr-config.aistrm.net`
  for belt and suspenders. DoH means the sinkhole has to be at the network, not the device.
- **`com.at.factory.androidtvaidlservice` is still installed.** It is a factory AIDL service with
  a wide permission set, left alone because it may be an input and HDMI dependency. Worth a look if
  you want to go deeper.
- **Firmware updates can bring any of this back.** A vendor OTA may re-provision removed system
  apps. Disabling OTA, or re-running the sweep after an update, is the only durable answer without
  root.