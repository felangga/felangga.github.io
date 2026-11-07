---
title: "BlankOn Sinambung: Instal Ulang dan Hardening dari Nol"
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

Setelah beberapa saat vakum, tadi malam saya habiskan buat pasang ulang distro. Keluar dari Windows, sekalian migrasi penuh ke BlankOn Sinambung. Proses instalasinya biasa aja, tapi bagian serunya: habis live, saya langsung hardening dari nol. Ini catatan lengkapnya.

## Setup-nya

- Mesin: AMD Ryzen 5 5600X, 6 core / 12 thread
- RAM: 31 GB
- Disk: 232 GB SSD, root dikasih 30 GB (sisanya partisi NTFS lama)
- Distro: BlankOn Linux 26.0 "Sinambung", basis Debian 14 (trixie)
- Kernel: 7.1.12

BlankOn ternyata nggak bawa `ifconfig` lagi. Itu bukan masalah, `iproute2` udah jadi standar: `ip a`, `ip -br a`, `ip r` ngasih semuanya. Kalau tetap perlu `ifconfig`, tinggal `apt install net-tools`.

## Audit dulu sebelum hardening

BlankOn fresh install bersih, tapi tetap kubongkar:

- Proses jalan: cuma Firefox, GNOME Shell, packagekit. Nggak ada yang aneh.
- Listening port cuma 22 (SSH) dan 631 (CUPS, localhost aja).
- SUID binaries: semuanya standar Debian (passwd, su, sudo, mount...).
- AppArmor aktif, 123 profile, 22 enforce.
- Cron kosong, nggak ada unit systemd gagal (cuma flatpak-add-flathub yang gagal, itu kosmetik).

Masalahnya ada di konfigurasi default:
- **SSH nerima password auth.** Padahal host ini selalu online di jaringan rumah.
- **Nggak ada firewall sama sekali.** `ufw`, `nft`, `iptables` semua kosong.
- **42 paket pending update**, termasuk Firefox (156 ke 159) dan ca-certificates.
- **Secure Boot disabled**, **disk nggak dienkripsi**, dan **root cuma 30 GB**.

Dari situ hardening dimulai.

## Langkah 1: Kunci SSH

Ini prioritas satu. Password auth di SSH itu cuma nunggu brute force.

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

Sebelum restart, validasi dulu config-nya biar nggak ngunci diri sendiri:

```bash
sshd -t && systemctl restart ssh
```

Selesai, verifikasi: key auth masih jalan, password auth nolak. Root login mati total. Kalau nanti butuh bantuan, backup-nya disimpen di `/root/hardening-backup-<timestamp>`.

## Langkah 2: Firewall, default-deny

Ini yang paling mengubah rasa aman. Debian fresh install nggak punya firewall aktif, semua inbound diterima. Saya pasang nftables (bukan ufw, langsung ke API-nya aja lebih bersih).

```bash
apt install nftables
```

Ruleset-nya gini:

```
/etc/nftables.conf
```

```nft
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

Poin pentingnya: **policy drop**, bukan default accept. Semua inbound yang nggak jelas mampus. Cuma SSH dari LAN, mDNS, DHCP, ICMP, dan QUIC yang masuk. Forward chain di-drop total, mesin ini bukan router.

Validasi dulu sebelum jalanin:

```bash
nft -c -f /etc/nftables.conf   # check saja, nggak load
systemctl enable --now nftables
```

Satu gotcha yang sempat bikin bingung pas verifikasi: setelah ruleset jalan, ada drop UDP `SPT=443 DPT=60520` dari IP Google. Itu sebenarnya QUIC (HTTP/3) balikan dari browser yang conntrack-nya udah kadaluarsa. Kasih `udp sport 443 accept` dan drop jeblok. Sisa yang ke-drop cuma traffic sah yang nggak perlu: broadcast IRC `DPT=6667` dari host lain di LAN, itu bagus diblok.

## Langkah 3: fail2ban + auto-update

SSH udah key-only, tapi lapisan kedua nggak ada salahnya:

```bash
apt install fail2ban unattended-upgrades
```

fail2ban di konfigurasi:

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

Dan auto-update biar patch keamanan masuk sendiri:

```ini
# /etc/apt/apt.conf.d/20auto-upgrades
APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Unattended-Upgrade "1";
APT::Periodic::AutocleanInterval "7";
```

## Langkah 4: Kernel hardening

Nilai-nilai sysctl yang masuk akal buat host pribadi:

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

Yang paling kerasa: `kptr_restrict` dan `dmesg_restrict` nutup info leak kernel, `ptrace_scope` bikin cuma parent yang bisa ngen-ntrace anaknya (matiin ptrace lintas proses buat user biasa), dan `fs.protected_*` nutup race condition klasik symlink/hardlink di direktori world-writable.

## Langkah 5: Upgrade semua

42 paket pending. Jalanin dengan mode noninteractive dan simpan config lokal:

```bash
apt-get upgrade -y -o Dpkg::Options::="--force-confdef" -o Dpkg::Options::="--force-confold"
```

Firefox 156 ke 159, ca-certificates, webkit, ghostscript, python 3.14, semua masuk tanpa drama.

## Hasil

Selesai semua, reboot, dan verifikasi post-reboot: nftables, fail2ban, unattended-upgrades, SSH, AppArmor semua active. Listening port cuma 22 (LAN aja) dan CUPS di localhost. Outbound normal.

Rasa bedanya: dari host yang nerima segalanya, jadi host yang cuma nerima apa yang eksplisit dibuka. SSH key-only, brute force kena ban 2 jam, patch keamanan masuk otomatis, kernel info-leak ditutup.

## Yang masih open

- **Secure Boot disabled**: verifikasi rantai boot UEFI belum aktif. Buat PC yang dipegang sendiri di rumah, prioritasnya lebih rendah, tapi kalau PC-nya dibawa-bawa, nyalain di BIOS + `mokutil --enable-validation`.
- **Disk belum dienkripsi (LUKS)**: root masih ext4 polos. Ini sebenarnya yang paling penting buat data di disk yang bisa dicuri. Belum dieksekusi karena butuh offline resize dan ini cuma 30 GB root.
- **Root partition cuma 30 GB** dari 232 GB: sisanya partisi NTFS `Data` lama yang nggak ke-mount. Bakal penuh cepat kalau dipakai install game atau toolchain. Solusinya repartisi dengan partisi baru, atau reinstall.

Hardening yang udah jalan nggak hilang kalau salah satu di atas dikerjakan nanti. Semuanya standalone.

## Rollback

Semua langkah punya backup otomatis di `/root/hardening-backup-<timestamp>`: ada salinan `sshd_config` dan `sshd_config.d` asli sebelum disentuh. Ubuntu/Debian kayak gini enaknya: semua config yang diubah cuma file, hapus aja untuk kembali ke default pabrik.

```bash
# kalau mau balik ke posisi semula
rm /etc/ssh/sshd_config.d/99-hardening.conf
rm /etc/nftables.conf
rm /etc/fail2ban/jail.local
rm /etc/sysctl.d/99-hardening.conf
systemctl restart ssh
systemctl restart nftables
```

Tapi jujur, saya nggak bakal balik.
