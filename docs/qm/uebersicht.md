# Qualitätsmanagement & AZAV -- Übersicht

## Ziel

Aufbau eines QM-Systems, das die Anforderungen der **AZAV-Zertifizierung** (Akkreditierungs- und Zulassungsverordnung Arbeitsförderung) erfüllt. Die AZAV ist Voraussetzung für die Abrechnung von Bildungsgutscheinen über die Agentur für Arbeit / das Jobcenter.

Das QM-Handbuch wird als eigenes Webprojekt unter **qm.abschluss.jetzt** bereitgestellt (Projekt: `../../website/qm.abschluss.jetzt`). Es liest Informationen aus diesem Repository und den Unterprojekten.

## AZAV-Grundlagen

Die AZAV regelt die Zulassung von Trägern und Maßnahmen der Arbeitsförderung (§§ 176--180 SGB III).

### Trägerzulassung (§ 178 SGB III)

Anforderungen an den Träger:

| Anforderung | Nachweis |
| --- | --- |
| **Leistungsfähigkeit** | Geschäftsplan, Finanzierung, Infrastruktur |
| **Zuverlässigkeit** | Satzung, Governance, Führungszeugnis |
| **Personelle Eignung** | Qualifikation der Leitungskräfte und Dozenten |
| **Fachliche Eignung** | Erfahrung im Bildungsbereich, Lehrpläne |
| **QM-System** | Dokumentiertes QM mit kontinuierlicher Verbesserung |
| **Arbeitsmarktbezug** | Nachweis der Arbeitsmarktrelevanz der Maßnahmen |

### Maßnahmenzulassung (§ 179 SGB III)

Jede einzelne Bildungsmaßnahme muss zusätzlich zugelassen werden:

- Angemessenes Teilnehmer-Betreuer-Verhältnis
- Qualifiziertes Lehrpersonal
- Arbeitsmarktrelevante Inhalte
- Angemessene Teilnahmebedingungen
- Erfolgsquoten (Integrationsquote in den Arbeitsmarkt)

### Zertifizierungsstellen (fachkundige Stellen)

Die AZAV-Zertifizierung wird durch akkreditierte fachkundige Stellen durchgeführt (z.B. CERTQUA, TÜV, DEKRA). Der externe Auditor erhält Lesezugriff auf das QM-Handbuch und relevante Systeme.

## QM-System-Überblick

```
Kernprozesse (siehe prozesse.md)
  ├── Teilnehmeraufnahme & Beratung
  ├── Maßnahmedurchführung
  ├── Erfolgsmonitoring
  └── Feedbackschleifen

Unterstützungsprozesse
  ├── Zugangskontrolle (siehe zugangskontrolle.md)
  ├── Dokumentenlenkung (siehe dokumentenlenkung.md)
  ├── IT-Infrastruktur (siehe ../technik/)
  └── Personalmanagement

Führungsprozesse
  ├── Strategische Planung (siehe ../vision/)
  ├── Management-Reviews
  └── Kontinuierlicher Verbesserungsprozess (KVP)
```

## Werkzeuge

| Werkzeug | Domain | QM-Funktion |
| --- | --- | --- |
| **OpenProject** | pm.abschluss.jetzt | Audit-Planung, CAPA-Tracking, Beschwerde-Tickets |
| **BookStack** | wiki.abschluss.jetzt | Prozessdokumentation, Handbücher |
| **n8n** | workflows.abschluss.jetzt | Audit-Erinnerungen, Feedback-Automatisierung |
| **QM-Handbuch** | qm.abschluss.jetzt | Öffentliches/internes QM-Handbuch für Audit |
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

- `../../organization/presentation/index.html` -- Slides: QM/Prozesse, AZAV-Timeline
- `../../infrastructure/docs/education-platform.md` -- OpenProject für QM, Abschnitt AZAV-Anforderungen
- `../../infrastructure/docs/groups-and-access.md` -- Auditor-Rolle, Zugriffsmatrix
