# Technical Overview

## System Landscape

The abschluss.jetzt project runs on self-hosted infrastructure with multiple interconnected services.

### Architecture Diagram

```mermaid
graph TB
    subgraph Internet
        U[Users / Participants]
        A[Auditor]
    end

    subgraph VPS3["vps3 — LAMP Stack"]
        WEB[Websites<br>abschluss.jetzt<br>abschluss.coach]
        WISO[wiso.abschluss.jetzt<br>Quiz App]
        INFO[info.abschluss.jetzt<br>Meta-Docs]
        FG[Forgejo<br>git.bodo.io]
        MAT[Matomo<br>Analytics]
        MAU[Mautic<br>Marketing]
        MAIL[Postfix/Dovecot<br>Mail]
    end

    subgraph PVE3["pve3 — Proxmox LXC"]
        RP[Reverse Proxy<br>SSL Termination]
        KC[Keycloak<br>SSO]
        BS[BookStack<br>Wiki]
        OP[OpenProject<br>QM / CAPA]
        N8N[n8n<br>Workflows]
        CRM[CiviCRM<br>Contacts]
        QM[QM Handbook<br>qm.abschluss.jetzt]
        NC[Nextcloud<br>Files]
        DB[(MariaDB +<br>PostgreSQL)]
    end

    subgraph VPS1["vps1 — CI/CD"]
        FR[Forgejo Runner<br>Docker]
    end

    subgraph VPS2["vps2 — VPN"]
        HS[Headscale<br>tailscale.bodo.io]
    end

    subgraph Apps["Application Projects"]
        BO[bodo-os<br>Django API]
        MP[my-paths<br>Vue Frontend]
        LIB[learn-IT-berlin<br>Laravel]
        CF[crowdfund<br>C++ / Next.js]
    end

    U --> WEB & WISO & INFO
    A --> QM & OP
    U --> KC -->|OIDC| BS & OP & NC & N8N & CRM
    RP --> KC & BS & OP & N8N & CRM & QM & NC
    MP -->|REST API| BO
    BO -->|OIDC| KC
    MAU -->|segments| CRM
    N8N -->|automation| MAU & OP & CRM
    MAT -.->|tracking| WEB
    FG -->|triggers| FR
    FR -->|deploy| WEB & WISO
    HS -.->|admin VPN| PVE3 & VPS3
    DB --- BS & OP & CRM & KC & NC
```

### Server Overview

| Server | Role | Key Services |
| --- | --- | --- |
| **vps3** | LAMP stack (Apache, PHP 8.3, MariaDB) | Websites, Forgejo, Matomo, Mautic, Mail, acme-dns |
| **pve3** | Proxmox hypervisor (LXC containers) | Keycloak, BookStack, OpenProject, n8n, CiviCRM, Nextcloud, QM site |
| **vps1** | CI/CD executor | Forgejo Actions Runner (Docker) |
| **vps2** | VPN coordination | Headscale (Tailscale-compatible) |

All servers connected via Headscale VPN for administration. Wildcard SSL `*.abschluss.jetzt` via acme-dns on vps3.

## Tech Stack per Project

| Project | Backend | Frontend | Database | Deployment |
| --- | --- | --- | --- | --- |
| **Infrastructure** | Ansible 2.x | — | — | VPS + Proxmox |
| **bodo-os** | Django 5.2 + DRF 3.16 | — | PostgreSQL | TBD |
| **my-paths** | — | Vue 3 + RxDB | IndexedDB (local) | TBD |
| **learn-IT-berlin** | Laravel 12 + Livewire | Tailwind + DaisyUI | MySQL | Laravel Cloud |
| **crowdfund** | C++17 Drogon 1.9 | Next.js 16 | PostgreSQL + Redis | Docker |
| **website** | — | Astro + Tailwind v4 | — | VPS (static rsync) |
| **multiple-choice-app** | — | Vue 3 + Vite + DaisyUI | — | Forgejo Actions → rsync |
| **@abschluss/theme** | — | DaisyUI theme (CSS) | — | npm local package |

## How Projects Interconnect

```mermaid
graph LR
    subgraph Learning["Learning Platform"]
        BO["bodo-os<br>Django API"] -->|serves| MP["my-paths<br>Vue Frontend"]
        WISO["WISO Quiz<br>Vue App"]
    end

    subgraph Community
        LIB["learn-IT-berlin<br>Laravel Meetups"]
    end

    subgraph Fundraising
        CF["crowdfund<br>C++ / Next.js"]
    end

    subgraph Operations["Education Operations"]
        KC["Keycloak SSO"]
        OP["OpenProject"]
        BS["BookStack"]
        N8N["n8n"]
        CRM["CiviCRM"]
        NC["Nextcloud"]
    end

    subgraph Marketing
        MAU["Mautic"]
        MAT["Matomo"]
        WEB["Websites<br>Astro"]
    end

    subgraph Shared
        TH["abschluss-theme<br>DaisyUI"]
        INF["Infrastructure<br>Ansible"]
    end

    KC -->|SSO| BO
    KC -->|SSO| BS
    KC -->|SSO| OP
    KC -->|SSO| N8N
    KC -->|SSO| CRM
    KC -->|SSO| NC
    TH -->|branding| MP
    TH -->|branding| WISO
    TH -->|branding| WEB
    MAU -->|leads| CRM
    N8N -->|automation| MAU
    N8N -->|automation| OP
    N8N -->|automation| CRM
    MAT -.->|analytics| WEB
    INF -->|manages| KC
    INF -->|manages| BS
    INF -->|manages| OP
    INF -->|manages| N8N
    INF -->|manages| CRM
    INF -->|manages| NC
    INF -->|manages| MAU
    INF -->|manages| MAT
    OP -->|QM/CAPA| BS
```

### Integration Points

- **Keycloak** provides SSO across all services (OIDC). Groups control access (see [access control](../qm/zugangskontrolle.md)).
- **bodo-os** (Django) serves the REST API for learning paths; **my-paths** (Vue) is its offline-capable frontend.
- **@abschluss/theme** provides consistent branding (DaisyUI light/dark) to all Vue/Astro frontends.
- **learn-IT-berlin** is a standalone event/meetup app for the Berlin community.
- **crowdfund** is a standalone non-profit crowdfunding platform.
- **Mautic** handles marketing automation; leads convert to **CiviCRM** contacts via **n8n** workflows.
- **OpenProject** manages QM processes, CAPA tracking, and AZAV certification milestones.
- **BookStack** serves as the internal knowledge base / wiki for procedures and learning materials.
- All servers managed via **Ansible** playbooks (infrastructure-as-code). See [CI/CD](ci-cd.md) for deployment patterns.

## Key Architectural Decisions

All major decisions are documented as ADRs — see [adrs.md](adrs.md) for the full list.

## Sources

- `../../infrastructure/docs/architecture.md` — Server topology and network diagrams
- `../../infrastructure/docs/education-platform.md` — Platform component overview
- `../../infrastructure/docs/index.md` — Service directory
