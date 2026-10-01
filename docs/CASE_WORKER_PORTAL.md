# Sachbearbeiterportal

## Human-in-the-Loop

KLARFÖRDERN unterstützt die Prüfung. Die fachliche Entscheidung trifft ein autorisierter Sachbearbeiter. Antworten, Dokumente und Vollständigkeitsprüfungen lösen keine automatische positive oder negative Förderentscheidung aus.

## Rollen und Zugriff

Öffentliche Registrierung erzeugt ausschließlich `school_admin`. Die neue Rolle `case_worker` wird nur über einen administrativen, sicheren Prozess vergeben.

### Initialer Sachbearbeiterzugang

Für die erstmalige produktive Nutzung des Sachbearbeiterportals ist `sachbearbeiter@nvibes.de` als initialer Benutzer mit der Rolle `case_worker` angelegt. Dieser Zugang dient ausschließlich der Bearbeitung von Maßnahmen. Zugangsdaten werden nicht im Repository dokumentiert; Änderungen der Rolle oder Zugangsdaten erfolgen ausschließlich über den sicheren administrativen Prozess. `/review/*` und `/api/review/*` verlangen serverseitig eine Sachbearbeiterrolle; Schuladministratoren erhalten keinen Review-Zugriff. Sachbearbeiter können keine Schuldaten, Maßnahmen, Antworten oder Dokumente der Schule verändern.

## Workflow

`DRAFT → SUBMITTED → UNDER_REVIEW → ELIGIBLE | NEEDS_CHANGES | NOT_ELIGIBLE`.

Bei `NEEDS_CHANGES` wird die Maßnahme für die Schule wieder bearbeitbar. Die erneute Einreichung erzeugt `RESUBMITTED` und eine weitere unveränderliche Submission-Version. Entscheidungen dürfen nur vom atomar zugewiesenen Sachbearbeiter getroffen werden.

## Persistenz und Nachvollziehbarkeit

`measure_submissions` enthält bei jeder Einreichung Snapshots von Schule, Antragsteller, Maßnahme, Antworten und Dokumentmetadaten. `case_decisions` trennt öffentliche Begründungen und interne Vermerke. `case_requests` speichert Nachforderungen und betroffene Bereiche. `audit_events` protokolliert Einreichung, Übernahme, Nachforderung und Entscheidungen ohne Dokumentinhalte oder Geheimnisse.

Historische Dokument-Blob-Pfade bleiben durch den Submission-Snapshot referenziert, wenn ein Dokument nach einer Nachforderung aus der aktiven Maßnahme entfernt wird.

## Review-API

- `GET /api/review/inbox`
- `GET /api/review/cases?view=inbox|active|requests|completed`
- `GET /api/review/cases/:caseId`
- `POST /api/review/cases/:caseId/assign`
- `POST /api/review/cases/:caseId/request-changes`
- `POST /api/review/cases/:caseId/approve`
- `POST /api/review/cases/:caseId/reject`
- `GET /api/review/documents/:documentId/download`

Alle mutierenden Statusänderungen werden in Datenbanktransaktionen mit ihrer Entscheidung/Nachforderung und dem Audit-Ereignis gespeichert. Ungültige oder nicht zugewiesene Entscheidungen werden mit `409` abgewiesen.

## Datenschutz und Sicherheit

Interne Vermerke werden ausschließlich über die Review-API geliefert. Schulportal-Endpunkte erhalten weder interne Vermerke noch Audit-Daten. Dokumente bleiben im privaten Azure-Blob-Container; der Download wird serverseitig autorisiert und über Managed Identity ausgeführt. Die geltende Aufbewahrungsdauer und Datenschutzerklärung müssen vor produktiver Aktivierung fachlich/rechtlich geprüft und aktualisiert werden.
