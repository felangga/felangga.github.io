---
title: "[Hackintosh] Venting About XCode 4.2 on 10.6.7"
date: 2013-02-03 11:51:00 +07:00
categories:
- Archive
tags:
- macOS
- Linux
layout: post
toc: true
---

[![](https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRmeXi_qh_R3eLMgTUEa_l5ue0XOc1ktv1DAj0yDvruZItl8Zoi)](https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRmeXi_qh_R3eLMgTUEa_l5ue0XOc1ktv1DAj0yDvruZItl8Zoi)This semester I took an iOS course that teaches about programming on the iOS platform. iOS is an operating system owned by Apple that runs on iPhone and iPad devices. For its programming environment, it uses Apple's application, XCode. The campus has 15 iMacs in the lab running the Mac X Mountain Lion 10.8.2 operating system. This course gives a final assignment, namely to create an application that is useful for campus residents. Of course, with that, I need XCode to create the program. But alas, my laptop can only (stably) run on Mac OSX Snow Leopard 10.6.6, which means the campus's XCode can't run on this version.

The first step was to download the XCode 4.2 program, which I had entrusted to bang Ucup because my internet was slow -__- Once it was done, it turned out that XCode 4.2 only runs on version 10.6.7 and above. Okay then, I upgraded using Update Combo 10.6.8. After the update finished, I immediately installed it and it worked... yay.. that's where a new problem appeared. My RadeonHD.kext driver turned out not to work on 10.6.8. Please read point 4 ([http://www.insanelymac.com/forum/topic/190586-ati-hd-framebuffer-driver-105106-with-source-code/](http://www.insanelymac.com/forum/topic/190586-ati-hd-framebuffer-driver-105106-with-source-code/)). I was confused: should I download an older version of XCode or just download the 10.6.7 combo update? Because the 10.6.7 combo update size is smaller (~1.2 GB) while the XCode size is (~2 - 4 GB). I decided to download the 10.6.7 combo update at [http://support.apple.com/kb/DL1361](http://support.apple.com/kb/DL1361).

[720 × 480 - slashdot.org](http://www.google.com/imgres?um=1&hl=en&safe=off&tbo=d&biw=1366&bih=626&tbm=isch&tbnid=tlZpLucIlbqsyM:&imgrefurl=http://slashdot.org/story/06/08/18/1323201/apple-denies-wi-fi-flaw-researchers-confirm&docid=IORgbKKkaVuKdM&imgurl=http://www.hylobatidae.org/misc/macbook-pro-kernel-panic.jpg&w=720&h=480&ei=gL8OUYDbM9DyrQfOsQE&zoom=1&ved=1t:3588,r:9,s:0,i:108&iact=rc&dur=1060&sig=112241218668926542943&page=1&tbnh=183&tbnw=275&start=0&ndsp=15&tx=34&ty=23)

After 2 hours waiting at the internet cafe, it finally managed to download completely. To install it, follow these steps:

- Prepare the update combo 10.6.7.dmg that you've already downloaded

- Prepare the legacy kernel 10.6.7, which you can download [here](http://www.osx86.net/view/1062-legacy_kernel_for_os_x_10.6.7_-_darwin_1_...html)

- Delete SleepEnabler.kext from /System/Library/Extension, in case it's not compatible

- Back up AppleACPIPlatform, IOPCIFamily, AppleHDA, IO80211Family from /System/Library/Extension first.

- Install the update_combo you downloaded earlier and DO NOT RESTART yet when it's finished.

- Install the legacy_kernel 10.6.7 you downloaded in point 2

- Restore the kext you backed up earlier to /System/Library/Extension

- Once that's done, then restart

I have already done that method and it worked well. Now my system runs on Mac OSX Snow Leopard 10.6.7 with XCode 4.2.

**Good Luck**
