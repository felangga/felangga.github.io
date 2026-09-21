---
title: "[REVIEW] KERNEL 3.7"
date: 2012-12-14 06:59:00 +07:00
categories:
- Archive
tags:
- Linux
- Virtualization
layout: post
toc: true
---

Only now can I review kernel 3.7, which was just released yesterday. After waiting over an hour yesterday to compile the kernel, I can finally enjoy kernel 3.7.

![kernel37](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiN5a9siseuCT1g5hiKzQKWzQe2c0b_m7t75knoMQIWkKgOymx3_yzaLML-OKZv1PRQuAXouQEx8DsbCh5LwAY4fBWMZ-TqDFPXkxGdAK9P9eqgLw_fj5d8eOALHBIT-TEp3xoOx06BkVo/s1600/kernel37.png)

On my AMD 64-bit architecture computer, there were no significant problems. But the problem that occurred was with my VirtualBox, which isn't compatible with the new kernel. Kernel 3.7 isn't supported by VirtualBox 4.2.0, so I had to update to VirtualBox 4.2.4. I did the upgrade by downloading the latest version [here](https://www.virtualbox.org/wiki/Downloads). I had a download failure at one point, and had to re-download the 50MB again :(

After the download is complete, please install the latest version so that Virtualbox can run again. The error was caused by incompatibility between the old Virtualbox driver and the latest kernel version.
