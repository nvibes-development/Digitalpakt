# Entwicklungsstand – KLARFÖRDERN

**Stand:** 1. Oktober 2026  
**Autoritative Quelle:** GitHub `main`  
**Product-Owner-Abgleich:** vollständig gegen den aktuellen Repository-Stand durchgeführt

## Produktstatus

KLARFÖRDERN bildet den vollständigen Erfassungs-, Einreichungs- und menschlichen Prüfprozess für schulische Digitalisierungsmaßnahmen ab.

Der aktuelle Kernprozess lautet:

```text
Registrierung / Login
→ Schuldaten
→ Maßnahme
→ Förderbereich
→ neun Förderfragen
→ Dokumente
→ Einreichung
→ Sachbearbeiter-Posteingang
→ digitale Akte
→ menschliche Prüfung
→ Grün / Gelb / Rot
→ Nachforderung oder Abschluss
→ bei Gelb: Bearbeitung und Wiedereinreichung
```

KLARFÖRDERN trifft **keine automatische verbindliche Förderentscheidung**. Die fachliche Bewertung erfolgt durch einen autorisierten Sachbearbeiter.

## Produktiver Sachbearbeiter

Für die produktive Sachbearbeitung ist folgender initialer Master-Sachbearbeiter eingerichtet:

`sachbearbeiter@nvibes.de`

Rolle:

`case_worker`

Der Zugang dient ausschließlich der Bearbeitung eingereichter Maßnahmen. Zugangsdaten werden nicht im Repository dokumentiert. Öffentliche Registrierung erzeugt ausschließlich `school_admin`.

## Zugang, Profil und Rechtliches

Umgesetzt und getestet:

- Registrierung
- Anmeldung
- serverseitige Sitzung
- Abmeldung
- rollenabhängige Weiterleitung
- Profildaten
- E-Mail-Änderung
- Passwortänderung mit aktuellem Passwort
- sichere Kontolöschung mit Bestätigung
- Schutz bei geteilten Schuldaten
- Impressum
- Datenschutzerklärung
- In-App-Hilfe

## Schule

Umgesetzt und getestet:

- persistente Schuldaten
- Schulmitgliedschaften
- serverseitige Mandantentrennung
- Bundesland
- Schulform / educationType
- Schulart
- öffentliche oder private Trägerschaft
- Anerkennungsstatus bei privaten Schulen
- Validierung
- Pflichtfelder
- Wiederaufnahme eines begonnenen Checks

### Fachliche Entscheidung zur Antragsberechtigung

Das ursprünglich vorgesehene automatische Förderregelwerk wird im aktuellen MVP nicht verwendet.

Der technische School-Eligibility-Dienst erzeugt keine erfundene positive oder negative fachliche Entscheidung. Die abschließende fachliche Bewertung erfolgt im Human-in-the-Loop-Prüfprozess.

## Maßnahmen

Umgesetzt und getestet:

- mehrere Maßnahmen je Schule
- Maßnahme anlegen
- Maßnahme bearbeiten
- Kurzbeschreibung
- Kosten
- Zeitraum
- Umsetzungsstatus
- technische Ausstattung
- frühere Digitalisierungsmaßnahmen
- frühere Förderungen
- drei MVP-Förderbereiche
- Maßnahmenübersicht
- Bearbeitungs-/Förderstatus
- Wiedereinreichung nach Nachforderung
- versionierte Submission-Historie

## Förderbereiche

MVP:

1. IT-Infrastruktur, Netzwerk und WLAN
2. Digitale Endgeräte
3. Bildungssoftware und digitale Lernplattformen

Pro Maßnahme wird genau ein MVP-Förderbereich gespeichert.

## Förderfragen

Der aktuelle MVP verwendet neun verbindliche Förderfragen.

Antwortwerte:

- Ja
- Nein
- Nicht bekannt

Alle neun Antworten sind vor einer Einreichung erforderlich.

Die Antworten werden:

- maßnahmenbezogen gespeichert,
- nach Wiederanmeldung erneut geladen,
- nach Einreichung gesperrt,
- bei Nachforderung wieder freigegeben,
- in der digitalen Sachbearbeiterakte dargestellt.

Die Antworten erzeugen **keine automatische Förderentscheidung**.

## Dokumente

Umgesetzt und getestet:

- PDF
- Word
- Excel
- maximal 10 MB
- Upload
- Liste
- Download
- Löschen
- maßnahmengebundene Autorisierung
- privater Azure Blob Storage
- Managed Identity
- keine Storage Keys oder Connection Strings im Repository
- Review-Dokumentdownload für Sachbearbeiter
- Sperre nach Einreichung
- Wiederfreigabe bei Nachforderung

Der Blob-Container `digitalpakt` ist privat.

## Einreichung

Eine Maßnahme kann zur Überprüfung eingereicht werden, wenn:

- alle neun Förderfragen beantwortet sind,
- mindestens ein Dokument vorhanden ist.

Bei Einreichung:

