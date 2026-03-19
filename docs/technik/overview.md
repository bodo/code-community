# Technical Overview

## System Landscape

The abschluss.jetzt project runs on self-hosted infrastructure with multiple interconnected services:

```
Internet
  │
  ├── vps3 (217.154.216.25) ─── Apache/PHP/MariaDB
  │     ├── Websites (abschluss.jetzt, abschluss.coach, help.abschluss.jetzt)
  │     ├── Forgejo Git (git.bodo.io)
  │     ├── Matomo Analytics (tracking.abschluss.jetzt)
  │     ├── Mautic Marketing (marketing.abschluss.jetzt)
  │     ├── Postfix/Dovecot Mail
  │     └── acme-dns (wildcard SSL)
  │
  ├── pve3 (Proxmox) ─── LXC Containers
  │     ├── Reverse Proxy (SSL termination)
  │     ├── Keycloak SSO (auth.abschluss.jetzt)
  │     ├── BookStack Wiki (wiki.abschluss.jetzt)
  │     ├── OpenProject QM (pm.abschluss.jetzt)
  │     ├── n8n Workflows (workflows.abschluss.jetzt)
  │     ├── CiviCRM (crm.abschluss.jetzt)
  │     ├── QM Handbook (qm.abschluss.jetzt)
  │     └── Shared DB (MariaDB + PostgreSQL)
  │
  ├── vps2 ─── Headscale VPN (tailscale.bodo.io)
  │
  └── vps1 ─── Forgejo Actions Runner (CI/CD)
```

## Tech Stack per Project

| Project | Backend | Frontend | Database | Deployment |
| --- | --- | --- | --- | --- |
| **Infrastructure** | Ansible 2.x | — | — | VPS + Proxmox |
| **bodo-os** | Django 5.2 + DRF 3.16 | — | PostgreSQL | TBD |
| **my-paths** | — | Vue 3 + RxDB | IndexedDB (local) | TBD |
| **learn-IT-berlin** | Laravel 12 + Livewire | Tailwind + DaisyUI | MySQL | Laravel Cloud |
| **crowdfund** | C++17 Drogon 1.9 | Next.js 16 | PostgreSQL + Redis | Docker |
| **website** | — | Astro | — | VPS (static) |

## How Projects Interconnect

- **Keycloak** provides SSO across all services (OIDC)
- **bodo-os** (Django) serves the REST API for learning paths; **my-paths** (Vue) is its frontend
- **learn-IT-berlin** is a standalone event/meetup app for the Berlin community
- **crowdfund** is a standalone crowdfunding platform for fundraising campaigns
- **Mautic** handles marketing; leads convert to **CiviCRM** contacts via **n8n** workflows
- **OpenProject** manages QM processes (AZAV certification tracking)
- **BookStack** serves as the internal knowledge base / wiki
- All managed via **Ansible** playbooks (infrastructure-as-code)

## Key Architectural Decisions

All major decisions are documented as ADRs — see [adrs.md](adrs.md) for the full list.

## Sources

- `../../infrastructure/docs/architecture.md` — Server topology and network diagrams
- `../../infrastructure/docs/education-platform.md` — Platform component overview
- `../../infrastructure/docs/index.md` — Service directory
