---
title: "[SOLVED] Clementine -- G-Streamers installation missing plugin"
date: 2012-10-13 10:34:00 +07:00
categories:
- Archive
tags:
- "Audio & Video"
- Linux
- Radio
- Web
layout: post
toc: true
---

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEib7uDML3Q4uTvlgCZLnjBt6pY9HTyg8OEgWgcZIGvs4-CpVNNt9H4n-rTQf-jj1CHoftqGgId617AIM02h5b3_5IsKYSutt2TcPhM0cSwCAaZicYiL4Zwp8wQjVdHD3dJKGeouXkz7jZo/s1600/Screenshot+from+2012-10-14+00:38:08.png)

I just downloaded media player for my Linux, because I got bored with my old media player. I downloaded Clementine media player. Such a good media player, that support Last.FM and Radio streamers.

But my problem was I cannot play radio streaming from my Clementine. It said that

> **"G-Streamers Installation is missing plugins"**

That error because the codec is not installed.  So I must install the codec first to make it work. Open terminal (CTRL+ALT+T) and type :

> **sudo apt-get install gstreamer0.10-plugins-bad**

After installed, try to restart your player and test it again. Good Luck !
