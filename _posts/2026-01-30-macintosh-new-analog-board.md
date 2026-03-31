---
layout: post
title: "Macintosh Classic II New Analog Board"
categories: ["Restoration"]
tags: ["Macintosh", "Apple"]
toc: true
--- 

## The Issue 
It’s been a while since my last post about restoring the Macintosh Classic II ([link](https://felangga.com/posts/restore-mac/)). At the time, the machine was still suffering from intermittent brightness issues, it would boot up with normal brightness, only to slowly go dim.

I tried to change the capacitors around the brightness trace. Also tried to check the resistors, but nothing fixed the issue. 

## Analog Board Recreation
Around 2025 I found this github repostiory ([link](https://github.com/daanvdl/Classic-Analogboard-Late)) about recreation of the analog board for Macintosh Classic II (late version). So I tried to order the PCB from JLCPCB. 

## Component Migration
After it arrived, I started to migrate all the components from the old analog board to the new one. Suprisingly it fixed the issue, now the intermittent issue is not appearing anymore. My assumption is that some of the capacitors electrolyte leaked and damaged the PCB trace and caused this intermittent issue. 

![New Analog Board](/assets/img/mac_classic_ii/new_analog_board/new_board.png "New Analog Board")