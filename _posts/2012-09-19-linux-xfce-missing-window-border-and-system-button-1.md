---
title: "[Linux] XFCE - Missing Window Border and System Button"
date: 2012-09-19 06:00:00 +07:00
categories:
- Archive
tags:
- Linux
layout: post
toc: true
---

This problem happen to me in last 2 days. When I login with xcfe desktop, I always found my window had no border and no minimize, maximize, and close button. I try to search this problem, and found the solution. Delete all files in this folder, and try to login again.

> /home/youraccount/.cache/sessions/

\*the folder .cache is hidden. Check the **Show Hidden Files**inside View Menu.
