---
title: "Spying on \"Images\" on the Network"
date: 2013-03-25 03:05:00 +07:00
categories:
- Archive
tags:
- Networking
- Linux
layout: post
toc: true
---

Being a secret agent is indeed fun, being able to see other people's activities even though it violates privacy :) This time I have a tool that is part of **dsniff** which is useful for capturing images on the same network.

For example, computer A is opening Google, whose home page displays the Google logo; B, acting as a spy, can capture the image of the Google logo and save it on their computer. This method is called a Man In The Middle (MITM) attack ([more info](http://en.wikipedia.org/wiki/Man-in-the-middle_attack)).

Without further ado, the tool uses driftnet, so if you're a BackTrack user, you can probably use it right away. For those who don't have it installed on your computer yet, you can probably download it from the backtrack repository.

How to use it:

- For the storage location for the images that will be captured, we need to create a folder or we can use an existing folder. For example, I will create a folder /mitm/ located in the /root/ directory. Type in the terminal, "cd /root" &lt;enter&gt; then "mkdir mitm"

- The folder has been created, now it's just a matter of using driftnet, the explanation of all driftnet functions can be seen in its **manual pages-**. Try typing "man driftnet"

- The usage is like this "driftnet -a -d /root/mitm/ -p -i wlan0"

- Just a little explanation, "-a" will save all the data obtained to the specified folder, "-d" will specify the storage location for the images, "-i" is the interface used, wlan0 because I'm using WiFi.

- We just have to wait for the images to arrive in that folder. :)

**Good Luck !**
