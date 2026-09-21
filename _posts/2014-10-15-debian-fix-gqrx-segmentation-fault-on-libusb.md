---
title: "[Debian] Fix GQRX Segmentation fault on libusb"
date: 2014-10-15 06:50:00 +07:00
categories:
- Archive
tags:
- Linux
- Radio
layout: post
toc: true
---

I use Debian Wheezy, where GQRX is not available in the stable repository. If you want to download GQRX via the repository, you have to add the backports repository address. Add this line to **/etc/apt/sources.list** and run **apt-get update**

> deb http://http.debian.net/debian wheezy-backports main

In my case, after the download finishes, GQRX will run for about 2 seconds, and then crash. In **dmesg**there is an error about a segmentation fault in libusb

> gqrx[2842]: segfault at 0 ip b4ea78f6 sp a22d8100 error 6 in libusb-1.0.so.0.1.0[b4ea2000+f000]

The way to fix this is pretty simple; errors like this occur in libusb version 1.0.18 and below. Sure enough, I was using libusb version 1.0.11, which is the one included in Debian stable. Upgrade the package from the backports repository. You can do it using Synaptic, select the libusb package, then in the Package menu there is Force Version. After that, just choose the latest version. I'm now using version 1.0.19, and it's running smoothly!

Good Luck, DWYOR!
