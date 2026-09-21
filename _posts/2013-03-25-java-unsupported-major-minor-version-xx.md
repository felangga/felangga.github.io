---
title: "[Java] Unsupported Major.Minor Version xx"
date: 2013-03-25 06:45:00 +07:00
categories:
- Archive
tags:
- Programming
- Hardware
layout: post
toc: true
---

A common Java issue that usually happens when you use a compiler with a different version and compile on another computer. I experienced this when compiling on Hanang's computer, and it turned out my .java file couldn't be compiled properly.

How to fix it: delete all .class files from that source folder and recompile that .java file. Hope this helps :)

NB : This most likely happens when your program has more than one object. Calls to other *Class* will more often trigger this error (if there are version differences)
