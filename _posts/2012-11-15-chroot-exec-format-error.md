---
title: "Chroot : Exec Format Error"
date: 2012-11-15 10:51:00 +07:00
categories:
- Archive
tags:
- Linux
layout: post
toc: true
---

It's 2 in the morning like this and I want to turn on the computer, turns out BURG is erroring. I forgot what I did earlier, because the LiveUSB got formatted, so I ended up taking apart the CD drive. Just grabbed a Linux CD to restore BURG so I could get into Mint again.

After getting in and booting, which took absolutely forever and the CD drive was noisy. Time to restore BURG! After mounting was done, when I was about to run the chroot command, it turned out to be an error.

The error:

**CHROOT : Exec Format Error**

This is because of the difference between my computer's system architecture and the master Linux I entered earlier. My computer is installed with 64-bit Linux Mint, so if I want to restore, I have to use the same architecture.

**SOLUTION?**

Try booting with a Linux master that matches the Linux installed on your computer. It's better to use the same master as the Linux installed.
