---
title: "MT7921 on BlankOn: SSH Kept Dropping Until I Turned Off Wi-Fi Power Save"
date: 2026-11-13 09:00:00 +07:00
categories:
- Linux
- Networking
tags:
- Linux
- Networking
- BlankOn
- MediaTek
- MT7921
- Wi-Fi
layout: post
toc: true
---

My desktop, the same BlankOn Sinambung box I hardened last week, has one job most evenings: sit there and accept SSH. For a while it did not. Connections would open, then hang, then die with `Connection timed out` or `Connection closed by 192.168.1.49 port 22`. Not every time. Just enough to be annoying, and never when I was watching closely.

I assumed the driver at first. The chipset is a MediaTek MT7921K (Wi-Fi 6E), driven by `mt7921e`, and that driver has a reputation. Turned out the driver was fine. The problem was the default power management sitting on top of it.

## Confirming it was the link, not the box

The PC stayed up the whole time. `systemctl status sleep.target` was clean, the machine answered ARP, and uptime never reset. So it was not a suspend problem. To prove the link was flapping, I opened TCP port 22 thirty times in a row from another host:

```python
import socket, time
ok = fail = 0
for _ in range(30):
    s = socket.socket()
    s.settimeout(1.0)
    try:
        s.connect(('192.168.1.49', 22)); ok += 1
    except Exception:
        fail += 1
    finally:
        s.close()
    time.sleep(0.15)
print(f'OK={ok} FAIL={fail}')
```

`OK=4 FAIL=26`. That is not an overloaded sshd. That is a radio dropping packets. Same port, same key, same everything, and three quarters of the handshakes never finished.

For comparison, the same probe against a wired host on the same switch returned `OK=30 FAIL=0` without breaking a sweat.

## What was actually wrong

`lspci -k` named the culprit:

```
03:00.0 Network controller: MEDIATEK Corp. MT7922 802.11ax PCI Express Wireless Network Adapter
    Subsystem: AzureWave MT7922
    Kernel driver in use: mt7921e
    Kernel modules: mt7921e
```

Then the tell, once `iw` was installed (`apt install iw`, it is not on the base image):

```bash
iw dev wlp4s0 get power_save
# Power save: on
```

Power save was `on` by default, because NetworkManager ships with `wifi.powersave` set to its default value, and the MT7921 firmware's power save is aggressive. When the radio dozes between frames it takes a moment to wake, and under a burst of small TCP packets (exactly what an interactive SSH session is) those wake-ups show up as latency and lost handshakes. It is fine for browsing. It is terrible for keeping a shell open.

`nmcli` confirmed the connection was using the default:

```
802-11-wireless.powersave: 0 (default)
```

`0` here means "use the driver's default", not "off". The driver's default was on.

## The fix

Two changes. First, make it permanent so a reconnect does not undo it:

```bash
sudo tee /etc/NetworkManager/conf.d/wifi-powersave.conf >/dev/null <<'EOF'
[connection]
wifi.powersave = 2
EOF
```

`wifi.powersave = 2` is "disable", as opposed to `3` (enable) or `0` (default). Then apply it now instead of waiting for a reconnect:

```bash
sudo apt install iw          # if it is missing
sudo iw dev wlp4s0 set power_save off
sudo nmcli connection reload
sudo systemctl restart NetworkManager
```

If you are on the Wi-Fi link you are about to restart, run this from a wired session or a console, because NetworkManager will bounce the interface and drop your connection mid-command.

Verify:

```bash
iw dev wlp4s0 get power_save
# Power save: off
```

Then re-ran the probe. `OK=30 FAIL=0`. Same link, same night, same distance from the router. The only difference was power save.

## After

SSH holds. Long sessions stop dropping. `dmesg` no longer fills with `wlp4s0: deauth` entries every few minutes.

The one thing worth naming: this is not an MT7921 bug. It is a sensible default for a laptop that runs on battery, applied to a desktop that never leaves the wall. On a stationary machine the radio has no reason to nap, and once you tell NetworkManager that, the chipset behaves.

## Config state

- `/etc/NetworkManager/conf.d/wifi-powersave.conf` with `wifi.powersave = 2`
- `iw` installed
- Connection `KENARI_5G` on 5 GHz, `Power save: off`

Rollback is deleting the conf file and reloading NetworkManager. I am not doing that.
