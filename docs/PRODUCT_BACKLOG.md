# Product Backlog – Fachliche Struktur

**Stand:** 1. Oktober 2026  
**Product-Owner-Abgleich:** mit aktuellem GitHub-`main` durchgeführt

## Aktuelles Produktmodell

KLARFÖRDERN verwendet im MVP einen **Human-in-the-Loop-Prüfprozess**.

Die Schule:

1. erfasst Schuldaten,
2. legt eine Maßnahme an,
3. wählt einen Förderbereich,
4. beantwortet neun Förderfragen,
5. lädt Dokumente hoch,
6. reicht die Maßnahme ein.

Danach prüft ein autorisierter Sachbearbeiter die digitale Akte und trifft die menschliche fachliche Ersteinschätzung.

Das System erzeugt bewusst **keine automatische Förderentscheidung aus einem erfundenen Regelwerk**.

## Rollen

### Schulportal

`school_admin`

### Sachbearbeiterportal

`case_worker`

Initialer produktiver Master-Sachbearbeiter:

`sachbearbeiter@nvibes.de`

Öffentliche Registrierung erzeugt ausschließlich `school_admin`.

---

# User Stories

## US-01 – Angaben zur Schule erfassen

Als Schulleitung möchte ich Angaben zu unserer Schule eingeben können, damit die fachliche Prüfung auf einer vollständigen Datengrundlage erfolgen kann.

## US-02 – Prüfung vorbereiten

Als Schulleitung möchte ich die relevanten Schuldaten vollständig erfassen, damit ich mit einer konkreten Digitalisierungsmaßnahme fortfahren kann.

## US-03 – Digitalisierungsmaßnahme erfassen

Als Schulleitung möchte ich meine geplante Digitalisierungsmaßnahme und relevante Rahmendaten erfassen, damit sie geprüft werden kann.

## US-04 – Förderbereich auswählen

Als Schulleitung möchte ich meine Maßnahme einem MVP-Förderbereich zuordnen.

## US-05 – Förderfragen beantworten

Als Schulleitung möchte ich neun definierte Förderfragen mit Ja, Nein oder Nicht bekannt beantworten.

## US-06 – Maßnahme einreichen

Als Schulleitung möchte ich meine vollständige Maßnahme mit Dokumenten zur Prüfung einreichen.

## US-07 – Ergebnis nachvollziehen

Als Schulleitung möchte ich Status und öffentliche Rückmeldung der Sachbearbeitung nachvollziehen können.

## US-08 – Nächste Schritte erkennen

Als Schulleitung möchte ich bei einer Nachforderung erkennen, was ergänzt oder geändert werden muss.

## US-09 – Sachbearbeitung

Als autorisierter Sachbearbeiter möchte ich eingereichte Maßnahmen in einer digitalen Akte prüfen und eine menschliche Grün/Gelb/Rot-Entscheidung dokumentieren.

---

# Fachliche Epics

## Epic 1 – Einstieg für Schulleitungen

GitHub: #13  
Status: **Done**

Product Items:

- #21 PI-01 – Done
- #22 PI-02 – Done
- #26 PI-06 – Done

## Epic 2 – Digitalisierungsmaßnahme erfassen

GitHub: #14  
Status: **Done**

Product Item:

- #23 PI-03 – Done

## Epic 3 – Förderbereiche

GitHub: #15  
Status: **Done**

Product Item:

- #24 PI-04 – Done

MVP-Förderbereiche:

1. IT-Infrastruktur, Netzwerk und WLAN
2. Digitale Endgeräte
3. Bildungssoftware und digitale Lernplattformen

## Epic 4 – Förderfragen

GitHub: #16  
Status: **Done**

Product Item:

- #25 PI-05 – Done

Der MVP verwendet neun verbindliche Fragen statt eines dynamischen automatischen Regelkatalogs.

## Epic 5 – Automatische Förderfähigkeitslogik

GitHub: #17  
Status: **nicht geplant / ersetzt**

Product Items:

- #27 PI-07 – nicht geplant
- #28 PI-08 – nicht geplant

Ersetzt durch:

- #105 Human-in-the-Loop-Prüfworkflow
- #114–#119 Sachbearbeiterportal

## Epic 6 – Ergebnis und Rückmeldung

GitHub: #18  
Status: **In Progress**

Product Items:

- #29 PI-09 – In Progress
- #30 PI-10 – In Progress
- #31 PI-11 – nicht geplant / ersetzt
- #32 PI-12 – In Progress
- #33 PI-13 – Open

Offene Kernthemen:

- öffentliche Sachbearbeiternachricht im Schulportal
- Ergebnisexport / Prüfbericht

## Epic 7 – Mehrere Maßnahmen

GitHub: #19  
Status: **Done**

Product Items:

- #34 PI-14 – Done
- #35 PI-15 – Done
- #36 PI-16 – Done
- #80 PI-17 – Done

## Epic 8 – Persönlicher Digitalisierungsüberblick

GitHub: #20  
Status: **Done in MVP-Tiefe**

