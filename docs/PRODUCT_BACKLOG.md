# Product Backlog – Fachliche Struktur

Diese Datei dokumentiert die fachliche Backlog-Struktur nach der Überprüfung der User Stories durch UAT & QA. Es wurden **keine neuen Epics oder Product Items** angelegt; vorhandene Inhalte und Zuordnungen wurden fachlich präzisiert.

## Überarbeitete User Stories

### US-01 – Angaben zur Schule erfassen

Als Schulleitung möchte ich Angaben zu unserer Schule eingeben können, damit ich feststellen kann, ob unsere Schule zu einer förderfähigen Schulkategorie gehört.

### US-02 – Antragsberechtigung prüfen

Als Schulleitung möchte ich erfahren, ob meine Schule grundsätzlich antragsberechtigt ist, damit ich weiß, ob ich mit der Prüfung der geplanten Digitalisierungsmaßnahme fortfahren kann.

### US-03 – Digitalisierungsmaßnahme und Rahmendaten erfassen

Als Schulleitung möchte ich meine geplante Digitalisierungsmaßnahme und die dafür relevanten Rahmendaten unserer Schule erfassen, damit die Förderfähigkeit der Maßnahme geprüft werden kann.

### US-04 – Förderbereich auswählen

Als Schulleitung möchte ich meine Maßnahme einem Förderbereich zuordnen, damit die passenden Förderkriterien angewendet werden.

### US-05 – Förderkriterien beantworten

Als Schulleitung möchte ich gezielte Fragen zu meiner Maßnahme beantworten, damit die Anwendung deren Förderfähigkeit bewerten kann.

### US-06 – Gesamtergebnis erhalten

Als Schulleitung möchte ich ein Gesamtergebnis erhalten, damit ich erkenne, ob unsere Schule für die geplante Maßnahme grundsätzlich einen Förderantrag stellen kann.

### US-07 – Ergebnis nachvollziehen

Als Schulleitung möchte ich verstehen, wie das Ergebnis zustande gekommen ist, damit ich die Bewertung nachvollziehen kann.

### US-08 – Nächste Schritte erkennen

Als Schulleitung möchte ich empfohlene nächste Schritte erhalten, damit ich die weitere Vorbereitung des Förderantrags planen kann.

## Fachliche Epics und Zuordnung

### Epic 1 – Einstieg für Schulleitungen

GitHub: #13

Schwerpunkt:

- US-01 – Angaben zur Schule erfassen
- US-02 – Antragsberechtigung prüfen

Product Items: PI-01, PI-02, PI-06

### Epic 2 – Digitalisierungsmaßnahme erfassen

GitHub: #14

Schwerpunkt:

- US-03 – Digitalisierungsmaßnahme und Rahmendaten erfassen

Product Item: PI-03

### Epic 3 – Förderbereiche

GitHub: #15

Schwerpunkt:

- US-04 – Förderbereich auswählen

MVP-Förderbereiche:

1. IT-Infrastruktur, Netzwerk und WLAN
2. Digitale Endgeräte
3. Bildungssoftware und digitale Lernplattformen

Pro Prüfung wird genau ein Förderbereich ausgewählt.

Product Item: PI-04

### Epic 4 – Förderfähigkeitsprüfung

GitHub: #16

Schwerpunkt:

- US-05 – Förderkriterien beantworten

Product Item: PI-05

### Epic 5 – Förderfähigkeitslogik

GitHub: #17

Schwerpunkte:

- US-02 – Antragsberechtigung prüfen
- US-05 – Förderkriterien beantworten
- US-06 – Gesamtergebnis erhalten

Product Items: PI-07, PI-08

### Epic 6 – Ergebnis

GitHub: #18

Schwerpunkte:

- US-06 – Gesamtergebnis erhalten
- US-07 – Ergebnis nachvollziehen
- US-08 – Nächste Schritte erkennen

Product Items: PI-09 bis PI-13

### Epic 7 – Mehrere Maßnahmen

GitHub: #19

Dieses Epic bleibt bestehen, liegt aber außerhalb der neuen Kern-User-Stories und wird für den ersten Release bewusst schlank behandelt.

Product Items: PI-14 bis PI-16

### Epic 8 – Persönlicher Digitalisierungsüberblick

GitHub: #20

Erweiterung nach dem eigentlichen Förderfähigkeitscheck. Für dieses Epic wurden keine neuen Product Items angelegt.

## Product Items

| ID | Product Item | Bezug zu User Story | Priorität | GitHub |
|---|---|---|---|---|
| PI-01 | Förderfähigkeitscheck starten | unterstützt US-01 / US-02 | Must | #21 |
| PI-02 | Förderrelevante Schuldaten erfassen | US-01 | Must | #22 |
| PI-03 | Digitalisierungsmaßnahme erfassen | US-03 | Must | #23 |
| PI-04 | Förderbereich zur Maßnahme bestimmen | US-04 | Must | #24 |
| PI-05 | Dynamischen Fragenkatalog bereitstellen | US-05 | Must | #25 |
| PI-06 | Antworten und Bearbeitungsstand speichern | unterstützend für US-01 bis US-05 | Must | #26 |
| PI-07 | Förderregeln auf Antworten anwenden | US-02 / US-05 | Must | #27 |
| PI-08 | Förderstatus bestimmen | US-02 / US-06 | Must | #28 |
| PI-09 | Prüfergebnis nachvollziehbar begründen | US-07 | Must | #29 |
| PI-10 | Fehlende Voraussetzungen und Nachweise anzeigen | US-07 / US-08 | Must | #30 |
| PI-11 | Zugrunde liegende Förderregeln anzeigen | US-07 | Must | #31 |
| PI-12 | Nächste Schritte ausgeben | US-08 | Must | #32 |
| PI-13 | Prüfergebnis speichern und exportieren | unterstützend für US-06 bis US-08 | Should | #33 |
| PI-14 | Weitere Maßnahme anlegen | außerhalb der neuen Kern-User-Stories | Must | #34 |
| PI-15 | Maßnahmenübersicht bereitstellen | außerhalb der neuen Kern-User-Stories | Must | #35 |
| PI-16 | Maßnahme erneut prüfen | außerhalb der neuen Kern-User-Stories | Should | #36 |

## Sprint-Rahmen

- **Sprint 1:** Infrastruktur
- **Sprint 2:** Antragsberechtigung & Maßnahmenprüfung
- **Sprint 3:** Gesamtergebnis & nächste Schritte

Die operative Priorisierung, Story-Point-Schätzung und Verantwortungszuordnung erfolgt weiterhin im GitHub Project durch das Team.
