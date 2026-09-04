---
title: PicoMem IRQ Conflict with my Sound Blaster 16
date: 2026-09-04 00:00:00 +07:00
categories:
- Restoration
tags:
- IBM
- PC
- Emulator
- Picomem
- SoundBlaster
layout: post
toc: true
---

I installed my PicoMem on my 486 machine, and by default it comes configured to use IRQ 5. Everything seemed fine at first, but I started running into weird issues once I had my Sound Blaster 16 installed alongside it.

Turns out the Sound Blaster 16 also uses IRQ 5 by default, and on my card that IRQ can't be changed, it's fixed. So the two devices were fighting over the same interrupt line, causing conflicts.

![Picomem Jumpers](/assets/img/pc/picomem-jumpers.png "Picomem Jumpers")

Since the SB16's IRQ was locked, the only option was to move the PicoMem instead. I moved the jumper on the PicoMem from IRQ 5 to IRQ 7 freeing up IRQ 5 for the sound card.

After reconfiguring, everything works fine now, no more conflicts between the two cards.
