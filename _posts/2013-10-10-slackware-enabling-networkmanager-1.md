---
title: "[Slackware] Enabling NetworkManager"
date: 2013-10-10 23:30:00 +07:00
categories:
- Archive
tags:
- Networking
- Linux
- Windows
layout: post
toc: true
---

At the beginning of installing Slackware, the network manager service is usually still disabled, so you have to enable the network manager so that you can use a network adapter (Wifi, LAN, etc.). You can activate it by entering the command:

> sh /etc/rc.d/rc.networkmanager start

Automatically, the network manager service will be started; if it is still off, try adding **nm-applet** to call up the applet from the network manager again.

**Set on startup**

KDE users can run the command automatically at boot-up by entering it into the Xsetup file, by typing the command:

> kate /etc/kde/kdm/Xsetup

then enter the command to start the driver above into the Xsetup file.

**Good Luck.**
