# Report: ITSM-Frameworks für Prozessmodellierung — Vergleich & Empfehlung

> Erstellt: 2026-03-29 | Status: Entscheidung getroffen (FitSM + ITIL-Vokabular)

## Ausgangslage

abschluss.jetzt ist ein gemeinnütziger Bildungsträger (gUG) in Gründung, der die AZAV-Zertifizierung anstrebt (Q3-Q4 2026). Für das QM-System müssen Prozesse dokumentiert, implementiert und kontinuierlich verbessert werden. Dieser Report bewertet alle relevanten ITSM-Frameworks hinsichtlich Eignung für einen DIY-Ansatz ohne externe Berater.

### Anforderungen

- Keine/minimale externe Kosten (Berater, Zertifizierung)
- DIY-tauglich: gute frei verfügbare Lernmaterialien (YouTube, Blogs, Templates)
- Kompatibel mit unserer Philosophie: Prozesse in Code/Workflows (n8n, OpenProject), nicht nur auf Papier
- AZAV-Audit-tauglich: Auditor muss nachvollziehen können, nach welcher Methodik wir arbeiten
- Skalierbar: Von Gründung (1 Person) bis Wachstum (5-7 Jahre, 2-3 AZAV-Rezertifizierungen)
- Offen/frei lizenziert bevorzugt

### Unsere Toolchain

OpenProject (Projektmanagement, CAPA), n8n (Workflow-Automation), CiviCRM (Kontakte), BookStack (Wiki), Keycloak (SSO/Zugang), Git (Versionierung), mkdocs (Dokumentation)

---

## Framework-Vergleich

### 1. FitSM (Federated IT Service Management)

**Kurzbeschreibung:** Leichtgewichtiger ITSM-Standard, speziell für kleine/mittlere Organisationen, Bildung und Forschung. Entwickelt im Rahmen eines EU-Forschungsprojekts (FP7), verwaltet von ITEMO (Non-Profit).

| Aspekt | Bewertung |
| --- | --- |
| **Lizenz** | Creative Commons — vollständig frei und offen |
| **Standard-Dokumente** | 6 Teile frei downloadbar (FitSM-0 bis FitSM-6) |
| **Prozesse** | 14 Kernprozesse (vs. ITIL 34) |
| **Zertifizierung (Person)** | Foundation ~200-400 EUR, Expert in 7 Tagen erreichbar |
| **Zertifizierung (Org)** | Nicht erforderlich, Konformitätsbewertung via FitSM-6 |
| **Templates** | FitSM-4: SLA-Templates, Service-Policy, Prozessbeschreibungen — kostenlos |
| **Freie Lernressourcen** | Exzellent: offizielles Online-Portal (fitsm.online), Schulungsfolien frei, YaSM-Wiki |
| **Community** | Mittel: Stark in EU-Forschung/Bildung, kleiner als ITIL |
| **ISO-20000-Kompatibilität** | Explizit als Einstieg in ISO 20000 konzipiert |

**Die 6 Teile des FitSM-Standards:**

| Teil | Inhalt |
| --- | --- |
| FitSM-0 | Überblick und Vokabular |
| FitSM-1 | Anforderungen an leichtgewichtiges ITSM |
| FitSM-2 | Prozessaktivitäten und Implementierungsleitfaden |
| FitSM-3 | Rollenmodell |
| FitSM-4 | Ausgewählte Templates und Muster (SLAs, Policies, Prozesse) |
| FitSM-5 | Implementierungsleitfäden (Service-Identifikation, ISO-20000-Konformität) |
| FitSM-6 | Maturity/Capability-Modell und Bewertungsschema |

**Stärken:**

- Komplett kostenlos — Standard, Templates, Schulungsmaterial
- Schnellste Implementierung aller Frameworks
- Speziell für kleine Orgs und Bildungseinrichtungen entwickelt
- Maturity-Model (FitSM-6) erlaubt schrittweises Wachstum
- Pfad zu ISO 20000 wenn später gewünscht
- EU-geförderte Herkunft — keine kommerzielle Agenda

**Schwächen:**

