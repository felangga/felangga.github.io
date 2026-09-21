---
title: "Cleaning W32.Sality.AE"
date: 2009-04-09 23:12:00 +07:00
categories:
- Archive
tags:
- Security
- Windows
- Networking
layout: post
toc: true
---

Huh, this virus is so annoying, it's used to infect everything, and the most annoying part is, even antivirus - antivirus with the latest updates can't cure these infected files..

If executed, this virus will spread through network shares and infect com, exe, and scr files. This virus does not create an exe file to run at startup, but it infects the files that are run at startup, so of course the virus file will also be executed... Here are the countermeasures...

- Turn off System Restore during the cleaning process
- Download the following file [http://www.4shared.com/file/82762498/f5dc1edd/repair.html?dirPwdVerified=feea1d94](http://www.4shared.com/file/82762498/f5dc1edd/repair.html?dirPwdVerified=feea1d94), then right-click and install
- Then open Start -> Run, type msconfig, open the startup tab, and remove all the checkmarks, then restart. That way, the infected files won't be executed again when the computer is turned on.
- You should scan using removal tools, but first change the extension of the removal tool to another extension [example: CMD] so it doesn't get reinfected by W32/Sality.AE. It can be downloaded at www.avg.com
- So that a computer already infected with W32/Sality.AE can boot into safe mode, please restore the registry that has been changed by the virus. [http://www.4shared.com/file/82761423/934fb170/_2__Sality.htmldirPwdVerified=feea1d94](http://www.4shared.com/file/82761423/934fb170/_2__Sality.htmldirPwdVerified=feea1d94)
- Fix other registry entries changed by the virus; please download the following tool and then run the file by: right-click repair.inf and then install. [http://www.4shared.com/file/82874724/f485f1dd/repair.html?dirPwdVerified=3b1f2fa9](http://www.4shared.com/file/82874724/f485f1dd/repair.html?dirPwdVerified=3b1f2fa9)
- Restart the computer and rescan using removal tools to make sure the computer is free from the virus.
- For optimal cleaning and to prevent reinfection, you should install and scan with an antivirus that can detect Sality well. The antiviruses I have tried include Avast v4.8. and AVG.
