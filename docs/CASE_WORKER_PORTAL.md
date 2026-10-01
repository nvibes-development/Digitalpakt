# Sachbearbeiterportal

**Stand:** 1. Oktober 2026  
**Status:** Kernworkflow produktiv umgesetzt und vom Product Owner getestet

## Human-in-the-Loop

KLARFÖRDERN unterstützt die Prüfung. Die fachliche Entscheidung trifft ein autorisierter Sachbearbeiter.

Antworten, Dokumente und Vollständigkeitsprüfungen lösen keine automatische positive oder negative Förderentscheidung aus.

## Rollen und Zugriff

Öffentliche Registrierung erzeugt ausschließlich:

`school_admin`

Sachbearbeiterrolle:

`case_worker`

Optional technisch vorbereitet:

`case_worker_admin`

### Initialer Master-Sachbearbeiter

Für die produktive Sachbearbeitung ist eingerichtet:

`sachbearbeiter@nvibes.de`

Rolle:

`case_worker`

Dieser Zugang dient ausschließlich der Bearbeitung von Maßnahmen.

Zugangsdaten werden nicht im Repository dokumentiert. Änderungen an Rolle oder Zugangsdaten erfolgen ausschließlich über einen sicheren administrativen Prozess.

## Zugriffsschutz

- [x] `/review/*` verlangt Sachbearbeiterrolle.
- [x] `/api/review/*` verlangt Sachbearbeiterrolle.
- [x] Schuladministratoren erhalten keinen berechtigten Review-Zugriff.
- [x] Sachbearbeiter können keine Schuldaten, Antworten oder Dokumente der Schule im Namen der Schule verändern.
- [x] Normale Benutzer können ihre eigene Rolle nicht erhöhen.
- [x] Dokumente bleiben im privaten Azure Blob Storage.

## Workflow

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

## Vorgangsübernahme

Beim Öffnen bzw. Übernehmen eines eingereichten Vorgangs wird der Sachbearbeiter atomar zugeordnet.

Gespeichert werden:

- Sachbearbeiter
- Übernahmezeitpunkt
- Review-Status

Die Schule sieht den Bearbeitungsstatus und den Bearbeitungszeitpunkt.

## Digitale Akte

Die Sachbearbeiterakte enthält:

- Vorgangsnummer
- Submission-Version
- Antragsteller
- Schule
- Maßnahme
- Förderbereich
- Maßnahmendaten
- neun Förderfragen und Antworten
- Dokumente
- Verlauf

Die Akte ist für die von der Schule eingereichten Fachdaten read-only.

## Entscheidungen

### Grün

`ELIGIBLE`

Darstellung:

**Grundsätzlich förderfähig**

Eine öffentliche Nachricht kann technisch gespeichert werden.

### Gelb

`NEEDS_CHANGES`

Darstellung:

**Nachbearbeitung erforderlich**

Pflicht:

öffentliche Nachforderung / Nachricht.

Die Maßnahme wird anschließend für die Schule wieder bearbeitbar.

### Rot

`NOT_ELIGIBLE`

Darstellung:

**Derzeit nicht grundsätzlich förderfähig**

Pflicht:

öffentliche Begründung.

## Öffentliche und interne Texte

Technisch getrennt:

- öffentliche Nachricht / `public_reason`
- interner Vermerk / `internal_note`

Interne Vermerke werden ausschließlich im Sachbearbeiterkontext verarbeitet.

Sie dürfen niemals über Schulportal-Endpunkte ausgegeben werden.

## Submission-Versionierung

`measure_submissions` speichert bei jeder Einreichung Snapshots von:

- Schule
- Antragsteller
- Maßnahme
- Antworten
- Dokumentmetadaten

Eine Wiedereinreichung erzeugt eine neue Submission-Version.

Historische Einreichungen bleiben erhalten.

## Nachforderungen

`case_requests` speichert:

- Sachbearbeiter
- Nachricht
- betroffene Bereiche
- Zeitpunkt
- Erledigungsstatus

Mögliche Bereiche:

- Schuldaten
- Maßnahmendaten
- Antworten
- Dokumente

## Entscheidungen

`case_decisions` speichert:

- Submission
- Sachbearbeiter
- Entscheidung
- öffentliche Begründung
- internen Vermerk
- Zeitpunkt

## Audit

`audit_events` dokumentiert unter anderem:

- Einreichung
- Öffnen
- Übernahme
- Nachforderung
- Wiedereinreichung
- Entscheidung

Audit-Events enthalten keine vollständigen Dokumentinhalte oder Zugangsdaten.

## Review-API

- `GET /api/review/inbox`
- `GET /api/review/cases?view=inbox|active|requests|completed`
- `GET /api/review/cases/:caseId`
- `POST /api/review/cases/:caseId/assign`
- `POST /api/review/cases/:caseId/request-changes`
- `POST /api/review/cases/:caseId/approve`
- `POST /api/review/cases/:caseId/reject`
- `GET /api/review/documents/:documentId/download`

Statusänderungen und fachliche Aktionen werden transaktional gespeichert.

## Dokumentzugriff

Sachbearbeiter können Dokumente aus der Akte lesen bzw. herunterladen.

Dokumentzugriff:

- serverseitig autorisiert,
- private Blob-Ablage,
- Managed Identity,
- keine Storage Keys im Client,
- keine öffentliche Blob-Freigabe.

## Product-Owner-Abnahme

Der im Repository vorhandene Kernworkflow wurde durch den Product Owner getestet:

- [x] Sachbearbeiterzugang
- [x] Review-Shell
- [x] Posteingang
- [x] digitale Akte
- [x] Vorgangsübernahme
- [x] Grün
- [x] Gelb
- [x] Rot
- [x] Wiedereinreichung
- [x] Submission-Versionen
- [x] Dokumentzugriff
- [x] Audit-Grundlage

## Offener Restpunkt: textlicher Rückkanal zur Schule

Die öffentliche Nachricht wird technisch gespeichert, ist im aktuellen Schulportal aber noch nicht vollständig sichtbar.

Noch umzusetzen:

- [ ] Gelb: Nachforderungstext bei „Meine Maßnahmen“ anzeigen.
- [ ] Rot: Begründung anzeigen.
- [ ] Grün: optionale öffentliche Nachricht anzeigen.
- [ ] School-API darf dabei ausschließlich öffentliche Texte liefern, niemals interne Vermerke.

Tracking:

- #117
- #29
- #30
- #32

## Datenschutz und Sicherheit

Die Datenschutzerklärung muss bei Änderungen am tatsächlichen Verarbeitungsumfang fortlaufend geprüft und aktualisiert werden.

Besonders relevant:

- Zugriff von Sachbearbeitern,
- Speicherung von Entscheidungen,
- interne Vermerke,
- Audit-Historie,
- Dokumente,
- Aufbewahrungsdauer.

## Nicht Bestandteil des aktuellen MVP

- automatische Förderentscheidung
- automatische Regel-Engine
- KI-Entscheidung
- automatische Rechtsentscheidung
- förmlicher Verwaltungsakt
