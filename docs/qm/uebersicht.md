# Qualitätsmanagement & AZAV -- Übersicht

## QM-Handbuch

Das vollständige, AZAV-auditfähige **QM-Handbuch** wird als eigenes Projekt gepflegt:

- **Website:** [qm.abschluss.jetzt](https://qm.abschluss.jetzt)
- **Quellcode:** `../../website/qm.abschluss.jetzt/`
- **Umfang:** 47 Dokumente in 9 Sektionen + Formulare, Glossar, Änderungshistorie
- **Zielgruppe:** Auditoren, Geschäftsführung, Fördermittelgeber
- **Framework:** ISO 9001 + AZAV (§§ 176--180 SGB III)

Das Handbuch ist die **Single Source of Truth** für alle AZAV-relevanten Prozesse, Verantwortlichkeiten, Formulare und Nachweise.

## Was liegt hier in docs/qm/?

Diese Sektion ergänzt das QM-Handbuch um Architektur-Entscheidungen und Querschnittsthemen, die für das interne Team und Agenten in diesem Repo relevant sind -- aber nicht ins formale Handbuch gehören.

| Dokument | Inhalt |
| --- | --- |
| **[Prozessmodellierung](prozessmodellierung.md)** | Framework-Entscheidung (FitSM + ITIL), Maturity-Roadmap, Tool-Mapping |
| **[Prozesse](prozesse.md)** | Zusammenfassung der 6 Kernprozesse mit FitSM-Referenzen |
| **[Zugangskontrolle](zugangskontrolle.md)** | Keycloak-Architektur, Kohorten-System, Zugangsmatrix |
| **[Dokumentenlenkung](dokumentenlenkung.md)** | Wo liegt was? Welches System für welche Dokumentenart? |

## Struktur des QM-Handbuchs (qm.abschluss.jetzt)

| Sektion | Inhalt | AZAV-Bezug |
| --- | --- | --- |
| **01 Einleitung** | Zweck, Geltungsbereich, normative Verweise, Begriffe | Grundlage |
| **02 Organisation** | Leitbild, Organigramm, RACI-Matrix, SWOT, Kontext | §2 Abs. 1-2 |
| **03 Kernprozesse** | Prozesslandkarte, Aufnahme, Durchführung, Monitoring, Feedback, Beschwerden | §2 Abs. 4-5, 9 |
| **04 Personal** | Personalplanung, Ehrenamtliche Dozenten, Weiterbildung | §2 Abs. 3 |
| **05 Infrastruktur** | IT-Systeme, Lernumgebung, Datenschutz, Zugangskontrolle | §2 Abs. 4 |
| **06 Massnahmen** | Massnahmenkonzept (M-01), Teilnehmerorientierung, Arbeitsmarktbezug | §179 SGB III |
| **07 Dokumentenlenkung** | Dokumentenmanagement, Versionierung, Aufbewahrung | §2 Abs. 4 |
| **08 Verbesserung** | Kennzahlen, Interne Audits, Management-Review, KVP/CAPA | §2 Abs. 4 |
| **09 Risikomanagement** | Risikobasiertes Denken, Chancen- und Risikoregister | ISO 9001:6.1 |
| **Anhang** | 10 Formulare (F-01 bis F-10), Glossar, Änderungshistorie | Nachweise |

## Werkzeuge

| Werkzeug | Domain | QM-Funktion |
| --- | --- | --- |
| **OpenProject** | pm.abschluss.jetzt | Audit-Planung, CAPA-Tracking, Beschwerde-Tickets |
| **BookStack** | wiki.abschluss.jetzt | Prozessdokumentation, Handbücher, Schulungsunterlagen |
| **n8n** | workflows.abschluss.jetzt | Audit-Erinnerungen, Feedback-Automatisierung |
| **QM-Handbuch** | qm.abschluss.jetzt | Formales QM-Handbuch für AZAV-Audit |
| **CiviCRM** | crm.abschluss.jetzt | Teilnehmer- und Volunteer-Management |
| **Keycloak** | auth.abschluss.jetzt | Zugangskontrolle, Berechtigungen, Audit-Trail |

## Zeitplan

| Zeitraum | Meilenstein |
| --- | --- |
| Q1--Q2 2026 | QM-System aufbauen, Prozesse dokumentieren |
| Q3 2026 | AZAV-Antrag: Trägerzulassung & Maßnahmenzulassung |
| Q4 2026 | Externes Audit, Zertifizierung |
| ab Q4 2026 | Bildungsgutscheine abrechenbar |

## Quellen

- `../../website/qm.abschluss.jetzt/` -- Vollständiges QM-Handbuch (47 Dokumente)
- `../../organization/presentation/index.html` -- Slides: QM/Prozesse, AZAV-Timeline
- `../../infrastructure/docs/education-platform.md` -- OpenProject für QM, AZAV-Feature-Mapping
- `../../infrastructure/docs/groups-and-access.md` -- Auditor-Rolle, Zugriffsmatrix
