---
title: "Attacked by Bad Sectors"
date: 2013-04-14 10:17:00 +07:00
categories:
- Archive
tags:
- Hardware
- Linux
- Windows
layout: post
toc: true
---

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjsr6yc35j-hzUj2LuahBgH6_ZG0zK_q667wOWCbY5NENmW4oL5BrsOAq3KN0Kv82hqkZSVNQrXQsOVxM7ezV8zTD8eCaYYkmSxEdJSNDqDTYdWlXrDiSatPddAuIsbUGAwb63LB7J14EA/s1600/harddisk+bad+sector.jpg)A week ago my computer took forever to boot and wouldn't get into linux. After I tried verbose mode, it turned out there was a failure while reading a sector. I immediately suspected it was a **Bad Sector**.

Then I burned the HDD Regenerator tool that's usually used to repair HDD bad sectors. At first it was fine until it got past 50%, and there were so many errors. HDD Regenerator also **FAILED** to repair it. I got discouraged for a moment, and I tried the following steps:

**FSCK & CHKDSK**

I used both of these tools, from Linux and Windows. Why use chkdsk? My data partition happened to still be NTFS.

**Result: Failed!**

**DEL****ETE PARTITION (BACKUP FIRST)**

A standard step that's usually done. Before deletion, I moved all the data first and rewrote the partition.

**Result: Failed!**

**LOW LEVEL FORMATTING**

This low level formatting is more than just a regular format. I really hoped it would work that time, but...

**Result: Failed!**

**WRITE ZERO (QUICK & FULL)**

Write Zero is a method used to fill all sectors with 0. There are 2 methods used. First, I used the quick one because I was already desperate at the time. The result was still a failure! Alright, I tried doing a Full operation with resignation.

**Result : SUCCESS!**

*\*Failed = there are still bad sectors.*

I really didn't expect it, but that method was able to deal with the bad sectors. At that point I had run out of options, what else could I do. In the end, all that was left was to rewrite the partition table and repartition.

**Tools** :

1. [HDD Regenerator (not free)](http://www.dposoft.net/)

2. Hiren Boot Cd

3. [HD Tune](http://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&ved=0CDIQFjAA&url=http%3A%2F%2Fwww.hdtune.com%2F&ei=gRl6UfG1JcilrQeD8oDACQ&usg=AFQjCNHDsml17Z8dgUONsUWOQfc0L6mPGg&sig2=S9LvVJwPjiXYtxWaSjMXYw&bvm=bv.45645796,d.bmk)