- Kleinere Community als ITIL — weniger YouTube-Content, weniger Udemy-Kurse
- Weniger bekannt bei AZAV-Auditoren (die kennen eher ISO 9001)
- Kein grosses Ökosystem an Beratern/Tools

**DIY-Machbarkeit: ★★★★★** — Komplett ohne externe Kosten umsetzbar

---

### 2. ITIL v4 (Information Technology Infrastructure Library)

**Kurzbeschreibung:** Der De-facto-Standard für IT Service Management. Umfassendes Framework mit Service Value System (SVS), 34 Practices, 7 Guiding Principles. Aktuell in Version 4 (seit 2019).

| Aspekt | Bewertung |
| --- | --- |
| **Lizenz** | Methodik frei nutzbar, keine Lizenzkosten für Anwendung |
| **Eigentümer** | Axelos/PeopleCert (kommerziell) |
| **Prozesse** | 34 Practices in 3 Kategorien (General, Service, Technical) |
| **Zertifizierung (Person)** | Foundation 680-2.500 EUR (Prüfung + Kurs), Renewal alle 3 Jahre |
| **Zertifizierung (Org)** | Nicht erforderlich — "wir arbeiten nach ITIL" ist legitim |
| **Templates** | Keine offiziellen freien Templates — Community-Templates existieren |
| **Freie Lernressourcen** | Hervorragend: Hunderte YouTube-Kurse, Cheatsheets (Purple Griffon, Cheatography), Blogs, Quizlet, Flashcards |
| **Community** | Sehr gross: Grösste ITSM-Community weltweit |
| **ISO-20000-Kompatibilität** | ITIL und ISO 20000 teilen Wurzeln, gute Überlappung |

**ITIL v4 Zertifizierungskosten (Stand 2025/2026):**

| Level | Prüfung | Prüfung + Kurs |
| --- | --- | --- |
| Foundation | 314-475 EUR | 1.000-2.500 EUR |
| Intermediate | je nach Modul | 2.000-4.000 EUR |
| Advanced/Master | deutlich teurer | 5.000+ EUR |

**Stärken:**

- Grösste Wissensbasis: YouTube, Udemy (~10-15 EUR/Kurs), Blogs, Cheatsheets en masse
- Universell bekannt — auch AZAV-Auditoren kennen den Begriff
- "Wir arbeiten nach ITIL" ist ohne jede Zertifizierung möglich und glaubwürdig
- Massiv skalierfähig — wächst mit der Organisation
- Riesige Community für Fragen und Austausch
- 7 Guiding Principles sind universell anwendbar und wertvoll

**Schwächen:**

- 34 Practices sind für 1-5 Personen deutlich überdimensioniert
- Offizielle Bücher/Kurse sind teuer (Foundation-Zertifizierung ab 680 EUR)
- Versuchung des Over-Engineering: mehr Prozess als nötig
- Templates müssen selbst erstellt oder aus Community-Quellen adaptiert werden
- Renewal-Gebühren (PeopleCert Plus ~129 EUR/Jahr oder Prüfung wiederholen)

**DIY-Machbarkeit: ★★★★☆** — Methodik frei, aber Lernkurve steiler als bei FitSM

---

### 3. USM (Unified Service Management)

**Kurzbeschreibung:** Vereinfachtes Service-Management der SURVUZ Foundation (Non-Profit). 5 Kernprozesse und 8 Standard-Workflows statt ITILs 34 Practices.

| Aspekt | Bewertung |
| --- | --- |
| **Lizenz** | Frei — keine Lizenzgebühren (SURVUZ Foundation, gemeinnützig) |
| **Prozesse** | 5 Kernprozesse, 8 Workflows |
| **Zertifizierung (Person)** | Foundation 2 Tage (~300-600 EUR, regional unterschiedlich), via APMG International |
| **Templates** | Frei für registrierte Organisationen über USM-Portal |
| **Freie Lernressourcen** | Gut: USM-Portal (usm-portal.com), USM-Wiki, USM-Coach, Online Reader Library |
| **Community** | Wachsend, aber deutlich kleiner als ITIL |

**Stärken:**

