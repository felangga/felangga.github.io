---
title: "[Slackware] Forgot root password? Try this method!"
date: 2014-09-12 21:51:00 +07:00
categories:
- Archive
tags:
- Linux
- Security
layout: post
toc: true
---

A fairly simple way to reset a forgotten root password, provided your lilo bootloader is not locked. Here are the steps,

- On the LILO bootloader screen, press TAB <tab>to enter command line mode

- Type "Linux single init=/bin/sh rw"

- After loading all sorts of things, wait until the shell is ready

- Once it's ready, just type "passwd root" and enter your new password

- Restart

Good Luck
