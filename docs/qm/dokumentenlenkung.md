# Dokumentenlenkung

Die formale Dokumentenlenkung mit Versionierungsregeln, Freigabeprozessen und Aufbewahrungsfristen liegt im **[QM-Handbuch](https://qm.abschluss.jetzt)** (Sektion 07-Dokumentenlenkung). Diese Seite gibt dem internen Team einen schnellen Überblick: Wo liegt was?

## Dokumentensysteme

| System | Zweck | Zugang | Versionierung |
| --- | --- | --- | --- |
| **Git (code-community)** | Meta-Dokumentation, technische Doku, ADRs | Entwickler, Staff | Git History |
| **Git (infrastructure)** | Infrastruktur-Doku, Ansible-Rollen | Entwickler, SysOps | Git History |
| **Git (Unterprojekte)** | Projekt-spezifische Doku | Entwickler | Git History |
| **BookStack** (wiki.abschluss.jetzt) | Betriebshandbücher, Schulungsunterlagen | Staff, Dozenten, Teilnehmer (lesend) | BookStack Revisionen |
| **OpenProject** (pm.abschluss.jetzt) | QM-Prozesse, Audits, CAPA, Tickets | Staff, Auditor (lesend) | OpenProject History |
| **QM-Handbuch** (qm.abschluss.jetzt) | Formales QM-Handbuch für AZAV-Audit | Staff, Auditor | Git (Quellcode) |

## Wo liegt was?

| Dokumentenart | Speicherort | Verantwortlich |
| --- | --- | --- |
| **Geschäftsplan / Vision** | `docs/vision/` (dieses Repo) | Management |
| **QM-Handbuch** | `website/qm.abschluss.jetzt/` → qm.abschluss.jetzt | QM, Management |
| **Kernprozesse (Detail)** | QM-Handbuch Sektion 03 | QM |
| **Formulare (F-01 bis F-10)** | QM-Handbuch Anhang | QM, Verwaltung |
| **Arbeitsanweisungen** | BookStack | Fachverantwortliche |
| **Infrastruktur-Architektur** | `infrastructure/docs/` | SysOps |
| **ADRs** | `infrastructure/docs/adr/` | Entwickler, SysOps |
| **API-Dokumentation** | Jeweiliges Projektrepo | Entwickler |
| **Lehrpläne / Curricula** | BookStack | Projektleitung, Dozenten |
| **Lernmaterialien** | Nextcloud + Lernplattform | Dozenten |
| **Prüfungsfragen-Pool** | Lernplattform (bodo-os) + wiso.abschluss.jetzt | Dozenten, Lehrmittel-Autoren |

## Aktualisierungsprozess

| System | Änderungsprozess | Review |
| --- | --- | --- |
| **Git-Repos** | Pull Request → Code Review → Merge | Entwickler / QM |
| **BookStack** | Direkter Edit → Revisionsverlauf | Quartalsweise Review |
| **QM-Handbuch** | Git PR → QM-Review → Deploy | QM-Verantwortliche |
| **OpenProject** | Direkt (Tickets, Kommentare) | Laufend |

## Quellen

- [QM-Handbuch → Dokumentenlenkung](https://qm.abschluss.jetzt) -- Versionierung, Freigabe, Aufbewahrungsfristen
- `../../infrastructure/docs/groups-and-access.md` -- Zugangsmatrix (wer darf wo lesen/schreiben)
- `../../infrastructure/docs/education-platform.md` -- BookStack, OpenProject, n8n Beschreibungen