- Kostenlos nutzbar, ähnlich wie FitSM
- Radikal vereinfacht (5 statt 34 Prozesse) — minimaler Overhead
- SURVUZ Foundation hat Non-Profit-Mission — passt kulturell zu gemeinnützigem Träger
- Freie Templates und Tools nach Registrierung
- Buch-Käufer erhalten Zugang zur Online Reader Library

**Schwächen:**

- Deutlich kleiner als ITIL- und FitSM-Community
- Weniger YouTube/Udemy-Content zum Selbstlernen
- In Deutschland weniger bekannt — Auditoren kennen es kaum
- Weniger strukturierte Dokumentation als FitSM (kein 6-teiliger Standard)
- Zertifizierungskosten regional intransparent

**DIY-Machbarkeit: ★★★★☆** — Frei, aber weniger Selbstlern-Material als ITIL/FitSM

---

### 4. VeriSM (Versatile Service Management)

**Kurzbeschreibung:** Moderner Ansatz für digitale Transformation. Kein starres Framework, sondern ein "Operating Model" mit Management Mesh, das verschiedene Methoden integriert (ITIL, Agile, DevOps, Lean).

| Aspekt | Bewertung |
| --- | --- |
| **Eigentümer** | IFDC (International Foundation for Digital Competences), Van Haren Group |
| **Lizenz** | Proprietär — Bücher und Kurse kostenpflichtig |
| **Zertifizierung (Person)** | Foundation ~700-2.000 EUR (EXIN-Prüfung 199 EUR + Kurs) |
| **Templates** | Keine freien offiziellen Templates |
| **Freie Lernressourcen** | Begrenzt: Van Haren Community, einige Blogs |
| **Community** | Moderat |

**Drei Säulen von VeriSM:**

1. **Management Mesh:** Flexibilität, passende Methoden/Tools je Kontext
2. **Digital Leadership:** Organisationsveränderung im digitalen Zeitalter
3. **Service Culture:** Kundenorientierte Service-Kultur

**Stärken:**

- Explizit auf Digitalisierung ausgelegt — passt konzeptionell zu "Prozesse in Code"
- Flexibel: Integriert ITIL, Agile, DevOps, Lean nach Bedarf
- Kundenorientiert (Outside-In statt Inside-Out)
- Branchenübergreifend (nicht nur IT)

**Schwächen:**

- Proprietär und kostenpflichtig (Bücher, Kurse)
- Wenig freie Lernmaterialien — schwer DIY
- Eher Meta-Modell als konkretes Prozess-Framework — wenig "hands on"
- Keine konkreten Templates oder Prozessbeschreibungen zum Sofort-Einsetzen
- Für 1-5 Personen zu abstrakt und theoretisch

**DIY-Machbarkeit: ★★☆☆☆** — Zu wenig freies Material für echte Selbstimplementierung

---

### 5. ISM (Integrated Service Management)

**Kurzbeschreibung:** Kompakter Ansatz von Servitect (NL), der ITIL + DevOps + Agile + Lean + OBM (Organizational Behavior Management) in 7 Kernprozesse integriert.

| Aspekt | Bewertung |
| --- | --- |
| **Eigentümer** | Servitect (NL), Publikation über Van Haren Group |
| **Lizenz** | Proprietär, ISM ist eingetragene Marke |
| **Zertifizierung (Person)** | ISM 5 Foundation ~200-400 EUR (geschätzt) |
| **Templates** | Nicht frei verfügbar |
| **Freie Lernressourcen** | Minimal: ISM-Portal (ismportal.nl) mit einigen Case Studies |
| **Community** | Klein, hauptsächlich Niederlande |

**Stärken:**

- Pragmatisch: 7 statt 34 Prozesse
- Gute Integration verschiedener Methoden in einem kompakten Rahmen
- Phased-Implementation-Ansatz — wächst mit Organisation
- Real-World-Referenzen (z.B. St. Antonius Hospital, Wortell)

**Schwächen:**

- Proprietär — Bücher und Training kosten
- Sehr kleine Community — hauptsächlich niederländischer Markt
- Kaum freie Lernmaterialien — fast unmöglich im DIY-Modus
- In Deutschland praktisch unbekannt
- Kein offener Standard, keine freien Templates

