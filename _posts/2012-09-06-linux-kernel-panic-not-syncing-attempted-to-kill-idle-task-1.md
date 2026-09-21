---
title: "[Linux] Kernel Panic - not syncing: Attempted to kill idle task"
date: 2012-09-06 21:14:00 +07:00
categories:
- Archive
tags:
- Linux
- Hardware
layout: post
toc: true
---

I was opening my ubuntu last morning and the system loading for the long time. I thought that it still working on something, but I realize it gone freezes. So, I had to turn it off manually and try to booting again, and it's still the same.

It say that :

Kernel panic - not syncing: Attempted to kill the idle task

PID 0, comm: swapper/1 Tainted: P  D   0

Call Trace: bla bla bla.

(look at the screenshot below)

| ![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhd6nTunb_YlE4Z94oI0ET7v4I78ofdhL2xrZboISBzIUiE7fReH6XIzz-dANe2KTQEEEx715a9V_os-J9C9PHJby5AmDsgPAGWHVd2W5dg7G4ld8ZLL13tLWAkGhs-twN3wMYwbS-RucM/s1600/P0t0(284).jpg).jpg) |

| My laptop - Kernel panic |

I try to google on it, and found some solutions :

- The error because of bug on ubuntu 12.04. ([read this](https://bugs.launchpad.net/ubuntu/+source/powernap/+bug/990146))

- It's the RAM problem, try to swap your RAM to another slots. If you have 2 RAMs in your computer, try to swap it. If you just have 1 RAM in your computer, try to move it into another slot.

- This works for me, try to use **MemTest** at your boot menu selection. After testing my memory, I can startup my linux again.

I dont know exactly about this problem, I think it just a memory problem. Just in case, I update my linux's kernel.

**BEST SOLUTION : UPGRADE YOUR KERNEL INTO THE LATEST ONE!**
