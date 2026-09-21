---
title: "[LINUX] Mount HFS Partition : Seems to be mounted read-only"
date: 2012-12-24 19:03:00 +07:00
categories:
- Archive
tags:
- Linux
- macOS
layout: post
toc: true
---

My Hackintosh got an error because yesterday I was just carelessly moving kexts around, and as a result it wouldn't boot anymore. I even considered reinstalling Hackintosh again, but I looked for another way, namely opening the Hackintosh partition, which has an HFS+ structure, on Linux. Linux can open the partition just fine, but to edit it, Linux seemingly doesn't have that capability. When I tried to open the partition, it turned out there was an error **HFS seems to be mounted read-only**. To fix it, the way is to install **hfsprogs**.

- sudo apt-get install hfsprogs

- sudo mount -t hfsplus -o force,rw /dev/sdx# /media/mntpoint

**GOOD LUCK**
