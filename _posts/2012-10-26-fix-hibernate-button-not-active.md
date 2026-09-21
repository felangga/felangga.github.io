---
title: "Fix Hibernate Button not Active"
date: 2012-10-26 05:45:00 +07:00
categories:
- Archive
tags:
- Linux
- Hardware
layout: post
toc: true
---

After installing Linux Mint 13, I did many tweak with my linux, such as upgrade the kernel to 3.6.2-030602 and it works very perfectly. Yesterday when I want to hibernate my computer, the hibernate button was grayed (disabled). Seems to be there's no space to dumping all information from RAM into disk.

- **Problem : Hibernate button not active**

- **Solution :**

- Your **swap partition**is not big enough to contain RAM contents.

- You can check the size of your swap partition and the size of memory inside RAM. Type **free -m** inside the terminal. ![Screenshot 10262012 07 38 26 PM](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhHLxu2y2-MDZU-buk_BNquvkDQGFeLvBjrvNKtIT6mW9WTe-EHyfhnQ7X_hPYcdAltgJ92eZWLCvO3ouSS6KGosSpvP6A0iN454Na7fjNAG0p0Newus4HaRy0RelT0XqYU2seS-alml0g/s1600/Screenshot+-+10262012+-+07:38:26+PM.png)

- You can see my computer's running memory above. My swap size is 1905 MB and the running memory is 2755 MB. This make the hibernate button not active, because running memory > swap size.

- The solution is to resize swap memory into 3 GB (depends on your RAM size). You can use many tools to resize the partition, just like GPARTED, KDE Partition, etc.

- I recommended you use them (partition tools) without load your Linux. So you can use the LiveUSB or LiveCD/DVD.
