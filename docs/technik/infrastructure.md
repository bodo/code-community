# Infrastructure

## Servers

| Host | Public IP | Tailscale IP | Purpose |
| --- | --- | --- | --- |
| **vps3** | 217.154.216.25 | 100.64.0.6 | Web, mail, apps (Ubuntu 24.04, Apache, MariaDB, PHP 8.3) |
| **pve3** | 217.197.81.32 | 100.64.0.4 | Proxmox 9.1 with LXC containers (Intel N150, 16 GB RAM, 3.6 TB NVMe) |
| **vps2** | 212.227.211.79 | — | Headscale VPN control server |
| **vps1** | 167.86.72.165 | 100.64.0.5 | CI runner with Docker (Ubuntu 24.04) |

## VPS3 — LAMP Stack

Bare-metal services (no Docker) managed via Ansible:

- **Apache 2.4** with PHP 8.3 FPM
- **MariaDB 10.11**
- **Postfix** (outbound mail) with OpenDKIM, Postgrey, SpamAssassin
- **Dovecot** (IMAP on port 993)
- **Forgejo** (Git hosting on port 3000, reverse-proxied by Apache)
- **acme-dns** (self-hosted DNS-01 ACME challenges for wildcard SSL)

## Proxmox — LXC Containers

Education platform on isolated LXC containers with an internal bridge network (172.29.0.0/23):

| CT | Service | IP | RAM | Storage | Status |
| --- | --- | --- | --- | --- | --- |
| 105 | Shared DB (MariaDB + PostgreSQL) | 172.29.0.5 | 2 GB | 20 GB | Live |
| 110 | Reverse Proxy (SSL termination) | 172.29.0.10 | 512 MB | 5 GB | Live |
| 120 | Keycloak SSO | 172.29.0.20 | 2 GB | 10 GB | Live |
| 130 | Nextcloud | 172.29.0.30 | 4 GB | 20 GB + 500 GB data | Planned |
| 131 | Collabora Office | 172.29.0.31 | 2 GB | 5 GB | Planned |
| 140 | OpenProject (Docker) | 172.29.0.40 | 2 GB | 10 GB | Live |
| 150 | n8n Workflows | 172.29.0.50 | 1 GB | 5 GB | Live |
| 160 | BookStack Wiki | 172.29.0.60 | 512 MB | 5 GB | Live |
| 170 | CiviCRM | 172.29.0.70 | 1 GB | 10 GB | Live |

Total: ~15 GB RAM, ~3 GB headroom. ~2.9 TB disk available for future services.

## VPN — Headscale (Tailscale)

All servers connected via a private WireGuard mesh network. MagicDNS: nodes reachable as `<hostname>.ts.bodo.io`.

Use cases: SMTP over VPN (Keycloak mail relay), management SSH, future cluster replication.

## SSL Strategy

- **Individual certificates** (default): per-domain Let's Encrypt via HTTP-01 challenge
- **Wildcard certificates**: self-hosted acme-dns for `*.abschluss.jetzt` and `*.abschluss.coach` via DNS-01 challenge. One-time CNAME setup at registrar.

## Ansible

Two playbooks manage everything:

| Playbook | Inventory | Scope |
| --- | --- | --- |
| `site.yml` | `inventories/vps.ini` | VPS3 + VPS2 + VPS1 |
| `proxmox.yml` | `inventories/proxmox.ini` | Proxmox host + LXC containers |

Roles: common, website, matomo, mautic, forgejo, forgejo-runner, acme-dns, db-backup, headscale, proxmox-base, proxmox-lxc, reverse-proxy, keycloak, keycloak-config, bookstack, n8n, civicrm, openproject, qm-site.

Secrets in `group_vars/vault.yml` (Ansible Vault encrypted).

## Backup Strategy

| What | Schedule | Retention | Location |
| --- | --- | --- | --- |
| MariaDB dumps | Daily 03:00 | 14 days | `/var/backups/mariadb/` on vps3 |
| Forgejo full dump | Daily 03:30 | 14 days | `/var/backups/forgejo/` on vps3 |

## Ideas / Early Planning

### JetBrains Remote Development (Developer Workspaces)

> Status: Early planning / Idea — Umsetzung abhängig von Vorbedingungen der Geschäftsführung

Zentral verwaltete Developer-Workspaces auf dem Server via [JetBrains Remote Development](https://www.jetbrains.com/remote-development/). Teilnehmer arbeiten auf vorkonfigurierten Umgebungen — kein lokales Setup nötig, funktioniert auch auf Refurbished-Hardware.

**Voraussetzungen:**

- Kooperationsvereinbarung mit JetBrains (Non-Profit Teams/Enterprise-Lizenz) — GF-Entscheidung
- Server-Kapazität: GPU/CPU für Code-Execution, ggf. zusätzliche Proxmox-Ressourcen
- Workspace-Provisionierung (LXC oder Docker pro Teilnehmer)
- Keycloak-Integration für Zugangssteuerung

**Abhängigkeit:** GF muss JetBrains-Kooperation verhandeln bevor technische Umsetzung beginnt.

## Sources

- `../../infrastructure/README.md` — Repository overview
- `../../infrastructure/docs/architecture.md` — Full topology with mermaid diagrams
- `../../infrastructure/docs/quickstart.md` — Getting started guide
- `../../infrastructure/docs/education-platform.md` — Resource allocation table
