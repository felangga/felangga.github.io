---
title: "Unlocking a Samsung Hotel TV's Hospitality Mode (And Putting It Back)"
date: 2026-10-26 00:00:00 +07:00
categories:
- Tools
tags:
- Samsung
- Smart TV
- Hospitality Mode
- Hotel
- Hacking
layout: post
toc: true
---

I stayed at a hotel in Jakarta recently, and the room had the usual Samsung Smart TV lockdown: a welcome screen, a fixed channel list, and no obvious way to use the TV as an actual TV. No source menu, no settings, no USB playback. This is Samsung's hospitality mode, and hotels use it to lock the set down to their own portal.

I got full access to the TV. The interesting part was putting it back — that turned out to be non-trivial, and just flipping the hospitality mode setting was not enough.

## The lockdown

The TV boots straight into the hotel's portal screen. The remote's menu button gives you a stripped-down hospitality menu. External sources are blocked, the app drawer is gone, and USB does nothing. This is Samsung's hospitality mode running in Standalone configuration — the TV runs on its own, serving the hotel's channel lineup and welcome page without any external set-top box.

## Mute + 1 + 1 + 9 + Enter

Samsung's hospitality TVs keep a service menu behind a remote key sequence, and the classic one still works on many sets:

> **Mute → 1 → 1 → 9 → Enter**

On this TV, that opens the hospitality menu — the same menu the hotel's installer uses, with the full set of hospitality options instead of the stripped guest version.

## Standalone to Interactive

Inside the hospitality menu, the mode was set to **Standalone**. I changed it to **Interactive** and rebooted the TV.

After the reboot, the lockdown was gone. Full source menu, the complete settings tree, the app drawer, USB playback — the TV behaved like a retail unit. For the rest of the stay, it was just a normal Smart TV.

## Putting it back

When it was time to leave, I wanted to restore the TV to its original state. I assumed it was symmetric: open the hospitality menu, switch the mode back to Standalone, reboot, done.

It is not symmetric.

Switching the mode back to Standalone alone did not restore the original locked behavior. The TV came back partially unlocked — the hotel portal did not take over properly, and the set was stuck in a half-configured state.

What actually worked:

1. Set the hospitality mode back to **Standalone**
2. Enter the **h.browser** menu
3. Set h.browser to **ON**
4. Reboot

The h.browser option is the hospitality browser — the component that serves the hotel's portal page. With the mode back on Standalone and h.browser re-enabled, the TV booted straight into the hotel's welcome screen again, with the full lockdown restored. Exactly like I found it.

## Bottom line

- **Unlock:** Mute + 1 + 1 + 9 + Enter → hospitality menu → Standalone to Interactive → reboot
- **Restore:** Standalone → h.browser menu → ON → reboot
- Switching the hospitality mode back to Standalone by itself is not enough — h.browser has to be turned back on, or the TV stays in a half-locked state

If you try this on your own hotel TV, note the restore sequence before you unlock. It is the part that is easy to miss.
