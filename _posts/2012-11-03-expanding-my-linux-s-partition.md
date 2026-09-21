---
title: "Expanding my Linux's Partition"
date: 2012-11-03 22:03:00 +07:00
categories:
- Archive
tags:
- Linux
- Windows
layout: post
toc: true
---

My Linux partition was so small (40GB) and I need to resize it and delete my Windows's partition. So I must backup my Linux partition and restore to the big one. I use **dd** to do this, very simple software.

> **Backup : dd if=/dev/sdax of=file.img**

> **Restore : dd if=file.img of=/dev/sdax**

> **Restore with proggress bar :****dd if=FILE.IMG | pv -s $(stat file.img | egrep -o "Size : [[:digit::]]\*" | egrep -o "[[:digit:]]\*") | dd of=/dev/sdax**

![AVvXsEioC5nNCAkc 1K99bAGQgBtYdFTAAkt tvaPLhoUv5ILfWeVWxx0eyEJWm2W1iFSNyLPhtdo39Qli SYVB9yY auVvlJnXLTObF8cMtt75VKkiFLqZWLX65 VEaGUTiWx1u baU7wXDqs0](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEioC5nNCAkc-1K99bAGQgBtYdFTAAkt-tvaPLhoUv5ILfWeVWxx0eyEJWm2W1iFSNyLPhtdo39Qli-SYVB9yY-auVvlJnXLTObF8cMtt75VKkiFLqZWLX65-VEaGUTiWx1u_baU7wXDqs0/)

After waiting restoration progress, finally I got 92.7 GB for my Linux space ! Woohoo !

![Details 001](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiUi8TcRRG2FBgzankfskZ9s4i2179iGz5dND-fPiXRmRgYfINlDKo5Mu9LP86xZqH8Mt4s73ltYdsVs2H3cPIWs93Oycy1_o0Fi0IDQLsHULAtHLgu_xwm90DRtLN0NSefPlbEw4Bdgrg/s1600/Details_001.png)
