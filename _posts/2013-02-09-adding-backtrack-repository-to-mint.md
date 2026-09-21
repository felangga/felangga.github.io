---
title: "Adding BackTrack Repository to Mint"
date: 2013-02-09 05:36:00 +07:00
categories:
- Archive
tags:
- Linux
layout: post
toc: true
---

[![](https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQY0wt8gSI-UC55g742Kj_wRJS1xJ72wOFPbp3S6UnVEFpdUgAy3w)](https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQY0wt8gSI-UC55g742Kj_wRJS1xJ72wOFPbp3S6UnVEFpdUgAy3w)After yesterday trying to add the backbox repository to my mint, it feels incomplete without having a collection from the backtrack dragon. Let's get straight to it, here's how to add the backtrack repository to mint or ubuntu (same thing)

- Open the terminal and type "wget -q h[ttp://all.repository.backtrack-linux.org/backtrack.gpg](http://all.repository.backtrack-linux.org/backtrack.gpg) -O- | sudo apt-key add -" (Without quotes)

- sudo sh -c "echo 'deb [http://all.repository.backtrack-linux.org](http://all.repository.backtrack-linux.org/) revolution main microverse non-free testing' >> /etc/apt/sources.list"

- sudo apt-get update

- sudo apt-get upgrade (Actually not necessary)----

**NB :**Remember! this is just a repository, meaning that by using this address, you can download backtrack tools. Downloading them one by one doesn't mean your Mint becomes fully backtrack.