- wird eine Vorgangsnummer erzeugt,
- wird die Maßnahme gesperrt,
- wird eine unveränderliche Submission-Version erzeugt,
- werden Schule, Antragsteller, Maßnahme, Antworten und Dokumentmetadaten als Snapshot gespeichert.

## Sachbearbeiterportal

Route:

`/review`

Umgesetzt und getestet:

- Rolle `case_worker`
- optional vorbereitete Rolle `case_worker_admin`
- serverseitiger Review-Guard
- rollenabhängige Login-Weiterleitung
- Posteingang
- Suche
- Sortierung
- In Bearbeitung
- Nachforderungen
- Abgeschlossen
- digitale Akte
- Antragstellerdaten
- Schuldaten
- Maßnahmendaten
- Förderfragen
- Dokumente
- Version und Vorgangsnummer
- Audit-Verlauf
- atomare Vorgangsübernahme
- menschliche Grün-/Gelb-/Rot-Entscheidung
- öffentliche Nachricht / Begründung
- interner Vermerk
- Nachforderung
- Wiedereinreichung
- Submission-Versionierung

### Entscheidungsstatus

- `ELIGIBLE` → grundsätzlich förderfähig
- `NEEDS_CHANGES` → Nachbearbeitung erforderlich
- `NOT_ELIGIBLE` → derzeit nicht grundsätzlich förderfähig

## Human-in-the-Loop

Verbindliches Produktprinzip:

> KLARFÖRDERN unterstützt die Prüfung. Die fachliche Entscheidung trifft ein autorisierter Sachbearbeiter.

Die automatische Förderregel-Engine aus der ursprünglichen Planung wurde für den aktuellen MVP bewusst ersetzt.

## Datenmodell Sachbearbeitung

Migration `010_case_worker_portal.sql` ergänzt unter anderem:

- `measure_submissions`
- `case_decisions`
- `case_requests`
- `audit_events`
- Review-Status an Maßnahmen
- Case-Worker-Zuweisung

## Statusmaschine

```text
DRAFT
→ SUBMITTED
→ UNDER_REVIEW
→ ELIGIBLE
   oder NEEDS_CHANGES
   oder NOT_ELIGIBLE

NEEDS_CHANGES
→ Bearbeitung durch Schule
→ RESUBMITTED
→ UNDER_REVIEW
```

## Audit und Nachvollziehbarkeit

Umgesetzt:

- Einreichung
- Öffnen
- Übernahme
- Nachforderung
- Wiedereinreichung
- Entscheidung
- Submission-Versionen

Interne Vermerke werden nicht über Schulportal-Endpunkte ausgeliefert.

## Product-Owner-Abnahme

Der Product Owner hat den im Repository vorhandenen Funktionsumfang getestet und die erledigten Product Items entsprechend in GitHub als Done markiert.

Insbesondere geprüft:

- Schulportal
- mehrere Maßnahmen
- Fragen
- Dokumente
- Einreichung
- Sachbearbeiterzugang
- Posteingang
- digitale Akte
- Grün / Gelb / Rot
- Nachforderung
- Wiedereinreichung
- Statuswechsel
- Dokumentzugriff

## Noch offene Product-Backlog-Punkte

### 1. Öffentliche Sachbearbeiternachricht im Schulportal

Technischer Restpunkt:

Die Sachbearbeiternachricht / öffentliche Begründung wird in `case_decisions` gespeichert, aber im aktuellen Schulportal noch nicht vollständig ausgelesen und dargestellt.

Betroffene Issues:

- #117
- #29
- #30
- #32

Erforderlich:

- Gelb: konkrete Nachforderung für Nutzer sichtbar
- Rot: Begründung sichtbar
- Grün: optionale öffentliche Nachricht sichtbar

Interne Notizen dürfen niemals mit ausgeliefert werden.

### 2. Ergebnisexport / Prüfbericht

Issue:

- #33

Noch offen:

- Ergebnisexport in geeignetem Format
- Prüfzeitpunkt
- menschliche Entscheidung
- öffentliche Begründung
- Hinweis auf unverbindliche Ersteinschätzung

## Bewusst nicht umgesetzt

Die folgenden ursprünglich geplanten Funktionen wurden durch Product-Owner-Entscheidung ersetzt und als `not planned` geschlossen:

- automatische Förderregeln (#27)
- automatische Förderstatusbildung (#28)
- Anzeige automatischer Förderregelversionen (#31)

Ersatz:

Human-in-the-Loop-Sachbearbeiterportal.

## Technische Architektur

- React 19
- TypeScript
- Vite
- PWA
- React Router
- Fastify
- PostgreSQL
- Nginx
- Azure VM
- Azure Blob Storage
- Managed Identity
- Cloudflare
- HTTPS
- versionierte SQL-Migrationen

## Repository-Stand

Das Sachbearbeiterportal wurde mit PR #106 integriert. Danach wurden weitere UX-/Darstellungsanpassungen bis einschließlich des aktuellen `main` vorgenommen und vom Product Owner getestet.

GitHub `main` bleibt die verbindliche Source of Truth.
