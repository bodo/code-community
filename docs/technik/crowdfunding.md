# Crowdfunding Platform

A non-profit crowdfunding platform built with a C++ backend and Next.js frontend. Designed for running pledge-based fundraising campaigns.

## Tech Stack

- **Backend:** C++17 with Drogon 1.9.x framework
- **Frontend:** Next.js 16, React Server Components, TailwindCSS v4
- **Database:** PostgreSQL 13 with full-text search (tsvector/tsquery)
- **Cache/Sessions:** Redis (24h TTL)
- **Storage:** Local disk or S3-compatible (MinIO, AWS S3, Backblaze B2, Cloudflare R2)
- **Email:** libcurl SMTP with async delivery; MailHog for dev
- **API:** OpenAPI 3.1 specification
- **Deployment:** Docker multi-stage builds (~80MB production image)

## Architecture

```
Browser → Next.js 16 (port 3000) → Drogon C++ (port 80) → PostgreSQL + Redis
```

Next.js layers: Server Components (campaign pages), BFF Routes (auth proxy, httpOnly cookies), Client Components (interactive forms).

## Core Features

- **Campaign lifecycle:** draft → published → active → ended/canceled
- **Pledge model:** Non-binding promises, charged only if goals are met
- **Funding goals** with stretch goals
- **Pledge tiers** with quantity limits
- **Roles:** donor, org_admin, site_admin
- **Full-text search** on campaigns
- **Audit logging** for sensitive actions
- **Email reminders** (7-day and 48-hour before campaign end)

## Payment (Design Phase)

Stripe manual capture (collect-on-goal):
1. Backer pledges → PaymentIntent in `requires_capture` state
2. Goal reached → all pledges captured
3. Goal not met → all PaymentIntents canceled (no charge)

## Development Milestones

- **M0 (Foundation):** Complete — Docker dev env, auth, campaign CRUD, pledges, tests
- **M1 (Public MVP):** In progress — RBAC, donation recording, search, email, GDPR
- **M2 (Growth):** Planned — Comments, recurring donations, tax receipts, localization
- **M3 (Ecosystem):** Future — CMS, blog, referral system, analytics, plugins

## Sources

- `../../crowdfund/README.md` — Complete technical guide (804 lines)
- `../../crowdfund/docs/architecture.md` — System design with diagrams
- `../../crowdfund/spec.md` — Product specification and domain model
- `../../crowdfund/planning.md` — Milestone-based implementation plan
- `../../crowdfund/docs/payment-integration-design.md` — Payment architecture
- `../../crowdfund/coding.md` — Developer workflow guide
- `../../crowdfund/testing.md` — Test specifications
