---
title: "BlankOn Sinambung: Fresh Install and Hardening from Zero"
date: 2026-11-07 18:45:00 +07:00
categories:
- Linux
- Security
tags:
- BlankOn
- hardening
- Linux security
- nftables
- fail2ban
- SSH
layout: post
toc: true
---

BlankOn went quiet for a while, then came back with Sinambung. I spent last night wiping Windows and moving the whole machine over to it. The install itself was uneventful. The fun part started after first boot, because a fresh Debian-based install is basically a house with no locks. So I hardened it from scratch. Here is the whole thing.

## The box

- CPU: AMD Ryzen 5 5600X, 6 cores / 12 threads
- RAM: 31 GB
- Disk: 232 GB SSD, 30 GB given to root (the rest is an old NTFS partition)
- Distro: BlankOn Linux 26.0 "Sinambung", Debian 14 (trixie) base
- Kernel: 7.1.12

First surprise: BlankOn does not ship `ifconfig` anymore. Not a problem, `iproute2` has been the standard for years. `ip a`, `ip -br a`, `ip r` give you everything. If you really want the old tool, `apt install net-tools` and it is back.

## Audit before touching anything

A fresh install is clean by default, but I still poked around:

- Running processes: Firefox, GNOME Shell, packagekit. Nothing weird.
- Listening ports: only 22 (SSH) and 631 (CUPS, localhost only).
- SUID binaries: all stock Debian (passwd, su, sudo, mount, and friends).
- AppArmor: active, 123 profiles loaded, 22 in enforce mode.
- Cron: empty. No failed systemd units except `flatpak-add-flathub`, which is cosmetic.

The problems were all in the defaults:

- **SSH accepts passwords.** On a host that is always on the home network, that is just a brute force queue.
- **No firewall at all.** `ufw`, `nft`, `iptables` all empty. Every inbound packet was accepted.
- **42 pending updates**, including Firefox (156 to 159) and ca-certificates.
- **Secure Boot disabled**, **disk not encrypted**, and **root is only 30 GB**.

That list set the order of work.

## Step 1: Lock down SSH

Priority one, because password auth is the cheapest door to walk through.

```ini
# /etc/ssh/sshd_config.d/99-hardening.conf
PermitRootLogin no
PasswordAuthentication no
KbdInteractiveAuthentication no
PubkeyAuthentication yes
X11Forwarding no
MaxAuthTries 3
LoginGraceTime 30
ClientAliveInterval 300
ClientAliveCountMax 2
AllowUsers felangga
AllowAgentForwarding no
AllowTcpForwarding local
PermitTunnel no
```

Always validate before restarting, otherwise you lock yourself out of your own machine:

```bash
sshd -t && systemctl restart ssh
```

Verified after: key auth still works, password auth gets rejected outright, root login is dead. Original configs are copied to `/root/hardening-backup-<timestamp>` in case I need to walk it back.

One note on Windows, since I did the same dance there earlier: if the user is in the Administrators group, sshd ignores `~/.ssh/authorized_keys` and only reads `C:\ProgramData\ssh\administrators_authorized_keys`, and that file must be owned by Administrators and SYSTEM only. Took me a few tries to figure out why the key was being offered and refused.

## Step 2: Firewall, default deny

This is the change you actually feel. Debian ships with no active firewall, so everything inbound is fair game. I went with nftables directly instead of ufw, since it is one less abstraction layer.

```bash
apt install nftables
```

```nft
# /etc/nftables.conf
table inet filter {
    chain input {
        type filter hook input priority filter; policy drop;
        iif lo accept
        ct state established,related accept
        ct state invalid drop
        ip protocol icmp accept
        ip6 nexthdr ipv6-icmp accept
        ip6 saddr fe80::/10 accept
        ip saddr 192.168.1.0/24 tcp dport 22 accept
        ip saddr 192.168.1.0/24 udp dport 5353 accept
        udp sport 67 udp dport 68 accept
        udp sport 443 accept
        limit rate 5/minute burst 5 packets log prefix "nft-drop-in: " level info
        counter drop
    }
    chain forward {
        type filter hook forward priority filter; policy drop;
    }
    chain output {
        type filter hook output priority filter; policy accept;
    }
}
```

