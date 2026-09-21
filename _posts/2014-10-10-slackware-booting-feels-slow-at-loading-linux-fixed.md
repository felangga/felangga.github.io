---
title: "[Slackware] Booting Feels Slow at Loading Linux ... [Fixed]"
date: 2014-10-10 11:23:00 +07:00
categories:
- Archive
tags:
- Linux
- Hardware
layout: post
toc: true
---

I experienced this slow boot on my NEC laptop with specs that are indeed very limited. It uses an Intel Dual Core with only 512MB of RAM, and I installed Slackware 14.1 on it. The installation process ran slowly, especially during the first boot from DVD and then the initrd loading part, but afterward it could run normally.

After the install finished, on the first boot it felt like it took a very long time at the Loading Linux ............. part (waiting for the dots to move), which was then followed by **Bios Data Check Successfull**.

I suspect the kernel isn't compatible? because the default one is indeed hugesmp. Before changing the kernel, I tried to look for another solution, and found this article ([http://www.control-escape.com/linux/lilo-cfg.html](http://www.control-escape.com/linux/lilo-cfg.html)). It says that enabling **compact** can make booting faster, but it may be problematic on *old* computers. The way to enable it is as follows

> su
> nano /etc/lilo.conf
> ~ Find and *uncomment* the command **compact,** then save
> /sbin/lilo

After I tried it, it turned out **it worked !**

Booting became faster in that part. Another article (forgot the address) suggested replacing lilo with grub. But I haven't tried it yet, because I consider this has already solved my problem :)
