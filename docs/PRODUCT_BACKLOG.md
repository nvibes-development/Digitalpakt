# Product Backlog – Abschlussstand

**Stand:** 02.10.2026  
**Status:** freigegebener MVP-Backlog abgeschlossen

## Produktmodell

KLARFÖRDERN verwendet einen Human-in-the-Loop-Prüfprozess.

Die Schule:

1. erfasst Schuldaten,
2. legt eine Maßnahme an,
3. wählt einen Förderbereich,
4. beantwortet neun Förderfragen,
5. lädt Dokumente hoch,
6. reicht die Maßnahme ein.

Danach prüft ein autorisierter Sachbearbeiter die versionierte digitale Akte und dokumentiert die menschliche Ersteinschätzung.

## Rollen

- Schulportal: `school_admin`
- Sachbearbeiterportal: `case_worker`
- initialer Master-Sachbearbeiter: `sachbearbeiter@nvibes.de`

## User Stories

### US-01 – Schuldaten erfassen
Als Schulleitung möchte ich förderrelevante Schuldaten erfassen.

### US-02 – Prüfung vorbereiten
Als Schulleitung möchte ich vollständige Schuldaten als Grundlage der fachlichen Prüfung bereitstellen.

### US-03 – Maßnahme erfassen
Als Schulleitung möchte ich eine Digitalisierungmaßnahme mit relevanten Rahmendaten erfassen.

### US-04 – Förderbereich auswählen
Als Schulleitung möchte ich meine Maßnahme genau einem MVP-Förderbereich zuordnen.

### US-05 – Förderfragen beantworten
Als Schulleitung möchte ich neun Förderfragen mit Ja / Nein / Nicht bekannt beantworten.

### US-06 – Maßnahme einreichen
Als Schulleitung möchte ich eine vollständige Maßnahme mit Dokumenten zur Prüfung einreichen.

### US-07 – Ergebnis nachvollziehen
Als Schulleitung möchte ich Status und öffentliche Rückmeldung der Sachbearbeitung nachvollziehen.

### US-08 – Nächste Schritte erkennen
Als Schulleitung möchte ich bei einer Nachforderung erkennen, was ergänzt werden muss.

### US-09 – Sachbearbeitung
Als autorisierter Sachbearbeiter möchte ich eingereichte Maßnahmen als digitale Akte prüfen und eine menschliche Grün-/Gelb-/Rot-Entscheidung dokumentieren.

## Epics – Abschlussstatus

| Epic | GitHub | Status |
|---|---:|---|
| Azure-App-Architektur | #2 | Done |
| Digitalisierungsvorhaben erfassen und vorprüfen | #11 | Done |
| Auswertung, Handlungsempfehlungen und Prüfbericht | #12 | Done |
| Einstieg für Schulleitungen | #13 | Done |
| Digitalisierungsmaßnahme erfassen | #14 | Done |
| Förderbereiche bestimmen | #15 | Done |
| Förderfähigkeitsprüfung / Fragen | #16 | Done |
| ursprüngliche automatische Förderlogik | #17 | Not planned / ersetzt |
| Ergebnis der Förderfähigkeitsprüfung | #18 | Done |
| Mehrere Maßnahmen verwalten | #19 | Done |
| Persönlicher Digitalisierungsüberblick | #20 | Done |

## Product Items – Abschlussstatus

| ID | Product Item | GitHub | Status |
|---|---|---:|---|
| PI-01 | Förderfähigkeitscheck starten | #21 | Done |
| PI-02 | Förderrelevante Schuldaten erfassen | #22 | Done |
| PI-03 | Digitalisierungsmaßnahme erfassen | #23 | Done |
| PI-04 | Förderbereich bestimmen | #24 | Done |
| PI-05 | Förderfragenkatalog bereitstellen | #25 | Done |
| PI-06 | Antworten und Bearbeitungsstand speichern | #26 | Done |
| PI-07 | automatische Förderregeln anwenden | #27 | Not planned / ersetzt |
| PI-08 | automatischen Förderstatus bestimmen | #28 | Not planned / ersetzt |
| PI-09 | Prüfergebnis nachvollziehbar begründen | #29 | Done |
| PI-10 | Fehlende Voraussetzungen / Nachweise kommunizieren | #30 | Done |
| PI-11 | automatische Förderregeln anzeigen | #31 | Not planned / ersetzt |
| PI-12 | Nächste Schritte kommunizieren | #32 | Done |
| PI-13 | Prüfergebnis speichern und als PDF exportieren | #33 | Done |
| PI-14 | Weitere Maßnahme anlegen | #34 | Done |
| PI-15 | Maßnahmenübersicht bereitstellen | #35 | Done |
| PI-16 | Maßnahme erneut prüfen / einreichen | #36 | Done |
| PI-17 | Maßnahmendokumente verwalten | #80 | Done |
| PI-18 | Benutzerprofil und sichere Kontolöschung | #102 | Done |

## Sachbearbeiterportal

| GitHub | Inhalt | Status |
|---:|---|---|
| #105 | Human-in-the-Loop-Prüfworkflow | Done |
| #114 | Rollen, Zugang und Review-Shell | Done |
| #115 | Posteingang und digitale Akte | Done |
| #116 | Übernahme, Entscheidungen und Nachforderungen | Done |
| #117 | Submission-Versionen, Rückkanal und Audit | Done |
| #118 | Dokumentzugriff und UX-Polish | Done |
| #119 | End-to-End-Abnahme und Sicherheitsnachweise | Done |

## Scope-Entscheidung

Nicht umgesetzt und bewusst ersetzt:

- #27
- #28
- #31

Grund:

Keine belastbare fachliche Regelbasis im Projektzeitraum.

Ersatz:

- versionierte digitale Akte
- menschliche Sachbearbeiterprüfung
- Grün / Gelb / Rot
- öffentliche Begründung
- Nachforderung
- Wiedereinreichung
- PDF-Prüfbericht

## Sprint-Abschluss

### Sprint 1 – Infrastruktur
Status: **Done**

### Sprint 2 – Erfassen & Einreichen
Status: **Done**

### Sprint 3 – Auswerten & Handeln
Status: **Done im freigegebenen MVP-Scope**

## Definition of Done – Abschlussaudit

Für alle als Done geschlossenen Issues wurde am 02.10.2026 bestätigt:

- [x] freigegebene Akzeptanzkriterien erfüllt
- [x] Umsetzung integriert
- [x] notwendige Tests durchgeführt
- [x] keine bekannten kritischen Fehler
- [x] Dokumentation aktualisiert
- [x] Product-Owner-Abnahme erfolgt
- [x] keine offenen Checkboxen im abgeschlossenen Issue

Für technische Änderungen zusätzlich:

- [x] keine Secrets im Repository
- [x] Datenbankänderungen versioniert
- [x] geschützte Funktionen serverseitig autorisiert
- [x] reproduzierbarer Deploymentprozess vorhanden

## Abschluss

Es bestehen keine offenen Product-Backlog-Issues im freigegebenen MVP-Scope.

Siehe [PROJECT_CLOSURE.md](PROJECT_CLOSURE.md).
