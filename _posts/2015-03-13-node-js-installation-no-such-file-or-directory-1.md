---
title: "Node.js Installation : No such file or directory"
date: 2015-03-13 09:55:00 +07:00
categories:
- Archive
tags:
- Programming
- Linux
layout: post
toc: true
---

`I just installed node.js via ubuntu's package manager because I didn't want the hassle of downloading it from the website. When it finished, it turned out there was an error`

> `/usr/bin/env: node: No such file or directory`

`The solution to overcome this is to link the nodejs that's in the wrong location by running the following command`

> `ln -s /usr/bin/nodejs /usr/bin/`
