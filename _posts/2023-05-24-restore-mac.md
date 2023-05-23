---
layout: post
title: "Macintosh Classic II Restoration"
--- 

# 28 April 2023 
I found a nice and complete collection of Macintosh Classic II. It included the Mac itself, keyboard, mouse and an external 800k drive. Someone sells this thing on Instagram, and then I contacted the seller to ask about its condition. He said that it was first hand from his uncle and last January 2023 it was tested okay and running. But currently, he didn't have the power cord to test it. 
So I decided to do gambling to buy this old machine, I hope that the internal battery is not leaked or better it has already been removed.

![Macintosh Classic II](/assets/img/mac_classic_ii/mac.png "Macintosh Classic II")

It was manufactured on October 1991, which is before I was born 🤣

![Macintosh Classic II Back Cover](/assets/img/mac_classic_ii/mac_backcover.png "Macintosh Classic II back cover")

After dealing with the price and shipping charges, it then shipped with cargo to Yogyakarta from Bandung. My concerns were the internal battery and the CRT. I hope the CRT is not broken by the shipping. He said that he added more plastic wrap to protect the CRT. 

![Macintosh Package](/assets/img/mac_classic_ii/mac_package.jpeg "Macintosh Package")

# 1 May 2023 
At noon around 1 PM, I was contacted by the cargo courier that they will send a package to my home, and they need me to stand by. Fortunately, I am working at home. 
So the package came and the wood package was already removed by the courier (I don't know why they do this without confirming with me first). Everything was complete and arrived safely without any crack on the CRT. Except for the keyboard cable to the computer 😢 

The cable is so rare because it's not a PS/2 cable but a cable with (Apple Desktop Bus) ADB connector. On eBay, it's around Rp. 200K to 500K. 
So I asked the seller about the cable, and fortunately, the cable was not missing but he forgot to include it with the package. 

![Macintosh ADB Cable](/assets/img/mac_classic_ii/mac_cable.jpeg "Macintosh ADB Cable")

So he sent the cable without asking for shipping cost 😀

## Tearing down 

![Macintosh Teardown](/assets/img/mac_classic_ii/mac_teardown.jpeg "Macintosh Teardown")

Okay, then I checked and opened the machine hoping that no battery leakage on the logic board. I opened the case but there are missing screws on the top section of the case. There should be four back screws for the Macintosh design, 2 on top of the case and 2 on the bottom case. 

![Macintosh Screws](/assets/img/mac_classic_ii/mac_screws.png "Image from http://appletothecore.me/files/se1.png")

CRT was okay, with no crack and still vacuum tube was still sealed. One thing that makes me happy is that the battery has already been removed from this machine 👏 although it was very dirty with some dead animals. 

![Macintosh Logicboard](/assets/img/mac_classic_ii/mac_logicboard.jpeg "Macintosh Logicboard")

As I expected, the SMD capacitors are leaky, and they leak into many components around them. Some of the leaky electrolytes go under microchips, which are difficult to clean, except by removing the components and cleaning them or using an ultrasonic cleaner. 

> Btw this board included 2 SIMM RAMs which were 4 MB each. So the internal memory total is around 10 MB


# 2 May 2023
I tried to disassemble the analog board which I need to remove some cables from the CRT. This needs extra caution, especially for the flyback cable. You need to prepare a cable and a minus screwdriver, which will be used to ground the anode from the CRT. 

![Ground the CRT](/assets/img/mac_classic_ii/mac_discharge.jpeg "Ground the CRT")

> Please be careful when you trying to do this, it cannot zap you with some fatal consequences.

After removing the anode cap, I need to remove the connector on the backside of the CRT. I also need to be careful about the vacuum tubes because it's very fragile. 

![CRT disassembly](/assets/img/mac_classic_ii/mac_crt_removed.jpeg "CRT disassembly")

After removing the connector on the CRT, this time I need to remove the analog board on the side of the computer. This board also suffers from leakage caps, and leakage is visible from one of the caps (the one with brown liquid on top). 

![Analog leak](/assets/img/mac_classic_ii/mac_analog_leakcaps.jpeg "Analog leak")