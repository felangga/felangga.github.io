---
title: "GTA San Andreas on RockNIX: Cheat Chords by Patching libGTASA.so"
date: 2026-11-03 00:00:00 +07:00
categories:
- Hacking
- Tools
tags:
- GTA San Andreas
- ARM64
- binary patching
- game modding
- RockNIX
layout: post
toc: true
---

Goal: play GTA San Andreas (the `gtasa_linux` PortMaster port) on an Anbernic handheld
running RockNIX, and get the classic cheat codes in through the gamepad. No keyboard,
no touchscreen cheat menu. Chord input: hold Select plus a face button.

The obvious route — a daemon that watches `/dev/input` and injects keystrokes through
`/dev/uinput` — is dead on this hardware. Kernel 4.19.172 rejects every uinput device
creation with `EINVAL`, no matter which ioctl variant you try. So the cheats have to go
in through the game's own code.

## Where the cheats live

`libGTASA.so` ships with full symbols, which makes this pleasant. The cheat system is a
`CCheat` class with a shift-register string matcher:

- `AddToCheatString` @ `0x3c34ac` — push a char, hash the buffer, compare against 111
  stored hash keys
- `FindCheatIndex` @ `0x3c3408` — resolve a hash to an index
- `ProcessCheats` @ `0x3c4728` — call `m_aCheatFunctions[i]` via `blr x8`
- `m_aCheatFunctions` @ `0x85ef78` — 111 function pointers, `MoneyArmourHealthCheat` is
  `0x3c1b64`

The gamepad mask is computed in `AND_GamepadUpdate` @ `0x31ccd4`, and the button-to-bit
mapping comes from a wrapper table @ `0x1a2750` in the engine binary. That table is where
the first surprise lives.

## Surprise one: the button bits are Nintendo layout

The wrapper table maps physical buttons to internal bits, and it is not the evdev
standard. Reading the entries and their name strings:

| Button | Bit |
|---|---|
| A (south) | `0x1` |
| B (east) | `0x2` |
| Y (west) | `0x4` |
| X (north) | `0x8` |
| Start (plus) | `0x10` |
| **Select (minus)** | **`0x20`** |
| L | `0x40` |
| R | `0x80` |
| zl (L2 trigger) | `0x0` — unpatched |
| Up / Down | `0x1000` / `0x2000` |
| Left / Right | `0x400` / `0x800` |

Two things fall out of this. First, **Select is `0x20`, not `0x100`** — I assumed the
standard bit and the chord never matched. The log proved it: `buttons=0x800` ('minus')
produced `mask=0x20`, 74 times in a row, and `0x100` never appeared once.

Second, **zl maps to `0x0`**, so the L2 trigger contributes nothing to the mask. That
entry gets patched to `0x100`, which buys two extra chords that cannot collide with the
Select family.

On this specific handheld the physical A button is `BTN_EAST`, so the button labelled A
produces bit `0x2`. Select+A is therefore `0x22`, not `0x21`.

## Surprise two: absolute addresses in .text are not relocated

The first patch stored absolute function addresses in the chord table. It crashed
instantly, every launch, before a single frame. The game loads `libGTASA.so` from a memfd
through a custom loader at a randomised base, and the loader only applies relocations to
the writable segment. The table lives in `.text` (r-x), so its `0x3c1b64` stayed
`0x3c1b64` no matter where the library actually landed, and the first `strb` to a flag
address segfaulted.

Fix: the table stores a **delta relative to the code cave**, and the runtime address is
reconstructed with `adrp` + `add`:

```asm
adrp x10, #0x335000
add  x10, x10, #0x474        ; x10 = &cave, runtime base
ldr  x14, [x11, #8]          ; x14 = stored delta
add  x14, x14, x10           ; x14 = fn runtime address
```

`sub` with an immediate larger than 4096 is rejected by the assembler, so the delta comes
out of the table as a register value instead.

## Surprise three: calling cheats from the input thread freezes the game

With addressing fixed, the chord matched and the game froze solid. `AND_GamepadUpdate`
runs on the input thread; the cheat functions touch player state, money, and the world.
Calling into that from the wrong thread deadlocks against whatever the main thread holds.

The fix is a hand-off. The input-thread hook only sets a `pending` slot and an edge latch
— it touches no game state at all. The main loop consumes `pending` and makes the call.
That also gives edge detection for free: while a chord is held, the latch suppresses
re-fires until the buttons are released.

