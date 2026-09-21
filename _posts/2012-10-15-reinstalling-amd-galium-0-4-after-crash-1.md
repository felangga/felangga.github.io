---
title: "Reinstalling AMD Galium 0.4 After Crash :("
date: 2012-10-15 08:41:00 +07:00
categories:
- Archive
tags:
- Linux
- "Audio & Video"
- Hardware
layout: post
toc: true
---

After I upgraded my kernel into 3.6.2, I found some error with my VGA driver. You can check it out here ([install kernel](http://www.f-comp.com/2012/10/install-linux-kernel-362-on-ubuntu-1204.html)). There are some glitches on the text that so annoying for me :( So I think installing AMD Proprietary driver is the solution, but the installation was not successful, and my display driver restored to VESA that just support 1024 x 786.

After restore xorg.conf from the backup file, the default driver ran again, but it's not powerful at all. So, my solution is to re install the Galium 0.4 driver again, so here the steps :

- **sudo apt-get remove --purge xserver-xorg-video-ati xserver-xorg-video-radeon**(delete all files that contain ATI's drivers)

- **sudo apt-get install xserver-xorg-video-ati xserver-xorg-video-radeon**(redownload AMD Radeon standard driver)

- **sudo apt-get install --reinstall libgl1-mesa-glx libgl1-mesa-dri xserver-xorg-core**(reinstall vesa library)

- **sudo dpkg-reconfigure xserver-xorg**(re-configuring xorg)

After those steps completed, you must reboot your system to check if the driver successfully updated.

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhHJPvHn2_7hyD_bECqIk_oUqV74wwABE7JtbMz-clzCX0yBzTfzz5W46woTNEAva1GjJqDZPPZsIUg5jb0u8dFtcZbLgZlBhTI67CQpitCZtGhfaFyWk1hwj8kYos_KrwipDg1nZWTv2k/s1600/galium.jpg)