**DIY-Machbarkeit: ★★☆☆☆** — Zu proprietär und zu kleine Community für Selbstimplementierung

---

### 6. IT4IT (The Open Group)

**Kurzbeschreibung:** Referenzarchitektur für das "Business of IT" mit 4 Value Streams (Plan, Build, Deliver, Run). Daten- und informationsgetrieben, fokussiert auf IT-Wertschöpfungsketten.

| Aspekt | Bewertung |
| --- | --- |
| **Eigentümer** | The Open Group (vendorneutral) |
| **Lizenz** | Kommerziell — kostenlos für Open-Group-Mitglieder, sonst jährliche Gebühr |
| **Zertifizierung (Person)** | Foundation ~1.325 EUR (Kurs + Prüfung) |
| **Templates** | Keine freien Templates |
| **Freie Lernressourcen** | Sehr begrenzt — Fokus auf kommerzielle Schulungen |
| **Community** | Moderat, hauptsächlich Enterprise-IT |

**IT4IT vs. ITIL:**

| Aspekt | ITIL v4 | IT4IT |
| --- | --- | --- |
| Typ | Prozess-/Practice-basiert | Informations-/Datenarchitektur |
| Ansatz | Deskriptive Guidance | Präskriptive Referenzarchitektur |
| Fokus | Practices, Kultur, Verhalten | Informationsflüsse, Automatisierung |
| Value Streams | 34+ Practices | 4 Kern: Plan, Build, Deliver, Run |
| Komplementär | Ja — IT4IT liefert Architekturschicht für ITIL-Prozesse |

**Stärken:**

- Daten-/informationsgetrieben — passt konzeptionell zu "Prozesse in Code"
- Komplementär zu ITIL (Architekturschicht unter den Prozessen)

**Schwächen:**

- Für Enterprise-IT konzipiert — massive Überdimensionierung für kleine Orgs
- Teuer (Zertifizierung, Mitgliedschaft)
- Kaum DIY-Material verfügbar
- Für einen Bildungsträger irrelevant

**DIY-Machbarkeit: ★☆☆☆☆** — Nicht geeignet

---

### 7. COBIT (ISACA)

**Kurzbeschreibung:** IT-Governance-Framework. Fokus auf Risikomanagement, Compliance und Kontrolle — nicht operatives Service Management. Verwaltet von ISACA.

| Aspekt | Bewertung |
| --- | --- |
| **Eigentümer** | ISACA (proprietär) |
| **Lizenz** | Proprietär, einige SME-Guides frei |
| **Zertifizierung** | Foundation ~200-400 EUR |
| **Freie Lernressourcen** | COBIT for SMEs Guide, einige ISACA-Webinare |

**Stärken:**

- Governance-Perspektive kann bei Wachstum relevant werden
- ISACA bietet SME-spezifische Guidance (für Organisationen bis 250 MA)
- Audit- und Compliance-Fokus

**Schwächen:**

- Governance ≠ Service Management — anderer Fokus als gebraucht
- Für operatives Prozessmanagement eines Bildungsträgers ungeeignet
- Proprietär — kostet
- Löst nicht das Problem der Prozessmodellierung

**DIY-Machbarkeit: ★★☆☆☆** — Falscher Fokus für unsere Anforderungen

---

### 8. ISO/IEC 20000

**Kurzbeschreibung:** Internationaler Standard für IT Service Management. Formale Organisationszertifizierung möglich (ähnlich ISO 9001, aber für ITSM).

| Aspekt | Bewertung |
| --- | --- |
| **Lizenz** | Standard-Dokument kostenpflichtig (~150 EUR) |
| **Zertifizierung (Org)** | 10.000-50.000+ EUR (Audit, Beratung, jährliche Überwachung) |
| **Freie Lernressourcen** | Moderat — vieles über ITIL-Wissen ableitbar |

**Kosten für kleine Organisationen:**

| Posten | Kosten |
| --- | --- |
| Audit-Gebühren | 3.000-15.000 EUR |
| Beratung/Implementierung | 5.000-30.000 EUR |
| Jährliche Überwachung | 2.000-10.000 EUR |
| **Gesamt (3 Jahre)** | **10.000-55.000 EUR** |

