---
title: "Installation (troublesome) on ASUS X200MA"
date: 2014-11-28 23:09:00 +07:00
categories:
- Archive
tags:
- Hardware
- Linux
layout: post
toc: true
---

The factory version of the ASUS X200ma has an old BIOS version, around 3.x if I'm not mistaken. To boot from a flash drive, you have to update the BIOS first. However, be careful: if it fails, it will *brick.* You can look up the steps for updating the BIOS on Google. Mine has version 502, which was the latest version when I checked.

The problem occurs when I want to install Linux, Crunchbang and also Slackware. Both can boot fine (**Booting was done with a Flash drive, haven't tried using a DVD**). But once I enter the shell, my flash drive becomes undetected. There is an error that says **usb not accepting, error -101.** This error can be seen in the dmesg command. So although setup can run, it fails to install because the master file location is lost, since the USB becomes undetected.

I tried various steps, including disabling the ehci-pci or ehci_hcd module, but it still gave an error.

The solution I used was to place the master ISO file onto the hard disk, for example to /dev/sda1.

After that, prepare a flash drive that already contains Slackware.

Boot from the flash drive.

After entering the flash drive's shell, create an installation folder.

- mkdir /slack

After that, copy the ISO file that is on sda1 to the installation folder.

- mkdir /mnt/sda1

- mount /dev/sda1 /mnt/sda1

- cd /mnt/sda1

- cp &lt;nama&gt;.iso /slack

Go back into the slack installation folder, and create a folder for mounting.

- cd /slack

- mkdir mnt

- mount -o loop &lt;nama&gt;.iso /slack/mnt

Done? No errors? If so, you can continue.

Enter slackware setup and then you configure all the partitions. In the target selection menu, choose CD/DVD. Then you choose manual for all, and enter the path /slack/mnt.

The installation should work now. It's still unclear whether the issue was my BIOS or my hardware. But at least now everything can be installed.