Die Seite „Meine Maßnahmen“ stellt mehrere Maßnahmen mit Förderbereich und Bearbeitungs-/Förderstatus dar.

---

# Weitere Product Items

| ID | Product Item | GitHub | Status |
|---|---|---:|---|
| PI-01 | Förderfähigkeitscheck starten | #21 | Done |
| PI-02 | Förderrelevante Schuldaten erfassen | #22 | Done |
| PI-03 | Digitalisierungsmaßnahme erfassen | #23 | Done |
| PI-04 | Förderbereich zur Maßnahme bestimmen | #24 | Done |
| PI-05 | Förderfragenkatalog bereitstellen | #25 | Done |
| PI-06 | Antworten und Bearbeitungsstand speichern | #26 | Done |
| PI-07 | Automatische Förderregeln anwenden | #27 | Nicht geplant / ersetzt |
| PI-08 | Automatischen Förderstatus bestimmen | #28 | Nicht geplant / ersetzt |
| PI-09 | Prüfergebnis nachvollziehbar begründen | #29 | In Progress |
| PI-10 | Fehlende Voraussetzungen / Nachweise kommunizieren | #30 | In Progress |
| PI-11 | Automatische Förderregeln anzeigen | #31 | Nicht geplant / ersetzt |
| PI-12 | Nächste Schritte kommunizieren | #32 | In Progress |
| PI-13 | Prüfergebnis speichern und exportieren | #33 | Open |
| PI-14 | Weitere Maßnahme anlegen | #34 | Done |
| PI-15 | Maßnahmenübersicht bereitstellen | #35 | Done |
| PI-16 | Maßnahme erneut prüfen / einreichen | #36 | Done |
| PI-17 | Maßnahmendokumente verwalten | #80 | Done |
| PI-18 | Benutzerprofil und sichere Kontolöschung | #102 | Done |

---

# Sachbearbeiterportal

## Hauptworkflow

GitHub: #105  
Status: **Done**

Umgesetzt:

- case_worker-Rolle
- Review-Shell
- Posteingang
- digitale Akte
- atomare Übernahme
- Grün / Gelb / Rot
- Nachforderung
- Wiedereinreichung
- Submission-Snapshots
- Audit-Verlauf
- Dokumentzugriff

## Teil-Issues

| GitHub | Inhalt | Status |
|---:|---|---|
| #114 | Rollen, Zugang und Review-Shell | Done |
| #115 | Posteingang und digitale Akte | Done |
| #116 | Übernahme, Entscheidungen und Nachforderungen | Done |
| #117 | Submission-Versionen, Rückkanal und Audit | **In Progress** |
| #118 | Dokumentzugriff und UX-Polish | Done |
| #119 | E2E-Abnahme und Sicherheitsnachweise | Done |

### Restpunkt #117

Die öffentliche Sachbearbeiternachricht wird technisch gespeichert, aber im aktuellen Schulportal noch nicht vollständig angezeigt.

Noch erforderlich:

- Gelb: Nachforderungstext sichtbar
- Rot: Begründung sichtbar
- Grün: optionale öffentliche Nachricht sichtbar

Interne Vermerke dürfen nie an den Schulbenutzer ausgeliefert werden.

---

# Sprint-Rahmen

## Sprint 1

Infrastruktur  
Status: abgeschlossen

## Sprint 2

Erfassen und Einreichen  
Status: abgeschlossen

## Sprint 3

Auswertung und Handeln  
Status: in Arbeit

Bereits geliefert:

- menschlicher Review-Prozess
- Statusanzeige
- Nachforderung
- Wiedereinreichung
- Historie

Noch offen:

- öffentliche Rückmeldung im Schulportal
- Ergebnisexport / Prüfbericht

---

# Product-Owner-Scope-Entscheidung

Die folgenden ursprünglichen Anforderungen sind bewusst aus dem aktuellen MVP entfernt worden:

- automatische Förderregel-Engine
- automatische positive/negative Förderentscheidung
- automatischer Förderregelstand als Entscheidungsgrundlage

Begründung:

Die fachliche Entscheidung wird durch einen autorisierten Sachbearbeiter getroffen. Dadurch bleibt die Entscheidung nachvollziehbar menschlich und es werden keine unvollständigen oder erfundenen Förderregeln automatisiert angewendet.

---

# Definition of Done

Ein Product Backlog Item gilt als Done, wenn:

- alle freigegebenen Akzeptanzkriterien erfüllt sind,
- die Umsetzung funktionsfähig ist,
- die Funktion im aktuellen Hauptentwicklungsstand integriert ist,
- notwendige Tests durchgeführt wurden,
- keine bekannten kritischen Fehler bestehen,
- relevante Dokumentation aktuell ist,
- der Product Owner die Funktion abgenommen hat.

Technische Änderungen zusätzlich:

- keine Secrets im Repository,
- versionierte Migrationen,
- reproduzierbare Bereitstellung,
- serverseitige Autorisierung für geschützte Funktionen.