## Surprise four: hooking a function with an internal loop runs once

The main-loop hook went into `MainGameFunc` @ `0x70abb0`. Chords were detected — the log
showed `mask=0x22` fourteen times — and nothing happened. `MainGameFunc` is a thread entry
point with its own `while` loop; the prologue executes exactly once per thread launch and
control never returns to the entry address. The hook was live and simply never ran again.

Move the hook into the loop body @ `0x70ac88`, restore the original prologue, and it runs
every frame.

## Surprise five: .bss is not reliably zeroed

The `pending` slot sits in `.bss`, which is normally zero-initialised. The custom loader
does not guarantee it. A garbage non-zero value there means the main loop calls a wild
address on its first iteration.

Guard it with a magic value. The input hook writes `0x43484541` on first run and zeroes
the slots; the main loop only acts when the magic matches. If `.bss` comes up dirty, the
guard fails closed and the patch stays inert instead of crashing.

## Surprise six: the launcher's vtcon rebind oopses the kernel

This one cost the most time because it looks like a game bug. Launch the game and the
screen goes black and stays black.

`dmesg`:

```
[    2.37] Console: switching to colour frame buffer device 80x30
[   42.51] Console: switching to colour dummy device 80x25
[   54.59] Internal error: Oops: 96000007 [#1] SMP
[   54.59] pc : fb_prepare_logo+0xdc/0x18c
```

The launcher unbinds `vtcon0`/`vtcon1` at start so the game can own the display, and
rebinds them on exit. On this RK3566 the rebind drives `fbcon_init` →
`fb_prepare_logo`, which dereferences a bad address and oopses. The oops kills the shell
and orphans `console_lock`, so the launcher's exit path blocks forever in
`tty_release → con_shutdown → console_lock`. The shell never exits, the frontend never
redraws, and the screen stays black until a hard reset.

Deleting the two rebind lines fixes it. The frontend redraws fine with fbcon left
unbound — that is the normal in-game state anyway.

## The chord table

Twelve chords, all requiring Select unless noted:

| Chord | Mask | Effect |
|---|---|---|
| Select + A | `0x22` | Money +250k, armour, health |
| Select + B | `0x21` | Weapon set 1 |
| Select + X | `0x28` | Weapon set 2 |
| Select + Y | `0x24` | Weapon set 3 |
| Select + L | `0x60` | Wanted level down |
| Select + R | `0xa0` | Wanted level up |
| Select + Up | `0x1020` | Apache |
| Select + Down | `0x2020` | Tank |
| Select + Left | `0x420` | Monster truck |
| Select + Right | `0x820` | Dozer |
| zl + A | `0x101` | Jetpack |
| zl + B | `0x102` | Invincibility |

## The part that was not the patch at all

Worth recording, because it sends you down the wrong path for an hour. The game started
crashing at startup and I assumed the new patch. It was not. A `fsck.vfat` run against a
corrupted SD card had rewritten 195 cluster chains and renamed 3218 files, and one of the
files it damaged was the engine binary itself — same size, different contents, so the
size check passed and the md5 did not. Comparing checksums against a known-good copy on
another machine is what found it.

The card was also flipping read-only on its own every few minutes:

```
FAT-fs (mmcblk2p1): error, fat_get_cluster: invalid cluster chain (i_pos 2557589)
FAT-fs (mmcblk2p1): error, corrupted directory (invalid entries)
FAT-fs (mmcblk2p1): Filesystem has been set read-only
```

Repair is fine, but killing `fsck` mid-run leaves the filesystem half-repaired and the
block device pinned by processes stuck in `D` state waiting on a filesystem lock that will
never be released. Only a forced reboot clears that.

## Bottom line

- uinput is blocked on this kernel; patch the game binary instead of injecting input
- Read the wrapper table for real button bits — Select is `0x20` here, zl is `0x0` and
  needs patching
- Store deltas, never absolute addresses: `.text` is not relocated by the loader
- Never call game logic from the input thread; hand off to the main loop
- Hook the loop body, not the function entry, when the function loops internally
- Guard `.bss` slots with a magic value; the custom loader does not zero them
- Delete the launcher's vtcon rebind or the kernel oopses and the screen stays black
- Checksum the binaries against a known-good copy before blaming your own patch
