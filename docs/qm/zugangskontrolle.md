# Zugangskontrolle

Alle Benutzer und Berechtigungen werden zentral über **Keycloak** (auth.abschluss.jetzt, Realm `abschluss`) verwaltet. Services authentifizieren via OIDC und nutzen Gruppenmitgliedschaften für die Autorisierung.

## Gruppenhierarchie

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
  ...

/alumni                      Absolventen (Untergruppe = Abschlussprüfungs-Kohorte)
  /alumni/260601
  /alumni/261201
  ...

/volunteers                  Externe ehrenamtliche Helfer
```

## Staff-Hierarchie

```
management
  └── standortleitung (pro Standort)
        └── projektleitung (pro Projekt/Curriculum)
              ├── dozenten (Lehre)
              └── verwaltung (Administration)
```

## Kohorten-System

Kohorten-IDs folgen dem Muster `YYMMDD` -- Startdatum des IHK-Prüfungssemesters (1. Juni oder 1. Dezember). Beispiel: `260601` = Sommerkohorte 2026.

**Regeln:**
- Kohorten-Gruppen sind **permanent** (Dokumentation der Einschreibungshistorie)
- Teilnehmer können in **mehreren Kohorten** sein (bei Wiederholung)
- Alumni-Untergruppe zeigt die **bestandene Prüfung** (z.B. `/alumni/261201`)
- Nach einer **Übergangsfrist** (6--12 Monate) werden aktive Berechtigungen reduziert

## Zugangs-Lifecycle

| Phase | Gruppen | Nextcloud | Wiki | Aktive Ressourcen |
| --- | --- | --- | --- | --- |
| **Eingeschrieben** | `/edu/260601` | Voller Zugang | Lesen | Voll |
| **Wiederholer** | `/edu/260601` + `/edu/261201` | Voller Zugang | Lesen | Voll |
| **Frisch absolviert** | + `/alumni/261201` | Voller Zugang | Lesen | Voll |
| **Übergangsfrist** | Gleich | Nur Lesen | Lesen | Reduziert |
| **Nach Übergang** | Gleich | Kein Zugang | Lesen | Kein Zugang |

## Zugangsmatrix -- Staff

| Service | Management | Standort | Projekt | Dozenten | Verwaltung | Auditor |
| --- | --- | --- | --- | --- | --- | --- |
| QM-Handbuch | Schreiben | Schreiben | Schreiben | Schreiben | Schreiben | **Lesen** |
| Wiki | Schreiben | Schreiben | Schreiben | Schreiben | Lesen | — |
| Nextcloud | Voll | Voll | Voll | Voll | Voll | — |
| Forgejo | Admin | Schreiben | Schreiben | Lesen | — | — |
| OpenProject | Admin | Schreiben | Schreiben | Lesen | Schreiben | Lesen |
| n8n | Admin | Admin | Schreiben | — | — | — |
| CiviCRM | Voll | Voll | Schreiben | Lesen | Schreiben | — |
| Matomo | Voll | Lesen | Lesen | — | — | — |
| Mautic | Voll | Schreiben | Schreiben | — | Schreiben | — |

## Onboarding-Prozess

Teilnehmer werden per Ansible-Playbook in Keycloak importiert:

1. Projektleitung erstellt YAML mit Teilnehmerdaten (Name, E-Mail)
2. Ansible erstellt Benutzer in Keycloak (ohne Passwort)
3. Keycloak sendet Verifizierungs-E-Mail
4. Teilnehmer klickt Link, setzt eigenes Passwort
5. SSO-Zugang zu allen freigeschalteten Services

**Keine geteilten Standard-Passwörter** -- jeder Teilnehmer setzt sein eigenes.

## AZAV-Relevanz

- **Auditor-Rolle**: Externer AZAV-Auditor erhält Lesezugriff auf QM-Handbuch und OpenProject
- **Dokumentierte Berechtigungen**: Zugangsmatrix ist nachweisbar und reproduzierbar
- **Lifecycle-Management**: Nachvollziehbare Teilnehmer-Historie über Kohorten
- **Datenschutz**: Minimaler Zugriff (Need-to-know), zentrale Verwaltung

## Quellen

- `../../infrastructure/docs/groups-and-access.md` -- Vollständige Dokumentation mit Keycloak-Admin-Anleitungen, Bulk-Import, Mermaid-Diagrammen
- `../../infrastructure/docs/education-platform.md` -- SSO-Verbindungen aller Services
- `../../infrastructure/docs/architecture.md` -- SSO-Architektur-Diagramm
