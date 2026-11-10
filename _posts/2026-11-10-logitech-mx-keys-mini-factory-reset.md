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

The MX Keys Mini is usually bulletproof. Mine was not. Yesterday it went completely
not responding — no typing, no backlight, nothing. The Bluetooth connection was fine,
the computer saw the device, and it simply ignored every keystroke.

The fix is a hidden factory reset that is not in the manual and barely shows up in
search results. Here is the exact sequence that brought it back.

## The symptom

- Keys dead: nothing types on any connected device.
- Receiver and Bluetooth both paired, device shows as connected, but no input arrives.
- Power LED behavior gives no hint. It just sits there, warm, doing nothing.

No amount of power cycling, re-pairing, or Options+ reinstall helped. The keyboard
firmware itself was stuck.

## The reset sequence

With the keyboard **off**:

1. Turn the keyboard on.
2. Hold `E` and press `ESC` — release both.
3. Hold `O` and press `ESC` — release both.
4. Hold `O` and press `ESC` again — release both.

Short version: `ESC O`, `ESC O`, `ESC B` is the commonly quoted chord for the
MX series factory reset, but on the MX Keys Mini the actual sequence is
**ESC O, ESC O** — the third chord uses `B` on the full-size MX Keys and is not
needed on the Mini. If you are doing it on the full-size board, use `ESC O`,
`ESC O`, `ESC B`.

The keyboard resets to factory state: all pairing slots are cleared and the
firmware starts clean. Re-pair your devices and typing works again.

## Notes

- The reset wipes every paired device, not just the broken one. Re-pair all three
  slots afterwards.
- You must start from a powered-off state. Running the chords while it is on does
  nothing.
- No software needed: this is entirely on-device.

The whole thing, including the camera close-up of the keys, is in the video below.

<video controls width="100%">
  <source src="{{ '/assets/videos/mx-keys-mini-factory-reset.mp4' | relative_url }}" type="video/mp4">
  Your browser does not support the video tag.
</video>