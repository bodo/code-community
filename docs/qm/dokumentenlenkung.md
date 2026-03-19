# Dokumentenlenkung

## Übersicht

Die Dokumentation des Projekts ist über mehrere Systeme verteilt. Diese Übersicht zeigt, wo welche Informationen gepflegt werden und wer dafür verantwortlich ist.

## Dokumentensysteme

| System | Zweck | Zugang | Versionierung |
| --- | --- | --- | --- |
| **Git (code-community)** | Meta-Dokumentation, technische Doku, ADRs | Entwickler, Staff | Git History |
| **Git (infrastructure)** | Infrastruktur-Doku, Ansible-Rollen | Entwickler, SysOps | Git History |
| **Git (Unterprojekte)** | Projekt-spezifische Doku | Entwickler | Git History |
| **BookStack** (wiki.abschluss.jetzt) | Betriebshandbücher, Schulungsunterlagen | Staff, Dozenten, Teilnehmer (lesend) | BookStack Revisionen |
| **OpenProject** (pm.abschluss.jetzt) | QM-Prozesse, Audits, CAPA, Tickets | Staff, Auditor (lesend) | OpenProject History |
| **QM-Handbuch** (qm.abschluss.jetzt) | Formales QM-Handbuch für AZAV-Audit | Staff, Auditor | Git (Quellcode) |

## Dokumentenarten und Speicherorte

### Strategische Dokumente

| Dokument | Speicherort | Verantwortlich |
| --- | --- | --- |
| Geschäftsplan / Vision | `docs/vision/` (dieses Repo) | Management |
| Satzung / Gesellschaftsvertrag | Extern (Notar) | Management |
| AZAV-Antrag | OpenProject + BookStack | Management, QM |

### Prozessdokumente

| Dokument | Speicherort | Verantwortlich |
| --- | --- | --- |
| QM-Handbuch | qm.abschluss.jetzt | QM, Management |
| Kernprozesse | `docs/qm/prozesse.md` + BookStack | QM |
| Arbeitsanweisungen | BookStack | Fachverantwortliche |
| Formulare / Vorlagen | Nextcloud + BookStack | Verwaltung |

### Technische Dokumente

| Dokument | Speicherort | Verantwortlich |
| --- | --- | --- |
| Infrastruktur-Architektur | `infrastructure/docs/` | SysOps |
| ADRs | `infrastructure/docs/adr/` | Entwickler, SysOps |
| API-Dokumentation | Jeweiliges Projektrepo | Entwickler |
| Zugangskontrolle | `infrastructure/docs/groups-and-access.md` | SysOps, Projektleitung |

### Lehr- und Lernmaterialien

| Dokument | Speicherort | Verantwortlich |
| --- | --- | --- |
| Lehrpläne / Curricula | BookStack | Projektleitung, Dozenten |
| Lernmaterialien | Nextcloud + Lernplattform | Dozenten |
| Prüfungsfragen-Pool | Lernplattform (bodo-os) | Dozenten |

## Aktualisierungsprozess

### Git-basierte Dokumente

- Änderungen über Pull Requests (Code Review)
- Versionierung über Git History
- Automatische Bereitstellung über CI/CD (Forgejo Actions)

### BookStack-Dokumente

- Änderungen direkt im WYSIWYG-Editor
- Revisionsverlauf in BookStack
- Regelmäßige Review-Zyklen (quartalsweise)

### QM-Handbuch

- Quellcode in Git, Deployment auf qm.abschluss.jetzt
- Liest Informationen aus diesem Repo (`docs/`)
- Änderungen erfordern Review durch QM-Verantwortliche
- Auditor hat permanenten Lesezugriff

## AZAV-Relevanz

- **Dokumentenlenkung** ist explizite AZAV-Anforderung
- Alle QM-relevanten Dokumente müssen **versioniert**, **aktuell** und **zugänglich** sein
- **Auditor-Zugang** über Keycloak-Rolle `/staff/auditor` (Lesezugriff)
- **Nachvollziehbarkeit** über Git History und BookStack Revisionen

## Quellen

- `../../infrastructure/docs/groups-and-access.md` -- Zugangsmatrix (wer darf wo lesen/schreiben)
- `../../infrastructure/docs/education-platform.md` -- BookStack, OpenProject, n8n Beschreibungen
