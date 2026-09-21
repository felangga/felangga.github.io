---
title: "[HACKINTOSH] Voodoo HDA - Sound Problem (Crackles)"
date: 2012-12-21 04:54:00 +07:00
categories:
- Archive
tags:
- macOS
- Linux
- Hardware
- "Audio & Video"
layout: post
toc: true
---

My Snow Leopard is bundled with a sound driver from Voodoo hda version 2.7.2 that has a problem with its sound being crackly - crackly or commonly called *crackles*. Oddly, the sound sounds normal when you keep moving your mouse cursor. This is very unpleasant to hear, I have tried upgrading and downgrading the kext driver but to no avail. After trying a few things, I found an effective way to overcome this problem, but it is still not very effective (in my opinion).

- Open Terminal.app

- Type "Yes > /dev/null" (without quotation marks)

- Try playing a song / video

If it works, then you have to leave that terminal open. If the Terminal is closed, the sound will error again. Maybe this can't be called a solution yet, but if you're in a pinch, well, it's a pretty decent way :)

**Side effect: By enabling that method, there are times when your computer's CPU Usage will reach 100% and it may interfere with your computer's performance.**

**Note: Some say that using the -f parameter when booting will make this problem go away, but it didn't work on my computer (ACER 4540).**

**Good Luck**
