---
title: "Crack Linux (Mint) Login Password"
date: 2013-01-23 17:38:00 +07:00
categories:
- Archive
tags:
- Linux
- Security
- Windows
layout: post
toc: true
---

I found this method when my friend, let's call him Ta\*u, forgot the user account password on his Linux Mint, because it had indeed been a long time since it was opened. My first step was trying to access Root via "drop shell" in **recovery mode,** but **recovery mode** on his computer was protected by the same password, so I couldn't get into recovery. I thought of accessing the computer's shell by using the shell from a LiveCD/USB, because at that time I didn't need a password to log in. Let's get straight to how it's done !

- Prepare a LiveCD/USB Linux Mint, Ubuntu, etc. (Debian based)

- Boot live and enter the terminal.

- Type **sudo fdisk -l**

- See which disk partition your Linux is on. For example, I take **/dev/sda1**

- Type **sudo** **mount /dev/sda1 /mnt**

- Type **sudo mount --bind /dev/ /mnt/dev**

- Type **sudo mount --bind /proc/ /mnt/proc**

- Type **sudo mount --bind /sys/ /sys/**

- Type **chroot /mnt**

- Up to this step, the shell on your computer can be accessed by the Linux that is loaded live.

- You just need to change the forgotten password by typing passwd (username). For example "**passwd ta\*u**" (without the parentheses).

- After that, you will be asked to enter a new password.

- Done? Reboot.

**Good Luck !**
