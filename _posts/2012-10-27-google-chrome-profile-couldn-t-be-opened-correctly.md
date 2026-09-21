---
title: "Google Chrome : Profile couldn't be opened correctly"
date: 2012-10-27 23:43:00 +07:00
categories:
- Archive
tags:
- Web
- Linux
layout: post
toc: true
---

Last night I browsing with my chrome and when I'm done, I straight to shutdown my PC without close the Chrome browser. This morning, I opened the chrome again and it show an error about the profile could not be opened correctly. This error because some history file couldn't read/write. So the solution is to delete all browser history, read steps below :

![Screenshot 10282012 01 34 54 PM](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgiWtnFVYwrCHLdUuDvyljnicully54xyMyGnheq3II4CTm44vI7-LNab67QAjPD-QuavFk6S9S5M-GBj5bCB4ox6XJ0jAU4Nifl2O1iCHRAH6O8Ai47Wtq_H7xA57LbiNap9uA1f4ojo8/s1600/Screenshot+-+10282012+-+01:34:54+PM.png)

- Open a terminal

- Change directory "cd ~/.config/google-chrome/Default"

- Delete the file named “Web Data”:  rm -rf Web\ Data;

- Start Google Chrome and the error should be gone.
