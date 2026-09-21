---
title: "Set DNS on Linux"
date: 2014-06-01 09:47:00 +07:00
categories:
- Archive
tags:
- Networking
- Linux
layout: post
toc: true
---

I was having a strange problem with my modem: it was connected but couldn't open pages like google.com and others. After I checked "ping 8.8.8.8" there was apparently no problem, but when I checked "ping google.com" the address couldn't be found. I was confused about where to set the DNS, because this is a broadband connection and I didn't really know how to set DNS on a broadband connection.

After googling around, I found a simple way to do that setting

- Open and edit resolv.conf in /etc, **sudo nano /etc/resolv.conf**

- Add this line for Google DNS, **nameserver 8.8.8.8**

- Save it and try checking by typing, **host google.com** or **dig google.com**

Good luck :)