The important part is `policy drop`, not default accept. Anything inbound that is not explicitly allowed dies. Only SSH from the LAN, mDNS, DHCP, ICMP, and QUIC get through. The forward chain drops everything too, because this box is not a router.

Check the ruleset before loading it:

```bash
nft -c -f /etc/nftables.conf   # parse only, do not load
systemctl enable --now nftables
```

One gotcha that had me staring at logs: after the ruleset went live, UDP drops showed up from Google IPs on `SPT=443`. That is just QUIC (HTTP/3) return traffic whose conntrack entry had already expired. Adding `udp sport 443 accept` killed most of the noise. What is left is legitimate traffic that deserves to be blocked, mostly IRC broadcast on `DPT=6667` from other hosts on the LAN.

## Step 3: fail2ban and auto updates

SSH is key-only now, but a second layer costs nothing:

```bash
apt install fail2ban unattended-upgrades
```

```ini
# /etc/fail2ban/jail.local
[DEFAULT]
bantime  = 1h
findtime = 10m
maxretry = 4
banaction = nftables-multiport
backend = systemd

[sshd]
enabled = true
maxretry = 3
bantime = 2h
```

And let security patches install themselves:

```ini
# /etc/apt/apt.conf.d/20auto-upgrades
APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Unattended-Upgrade "1";
APT::Periodic::AutocleanInterval "7";
```

## Step 4: Kernel hardening

The sysctl values that actually make sense for a personal host:

```ini
# /etc/sysctl.d/99-hardening.conf
kernel.kptr_restrict = 2
kernel.dmesg_restrict = 1
kernel.printk = 3 3 3 3
kernel.yama.ptrace_scope = 1
net.ipv4.conf.all.rp_filter = 1
net.ipv4.conf.all.accept_redirects = 0
net.ipv4.conf.all.send_redirects = 0
net.ipv4.conf.all.accept_source_route = 0
net.ipv4.conf.all.log_martians = 1
net.ipv4.icmp_echo_ignore_broadcasts = 1
net.ipv4.icmp_ignore_bogus_error_responses = 1
net.ipv4.tcp_syncookies = 1
fs.protected_hardlinks = 1
fs.protected_symlinks = 1
fs.protected_fifos = 2
fs.protected_regular = 2
fs.suid_dumpable = 0
```

The ones that matter most: `kptr_restrict` and `dmesg_restrict` shut down kernel info leaks, `ptrace_scope` stops one process from tracing another unless it is the parent, and the `fs.protected_*` family closes the classic symlink and hardlink races in world-writable directories.

## Step 5: Upgrade everything

42 packages waiting. Noninteractive, keeping local configs:

```bash
apt-get upgrade -y -o Dpkg::Options::="--force-confdef" -o Dpkg::Options::="--force-confold"
```

Firefox 156 to 159, ca-certificates, webkit, ghostscript, Python 3.14, all in without drama.

## The result

Rebooted and verified after: nftables, fail2ban, unattended-upgrades, SSH, and AppArmor all active. Listening ports are 22 (LAN only) and CUPS on localhost. Outbound works normally.

The difference is simple. Before, the machine accepted everything. Now it accepts only what I explicitly opened. SSH is key-only, brute force gets banned for two hours, security patches land on their own, and kernel info leaks are closed.

## What is still open

- **Secure Boot is off.** UEFI boot chain verification is not active. For a desktop that stays home, that is lower priority, but if the machine travels, turn it on in BIOS plus `mokutil --enable-validation`.
- **Disk is not encrypted.** Root is plain ext4. This is honestly the one that matters most for data on a disk that can be stolen. Not done yet because it needs an offline resize, and root is only 30 GB.
- **Root is 30 GB out of 232 GB.** The rest is the old NTFS `Data` partition, unmounted. That root will fill up fast once games or toolchains go in. Fix is repartitioning or reinstalling.

None of the hardening above depends on those three. They can be done later without touching anything already in place.
