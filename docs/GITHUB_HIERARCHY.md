# GitHub-Struktur und Scrum-Hierarchie – Abschlussstand

**Stand:** 02.10.2026

## Sprint 1 – Infrastruktur

### Sprint-Epic

- [x] #2 – Azure-App-Architektur bereitstellen

### Technische Arbeitspakete

- [x] #3 – Azure VM
- [x] #4 – Linux aktualisieren und absichern
- [x] #5 – Nginx
- [x] #6 – Node.js / React / PWA Build
- [x] #7 – GitHub Deployment
- [x] #8 – DNS / Cloudflare
- [x] #9 – HTTPS/TLS
- [x] #10 – Landingpage / E2E

**Sprint-Status:** Done

## Sprint 2 – Erfassen & Einreichen

### Sprint-Epic

- [x] #11 – Digitalisierungsvorhaben erfassen und vorprüfen

### Fachliche Epics

- [x] #13 – Einstieg für Schulleitungen
- [x] #14 – Digitalisierungsmaßnahme erfassen
- [x] #15 – Förderbereiche bestimmen
- [x] #16 – Förderfragen
- [x] #17 – ursprüngliche automatische Förderlogik → **Not planned / ersetzt**

### Product Items

- [x] #21 – PI-01 Förderfähigkeitscheck starten
- [x] #22 – PI-02 Schuldaten erfassen
- [x] #23 – PI-03 Maßnahme erfassen
- [x] #24 – PI-04 Förderbereich bestimmen
- [x] #25 – PI-05 Förderfragenkatalog
- [x] #26 – PI-06 Antworten und Bearbeitungsstand
- [x] #27 – PI-07 automatische Förderregeln → **Not planned / ersetzt**
- [x] #28 – PI-08 automatischer Förderstatus → **Not planned / ersetzt**
- [x] #80 – PI-17 Dokumente
- [x] #102 – PI-18 Profil / Kontolöschung

**Sprint-Status:** Done im freigegebenen Scope

## Sprint 3 – Auswerten & Handeln

### Sprint-Epic

- [x] #12 – Auswertung, Handlungsempfehlungen und Prüfbericht

### Fachliche Epics

- [x] #18 – Ergebnis der Förderfähigkeitsprüfung
- [x] #19 – Mehrere Maßnahmen verwalten
- [x] #20 – Persönlicher Digitalisierungsüberblick

### Product Items

- [x] #29 – PI-09 Ergebnis begründen
- [x] #30 – PI-10 fehlende Voraussetzungen / Nachweise
- [x] #31 – PI-11 automatische Regelanzeige → **Not planned / ersetzt**
- [x] #32 – PI-12 nächste Schritte
- [x] #33 – PI-13 speichern und PDF exportieren
- [x] #34 – PI-14 weitere Maßnahme
- [x] #35 – PI-15 Maßnahmenübersicht
- [x] #36 – PI-16 erneut prüfen / einreichen

### Sachbearbeiterportal

- [x] #105 – Human-in-the-Loop-Prüfworkflow
- [x] #114 – Rollen, Zugang und Review-Shell
- [x] #115 – Posteingang und digitale Akte
- [x] #116 – Übernahme, Entscheidungen und Nachforderungen
- [x] #117 – Submission-Versionen, Rückkanal und Audit
- [x] #118 – Dokumentzugriff und UX-Polish
- [x] #119 – E2E-Abnahme und Sicherheitsnachweise

**Sprint-Status:** Done im freigegebenen MVP-Scope

## Parent-/Sub-Issue-Logik

Die fachliche Struktur lautet:

```text
Sprint-Epic
→ fachliches Epic
→ Product Item
→ technische Umsetzung / PR
```

Der Human-in-the-Loop-Workflow ergänzt Sprint 3 als freigegebene Scope-Weiterentwicklung.

## Bewusste Scope-Änderung

Die automatische Förderregel-Engine wurde während des Refinements durch die menschliche Sachbearbeiterprüfung ersetzt.

Betroffen:

- #17
- #27
- #28
- #31

Diese Einträge sind nicht „unerledigt“, sondern fachlich korrekt als **Not planned / ersetzt** abgeschlossen.

## Abschlussaudit

Am 02.10.2026:

- [x] alle Epics geprüft
- [x] alle Product Items geprüft
- [x] alle Done-Issues ohne offene Checkboxen
- [x] Not-planned-Issues nachvollziehbar dokumentiert
- [x] alle drei Sprint-Epics abgeschlossen

Siehe [PROJECT_CLOSURE.md](PROJECT_CLOSURE.md).
