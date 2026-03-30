# Kernprozesse des Bildungsträgers

Die vollständige Prozessdokumentation mit Ablaufdiagrammen, Verantwortlichkeiten und Formularen liegt im **[QM-Handbuch](https://qm.abschluss.jetzt)** (Sektion 03-Kernprozesse). Diese Seite fasst die Prozesse zusammen und ordnet sie dem gewählten Framework zu.

**Methodik:** Wir arbeiten nach [FitSM mit ITIL-Terminologie](prozessmodellierung.md). Die FitSM-Prozessnummern und ITIL-Äquivalente sind bei jedem Prozess angegeben.

## 1. Teilnehmeraufnahme & Beratung

> FitSM: SPM (Service Portfolio Management) + SLM | ITIL: Service Catalogue + Service Request Management

**Ziel:** Geeignete Teilnehmer identifizieren und informiert aufnehmen.

**Ablauf:** Erstkontakt → Beratungsgespräch → Einstufung → Aufnahme (Keycloak-Account, Kohorten-Zuweisung, Onboarding)

**Werkzeuge:** CiviCRM (Kontaktdaten, Beratungsprotokoll), Keycloak (Account, Gruppenzugehörigkeit)

**Detail:** QM-Handbuch → 03-kernprozesse/teilnehmeraufnahme | Formular: F-01 Beratungsprotokoll

## 2. Maßnahmedurchführung

> FitSM: SLM (Service Level Management) | ITIL: Service Delivery + Service Level Management

**Ziel:** Qualitativ hochwertige Prüfungsvorbereitung durchführen.

**Bausteine:** Nachhilfe, Prüfungsvorbereitung, Coaching & Mentoring, IHK-Abschlussprojekt-Betreuung, AI-Integration

**Werkzeuge:** Nextcloud (Materialien), BookStack (Lernmaterialien), Lernplattform (bodo-os/my-paths)

**Detail:** QM-Handbuch → 03-kernprozesse/massnahmedurchfuehrung | 06-massnahmen/massnahmenkonzept

## 3. Erfolgsmonitoring

> FitSM: CSI (Continual Service Improvement) + SLM | ITIL: Measurement & Reporting + Continual Improvement

**Ziel:** Wirksamkeit der Maßnahmen messen und nachweisen.

**Kennzahlen:** Bestehensquote (>80%), Teilnehmer-Zufriedenheit (>4.0/5.0), Abbruchquote (<15%), Absolventenverbleib (>70% in IT-Stelle nach 6 Monaten)

**Werkzeuge:** OpenProject (Tracking), n8n (automatisierte Erinnerungen), CiviCRM (Absolventendaten)

**Detail:** QM-Handbuch → 03-kernprozesse/erfolgsmonitoring | 08-verbesserung/kennzahlen

## 4. Feedbackschleifen

> FitSM: CSI (Continual Service Improvement) | ITIL: Continual Improvement + Service Request Management

**Ziel:** Systematisches Feedback einholen und einarbeiten.

**Quellen:** Teilnehmerbefragung, Dozentenevaluation, Betriebe-Feedback, Alumni-Feedback

**Werkzeuge:** Nextcloud Forms, OpenProject, n8n (automatisierte Versendung)

**Detail:** QM-Handbuch → 03-kernprozesse/feedbackschleifen | Formulare: F-02 Teilnehmer-Feedback, F-03 Dozenten-Evaluation

## 5. Beschwerdemanagement

> FitSM: ISM (Incident & Service Request Management) | ITIL: Incident Management

**Ziel:** Beschwerden strukturiert erfassen, bearbeiten und lösen.

**Ablauf:** Eingang → Erfassung (OpenProject-Ticket) → Zuordnung → Bearbeitung mit Frist → Rückmeldung → Dokumentation + ggf. CAPA

**Detail:** QM-Handbuch → 03-kernprozesse/beschwerdemanagement | Formular: F-04 Beschwerde

## 6. Kontinuierlicher Verbesserungsprozess (KVP)

> FitSM: CSI (Continual Service Improvement) | ITIL: Continual Improvement

**Ziel:** Systematische Verbesserung aller Prozesse.

**Instrumente:** Interne Audits (halbjährlich), Management-Reviews (quartalsweise), CAPA-Tracking, Lessons Learned

**Werkzeuge:** OpenProject (Audits, CAPA), n8n (Audit-Erinnerungen), BookStack (Prozessdoku)

**Detail:** QM-Handbuch → 08-verbesserung/ (Kennzahlen, Internes Audit, Management-Review, KVP/CAPA) | Formulare: F-05 Audit-Checkliste, F-06 Management-Review, F-07 CAPA

## Prozess-Werkzeug-Matrix

| Prozess | OpenProject | CiviCRM | Nextcloud | n8n | BookStack |
| --- | --- | --- | --- | --- | --- |
| Aufnahme | — | Kontakte | — | Onboarding-Workflow | — |
| Durchführung | Planung | — | Material, Kommunikation | Erinnerungen | Lernmaterialien |
| Monitoring | Tracking, Reports | Absolventendaten | Forms (Feedback) | Automatisierung | — |
| Beschwerden | Tickets | — | — | Benachrichtigungen | — |
| KVP | Audits, CAPA | — | — | Audit-Erinnerungen | Prozessdoku |

## Quellen

- [QM-Handbuch](https://qm.abschluss.jetzt) -- Vollständige Prozessdokumentation mit Ablaufdiagrammen
- [Prozessmodellierung](prozessmodellierung.md) -- Framework-Entscheidung (FitSM + ITIL)
- `../../website/qm.abschluss.jetzt/docs/03-kernprozesse/` -- Quellcode der Prozessdokumentation
