---
title: "MOUNTING HFS+ IN LINUX"
date: 2013-01-25 17:42:00 +07:00
categories:
- Archive
tags:
- Linux
- macOS
layout: post
toc: true
---

I'm a Linux and Hackintosh user too; sometimes my Hackintosh gets a kernel panic and I have to delete a few kexts to recover it. Since I can't access the Hackintosh, I have to access the Hackintosh drive through Linux.

The Hackintosh drive format is HFS+ (Journaled); when opened through nautilus etc., the partition will be mounted as Read Only, to access it open a terminal and type

> **$ sudo mkdir /media/macdrive**

> **$ sudo mount -o force /dev/sdax /media/macdrive**

For /dev/sdaX, the X is filled in according to the partition number on your hard disk. To check it, type sudo fdisk -a.

Go ahead and give it a try.
