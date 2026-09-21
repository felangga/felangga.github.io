---
title: "[LINUX] Enabling Splash Screen"
date: 2012-12-23 16:50:00 +07:00
categories:
- Archive
tags:
- Linux
layout: post
toc: true
---

A few days ago I disabled plymouth because they said it could add to boot time, but it turned out not to be much. When I wanted to enable it again, it turned out I couldn't; I used Super Boot Manager. After messing around, it turned out I forgot to configure my BURG, which was still set to **"profile"** when it should have been **"quiet splash"** to display the splash screen. To do that, open the BURG settings in **/etc/default** and find the **GRUB_CMDLINE_LINUX_DEFAULT** section and change its contents to **"quiet splash"**.
