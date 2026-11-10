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

The MX Keys Mini has been my daily driver for a while. Bulletproof, honestly.
Then yesterday it just died mid-session. Keys stopped registering, no backlight,
nothing. The machine still saw it connected over Bluetooth, but every keystroke
went nowhere.

I tried the usual stuff. Power cycle, re-pair, reinstall Options+, even left it
for an hour hoping it would snap out of it. Nothing worked. The keyboard was
stuck at the firmware level, and the fix turned out to be a hidden factory reset
that Logitech does not put in the manual and barely anyone documents.

## The symptom

- All keys dead, on every paired device.
- Bluetooth and the Logi Bolt receiver both showed the keyboard as connected, but no input arrived.
- Power LED behaved normally. No blinking, no warning patterns, just a keyboard that was warm and useless.

## The reset sequence

Start with the keyboard **off**.

1. Turn the keyboard on.
2. Hold `E`, press `ESC`, release both.
3. Hold `O`, press `ESC`, release both.
4. Hold `O`, press `ESC`, release both.

So the full chord is `ESC O`, `ESC O`. You will often see `ESC O`, `ESC O`,
`ESC B` quoted for the MX series, and that is the sequence for the full-size
MX Keys. The Mini does not need the `B` chord. If you have the bigger board,
use the three-chord version.

The reset clears the Easy-Switch pairing table, so all three device slots are
wiped. Re-pair whatever you use and typing comes back. That was it. Ten seconds
of button gymnastics fixed a keyboard that looked ready for the trash.

## Notes

- The reset wipes every paired device, not just the broken one. Re-pair all three Easy-Switch slots after.
- You have to start from a powered-off state. Running the chords while it is on does nothing.
- No software involved. It is all on-device, which is handy when the keyboard is the thing that stopped working.

The whole thing, including the camera close-up of the keys, is in the video below.

<video controls preload="metadata" width="100%">
  <source src="{{ '/assets/videos/mx-keys-mini-factory-reset.mp4' | relative_url }}" type="video/mp4">
  Your browser does not support the video tag.
</video>