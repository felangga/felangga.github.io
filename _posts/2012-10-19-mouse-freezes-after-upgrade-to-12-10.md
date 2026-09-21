---
title: "Mouse Freezes after Upgrade to 12.10"
date: 2012-10-19 19:33:00 +07:00
categories:
- Archive
tags:
- Linux
layout: post
toc: true
---

Today I finally downloaded latest version of Ubuntu, Ubuntu 12.10. After waiting for a long time for downloading it (~6 hours), I tried to install it and upgrade my 12.04. The installation is very smooth, and about 15 minutes the installation is done. When I tried to log in, I had some problem with my mouse. It won't work! I don't know why. I tried to restart my computer again and try to move the cursor, but nothing happen. So, I had a idea to upgrade my kernel (3.5.0) into my 12.04 kernel where it was (3.6.2). Aaaanddd, **It's work !!**

I don't know if it a bug or not, or just the driver that can't detect my hardware. So, if you get the same problem, maybe you should try to upgrade your linux kernel. How to upgrade ?? [try this](http://www.f-comp.com/2012/10/install-linux-kernel-362-on-ubuntu-1204.html).
