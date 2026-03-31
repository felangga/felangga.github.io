---
title: HackRF Mayhem Failed to Update - M0 Guru Meditation Hard
date: 2025-05-05 08:53:00 +07:00
tags:
- hackrf
- radio
comments: true
---

I was on Mayhem Portapack **v2.0.1** and want to upgrade to the latest stable release v2.1.0. The update went okay using the web upgrade [https://hackrf.app/](https://hackrf.app). But then I saw the latest nightly update and want to try it, since it has many new tools that are not yet included in the stable release. But then the update failed :(

**Disclaimer**: I didn't take any photos of the errors, since I was focused on googling the solution.

So the error was **"Bad Firmware or Failed W/R error"** during the upgrade process, and it was stuck. So I had to restart the device, and it was booting to the Mayhem menu, but on the bottom left, which should show the current firmware version, it was showing a **"FLASH ERR"** message.

I think I should go back to the stable release, but I can't. Every time I want to flash the stable release version, the portapack will shows an error **M0 Guru Meditation - Hard Fault**.

There's an issue that was closed on the Mayhem GIT repo that has the same issue as mine; he mentioned that it was something with the SD card errors. So I went to use another card, and the issue still there.

So I went to try to update using the **flash_portapack_mayhem.bat** script that is available for Windows when downloading the firmware. The script needs the portapack in the HackRF mode, but when I tried to load the HackRF mode, it was blank.

I tried the other script dfu_hackrf_one.bat and it cannot detect the HackRF device. I already pressed the DFU and Restart button together, and released the restart button, and DFU button after that. But still nothing.

## Solution

The solution was to hold down the DFU button and plug in the USB. The HackRF will be detected right away. Then I can run the dfu_hackrf_one.bat and then the flash_portapack_mayhem.bat. Now it's normal and using the latest nightly release. Hope this article will help someone :)