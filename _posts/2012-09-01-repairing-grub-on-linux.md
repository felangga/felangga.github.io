---
title: "Repairing GRUB on Linux"
date: 2012-09-01 21:35:00 +07:00
categories:
- Archive
tags:
- Linux
- Windows
- Security
layout: post
toc: true
---

Have you ever lost your GRUB loader because overwritten by Windows loader ? It's happen to me today, and I want to recovery it! It's not hard to do, you just need a Linux live CD/DVD to recovery your GRUB and these commands below.

- First, boot your live linux and open the terminal.

- Make sure you are login into root. If you're not, type **sudo su**and type your password .

- Type **fdisk -l**to show all your harddisk drive partition list.

- Search for your linux partition and remember it ! example my linux is at /dev/sda5

- okay then. I should mount it, so type **mount /dev/sda5/ /mnt**

- You should mount another system components by type this :

- **mount --bind /dev/ /mnt/dev**

- **mount --bind /proc/ /mnt/proc**

- **mount --bind /sys/ /mnt/sys**

- Now, set your new root, type **chroot /mnt**

- Type **update-grub**to check if my Windows loader is detected too.

- To install grub, type **grub-install /dev/sda**

- Okay, thats all, now try to reboot your computer, type **reboot.**

**Oh , i tried this scenario also ! I try to delete the /boot/grub folder and try to recovery it, simple, just type grub-install /dev/sda and it will be created again by GRUB.**

And it works perfectly on my computer, may it will help you someday.
