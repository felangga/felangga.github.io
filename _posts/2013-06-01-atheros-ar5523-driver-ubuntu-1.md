---
title: "Atheros AR5523 Driver Ubuntu"
date: 2013-06-01 02:55:00 +07:00
categories:
- Archive
tags:
- Linux
- Networking
- Hardware
- Programming
- Windows
layout: post
toc: true
---

The Atheros AR5523 is a chipset embedded in my WiFi dongle, the TPLink WN620G series. There's a built-in driver, but unfortunately it's only available for Windows. Maybe for those of you using Kernel 3.8 this is no longer a problem, because it has been supported in the mainline kernel of that version. There are 2 solutions for installing the driver for this AR5523,

- Upgrade your kernel to version >= 3.8 ([www.kernel.org](http://www.kernel.org/))

- Use **ndiswrapper**.

Here, what I will discuss is how to install a driver using this ndiswrapper. Follow my steps below.

- Do the ndiswrapper installation **NOT** through the ubuntu repository (I had trouble), better to compile the source yourself by downloading the source [here](http://sourceforge.net/projects/ndiswrapper/?source=dlp).

- Extract, enter the extracted directory and do the compilation by typing

- make

- make install

- depmod -a (not mandatory)

- After successfully compiling, download the TPLInk driver [here](https://help.ubuntu.com/community/WifiDocs/Device/TP-Link_TL-WN620G_%28ndiswrapper%29?action=AttachFile&do=view&target=updated+TPLink+TL-WN620G+1.5.0.119.rar). Extract it anywhere you like

- Enter the extracted driver directory and then install the driver using ndiswrapper by typing the following command

- sudo ndiswrapper -i net5523.inf

- sudo modprobe ndiswrapper

- Plug in your WiFi dongle and see whether it has been detected or not. To see whether the driver has been installed or not, type the command:

- sudo ndiswrapper -l

I successfully applied that method on my computer; for those of you who try it, I say **Good Luck** :)
