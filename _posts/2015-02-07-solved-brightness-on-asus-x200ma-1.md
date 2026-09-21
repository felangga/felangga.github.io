---
title: "[Solved] Brightness on Asus X200MA"
date: 2015-02-07 10:27:00 +07:00
categories:
- Archive
tags:
- Linux
- Hardware
layout: post
toc: true
---

The Asus X200MA I use has an issue with **brightness**. When everything is detected properly on Linux, the brightness can't be adjusted using the hotkey (Fn). After switching kernels here and there, it was still no use. My attempt was to download the latest kernel (kernel 3.18, 3.19) hoping all the drivers would be complete, but it turned out to still have no effect. My last attempt was to use the default kernel 3.13 from Linux Mint 17 and it turned out to **work** with a little modification.

To test whether the brightness can actually be changed, run **echo 1000** > **/sys/class/backlight/intel_backlight/brightness** you must be **root !**

**Modifications that must be made :**

- Enabling acpi so the hotkey is detected (this is actually a bug) by adding **acpi_osi=** to /boot/grub/grub.cfg. Find the word **quiet** and add it after it, making it **quiet acpi_osi=**

- Actually Linux has already detected intel_backlight, but it's confused about which one to use, between acpi_backlight or the built-in intel_backlight. Therefore, it must be forced to choose intel_backlight. Open /usr/share/X11/xorg.conf.d/20-intel.conf (if it doesn't exist, create it)

> Section "Device"
>         Identifier "card0"
>         Driver "intel"
>         Option "Backlight" "intel_backlight"
>         BusID "PCI:0:2:0"
> EndSection

 Good luck
