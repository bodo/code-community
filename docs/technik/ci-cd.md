# CI/CD

## Overview

The project uses two CI/CD platforms depending on where code is hosted:

| Platform | Host | Runner | Used by |
| --- | --- | --- | --- |
| **Forgejo Actions** | git.bodo.io (VPS3) | forgejo-runner on VPS1 (Docker) | multiple-choice-app, future self-hosted repos |
| **GitHub Actions** | github.com | GitHub-hosted runners | learn-IT-berlin, crowdfund |

## Forgejo Actions

Self-hosted Git + CI/CD on [Forgejo](https://forgejo.org/) with Actions enabled.

### Runner

- **Host:** VPS1, Docker-based executor
- **Capacity:** 2 concurrent jobs, 3h max container lifetime
- **Labels:** `docker` (node:22), `ubuntu-latest` (ubuntu:24.04)
- **Ansible role:** `forgejo-runner` (manages binary, registration, systemd service)

### Example: multiple-choice-app

The quiz app deploys automatically on push:

1. Checkout → `npm ci` → lint → build
2. SSH + rsync to `vps3:/var/www/wiso.abschluss.jetzt/htdocs/`
3. Secrets: `DEPLOY_SSH_KEY` in Forgejo repo settings

See `../multiple-choice-app/.forgejo/workflows/deploy.yml`

## GitHub Actions

Used for projects that are (also) on GitHub.

### learn-IT-berlin

| Workflow | Trigger | Steps |
| --- | --- | --- |
| `lint.yml` | push/PR to develop, main | PHP 8.4, Composer, Pint formatter |
| `tests.yml` | push/PR to develop, main | PHP 8.4 + Node 22, Pest tests, asset build |

See `../learn-IT-berlin/.github/workflows/`

### crowdfund

| Workflow | Trigger | Steps |
| --- | --- | --- |
| `ci.yml` | push/PR | Frontend: type-check, test, build, Lighthouse CI; Backend: cmake, ctest with PostgreSQL + Redis |
| `publish.yml` | release | Docker images → GHCR (`backend`, `frontend`) |
| `backup.yml` | daily 02:00 UTC | pg_dump → S3 (30 day retention) |

See `../crowdfund/.github/workflows/`

## Shared Theme Package

`@abschluss/theme` in `../packages/theme-abschluss/` provides a DaisyUI theme (light + dark mode) with self-hosted fonts (Inter, JetBrains Mono).

- **Consumed via:** `"@abschluss/theme": "file:../packages/theme-abschluss"` in package.json
- **Exports:** `./theme.css` (color system, radii, sizing) and `./fonts.css` (WOFF2 font-face declarations)
- **Not published to npm** — local file reference within the monorepo

## Deployment Patterns

| Project | Method | Target |
| --- | --- | --- |
| multiple-choice-app | Forgejo Actions → rsync | wiso.abschluss.jetzt |
| info.abschluss.jetzt | Manual `scripts/build-docs.sh --deploy` | info.abschluss.jetzt |
| Infrastructure docs | Manual `scripts/build-docs.sh --deploy` | infra.abschluss.jetzt |
| Websites (Astro) | Manual build + rsync (TBD) | abschluss.jetzt, abschluss.coach |
| crowdfund | Docker publish → GHCR | Container-based deploy |

## Sources

- `../infrastructure/roles/forgejo/` — Forgejo server role (Git hosting, SSH passthrough, MariaDB)
- `../infrastructure/roles/forgejo-runner/` — Runner role (Docker executor, registration, systemd)
- `../multiple-choice-app/.forgejo/workflows/deploy.yml` — Forgejo Actions example
- `../crowdfund/.github/workflows/` — GitHub Actions (CI, publish, backup)
- `../learn-IT-berlin/.github/workflows/` — GitHub Actions (lint, tests)
