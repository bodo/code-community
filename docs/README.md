# abschluss.jetzt -- Projektübersicht

Ein gemeinnütziges Social Enterprise zur IHK-Prüfungsvorbereitung für Fachinformatiker (AE & SI). Zielgruppe: Azubis, Umschüler, Extern-Prüflinge und Quereinsteiger. Geplante Rechtsform: gemeinnützige UG (gUG), perspektivisch gGmbH.

Dieses Repository ist die **Meta-Dokumentation** über alle Teilprojekte. Jede Datei hier fasst ein Thema zusammen und verweist auf die vollständigen Originalquellen in den Unterprojekten.

## Unterprojekte

| Projekt | Technologie | Zweck | Verzeichnis |
| --- | --- | --- | --- |
| **Infrastructure** | Ansible, Proxmox, VPS | Server, Services, SSO, Backups | `../infrastructure/` |
| **bodo-os** | Django 5.2, DRF, JWT | API-Backend für Lernpfade | `../bodo-os/` |
| **my-paths** | Vue 3, RxDB, Vite | Learner-Frontend (offline-fähig) | `../my-paths/` |
| **learn-IT-berlin** | Laravel 12, Livewire | Meetup-App für Lern-Events | `../learn-IT-berlin/` |
| **Crowdfund** | C++17 Drogon, Next.js 16 | Non-Profit Crowdfunding-Plattform | `../crowdfund/` |
| **Organization** | Reveal.js | Präsentation, Geschäftsplan | `../organization/` |
| **Website** | Astro | Öffentliche Website | `../website/` |

## Dokumentationsbereiche

### [Vision & Geschäftsplan](vision/uebersicht.md)

Mission, Organisationsform, Timeline, Finanzierung und Stakeholder-Rollen.

- [Übersicht](vision/uebersicht.md) -- Mission, Problemstellung, gUG
- [Timeline](vision/timeline.md) -- Roadmap von Freelancer bis Bildungsgutscheine
- [Finanzierung](vision/finanzierung.md) -- Funding-Modell und Mittelverwendung
- [Rollen & Zielgruppen](vision/rollen-und-zielgruppen.md) -- 9 Stakeholder-Gruppen

### [Außenkommunikation](aussenkommunikation/uebersicht.md)

Marketing, Kursangebot, Zielgruppenansprache und öffentliche Auftritte.

- [Übersicht](aussenkommunikation/uebersicht.md) -- Strategie und Kanäle
- [Lehrplan & Angebot](aussenkommunikation/lehrplan-und-angebot.md) -- Kurse, AI-Fokus, IHK-Prüfungsvorbereitung
- [Zielgruppenansprache](aussenkommunikation/zielgruppen-ansprache.md) -- Messaging pro Zielgruppe
- [Website & Präsentationen](aussenkommunikation/website-und-praesentationen.md) -- abschluss.jetzt, Reveal.js

### [Technik](technik/overview.md)

Technische Architektur aller Systeme (englisch).

- [Overview](technik/overview.md) -- System landscape and interconnections
- [Infrastructure](technik/infrastructure.md) -- Servers, Proxmox, VPN, Ansible
- [Education Platform](technik/education-platform.md) -- Keycloak, Nextcloud, OpenProject, etc.
- [Learning Paths Backend](technik/learning-paths-backend.md) -- Django API (bodo-os)
- [Learning Paths Frontend](technik/learning-paths-frontend.md) -- Vue App (my-paths)
- [Learn IT Berlin](technik/learn-it-berlin.md) -- Event/Meetup App
- [Crowdfunding](technik/crowdfunding.md) -- Crowdfunding Platform
- [ADRs](technik/adrs.md) -- Architecture Decision Records

### [Qualitätsmanagement & AZAV](qm/uebersicht.md)

QM-System, AZAV-Zertifizierung, Prozesse, Zugangskontrolle.

- [Übersicht](qm/uebersicht.md) -- QM-Rahmen und AZAV-Anforderungen
- [Prozesse](qm/prozesse.md) -- Kernprozesse des Bildungsträgers
- [Zugangskontrolle](qm/zugangskontrolle.md) -- Keycloak-Rollen und Berechtigungen
- [Dokumentenlenkung](qm/dokumentenlenkung.md) -- Wo liegt was, wie wird aktualisiert

## Quellen

- `../organization/presentation/index.html` -- Interaktive Reveal.js-Präsentation mit Geschäftsplan
- `../website/abschluss.jetzt/summary.md` -- Projektzusammenfassung
- `../infrastructure/docs/` -- Technische Infrastruktur-Dokumentation
- `../infrastructure/docs/adr/` -- Architecture Decision Records
