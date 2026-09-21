---
title: "How to Compile Kernel ?"
date: 2012-11-07 07:16:00 +07:00
categories:
- Archive
tags:
- Linux
- Programming
layout: post
toc: true
---

How to compile kernel ? Change the kernel is the one that not important for you if you have stable kernel with your hardware. Because upgrading a kernel may harm your hardware if you don't know how to configure the kernel configuration. You can see any update of available kernel from [www.kernel.org](http://www.kernel.org/). Every time Linus Torvalds release the kernel source code, you can download from there. The question is, **how to compile the kernel and install to my computer ?**

- First you must download the kernel source code from **[www.kernel.org](http://www.kernel.org/)**

- After downloaded, extract with your favorite package manager, or you can do that from terminal and type this command **tar -xjvf linux-x.y.z.tar.bz2 -C /usr/src**.

- The source code will be unpack to folder /usr/src

- Go to the directory by typing **cd /usr/src**

- Type **make menuconfig**to configure the kernel before you compile it.

- **BE CAREFUL !**There are plenty of configuration that if you didn't careful, the kernel may not work perfectly on your computer. If you don't know how to configure, just leave it default.

- To compile, type **sudo make.**It will took a long time to compile the kernel, about 50 - 60 minutes.

- After finished, type **sudo make modules_install install.**The command will install the driver for your hardware and after it finished, the kernel will be updated into your system.

- After that, reboot the computer, and the kernel should be in the GRUB list. If didn't, boot with old kernel, go to terminal and type **update-grub**(GRUB user) [OPTIONAL]

- Simple enough to do this, the bad things is that you must wait for a while to compile the kernel. If you have any question, please post here.

**Correct Me If I Wrong :)**
