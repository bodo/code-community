# Architecture Decision Records (ADRs)

All ADRs are in `../../infrastructure/docs/adr/`. They document significant technical decisions with context, alternatives considered, and rationale.

## Summary

| # | Decision | Status | Date | Key Rationale |
| --- | --- | --- | --- | --- |
| 001 | Remove Plesk, manage services directly via Ansible | Accepted | 2026-03-15 | No license, vendor lock-in, configuration interference |
| 002 | Bare metal on VPS over Docker | Accepted | 2026-03-14 | Simpler for LAMP stack now; Docker later with Proxmox |
| 003 | Self-hosted acme-dns for wildcard SSL | Accepted | 2026-03-15 | One-time CNAME setup, no registrar API risk, full automation |
| 004 | Forgejo over GitHub for Git hosting | Accepted | 2026-03-16 | Lightweight, data sovereignty, no vendor lock-in |
| 005 | Modular Ansible roles over monolithic playbooks | Accepted | 2026-03-14 | Each service its own role with defaults, templates, handlers |
| 006 | Self-hosted education platform on Proxmox | Accepted | 2026-03-16 | Isolated LXC containers, not SaaS, not bare metal |
| 007 | Keycloak over Authentik for SSO | Accepted | 2026-03-16 | More free-tier features, Red Hat backing, DFN-AAI compatible |
| 008 | CiviCRM Standalone over CMS-hosted | Accepted | 2026-03-16 | No CMS needed, reduced maintenance, production-ready |

## Sources

- `../../infrastructure/docs/adr/` — Full ADR documents with context, alternatives, and consequences
