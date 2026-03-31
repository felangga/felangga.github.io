---
title: Macintosh Classic II Brightness Issue
date: 2025-04-04 09:06:00 +07:00
categories:
- Restoration
tags:
- Apple
- Macintosh
---

## The Issue

My Macintosh Classic II suffers from an issue where the display CRT goes dim after a few minutes on a cold boot. Every time it happens, I need to crank up the *cut**-off and brightness*** pot behind the machine to show the image.

## The Analyze

At first, I thought it must be the brightness issue, so I searched for the Macintosh Classic analog board schematic to check the brightness line. I found the schematic from Bomarc, and the schematic is suitable with my board, since there are two analog board versions.

I started to suspect the resistors and potentiometer on the brightness line. This Macintosh version has software-controlled brightness, so the analog board will get a 22.25 kHz square wave PBM signal from the logic board to control the brightness. I checked and replaced some resistors and cleaned the potentiometer, but nothing seems to work. The signal is there, and no sign of degradation that makes the screen dim after a few minutes.

![Brightness Line](https://blogger.googleusercontent.com/img/a/AVvXsEjx5ZNSMXRabvOJNlS90DWhfp7-9ZGK6Hbikv0zYEcUy-2crwxLy9_-qY0LnFtR-X-ZEw3LdmHj3lkyeNJzhioLvMNPFtGU3SSPJj6JSDieYnGyvS_TIkrN_0qE1zJWtuTSzCdnE7NKJ3Xmd4_M22op_1yrk0PwcVKSfbkfYIoYXoDF51kdZop1ViOX4fT8=w640-h166-rw)

So I suspect another line, which is the cut-off line. The display "cut-off" refers to a voltage applied to the grid (G1) that causes the electron beam to disappear, creating a black image on the screen. Some CRTs has the cut-off potentiometer located on the flyback, but this Macintosh has a cut-off potentiometer on the back of the machine.

![Cut-off and Focus line](https://blogger.googleusercontent.com/img/a/AVvXsEiZLZv2mlO6QDjGki3ewBA3Ov-NQ9A-KZ07vxdqT3B7bH73DOV_zGkUJQq1tGKCOHD_Dnmy1tFc4BeppWegSEFVeZIMgXoM4H7YHEo8T7asTuZbTHjvQibgpk-9M_vU_z6NPtMrWJ059kGflGgxkos_R-bD9TpOANxPz1QPVgR7ibjQoYlOCvo2E1brQoz6=w640-h336-rw)

The voltage on the HV6 is around 320V DC, and when the screen goes dim, the voltage also drops. The cut-off and focus voltage come from the **flyback transformer**. I hope it was not the flyback, since the flyback is quite rare nowadays. I check the voltage on the CL4, and it is quite stable. So I suspect that either the CL4 caps, DL3, or DL6 are the problem.

![CL4 is the blue caps next to the flyback transformer](https://blogger.googleusercontent.com/img/a/AVvXsEgrWgkyywHqOztfw5fT7bhWy-nK5p9_3wnJnfk2EDa1ruz69LYcMKFANcHMFQgJNwTnndic_XsKPRwLOQokmLc_ZRVYeNwWuJdV3sN8R8UQqED97Gzoq0L9vQSP_YSCBMAWTlrYFLrVu7Q1SL8-UByF2vnvnVh1kqb8uLL_Eu9TxckYWfIaySngZ7RXBvYp=w480-h640-rw)

So I check the CL4 first, desolder, and check using my LCR meter. The value of the capacitor is 10nF / 2kV. But I only get around 7nF at normal room temperature. I tried to spray it with cold spray to drop down the temperature and the value back to 10nF. So I suspect it was the issue. Since the location is near the flyback transformer, when the temperature gets hot, the value of the CL4 drops, and the screen gets very dim.

![Old caps](https://blogger.googleusercontent.com/img/a/AVvXsEhdbxffz_QTe7UV2UKN9fefK7Rr7m5aURPMmeJVEQkdAnWrBaQt0G1VHKeN0e7JrFiMouGCciFL8vixO8S2QYKUzHwN9hWJnFDu7fr6xbFVXQ1m_5sB56qytjEh5nJNjIGAqiZo7ISMUKalA13yWO6GswhXIUh1Kw2RGopRH8MwlGEDJPYVJs91nmydftYp=w480-h640-rw)

So I replaced the capacitor and let it turn on for hours, and the issue is **gone**.

## Update

Turns out that this fixes temporarily, see my newer post [here](https://felangga.com/posts/macintosh-new-analog-board/) for permanent solution.