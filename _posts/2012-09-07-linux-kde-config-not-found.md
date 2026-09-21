---
title: "[Linux] kde-config not found !"
date: 2012-09-07 00:35:00 +07:00
categories:
- Archive
tags:
- Linux
layout: post
toc: true
---

If you stuck with this error :

> 'The important program kde-config was not found! Please check whether you installed KDE correctly."

Nothing to worry about, it's simple to fix it. This error happens because on KDE 4, kde-config is renamed to kde4-config. To fix the error, follow these steps :

- Enter **/usr/bin**

- Copy or rename (not recommended) kde4-config into kde-config. I suggest to copy it into kde-config, just type **cp kde4-config kde-config**

Good Luck !
