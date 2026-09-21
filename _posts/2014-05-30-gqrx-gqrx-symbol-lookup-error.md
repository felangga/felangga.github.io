---
title: "[GQRX] gqrx: symbol lookup error"
date: 2014-05-30 09:50:00 +07:00
categories:
- Archive
tags:
- Radio
- Linux
layout: post
toc: true
---

Have you ever encountered a problem like this when installing GQRX and trying to run it?

| ![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiK3-CoFda4ZqvDc9Qowxh6wZtHmlmBRUYVbu7paUz5SkdaNGgJ3vS997xi0KBhIMfWlk3jZoee2cZzEUfmNb5ivaX-V2y48Ko7J51dnYpPJOUbY4-DF9_okHDJRgNaBcRshV1o0Ecf68c/s1600/Screenshot+from+2014-05-30+23:43:47.png) |

| libvolk error |

In my opinion, this happens because there is a problem with libvolk. Some people suggest removing libvolk, but since on my computer there isn't anything called libvolk yet, I decided to just download it.

**Download libvolk**

- Add the following line to /etc/apt/sources.list

> **deb http://ftp.debian.org/debian/ wheezy-backports main**

- **sudo apt-get update**

- **sudo apt-get install libvolk0.0.0**

After the download is complete, try running gqrx again via the terminal so that if an error occurs it can be seen.

Good Luck
