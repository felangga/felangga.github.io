---
title: "The LuckyStar LS486 Is Alive Again"
date: 2026-09-17 00:00:00 +07:00
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

The LS486 is back from the dead.

When I [left off last time](/posts/dead-486-dx4-from-junk-shop/), the board was stone dead. No beeps, no POST codes, no 3.3V rail. The prime suspect was a TIP110A transistor, the linear regulator responsible for dropping the 5V rail down to 3.3V for the processor. After 30 years of service, it had quietly given up.

Replacing it worked. It just took a couple of detours to get there.

## The Fix

I pulled the old TIP110A off the board and went looking for a replacement. Turns out the TIP110A is hard to find these days, none of my usual sources had one in stock. What I could get was a TIP127, a Darlington transistor in the same TO-220 package. Not an exact match, but close enough in specification to try.

With the TIP127 soldered in, I powered the board up and measured the voltage at the processor socket. 3.3V, right where it should be. The board finally came to life.

![TIP127 installed on the LS486 board](/assets/img/luckystar-ls486/tip127-installed.jpg)

<video controls playsinline style="max-width:100%">
  <source src="/assets/videos/luckystar-ls486/ls486-running.mp4" type="video/mp4">
</video>

## Two Mistakes I Should Not Have Gotten Away With

Here's the part of this repair that still makes me wince.

**Installed the processor backwards.** I put it in rotated 180 degrees. Socket 3 has a keyed corner, but it is not that difficult to force a chip in the wrong orientation if you are not looking carefully. I powered up, got nothing, and spent a while staring at a board that should have been working before I noticed what I had done.

**Wrong voltage setting.** This board can be jumpered for either 3.3V or 5V VCC, since Socket 3 supported both the older 5V chips and the newer 3.3V ones. I had it configured wrong and fed 5V to a chip that wants 3.3V.

Both times, the processor survived. I do not recommend testing that yourself.

## The Processor

The original Intel DX4-100 from the junk shop is dead and now lives in a display case. For this build I am using an AMD Am486 DX-100 instead. Same 100 MHz clock speed, AMD's own silicon.

## What Comes Next

The board is stable and POSTs reliably. Next up is building out a complete system: a PCI VGA card, a CompactFlash adapter for storage, and DOS 6.22 with Windows 3.11 on top. There is a Sound Blaster 16 somewhere in the parts bin waiting for its turn.

That is a project for another post. For now, the LS486 lives.