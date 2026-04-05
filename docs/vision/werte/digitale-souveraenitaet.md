# Digitale Souveränität

> Wer anderen IT beibringt, sollte selbst keine digitalen Abhängigkeiten aufbauen, die er seinen Lernenden abrät.

## Grundhaltung

Ein IT-Bildungsträger, der Daten seiner Teilnehmer an US-Clouds ausliefert, ist unglaubwürdig. Wir richten unsere gesamte Infrastruktur danach aus, dass **Teilnehmer und Organisation die Kontrolle über ihre Daten behalten** -- nicht als Zusatz-Feature, sondern als Grundrecht.

## Datenschutz & DSGVO

- **DSGVO-konform ab Tag 1:** Datenschutzerklärung, Verzeichnis von Verarbeitungstätigkeiten (VVT), AV-Verträge mit allen Auftragsverarbeitern
- **Datenminimierung:** Wir erheben nur, was wir wirklich brauchen. Keine "vielleicht-später"-Felder.
- **Löschkonzepte:** Teilnehmerdaten werden nach Kursende und Aufbewahrungsfrist automatisiert gelöscht
- **Rechte der Betroffenen:** Auskunft, Berichtigung, Löschung, Datenübertragbarkeit -- technisch implementiert, nicht nur formal zugesagt
- **Keine Tracker:** Auf Website und Lernplattform keine Google Analytics, Facebook-Pixel, Hotjar o.ä.

Details stehen in der Datenschutzerklärung (Website) sowie in den technischen und organisatorischen Maßnahmen (TOM) des QM-Handbuchs.

## Deutsche Server, keine US-Clouds

- **Primäre Infrastruktur:** Eigene Server bei deutschen Hosting-Anbietern (Proxmox/VPS)
- **Keine Nutzung von US-Clouds** für personenbezogene Daten der Teilnehmer (auch nicht bei "EU-Regionen" -- der CLOUD Act bleibt ein Risiko)
- **Ausnahmen mit klarer Begrenzung:** Rein öffentliche, nicht-personenbezogene Inhalte dürfen auf globalen CDNs liegen, wenn es die Performance erfordert
- **Transparenz:** Die Liste aller Drittdienste ist in der Datenschutzerklärung dokumentiert

## Selbstgehostete KI

KI-unterstützte Lernwerkzeuge sind ein zentrales Thema. Wir nutzen sie -- aber nicht zum Preis der Teilnehmer-Daten:

- **Lokale Modelle:** Für Teilnehmer-bezogene KI-Nutzung (z.B. Lernhilfen, Feedback) kommen selbst gehostete Open-Weight-Modelle zum Einsatz
- **Keine Daten an OpenAI, Google, Anthropic** bei personenbezogenen Eingaben
- **Ausnahmen:** Nicht-personenbezogene Aufgaben (z.B. Content-Erstellung durch Mitarbeitende für öffentliche Materialien) dürfen kommerzielle APIs nutzen -- dokumentiert und mit Kennzeichnung
- **KI-Kennzeichnung:** Inhalte, die überwiegend KI-generiert sind, werden als solche markiert

## Open-Source-Commitment

Open Source ist für uns nicht Mittel zum Zweck, sondern eine Grundüberzeugung. Das "Warum":

- **Reproduzierbarkeit:** Jeder kann unsere Plattform nachbauen, prüfen, verbessern
- **Unabhängigkeit:** Wir sind von keinem Vendor abhängig, der Preise diktieren oder Features wegnehmen kann
- **Gemeinwohl:** Was mit öffentlichen Mitteln (Förderungen, Steuergelder-finanzierte Spenden) entsteht, gehört der Öffentlichkeit
- **Bildungsauftrag:** Unsere Lernenden können unseren Code als Studienobjekt nutzen -- echter Produktionscode, nicht Übungsbeispiele
- **Vertrauen:** Wir haben nichts zu verstecken. Wer uns prüfen will, kann in den Code sehen.

### Konkrete Umsetzung

| Bereich | Stack & Lizenz |
| --- | --- |
| Lernplattform Backend (bodo-os) | Django, Python -- MIT/Apache-kompatibel |
| Lernplattform Frontend (my-paths) | Vue 3, offline-fähig -- Open Source |
| Infrastruktur-Automatisierung | Ansible Playbooks, vollständig reproduzierbar |
| Crowdfunding-Plattform | Drogon (C++17) + Next.js -- eigene Non-Profit-Plattform |
| Meetup-App | Laravel -- Open Source |
| Lernmaterialien | Creative Commons CC BY-SA wo möglich |
| Community-Beitrag | Regelmäßige Spenden an genutzte OSS-Projekte (Jahresbericht) |

## Offene Standards & keine Lock-ins

- **Datenformate:** Markdown, JSON, CSV, ICS -- portabel und wiederverwendbar
- **Authentifizierung:** Keycloak/OIDC -- Standard, nicht proprietär
- **Kein SaaS-Lock-in:** Kalender, Dokumente, Chats laufen auf eigenen oder austauschbaren Systemen
- **Export jederzeit:** Teilnehmer können ihre Daten jederzeit exportieren (Portabilitätsrecht der DSGVO als Standard, nicht als Ausnahme)

## Bezug zu anderen Werten

- **[Freie Bildung](freie-bildung.md):** Open Source ist der technische Ausdruck dessen, was "freie Bildung" inhaltlich bedeutet
- **[Ökologische Verantwortung](oekologische-verantwortung.md):** Selbst gehostet auf Ökostrom-Servern schlägt US-Cloud mit unklarer Energiemix
- **[Governance & Ethik](governance-und-ethik.md):** Transparente Technik ist Voraussetzung für transparente Organisation
