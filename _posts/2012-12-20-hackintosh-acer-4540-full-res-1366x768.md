---
title: "[HACKINTOSH] ACER 4540 - FULL RES (1366x768)"
date: 2012-12-20 18:47:00 +07:00
categories:
- Archive
tags:
- macOS
- Hardware
- Linux
layout: post
toc: true
---

Earlier this morning, to be exact, I was tinkering with hackintosh again on my Acer 4540. Last time this laptop could only do a maximum resolution of 1024x768, so it was really unpleasant to look at, the image was all stretched. After asking around in the hackintosh indonesia group on facebook, it turns out there's a general ATI Mobility HD Radeon driver. That driver is already enough if you only need full-res, but not QE/CI yet.

The first and second attempts failed, the resolution didn't change, and at that point I was already too lazy to mess with Hackintosh; since Linux Mint 14 Nadia was available, I formatted the Hackintosh and installed Nadia. After the exams were over, I wanted to install Hackintosh again, so I installed it again but a bit differently: I minimized driver support for the ATI VGA during the installation, so after it installed successfully, its System Information said **kext not loaded.** I did this intentionally to see which kexts load when I install a new kext. After installing RadeonHD.kext, the 1366x768 option finally appeared and could be enabled, but unfortunately QE/CI still didn't work. Even so, it was already a pleasure to look at, the display wasn't stretched anymore :)

**In conclusion, if you want to try, make sure all VGA drivers are not loaded, and install RadeonHD.kext. To install the kext, you can use kext helper, you can google it yourself!**

**[Download RadeonHD](http://www.mediafire.com/?6fy4ijnsphdhpt2)**

**Good Luck and don't hesitate to ask :)**
