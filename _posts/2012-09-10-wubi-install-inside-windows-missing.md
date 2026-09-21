---
title: "WUBI - Install Inside Windows Missing"
date: 2012-09-10 07:40:00 +07:00
categories:
- Archive
tags:
- Virtualization
- Windows
- Linux
layout: post
toc: true
---

Have you ever when you trying to install Linux alongside with Windows and use WUBI, the install inside windows option is missing ? That's suck, because I must install from boot menu, so I must burn it into CD/DVD or flashdisk. Some forum said that the computer needs a big chunk to install inside Windows and other said you must download the latest WUBI to get this thing work.

But the problem, that two solutions above doesn't work for me :(

I tried to delete some files on my disk and hope the first solution works, but NO. Second, I have Kubuntu 12.04 which the latest version of Kubuntu. BUT, the WUBI still doesn't show the install alongside windows!!

The solution is, open your command prompt on windows and go into your DVD/CD or flashdisk where linux's master is.

- Type (drive letter) :

- Type wubi --force

WUBI should open up and show the Install inside windows option ! :)
