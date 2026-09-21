---
title: "Install Linux Kernel 3.6.2 on Ubuntu 12.04"
date: 2012-10-15 04:15:00 +07:00
categories:
- Archive
tags:
- Linux
- Hardware
layout: post
toc: true
---

Last night I want to try new experiment about upgrading Linux kernel in easy way (without compiling from source). After searching about an hour and do trial and error, I found the easiest way to upgrade it. Here the steps to upgrade your kernel :

- Open your Linux terminal (CTRL + ALT + T)

- **cd \tmp** (Change active directory to temporary)

- **wget [http://fcomp.3owl.com/download/update-kernel3.6.2](http://fcomp.3owl.com/download/update-kernel3.6.2) -O update-kernel3.6.2**(Download the installer)

- **sudo chmod +x update-kernel3.6.2**(Change permission to active executable)

- **sudo sh update-kernel3.6.2**(Execute the installer)

- Reboot your PC and enjoy the kernel :)

- Here the screenshot about the new kernel :)![terminal](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEicPLqHOYcXn2b-yjRNyl2Jd6bTx6DV2cPOdXtRwA8GD1xX2hyWURTEOXICidOCHx3TA77Y2L1hvo_Bgk8l1U6CdNzGHUTYcAWOiNWtZM2ieySDls3JRbcqppKSqIUTyX1ufZMSY5o3EhM/s1600/terminal.jpg)

But I found some bug on the new kernel. I think it's on the VGA driver. There are some glitch (red arrows) on the text. I'm still working to repair it.

![bug](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgGlg_8Phv3cxTM5Df4fE08wnue61iQxq08eJKrUUVrsaaFEQKws-OLoC-30TC33e_PYpPJiJNgmyJNcG_2VStSv02V8ks1uJEWcwBYrzSARewp6IuoAsKcvkO1_bhQ0AzzV2L1WY5rVKg/s1600/bug.jpg)
