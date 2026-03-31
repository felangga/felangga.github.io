---
title: PicoMem won’t boot – No Green Light
date: 2025-10-19 00:00:00 +07:00
categories:
- Restoration
tags:
- IBM
- PC
- Emulator
- Picomem
layout: post
toc: true
---

I got my PicoMem a couple of weeks ago, and it had been running great—until yesterday. Out of nowhere, it just stopped booting. The BIOS wouldn’t come up at all.

The AdLib module still had its red light on, so I figured power was getting through. I checked the VSYS and VBUS pins on the Raspberry Pi Pico, and both read around 4.6 V, which seemed perfectly fine.

Out of curiosity, I tried powering it externally from my computer—and it worked! So it definitely looked like a power issue.

I started tracing the VSYS line from the Pico to the ISA slot and noticed it goes through a diode and a couple of filter capacitors. After a bit of testing, it seemed like the diode was causing intermittent voltage drops. That little part might just be the culprit behind all this trouble.

So I got the PicoMem for couples week ago, and it was working great, until yesterday. The device won’t boot. Its BIOS doesn’t get booted. It has the AdLib module that has a red light, and it was lit, so I assume that the power is there. I tested the VSYS and the VBUS on the Raspberry Pico, it got around 4.6v which is should be fine.

So I tested using external power from my computer and it works! So I assume that this was a power issue. So I trace the VSYS connection from the Raspberry Pico to the ISA slot. It runs through a Diode and some filter capacitors. After some test, the diode seems make the voltage drop intermittently.

![Picomem](/assets/img/ibm/picomem.png "PicoMem Board")

For now, I’ve bypassed the diode with a jumper wire, and everything’s back to life. I’ll probably replace it with a proper diode once I get the chance to pick one up. But hey—at least it’s running again!

