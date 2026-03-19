# Education Platform

Self-hosted platform on Proxmox replacing Microsoft Teams. Provides tools for teaching, AZAV quality management, and internal operations.

## Components

### Keycloak SSO (auth.abschluss.jetzt)

Central identity provider for all services. OIDC protocol with group-based authorization. Realm `abschluss` with group hierarchy for staff, students, alumni, and volunteers.

Connected services: BookStack, Forgejo (live); Nextcloud, OpenProject, n8n, CiviCRM, Matomo, Mautic (planned).

### Nextcloud (cloud.abschluss.jetzt) — Planned

Replaces Teams as central collaboration hub:
- **Talk** — Chat + video conferencing (WebRTC)
- **Files** — File storage with versioning and sharing
- **Nextcloud Office** — Document editing via Collabora
- **Forms** — Homework submission, quizzes, feedback
- **Deck** — Kanban boards for projects
- **Calendar** — Assignment deadlines, class schedules (CalDAV)

Per-user storage quotas (configurable). Separate 500 GB XFS data volume, expandable live.

### Collabora Online (office.abschluss.jetzt) — Planned

LibreOffice-based online editor for real-time co-editing (Word/Excel/PPT compatible).

### OpenProject (pm.abschluss.jetzt)

Project management with German BDSG compliance. Maps to AZAV requirements:
- Audit scheduling and CAPA tracking
- Document management
- Participant feedback (issue tracking)
- Complaint management (ticket workflows)
- Management reviews (reports, dashboards)

### n8n (workflows.abschluss.jetzt)

Workflow automation (1200+ integrations):
- Audit scheduling notifications
- Participant feedback collection
- Compliance deadline reminders
- Document approval workflows
- Mautic-to-CiviCRM lead sync (planned)

### CiviCRM (crm.abschluss.jetzt)

Operational CRM (standalone, no CMS dependency). Complements Mautic (marketing):
- Volunteer management (registration, skills, availability, hours)
- Participant management (enrollment, attendance, certificates)
- Event management (workshops, training sessions)
- Memberships and donations
- Case management (participant support)

### BookStack (wiki.abschluss.jetzt)

Structured documentation (Books > Chapters > Pages): operational manuals, training guides, process documentation, AZAV compliance handbooks. WYSIWYG editor with Keycloak OIDC.

## Future Additions

- **Moodle** (lernplattform.abschluss.jetzt) — formal LMS when AZAV requires it
- **BigBlueButton** (meet.abschluss.jetzt) — dedicated video conferencing if Nextcloud Talk doesn't suffice

## Sources

- `../../infrastructure/docs/education-platform.md` — Full architecture with mermaid diagrams, resource allocation, storage layout
- `../../infrastructure/docs/groups-and-access.md` — Keycloak group hierarchy and access matrix
- `../../infrastructure/docs/adr/006-education-platform-architecture.md` — ADR: self-hosted on Proxmox
- `../../infrastructure/docs/adr/007-keycloak-over-authentik.md` — ADR: Keycloak vs Authentik
- `../../infrastructure/docs/adr/008-civicrm-standalone.md` — ADR: CiviCRM standalone
