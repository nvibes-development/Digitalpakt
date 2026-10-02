# Sachbearbeiterportal – Abschlussdokumentation

**Stand:** 02.10.2026  
**Status:** ✅ vollständig umgesetzt und Product-Owner-abgenommen

## Human-in-the-Loop

> KLARFÖRDERN unterstützt die Prüfung. Die fachliche Entscheidung trifft ein autorisierter Sachbearbeiter.

Antworten, Dokumente und Vollständigkeitsprüfungen lösen keine automatische positive oder negative Förderentscheidung aus.

## Rollen

Öffentliche Registrierung:

`school_admin`

Sachbearbeitung:

`case_worker`

Optional technisch vorbereitet:

`case_worker_admin`

Initialer produktiver Master-Sachbearbeiter:

`sachbearbeiter@nvibes.de`

Zugangsdaten werden nicht im Repository dokumentiert.

## Zugriffsschutz

- [x] `/review/*` rollenbasiert geschützt
- [x] `/api/review/*` serverseitig geschützt
- [x] Schuladministratoren ohne Review-Zugriff
- [x] keine Self-Service-Rollenerhöhung
- [x] Fachdaten der Schule in der Akte read-only
- [x] Dokumente privat gespeichert

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

## Navigation

- Posteingang
- In Bearbeitung
- Nachforderungen
- Abgeschlossen
- Hilfe

## Digitale Akte

Enthält:

- Vorgangsnummer
- Submission-Version
- Antragsteller
- Schuldaten
- Maßnahme
- Förderbereich
- neun Fragen und Antworten
- Dokumente
- Entscheidung
- öffentliche Anmerkung
- interner Vermerk
- Verlauf

## Vorgangsübernahme

Die Übernahme erfolgt atomar.

Gespeichert werden:

- Sachbearbeiter
- Zeitpunkt
- Review-Status

## Entscheidungen

### Grün

`ELIGIBLE`

**Grundsätzlich förderfähig**

Öffentliche Nachricht optional.

### Gelb

`NEEDS_CHANGES`

**Nachbearbeitung erforderlich**

Öffentliche Nachforderung Pflicht.

Die Schule kann weiterbearbeiten und erneut einreichen.

### Rot

`NOT_ELIGIBLE`

**Derzeit nicht förderfähig**

Öffentliche Begründung Pflicht.

## Öffentliche und interne Texte

- öffentlich: `public_reason`
- intern: `internal_note`

Im Schulportal erscheint ausschließlich der öffentliche Text.

Der interne Vermerk bleibt im Sachbearbeiterportal.

## Rückkanal – abgeschlossen

Produktiv abgenommen:

- [x] Gelb-Nachforderung sichtbar
- [x] Rot-Begründung sichtbar
- [x] optionale Grün-Anmerkung möglich
- [x] interne Vermerke nicht im Schulportal
- [x] Wiedereinreichung erzeugt neue Submission

Tracking-Issues #117, #29, #30 und #32 sind Done.

## Submission-Versionierung

`measure_submissions` speichert Snapshots von:

- Schule
- Antragsteller
- Maßnahme
- Antworten
- Dokumentmetadaten

Alte Versionen bleiben unverändert.

## Nachforderungen

`case_requests` speichert:

- Submission
- Sachbearbeiter
- Nachricht
- betroffene Bereiche
- Zeitpunkt
- Erledigungsstatus

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
- Dokumentdownload

Keine vollständigen Dokumentinhalte oder Zugangsdaten im Audit.

## Dokumentzugriff

Review-Dokumente:

- serverseitig autorisiert
- private Azure Blob Storage Ablage
- Managed Identity
- keine Storage Keys im Client

## PDF-Prüfbericht

Abgeschlossene grüne und rote Vorgänge können unter „Abgeschlossen“ als PDF exportiert werden.

Endpunkt:

`GET /api/review/cases/:caseId/report.pdf`

Der Bericht verwendet ausschließlich die historisch geprüfte Submission und die dazugehörige Entscheidung.

Enthalten:

- Vorgangsnummer
- Submission-Version
- Prüfzeitpunkt
- Antragsteller
- Schule
- Maßnahme
- Förderbereich
- Fragen / Antworten
- Dokumentliste
- Sachbearbeitung
- Entscheidung
- öffentliche Begründung
- Human-in-the-Loop-Hinweis
- Unverbindlichkeits-Hinweis

Nicht enthalten:

- interner Vermerk
- Blob-Pfad
- technische IDs

Produktiv getestet:

- [x] Grün
- [x] Rot
- [x] lange Texte
- [x] mehrere Dokumente

## Review-API

- `GET /api/review/inbox`
- `GET /api/review/cases?view=inbox|active|requests|completed`
- `GET /api/review/cases/:caseId`
- `POST /api/review/cases/:caseId/assign`
- `POST /api/review/cases/:caseId/request-changes`
- `POST /api/review/cases/:caseId/approve`
- `POST /api/review/cases/:caseId/reject`
- `GET /api/review/documents/:documentId/download`
- `GET /api/review/cases/:caseId/report.pdf`

## Product-Owner-Abnahme

- [x] Sachbearbeiterzugang
- [x] Posteingang
- [x] digitale Akte
- [x] Vorgangsübernahme
- [x] Grün
- [x] Gelb
- [x] Rot
- [x] Rückkanal
- [x] Wiedereinreichung
- [x] Submission-Versionen
- [x] Dokumentzugriff
- [x] Audit
- [x] PDF-Prüfbericht

## Abgrenzung

Nicht Bestandteil des MVP:

- automatische Förderentscheidung
- automatische Regel-Engine
- KI-Entscheidung
- förmlicher Verwaltungsakt

## Abschluss

Der Sachbearbeiterworkflow ist abgeschlossen und für die Präsentation freigegeben.

Siehe [PROJECT_CLOSURE.md](PROJECT_CLOSURE.md).