**Für uns relevant als:** Langfristziel (5-7 Jahre), nicht als Ausgangspunkt. FitSM ist explizit als Einstieg in ISO 20000 konzipiert — der Migrationspfad ist dokumentiert.

**DIY-Machbarkeit: ★☆☆☆☆** — Viel zu teuer für die Gründungsphase

---

## Vergleichsmatrix

| Kriterium | FitSM | ITIL v4 | USM | VeriSM | ISM | IT4IT | COBIT | ISO 20000 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Lizenzkosten** | 0 | 0 | 0 | $$$ | $$$ | $$$ | $$ | $$ |
| **Zertif. Person** | ~300 EUR | ~680-2.500 EUR | ~400 EUR | ~700-2.000 EUR | ~300 EUR | ~1.325 EUR | ~300 EUR | n/a |
| **Zertif. Org** | nicht nötig | nicht nötig | nicht nötig | nicht nötig | nicht nötig | nicht nötig | nicht nötig | 10.000+ EUR |
| **Freie Templates** | ★★★★★ | ★★☆☆☆ | ★★★★☆ | ★☆☆☆☆ | ★☆☆☆☆ | ★☆☆☆☆ | ★★☆☆☆ | ★☆☆☆☆ |
| **YouTube/Udemy** | ★★★☆☆ | ★★★★★ | ★★☆☆☆ | ★★☆☆☆ | ★☆☆☆☆ | ★☆☆☆☆ | ★★★☆☆ | ★★☆☆☆ |
| **Community** | ★★★☆☆ | ★★★★★ | ★★★☆☆ | ★★☆☆☆ | ★☆☆☆☆ | ★★☆☆☆ | ★★★☆☆ | ★★★☆☆ |
| **Einfachheit** | ★★★★★ | ★★☆☆☆ | ★★★★☆ | ★★★☆☆ | ★★★★☆ | ★★☆☆☆ | ★★☆☆☆ | ★★☆☆☆ |
| **Skalierbarkeit** | ★★★★☆ | ★★★★★ | ★★★☆☆ | ★★★★☆ | ★★★☆☆ | ★★★★★ | ★★★★☆ | ★★★★★ |
| **AZAV-Bekanntheit** | ★★☆☆☆ | ★★★★☆ | ★☆☆☆☆ | ★☆☆☆☆ | ★☆☆☆☆ | ★☆☆☆☆ | ★★☆☆☆ | ★★★★☆ |
| **DIY-tauglich** | ★★★★★ | ★★★★☆ | ★★★★☆ | ★★☆☆☆ | ★★☆☆☆ | ★☆☆☆☆ | ★★☆☆☆ | ★☆☆☆☆ |

---

## AZAV-Kontext: Was Auditoren erwarten

**Die AZAV schreibt kein bestimmtes ITSM-Framework vor.** Die fachkundige Stelle (CERTQUA, TÜV, DQS, DEKRA) prüft:

1. Existiert ein **systematisches QM-System** mit dokumentierten Prozessen?
2. Gibt es Nachweise der **Umsetzung** (nicht nur Papier)?
3. Gibt es **kontinuierliche Verbesserung** (KVP/CAPA)?
4. Sind die **9 AZAV-Pflichtbereiche** abgedeckt?

### Die 9 AZAV-Pflichtbereiche (§2 AZAV)

1. Leitbild und Kundenorientierung
2. Organisationsstruktur und Selbstverpflichtung (interne Audits)
3. Personalentwicklung für Leitung und Dozenten
4. Leistungsziele mit messbaren Indikatoren
5. Arbeitsmarktorientierung in Programmgestaltung
6. Individuelle Unterstützung der Teilnehmer
7. Programmevaluierung und Arbeitsmarkterfolg
8. Kooperationen und Netzwerkarbeit
9. Beschwerdemanagement mit regelmäßigen Teilnehmerbefragungen

### Was Auditoren wirklich suchen

