---
title: "OpenCode on Raspberry Pi 3 B+: It Installed, But It Does Not Run"
date: 2026-10-24 00:00:00 +07:00
categories:
- Homelab
- Development
tags:
- Raspberry Pi
- OpenCode
- ARM64
- Golang
layout: post
toc: true
---

I installed OpenCode on a Raspberry Pi 3 B+. The binary installs, the version prints, and then it silently hangs forever. Here is what actually happened.

## What I tried

**1. Downloaded the ARM64 release**
The OpenCode project publishes `opencode-linux-arm64.tar.gz`. I extracted it to `~/.local/bin/opencode`, made it executable, and added it to PATH.

**2. Verified the binary**
```
$ opencode --version
v0.0.55
```
So far, so good.

**3. Ran a simple prompt**
```
$ opencode -p "hi"
```
Nothing. No output. No error. Just... hangs.

I killed it with `timeout 8 opencode -p "hi"`. Exit code 124. Stdout empty. Stderr empty.

**4. Checked with strace**
```
$ strace -f opencode -p "hi"
```
The binary loads, parses flags, spawns several threads, and then enters a loop of `SIGURG` signals between threads. No `execve` of a child process. No network `connect()` or `sendto()`. No file I/O beyond the initial binary load. It just spins.

**5. Installed dependencies**
`fzf` was missing. Installed it via `apt`. Also installed `@ai-sdk/openai-compatible` via npm, since OpenCode uses that for OpenAI-compatible providers.

**6. Configured a custom provider**
Created `~/.config/opencode/.opencode.json` pointing at my local OpenAI-compatible gateway, with the API key injected from an environment variable.

**7. Tried every invocation I could think of**
- `opencode -p "hi"`
- `OPENAI_API_KEY=... opencode -p "hi"`
- `TERM=xterm opencode -p "hi"`
- `script -q -c "opencode -p hi" /dev/null`
- `opencode -d -p "hi"` (debug mode)

Same result every time: silent hang, no output, no error message.

## What this is not

This is not a missing dependency. The binary is dynamically linked, but all shared libraries resolve correctly. `ldd` shows everything present.

This is not a configuration problem. The config file is read from the correct location, and the binary accepts it without complaint.

This is not a network issue. The binary never reaches the network layer — `strace` shows zero outbound connections before it stalls.

## What I think is happening

The ARM64 binary appears to enter a deadlock or spinloop during initialization, before any provider or model loading happens. The thread pattern suggests it is waiting on a signal or mutex that never fires. This is an upstream bug in the OpenCode ARM64 build, not a misconfiguration on my end.

I also tried building from source with `go build`. The Pi 3 B+ started compiling, but the dependency tree is large and the build did not finish within reasonable time on this hardware.

## Bottom line

If you are on a Raspberry Pi 3 B+ (aarch64, 1GB RAM), OpenCode v0.0.55 ARM64 binary will install but will not run. You will get no error message, just a silent hang. Your options are:

1. Wait for an upstream fix to the ARM64/non-interactive path
2. Use an alternative tool that actually works on ARM64 (`claude-code`, `blackbox`, `codex`, or Hermes itself)
3. Build from source on faster hardware and copy the binary over — I have not tested this

I am leaving the binary at `~/.local/bin/opencode` for now. When a newer ARM64 release appears, I will try again.
