---
title: "Speed Up Kernel Compilation"
date: 2012-11-13 06:55:00 +07:00
categories:
- Archive
tags:
- Linux
- Hardware
layout: post
toc: true
---

Sometimes we're too lazy to compile our own kernel that we've downloaded from www.kernel.org. The laziness goes like this: the kernel source code we download is already big (~70MB), plus the agony of waiting for the kernel compilation to finish (~1 hour). That's really boring. But the positive side is that we can configure it manually according to the computer we're using. Every time I compile a kernel, I always add the parameter **-j <job>.** This parameter works to do several tasks (jobs) at once in 1 go. So the compilation process can run faster. You can see for yourself in the manual from make.

> **-j [jobs], --jobs[=jobs]
>             Specifies  the  number of jobs (commands) to run simultaneously.  If there is more than one -j option, the last one is effective.  If the -j option is given without an argument, make will not limit the number of jobs that can run simultaneously.**

For its usage, you can add it every time you run the make command. For example **make -j2.**This means the program will run 2 threads at once to compile the kernel.

**Keep in Mind!**

**You should match the number of jobs to the number of cores on your computer's processor. If your processor has 2 cores, please set it to j2. If 4 cores, then j4. This is already enough to put a load on your processor, as can be seen from the high CPU Usage.**