Die meisten kleinen Bildungsträger nutzen **ISO 9001** als QM-Rahmen oder ein "eigenes" System. Ein ITSM-Framework ist eher für die IT-Prozesse relevant als für die AZAV-Kernprozesse (Aufnahme, Durchführung, Monitoring).

Der Auditor wird fragen: *"Nach welcher Methodik arbeiten Sie?"* — und eine schlüssige Antwort akzeptieren. Was zählt:

- **Systematik:** Erkennbare Methodik (egal welche)
- **Nachweisbarkeit:** Prozesse werden gelebt, nicht nur dokumentiert
- **Rückverfolgbarkeit:** Wer hat was wann geändert
- **Verbesserung:** CAPA-Zyklus ist aktiv

**Unser Vorteil:** Wir sind IT-getrieben. Unsere Prozesse SIND IT-Prozesse. Die Grenze zwischen "Bildungsprozess" und "IT-Prozess" verschwimmt bei uns bewusst. Git-History = Audit-Trail. n8n-Workflows = lebende Prozessdokumentation. OpenProject = CAPA-Tracking.

---

## Empfehlung: Hybrid-Ansatz — FitSM-Basis + ITIL-Vokabular

### Warum nicht nur eins?

- **FitSM** liefert den besten Rahmen für die Implementierung (kostenlos, leichtgewichtig, Templates, Maturity-Model)
- **ITIL** liefert das Vokabular, das Auditoren und Partner kennen, und die grösste Wissensbasis zum Selbstlernen
- Die Kombination ist stärker als jedes Framework allein

### Phasenplan (Gründung → 5-7 Jahre)

#### Phase 1: Gründung (2026, Jahr 0-1)

**Motto: "FitSM-light — nur was wir brauchen"**

- FitSM-Standard lesen und verstehen (FitSM-0, -1, -2 — kostenlos, 1-2 Tage)
- Aus den 14 FitSM-Prozessen die **6-8 relevanten** auswählen:
  - Service Portfolio Management (= unser Kursangebot)
  - Incident & Service Request Management (= Beschwerden + Anfragen)
  - Change Management (= Änderungen an Kursen, Plattform, Prozessen)
  - Configuration Management (= unsere Infrastruktur-Dokumentation)
  - Continual Service Improvement (= KVP)
  - Service Level Management (= Betreuungsverhältnis, Qualitätsziele)
- FitSM-4 Templates als Ausgangspunkt für eigene Prozessdokumentation
- FitSM-6 Maturity-Assessment: Wo stehen wir? (Level 1-2 realistisch)
- Prozesse direkt in n8n/OpenProject implementieren statt nur dokumentieren
- Dokumentation in Git/mkdocs mit ITIL-Vokabular (damit Auditoren es verstehen)

**Kosten: 0 EUR** (nur eigene Arbeitszeit)

#### Phase 2: AZAV-Zertifizierung (2026-2027, Jahr 1-2)

**Motto: "Wir arbeiten nach FitSM-Prinzipien mit ITIL-Terminologie"**

- Alle 6 QM-Kernprozesse auditfähig dokumentiert
- FitSM-6 Self-Assessment: Ziel Level 2-3
- ITIL Foundation (optional, 1 Person) — wenn Budget vorhanden (~680 EUR)
- Alternativ: ITIL via YouTube/Udemy lernen (~15 EUR) und Vokabular adaptieren
- n8n-Workflows als "lebende Prozessdokumentation" + PDF-Export für Auditor
- QM-Handbuch auf qm.abschluss.jetzt mit Auditor-Zugang

**Kosten: 0-680 EUR**

#### Phase 3: Wachstum (2027-2030, Jahr 2-5)

**Motto: "Mature processes, lightweight governance"**

- FitSM-6 Maturity Level 3-4 anstreben
- Weitere FitSM-Prozesse aktivieren je nach Bedarf
- Optional: FitSM Foundation Zertifizierung für QM-Verantwortliche (~300 EUR)
- Bei ausreichendem Wachstum: ISO 20000-Kompatibilität evaluieren
- ITIL-Practices selektiv ergänzen (z.B. Knowledge Management, Problem Management)

**Kosten: 0-600 EUR**

#### Phase 4: Reife (2030+, Jahr 5-7)

