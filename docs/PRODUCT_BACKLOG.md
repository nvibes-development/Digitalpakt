# Product Backlog – Fachliche Struktur

Diese Datei dokumentiert die vom Team definierte fachliche Backlog-Struktur. Die operative Planung, Sprint-Zuordnung und Story-Point-Schätzung erfolgt im GitHub Project durch das Team.

## Fachliche Epics

### Epic 1 – Einstieg für Schulleitungen

GitHub: #13

- US-01 (Must): Förderfähigkeitscheck starten
- US-02 (Must): grundlegende Angaben zur Schule machen
- US-03 (Must): zu prüfende Digitalisierungsmaßnahme angeben
- US-04 (Should): Ablauf des Prüfprozesses erkennen
- US-05 (Should): Check unterbrechen und später fortsetzen

Product Items: PI-01, PI-02, PI-06

### Epic 2 – Digitalisierungsmaßnahme erfassen

GitHub: #14

- US-06 (Must): geplante Digitalisierungsmaßnahme beschreiben
- US-07 (Must): Maßnahme einem Förderbereich zuordnen
- US-08 (Should): Status geplant / beantragt / umgesetzt angeben
- US-09 (Should): voraussichtliche Kosten angeben
- US-10 (Should): Umsetzungszeitraum angeben
- US-11 (Should): relevante Dokumente / Nachweise hinterlegen

Product Item: PI-03

### Epic 3 – Förderbereiche

GitHub: #15

Das System bestimmt aus der Maßnahme die relevanten Förderbereiche und vermeidet unnötige Fragen.

Product Item: PI-04

### Epic 4 – Förderfähigkeitsprüfung

GitHub: #16

- US-12 bis US-19 bilden die zentrale fachliche Prüfung ab.
- Der Nutzer beantwortet nur relevante Fragen.
- Fehlende Angaben, Voraussetzungen und Nachweise werden sichtbar.
- Das Prüfergebnis muss nachvollziehbar sein.

Product Item: PI-05

### Epic 5 – Förderfähigkeitslogik

GitHub: #17

Der technische und fachliche Kern wertet die Antworten anhand hinterlegter Förderregeln aus und bestimmt den Förderstatus.

Product Items: PI-07, PI-08

### Epic 6 – Ergebnis

GitHub: #18

Das Ergebnis enthält Förderstatus, Begründung, erfüllte und fehlende Voraussetzungen, Nachweise, Regelgrundlage und nächste Schritte.

Product Items: PI-09 bis PI-13

### Epic 7 – Mehrere Maßnahmen

GitHub: #19

- US-20 bis US-24
- Für den ersten Release bewusst schlank halten.

Product Items: PI-14 bis PI-16

### Epic 8 – Persönlicher Digitalisierungsüberblick

GitHub: #20

Erweiterung nach dem eigentlichen Förderfähigkeitscheck. Aus mehreren Einzelprüfungen entsteht ein Digitalisierungsbild der Schule.

Im Teamkonzept wurden hierfür noch keine eigenen Product Items spezifiziert.

## Product Items für den MVP

| ID | Product Item | Zugehörige US | Priorität | GitHub |
|---|---|---|---|---|
| PI-01 | Förderfähigkeitscheck starten | US-01, US-04 | Must | #21 |
| PI-02 | Förderrelevante Schuldaten erfassen | US-02 | Must | #22 |
| PI-03 | Digitalisierungsmaßnahme erfassen | US-03, US-06, US-08–10 | Must | #23 |
| PI-04 | Förderbereich zur Maßnahme bestimmen | US-07, US-13 | Must | #24 |
| PI-05 | Dynamischen Fragenkatalog bereitstellen | US-12–14 | Must | #25 |
| PI-06 | Antworten und Bearbeitungsstand speichern | US-05, US-14 | Must | #26 |
| PI-07 | Förderregeln auf Antworten anwenden | US-12, US-15 | Must | #27 |
| PI-08 | Förderstatus bestimmen | US-15, US-17 | Must | #28 |
| PI-09 | Prüfergebnis nachvollziehbar begründen | US-16, US-17 | Must | #29 |
| PI-10 | Fehlende Voraussetzungen und Nachweise anzeigen | US-14, US-18 | Must | #30 |
| PI-11 | Zugrunde liegende Förderregeln anzeigen | US-19 | Must | #31 |
| PI-12 | Nächste Schritte ausgeben | Ergebnis-Epic | Must | #32 |
| PI-13 | Prüfergebnis speichern und exportieren | MVP-Schritt 9 | Should | #33 |
| PI-14 | Weitere Maßnahme anlegen | US-20 | Must | #34 |
| PI-15 | Maßnahmenübersicht bereitstellen | US-21, US-23 | Must | #35 |
| PI-16 | Maßnahme erneut prüfen | US-24 | Should | #36 |

## Sprint-Rahmen

Die fachlichen Epics und Product Items werden im Refinement durch das Team in den bestehenden Sprint-Rahmen eingeordnet:

- **Sprint 1:** Infrastruktur
- **Sprint 2:** Erfassen & Prüfen
- **Sprint 3:** Auswerten & Handeln

Die Zuordnung ist bewusst nicht vollständig vorweggenommen, damit das Team im Refinement und Sprint Planning priorisieren und schätzen kann.
