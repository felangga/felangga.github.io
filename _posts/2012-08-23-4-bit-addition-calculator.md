---
title: "4-bit addition calculator"
date: 2012-08-23 07:57:00 +07:00
categories:
- Archive
tags:
- Gaming
layout: post
toc: true
---

Browsing around on Google Play, I found an electronics emulator software called DroidTesla (there are free and paid ones). After I downloaded the free one because I don't have money for the paid one :p, I was confused about what to do.

Let me think for a bit ｢(ﾟﾍﾟ) first—after checking out the features, it turns out it's pretty interesting too. I got the idea to make a mini calculator circuit, but it can only do addition—well, I'm a newbie after all.. hehehe.

Rather than taking forever, I just tried the app earlier. I made it limited to 4-bit. So it can only do addition up to 16. The input uses switches that represent binary numbers, 1 if on,  0 if off. The output uses LEDs, and it’s read in binary numbers too.

There are 8 switches; the first 4 are the first number, the next 4 are the second number. For example, 1+2 = 3. That means the first 4 switches are set: ON, OFF, OFF, OFF and the 4 switches after that are set: OFF, ON, OFF, OFF. And later, on the LEDs, the order is OFF, OFF, ON, ON, or it can be read as 0011, which is 3.

![AVvXsEgekMMagiGGUbpnc DQkvQMTXjFb8Uodcpl3p5DhNFEsJr7RmGjh01NwC4jGcJdcjU10onru1QqXdPhOCAhtcrSZXRSJdoWfWvVuuw pTTW umXpe8K 7w8yTW3ZWbYbhiwvVgSYRPSt00](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgekMMagiGGUbpnc_DQkvQMTXjFb8Uodcpl3p5DhNFEsJr7RmGjh01NwC4jGcJdcjU10onru1QqXdPhOCAhtcrSZXRSJdoWfWvVuuw_pTTW-umXpe8K-7w8yTW3ZWbYbhiwvVgSYRPSt00/)
