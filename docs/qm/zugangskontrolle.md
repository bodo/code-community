# Zugangskontrolle

Die vollständige Dokumentation der Zugangskontrolle mit Onboarding-Workflows und Sicherheitsrichtlinien liegt im **[QM-Handbuch](https://qm.abschluss.jetzt)** (05-infrastruktur/zugangskontrolle). Diese Seite beschreibt die technische Architektur für das interne Team.

## Keycloak-Architektur

Alle Benutzer und Berechtigungen werden zentral über **Keycloak** (auth.abschluss.jetzt, Realm `abschluss`) verwaltet. Services authentifizieren via OIDC und nutzen Gruppenmitgliedschaften für die Autorisierung.

### Gruppenhierarchie

```
/staff
  /staff/management          Geschäftsführung
  /staff/standortleitung     Budget & Standortverantwortung
  /staff/projektleitung      Curriculum, Infrastruktur, Teilnehmerkoordination
  /staff/dozenten            Lehrkräfte / Dozenten
  /staff/verwaltung          Büro / Administration
  /staff/auditor             Externer AZAV-Auditor (nur Lesezugriff)

/edu
  /edu/260601                Kohorte Sommer 2026 (IHK-Prüfung Juni)
  /edu/261201                Kohorte Winter 2026 (IHK-Prüfung Dezember)

/alumni                      Absolventen (Untergruppe = Abschlussprüfungs-Kohorte)
  /alumni/260601
  /alumni/261201

/volunteers                  Externe ehrenamtliche Helfer
```

### Kohorten-System

Kohorten-IDs folgen dem Muster `YYMMDD` -- Startdatum des IHK-Prüfungssemesters. Kohorten-Gruppen sind permanent (Einschreibungshistorie). Teilnehmer können in mehreren Kohorten sein (bei Wiederholung).

### Zugangs-Lifecycle

| Phase | Nextcloud | Wiki | Lernplattform |
| --- | --- | --- | --- |
| **Eingeschrieben** | Voller Zugang | Lesen | Voll |
| **Frisch absolviert** | Voller Zugang | Lesen | Voll |
| **Nach Übergangsfrist** (6-12 Mo.) | Kein Zugang | Lesen | Kein Zugang |

### Zugangsmatrix -- Staff

| Service | Management | Standort | Projekt | Dozenten | Verwaltung | Auditor |
| --- | --- | --- | --- | --- | --- | --- |
| QM-Handbuch | Schreiben | Schreiben | Schreiben | Schreiben | Schreiben | **Lesen** |
| Wiki | Schreiben | Schreiben | Schreiben | Schreiben | Lesen | — |
| Nextcloud | Voll | Voll | Voll | Voll | Voll | — |
| Forgejo | Admin | Schreiben | Schreiben | Lesen | — | — |
| OpenProject | Admin | Schreiben | Schreiben | Lesen | Schreiben | Lesen |
| n8n | Admin | Admin | Schreiben | — | — | — |
| CiviCRM | Voll | Voll | Schreiben | Lesen | Schreiben | — |

### Onboarding

Teilnehmer werden per Ansible-Playbook in Keycloak importiert: YAML mit Teilnehmerdaten → Keycloak erstellt Benutzer → Verifizierungs-E-Mail → Teilnehmer setzt Passwort → SSO-Zugang. Keine geteilten Standard-Passwörter.

## Quellen

- [QM-Handbuch → Zugangskontrolle](https://qm.abschluss.jetzt) -- Formale Dokumentation für AZAV-Audit
- `../../infrastructure/docs/groups-and-access.md` -- Vollständige Keycloak-Admin-Anleitungen, Bulk-Import, Mermaid-Diagramme
- `../../infrastructure/docs/education-platform.md` -- SSO-Verbindungen aller Services
