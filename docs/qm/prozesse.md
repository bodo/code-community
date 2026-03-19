# Kernprozesse des Bildungsträgers

Die folgenden Prozesse bilden das Rückgrat des QM-Systems und müssen für die AZAV-Zertifizierung dokumentiert, umgesetzt und kontinuierlich verbessert werden.

## 1. Teilnehmeraufnahme & Beratung

**Ziel:** Geeignete Teilnehmer identifizieren und informiert aufnehmen.

**Ablauf:**
1. Erstkontakt (Website, Flyer, Empfehlung, JobCenter)
2. Beratungsgespräch (Voraussetzungen, Ziele, Zeitrahmen)
3. Einstufung (IHK-Prüfungstermin, Vorwissen, Förderbedarf)
4. Aufnahme (Keycloak-Account, Kohorten-Zuweisung, Onboarding)

**Dokumentation:** CiviCRM (Kontaktdaten, Beratungsprotokoll), Keycloak (Account, Gruppenzugehörigkeit)

**AZAV-Relevanz:** Nachweis der Eignung der Teilnehmer, dokumentiertes Aufnahmeverfahren

## 2. Maßnahmedurchführung

**Ziel:** Qualitativ hochwertige Prüfungsvorbereitung durchführen.

**Bausteine:**
- Nachhilfe (regelmäßig, Kleingruppen oder 1-zu-1)
- Prüfungsvorbereitung (Intensivphasen 4x/Jahr in Prüfungsmonaten)
- Coaching & Mentoring (persönliche Begleitung)
- IHK-Abschlussprojekt-Betreuung (Planung bis Präsentation)
- AI-Integration (KI-Tools als Lernhilfe und Lehrinhalt)

**Werkzeuge:** Nextcloud (Materialien, Kommunikation), BookStack (Lernmaterialien), Lernplattform (bodo-os/my-paths)

**AZAV-Relevanz:** Qualifiziertes Lehrpersonal, arbeitsmarktrelevante Inhalte, angemessenes Betreuungsverhältnis

## 3. Erfolgsmonitoring

**Ziel:** Wirksamkeit der Maßnahmen messen und nachweisen.

**Kennzahlen:**
- Bestehensquote IHK-Prüfung (AP1, AP2)
- Teilnehmer-Zufriedenheit (Feedbackbogen)
- Abbruchquote
- Absolventenverbleib (Integration in Arbeitsmarkt nach 6/12 Monaten)

**Werkzeuge:** OpenProject (Tracking), n8n (automatisierte Erinnerungen), CiviCRM (Absolventendaten)

**AZAV-Relevanz:** Integrationsquote ist zentrales AZAV-Kriterium

## 4. Feedbackschleifen

**Ziel:** Systematisches Feedback einholen und einarbeiten.

**Quellen:**
- **Teilnehmerbefragung** -- nach jeder Intensivphase und am Ende der Maßnahme
- **Dozentenevaluation** -- gegenseitiges Feedback im Dozententeam
- **Betriebe-Feedback** -- Rückmeldung von Ausbildungsbetrieben zur Vorbereitung ihrer Azubis
- **Alumni-Feedback** -- Erfahrungen nach der Prüfung und im Beruf

**Werkzeuge:** Nextcloud Forms (Umfragen), OpenProject (Auswertung, Maßnahmen), n8n (automatisierte Versendung)

## 5. Beschwerdemanagement

**Ziel:** Beschwerden strukturiert erfassen, bearbeiten und lösen.

**Ablauf:**
1. Beschwerde eingeht (E-Mail, persönlich, Formular)
2. Erfassung in OpenProject als Ticket
3. Zuordnung an Verantwortlichen
4. Bearbeitung mit Frist
5. Rückmeldung an Beschwerdeführer
6. Dokumentation der Lösung und ggf. Ableitung von Verbesserungsmaßnahmen

**AZAV-Relevanz:** Dokumentiertes Beschwerdemanagement ist AZAV-Pflicht

## 6. Kontinuierlicher Verbesserungsprozess (KVP)

**Ziel:** Systematische Verbesserung aller Prozesse.

**Instrumente:**
- **Interne Audits** -- regelmäßige Überprüfung der Prozesse (OpenProject Audit-Checklisten)
- **Management-Reviews** -- Quartalsweise Bewertung der QM-Kennzahlen
- **CAPA** (Corrective and Preventive Actions) -- Tracking in OpenProject
- **Lessons Learned** -- nach jeder Prüfungsphase

**AZAV-Relevanz:** Nachweis der kontinuierlichen Verbesserung ist Kern der AZAV

## Prozess-Werkzeug-Matrix

| Prozess | OpenProject | CiviCRM | Nextcloud | n8n | BookStack |
| --- | --- | --- | --- | --- | --- |
| Aufnahme | — | Kontakte | — | Onboarding-Workflow | — |
| Durchführung | Planung | — | Material, Kommunikation | Erinnerungen | Lernmaterialien |
| Monitoring | Tracking, Reports | Absolventendaten | Forms (Feedback) | Automatisierung | — |
| Beschwerden | Tickets | — | — | Benachrichtigungen | — |
| KVP | Audits, CAPA | — | — | Audit-Erinnerungen | Prozessdoku |

## Quellen

- `../../organization/presentation/index.html` -- Slides: QM/Prozesse (Prozessdesign, Qualitätssicherung, AZAV-Vorbereitung)
- `../../infrastructure/docs/education-platform.md` -- OpenProject AZAV-Feature-Mapping, n8n Workflows
