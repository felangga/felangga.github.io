---
title: "Disable Send Error Report -- Ubuntu 12.04"
date: 2012-10-15 18:50:00 +07:00
categories:
- Archive
tags:
- Linux
layout: post
toc: true
---

[![Selection 001](http://refugeeks.com/RefuGeeks/wp-content/uploads/2012/08/Selection_001.png)](http://refugeeks.com/RefuGeeks/wp-content/uploads/2012/08/Selection_001.png)

I think Ubuntu 12.04 (Precise Pangolin) is the most buggy system than older release. Sometimes I got error report when I'm not doing anything, it was so annoying for me. Now, if you think that it's so annoying too, you can disable it from the configuration file

> **sudo gedit /etc/default/apport**

Open it and change the enable value from 1 to 0. And it's done!