**Motto: "Professionelles ITSM bei Bedarf"**

- Bei signifikantem Wachstum (>20 MA): Evaluierung ob ISO 20000 sinnvoll
- FitSM → ISO 20000 Migrationspfad ist dokumentiert
- ITIL-Practices breiter ausrollen wenn Organisation das rechtfertigt
- Oder: Bei FitSM bleiben — es skaliert gut für mittelgrosse Organisationen

**Kosten: Situationsabhängig**

### Kostenübersicht 5-7 Jahre

| Phase | Zeitraum | Externe Kosten |
| --- | --- | --- |
| Gründung | 2026 | 0 EUR |
| AZAV-Zertifizierung | 2026-2027 | 0-680 EUR |
| Wachstum | 2027-2030 | 0-600 EUR |
| Reife | 2030+ | Situationsabhängig |
| **Gesamt (5 Jahre)** | | **0-1.280 EUR** |

Zum Vergleich: ISO 20000 allein würde 10.000-55.000 EUR kosten. ITIL-Zertifizierung für 3 Personen: 2.000-7.500 EUR.

---

### Wie passt das zu unserer Toolchain?

| FitSM-Prozess | Tool | Implementierung |
| --- | --- | --- |
| Service Portfolio | BookStack | Kursangebot-Katalog mit Versionen |
| Incident/Request | OpenProject | Tickets für Beschwerden, Anfragen |
| Change Management | Git + OpenProject | PRs für Prozessänderungen, Tickets für Kursänderungen |
| Configuration Mgmt | Git + Ansible | Infrastructure as Code = CMDB |
| Continual Improvement | OpenProject + n8n | CAPA-Tickets, automatisierte Audit-Erinnerungen |
| Service Level Mgmt | OpenProject | KPIs, Betreuungsverhältnis-Tracking |
| Information Security | Keycloak + Docs | Rollen, Zugang, Policies |
| Supplier Management | CiviCRM | Partner- und Sponsoren-Verwaltung |

---

## Quellen

### Standards und Organisationen

- FitSM Standard: [fitsm.eu](https://www.fitsm.eu/)
- FitSM Online-Kurs: [fitsm.online](https://fitsm.online/en/home/)
- FitSM Zertifizierung: [APMG International](https://apmg-international.com/product/fitsm-lightweight-streamlined-it-service-management-certification)
- ITIL v4: [PeopleCert](https://www.peoplecert.org/browse-certifications/it-governance-and-service-management/ITIL-1/itil-4-foundation-2565)
- USM: [SURVUZ Foundation / USM-Portal](https://usm-portal.com/?lang=en)
- VeriSM: [IFDC / Van Haren Group](https://www.vanharen.net/standards/verism/)
- ISM: [Servitect / ISM-Portal](https://ismportal.nl/en/)
- IT4IT: [The Open Group](https://www.opengroup.org/certifications/it4it)
- COBIT: [ISACA](https://www.isaca.org/credentialing/cobit-foundation)
- ISO 20000: [ISO](https://www.iso.org/standard/70636.html)

### AZAV und QM

- AZAV Volltext: [gesetze-im-internet.de/azav](https://www.gesetze-im-internet.de/azav/BJNR050400012.html)
- CERTQUA: [certqua.de](https://www.certqua.de/)
- TÜV NORD AZAV: [tuev-nord.de](https://www.tuev-nord.de/en/company/certification/azav/)

### Vergleiche und Lernressourcen

- FitSM vs ITIL vs ISO 20000: [ManageEngine](https://www.manageengine.com/products/service-desk/itsm/fitsm-vs-itil.html)
- ITIL für KMU: [IT Process Maps Wiki](https://wiki.en.it-processmaps.com/index.php/ITIL_for_Small_and_Medium-Sized_Businesses)
- ITIL Cheatsheets: [Purple Griffon](https://purplegriffon.com/blog/itil4-foundation-the-definitive), [Cheatography](https://cheatography.com/bijomaru78/cheat-sheets/itil-4-foundation-syllabus/)
- YaSM Service Management Wiki: [yasm.com](https://yasm.com/wiki/)
