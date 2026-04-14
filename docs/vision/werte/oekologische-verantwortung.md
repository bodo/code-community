# Ökologische Verantwortung

> Öffentliche Präsenz: <https://abschluss.jetzt/de/werte/>

> Das "E" in ESG: Was ein IT-Bildungsträger für die ökologischen Grenzen des Planeten tun kann -- und was nicht.

## Grundhaltung

Bildung ist im Vergleich zu Schwerindustrie ein klimaschonender Sektor. Trotzdem hat auch ein IT-Bildungsträger einen ökologischen Fußabdruck: Server, Hardware, Pendelwege, Papier, Strom. Wir behandeln diese Posten nicht als vernachlässigbar, sondern messen und reduzieren sie konsequent.

## Ressourcensparsamkeit

- **Remote-first:** Präsenztermine sind die Ausnahme, nicht die Regel. Das eliminiert Pendelwege für Dutzende Teilnehmer pro Kurs.
- **Asynchron statt Dauerbetrieb:** Lernmaterial ist wiederverwendbar und muss nicht in jedem Kurs neu produziert werden.
- **Papierlos:** Keine gedruckten Skripte, keine papierbasierten Anmeldeformulare. Unterlagen als Markdown/PDF, Unterschriften digital.
- **Digitale Zertifikate:** Teilnahmebestätigungen werden digital ausgestellt, Print nur auf Anforderung.

## Erneuerbare Energien

**Anforderung an alle Hosting-Partner:** Rechenzentren müssen Ökostrom nutzen und dies jährlich nachweisen (z.B. via Grünstrom-Label, Herkunftsnachweis, TÜV-Zertifikat).

- **Aktuelle Infrastruktur:** Eigene Server bei deutschen Anbietern, die zu 100% Ökostrom einsetzen (Nachweis im jährlichen [Wirkungsbericht](wirkungsbericht/2026.md))
- **Green-Clause in Verträgen:** Jeder neue Hosting- oder Infrastruktur-Vertrag enthält eine Klausel zur Ökostrom-Anforderung (siehe [Präambel-Textbaustein](praeambel-textbaustein.md))
- **Regelmäßiger Review:** Hosting-Partner werden einmal jährlich auf ihre Energiebilanz geprüft; Nichterfüllung führt zu Wechsel

## Hardware: Refurbished statt Neu

IT-Bildung wird häufig mit Neu-Hardware assoziiert. Wir gehen den umgekehrten Weg:

- **Refurbished-Laptops für Stipendiaten** und Leih-Geräte: Gebrauchtgeräte professionell aufbereitet, Linux vorinstalliert
- **CO2-Einsparung:** Pro refurbished Laptop werden ca. 200--400 kg CO2-Äquivalente vermieden (Quelle: Bitkom/IT Green-Berechnungen, siehe [wirkung-und-nachhaltigkeit.md](../wirkung-und-nachhaltigkeit.md))
- **Bei 100 Geräten über die ersten Jahre:** 20--40 Tonnen CO2 vermieden -- messbar und im Wirkungsbericht ausgewiesen
- **Keine "neueste-Generation-ist-nötig"-Mentalität:** Für Fachinformatiker-Lernstoff reichen gebrauchte Business-Laptops vollkommen aus. Das ist didaktisch ehrlich: Wer auf einem betagten Gerät debuggen kann, versteht die Maschine besser.

## Langlebigkeit & Reparierbarkeit

- **Reparatur vor Ersatz:** Defekte Leihgeräte werden -- wo wirtschaftlich vertretbar -- repariert, nicht ersetzt
- **Modulare Hardware bevorzugt:** Bei Neubeschaffung Präferenz für reparierbare Geräte (z.B. Framework-Laptops, ThinkPads mit Ersatzteilversorgung)
- **Software-Langlebigkeit:** Linux läuft auf Geräten, die Windows-Updates längst nicht mehr unterstützen -- damit verlängern wir die Nutzungsdauer um Jahre
- **Keine geplante Obsoleszenz in der Lehre:** Unsere Kurse funktionieren auf 10 Jahre alter Hardware. Wer das Gegenteil braucht, lernt nicht FIAE/FISI, sondern Hype.

## Paperless-Policy

- **Unterlagen:** Markdown/Git-basiert, PDF-Export für Formalien
- **Unterschriften:** Digital (eIDAS-konform wo nötig, sonst einfache elektronische Signatur)
- **Akten:** Verwaltung in QM-Systemen, nicht in Leitz-Ordnern
- **Ausnahmen:** Dokumente, die per Gesetz Papierform erfordern (selten im Bildungsbereich)

## CO2-Bilanz-Methodik

Die konkrete Bilanz erscheint jährlich im [Wirkungsbericht](wirkungsbericht/2026.md), Abschnitt 4 (Ressourcen und Wirkung). Erfasst werden:

| Kategorie | Messgröße | Datenquelle |
| --- | --- | --- |
| Strom Rechenzentrum | kWh × Emissionsfaktor Ökostrom | Rechnung Hosting-Anbieter |
| Strom Büro/Hackerspace | kWh (anteilig) | Stromrechnung |
| Pendelwege Präsenz | Personen-km × Verkehrsmittel-Faktor | Freiwillige Selbstauskunft |
| Hardware (Neubeschaffung) | Geräte × Herstellungs-CO2 | Bitkom/Hersteller-Angaben |
| Vermeidung durch Refurbish | Geräte × vermiedene Herstellung | Differenzrechnung |
| Papier | Blatt (kg) | Einkauf |

**Transparenz vor Präzision:** Wir publizieren die Bilanz, auch wenn sie unvollständig ist. Besser eine ehrliche Schätzung als ein Greenwashing-Perfektionsversprechen.

## Was wir nicht tun

Damit die Werte glaubwürdig bleiben, grenzen wir ab:

- **Keine CO2-Kompensation als Feigenblatt** -- wir reduzieren tatsächlich, statt Ablass zu kaufen
- **Keine "klimaneutral"-Werbung** ohne nachvollziehbare Rechnung
- **Keine Scheinlösungen** wie "der Cloud-Provider ist ja grün" -- wir wählen selbst und prüfen selbst
