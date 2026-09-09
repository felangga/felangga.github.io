---
title: A Dead 486 DX4-100 from the Junk Shop
date: 2026-09-09 00:00:00 +07:00
categories:
- Restoration
tags:
- "486"
- Motherboard
- Retro
- Repair
layout: post
toc: true
---

I was at a local junk shop last week and spotted something that immediately caught my eye: a 486 motherboard with a CPU still in the socket. For the uninitiated, these are getting pretty hard to find these days, especially in Indonesia. The board is a LuckyStar LS486, a late era 486 board with PCI slots and a Socket 3. The CPU is an Intel 486 DX4-100, the top of the line 486 chip that runs at 100 MHz and needs 3.3V instead of the older 5V.

![LuckyStar LS486 motherboard](/assets/img/luckystar-ls486/motherboard-1.jpg)

![Another angle of the LS486](/assets/img/luckystar-ls486/motherboard-2.jpg)

I paid whatever the guy asked, took it home, and set it up on the bench. Grabbed a known good power supply, plugged in a POST card, and fired it up. Nothing. No beeps, no POST codes, absolutely dead.

## Diagnosis

First thing I checked was the voltage rails. The 5V rail was fine, but the 3.3V VCC line was completely missing. The DX4 processor needs 3.3V to run, and without it you get exactly what I was seeing: a board that looks like it's getting power but does absolutely nothing.

The 3.3V regulation on this board is handled by a TIP110 NPN Darlington transistor, sitting right next to the CPU socket. This is a linear regulator configuration, and the TIP110 is the workhorse that drops the 5V rail down to 3.3V. If it's dead, the CPU gets nothing.

![Closeup of the TIP110 voltage regulator](/assets/img/luckystar-ls486/tip110-closeup.jpg)

My suspicion is that the TIP110 has failed. These are in a TO-220 package and they do run hot in this application. After 30 years, it's not surprising for one to give up. I haven't replaced it yet, but a TIP110 is a common part and costs next to nothing. It's worth a shot.

## The CPU

Even if I fix the motherboard, there's still the CPU. I pulled the DX4 out and tried it in another working Socket 3 board I have. No POST either. The chip itself is dead.

This is a bit of a bummer. The DX4-100 was the fastest 486 you could get, and working examples are getting rare. The ceramic cap on the top of the chip looks intact, no obvious physical damage, but silicon doesn't need to look broken to be broken. Sometimes chips just die quietly.

## What's next

The motherboard is probably fixable. I'll swap the TIP110, check the surrounding caps, and see if the 3.3V rail comes back. Even without a working CPU, a known good LS486 board is worth keeping around. Socket 3 boards are getting harder to find, and this one is in decent cosmetic shape.

As for the CPU, it's going in the display case. A dead DX4-100 is still a cool piece of history to look at.