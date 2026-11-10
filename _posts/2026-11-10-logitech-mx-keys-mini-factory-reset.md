---
title: "Logitech MX Keys Mini: Dead Keyboard, Factory Reset via ESC O"
date: 2026-11-10 00:00:00 +07:00
categories:
- Hardware
tags:
- Keyboard
- Logitech
- MX Keys Mini
- troubleshooting
- factory reset
layout: post
toc: true
---

My MX Keys Mini (model Y-R0084, printed on the back) has been the daily driver for about two years. Yesterday it stopped working mid-session. No typing, no backlight, nothing. Both machines still listed it as connected, one over Bluetooth and one through the Logi Bolt receiver, but keystrokes went nowhere.

I ran through the normal checklist first. Power cycled it, removed and re-added the Bluetooth pairing, reinstalled Options+, swapped the charging cable. Left it plugged in for an hour in case the battery reading was lying. None of it changed anything. The board was alive enough to hold a connection and dead enough to ignore every key.

## The symptom

- Every key dead, on all paired devices.
- Bluetooth and Logi Bolt both reported the keyboard as connected. Input never arrived.
- The power LED did nothing unusual. No blinking, no error pattern, just a keyboard sitting there doing nothing.

That combination is the tell. A dead battery or a bad cable drops the connection entirely. A keyboard that stays connected but sends no keystrokes has its firmware wedged, and no amount of re-pairing will clear it.

## The reset sequence

Start with the keyboard switched **off**. This part matters.

1. Turn the keyboard on.
2. Hold `E`, press `ESC`, release both.
3. Hold `O`, press `ESC`, release both.
4. Hold `O`, press `ESC`, release both.

So the chord is `ESC O`, `ESC O`. Search around and you will find `ESC O`, `ESC O`, `ESC B` quoted for the MX series. That three-chord version is for the full-size MX Keys. The Mini only takes the first two. If you are on the bigger board, run all three.

The reset wipes the Easy-Switch pairing table. All three device slots go with it, including the one that was still working. Re-pair your devices afterwards and typing comes back.

## Why nobody documents this

I went looking for an official procedure and could not find one. Logitech's support knowledge base has articles for resetting the Z906 speakers, the HYPERBOOM, the MINIROLL, even the G316 X keyboard, but nothing for the MX Keys Mini. Searching their own site for "MX Keys Mini reset" returns product pages, warranty pages, and firmware notes. No reset article. The closest match on the whole site is a firmware release note.

That firmware note is worth reading if you are chasing weird behaviour. Version 73.4.16 shipped on December 10, 2024 and added backlight configuration support for Options+ 1.85 and later. Anything older than that is running firmware from before the change, and a stale firmware state is exactly the kind of thing a hard reset clears.

## What you lose

- All three Easy-Switch slots are cleared. Every device needs pairing again.
- Custom key assignments stored on the board go back to defaults. Options+ profiles on the host machine survive.
- Nothing else. There is no account, no cloud sync, no firmware downgrade involved.

For reference, the spec sheet on Logitech's support site lists the Mini at 295.99 x 131.95 x 20.97 mm with Bluetooth Low Energy and Logi Bolt support, and rates the battery at 10 days with backlight or five months without. The battery is not user replaceable, which is another reason to try the reset before writing the board off.

## Notes

- The reset clears every paired device, not just the broken one.
- You have to start from a powered-off state. Running the chords while it is on does nothing.
- No software needed. It happens entirely on the device, which helps when the keyboard is the thing that stopped working.

The whole thing, including a close-up of the keys, is in the video below.

<video controls preload="metadata" width="100%">
  <source src="{{ '/assets/videos/mx-keys-mini-factory-reset.mp4' | relative_url }}" type="video/mp4">
  Your browser does not support the video tag.
</video>
