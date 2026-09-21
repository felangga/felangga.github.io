---
title: "[XFCE] Change Icon Font Color (Desktop)"
date: 2012-12-08 22:40:00 +07:00
categories:
- Archive
tags:
- Linux
- Windows
layout: post
toc: true
---

I've been using GNOME or Cinnamon for a long time, now I want to switch to an even lighter *desktop environment*, so I can get the most out of running applications. Yesterday I tried out a few very lightweight desktops like OpenBox, Sawfish, FVWM, etc., but in my opinion they weren't interesting enough. Super lightweight, but for everyday use it seems they still need a lot of polishing. In the end I switched to XFCE; actually this desktop has been on my computer for a long time, but it rarely got used.

Customization bit by bit, now it’s pretty attractive (in my opinion) and pretty lightweight, but there’s one thing that bothers me. The icon color on the desktop is black, which makes the text hard to see. I searched around for a way to change it, and finally I found the way.

- Go to the home directory, then enable "show hidden files" (CTRL+H)

- Look for the .gtkrc-xfce file and open it with gedit or similar

- Its contents are like this

> style "xfdesktop-icon-view" {
>    **XfdesktopIconView::label-alpha = 0**
>     fg[NORMAL] = "#000000"
>     fg[SELECTED] = "#000000"
>     fg[ACTIVE] = "#000000"
> }

- There are 3 conditions **NORMAL, SELECTED & ACTIVE.**The value of each condition is #000000, which is the hex value of the color black.

- Feel free to change it as you like to get the color you want. The parameter used is #**RRGGBB** with a range of 00 - FF

- For example, to get the color white you can use the code #FFFFFF

- There you'll also find **label-alpha = 0**, which is the variable for setting the background of the icon text. 0 - 100. If 0, it's invisible; if 100, it's visible.

- Once that's done, save and logout and log back in

**Good Luck**
