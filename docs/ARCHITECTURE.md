# KLARFÖRDERN – Technische Architektur

**Stand:** 02.10.2026  
**Status:** produktiver MVP-Abschluss

## Gesamtarchitektur

```text
Internet
  ↓
Cloudflare
  ↓
Nginx
  ├── /          React/Vite PWA
  └── /api/*     Fastify API auf 127.0.0.1:3000
                   ↓
                PostgreSQL

Dokumente
  ↓
Azure Blob Storage (privat)
  ↓
Managed Identity
```

KLARFÖRDERN wird als monolithische Webanwendung mit klar getrenntem Frontend, REST-API und PostgreSQL-Persistenz betrieben. Für den MVP wurden bewusst keine Microservices, kein Kubernetes und keine externe Reporting-Plattform eingeführt.

## Frontend

- React 19
- TypeScript
- Vite
- React Router
- PWA
- öffentliche Landingpage
- Auth-Routen
- geschütztes Schulportal unter `/app/*`
- geschütztes Sachbearbeiterportal unter `/review/*`

Die Rollenprüfung erfolgt nicht nur im Frontend. Geschützte API-Endpunkte validieren Berechtigungen serverseitig.

## API

Die API liegt unter `api/` und wird als einzelner Fastify-Prozess betrieben.

- Bindung: `127.0.0.1:3000`
- öffentliche Erreichbarkeit ausschließlich via Nginx unter `/api/*`
- `GET /api/health` als nicht-sensitiver Healthcheck
- einheitliche Fehlerobjekte
- Request-IDs
- redigierte Cookie-/Authorization-Logs

## Authentifizierung und Rollen

Authentifizierung:

- E-Mail / Passwort
- Argon2id
- serverseitige Sessions
- HttpOnly / Secure / SameSite Cookie

Rollen:

- `school_admin`
- `case_worker`
- `case_worker_admin` technisch vorbereitet

Öffentliche Registrierung erzeugt ausschließlich `school_admin`.

Initialer produktiver Master-Sachbearbeiter:

`sachbearbeiter@nvibes.de`

Zugangsdaten werden nicht versioniert.

## Mandantentrennung

Schulzugriffe werden serverseitig über `school_memberships` und die aktive Sitzung eingeschränkt.

Eine Anmeldung allein berechtigt nicht zum Zugriff auf fremde Schulen oder Maßnahmen.

## Datenbank

PostgreSQL ist die verbindliche Persistenzbasis.

Versionierte Migrationen:

- `001_phase_1_foundation.sql`
- `002_authentication.sql`
- `003_school_eligibility_foundation.sql`
- `004_measures_and_funding_areas.sql`
- `005_measure_implementation_dates.sql`
- `006_measure_documents.sql`
- `007_user_profiles.sql`
- `008_measure_question_answers.sql`
- `009_measure_submission.sql`
- `010_case_worker_portal.sql`

Migrationen werden über `schema_migrations` nachvollzogen.

## Fachliches Datenmodell

Zentrale Konzepte:

- User
- Session
- School
- SchoolMembership
- Measure
- Question Answers
- Measure Documents
- Measure Submission
- Case Decision
- Case Request
- Audit Event

## School Eligibility

Die technische Eligibility-Komponente prüft Vollständigkeit und formale Eingabevalidität.

Da im Projektzeitraum kein belastbares, freigegebenes und versioniertes Förderregelwerk vorlag, erzeugt sie bewusst keine automatische positive oder negative Förderentscheidung.

Die ursprünglich geplante automatische Förderlogik wurde durch Product-Owner-Entscheidung durch den Human-in-the-Loop-Prozess ersetzt.

## Submission-Versionierung

Bei jeder Einreichung wird eine unveränderliche Submission-Version erzeugt.

Snapshot-Inhalte:

- Antragsteller
- Schule
- Maßnahme
- Antworten
- Dokumentmetadaten

Eine Wiedereinreichung erzeugt eine neue Version. Historische Versionen bleiben erhalten.

## Sachbearbeiterportal

Geschützter Bereich:

`/review/*`

Geschützte API:

`/api/review/*`

Funktionen:

- Posteingang
- Suche und Sortierung
- digitale Akte
- atomare Übernahme
- Nachforderungen
- Grün / Gelb / Rot
- öffentliche Nachricht
- interner Vermerk
- Wiedereinreichung
- Audit
- PDF-Prüfbericht

Fachentscheidungen werden ausschließlich durch einen autorisierten Sachbearbeiter gespeichert.

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

## Dokumente

Dokumente werden in privatem Azure Blob Storage gespeichert.

Zugriff:

- serverseitige Autorisierung
- Managed Identity
- keine Storage Keys im Browser
- keine öffentliche Blob-Freigabe

Sachbearbeiter können Dokumente über einen gesondert autorisierten Review-Endpunkt lesen bzw. herunterladen.

## PDF-Prüfbericht

Serverseitiger Endpunkt:

`GET /api/review/cases/:caseId/report.pdf`

Technik:

- PDFKit
- Erzeugung aus gespeicherten Submission-Snapshots und der zugehörigen Entscheidung
- nur für `ELIGIBLE` und `NOT_ELIGIBLE`
- nur für autorisierte Sachbearbeiter

Nicht exportiert:

- `internal_note`
- Blob-Pfade
- technische IDs
- Secrets

## Sicherheit

- Argon2id
- HttpOnly / Secure / SameSite Cookies
- serverseitige Rollenprüfung
- SchoolMembership-basierte Zugriffsprüfung
- CSRF-Origin-Prüfung für schreibende Requests
- Rate Limits für Auth
- private Blob-Ablage
- Managed Identity
- keine Secrets im Repository
- redigierte Logs
- Trennung `public_reason` / `internal_note`
- sichere PDF-Dateinamen

## Deployment

Der reproduzierbare Releaseprozess liegt unter `deploy/`.

`deploy/deploy.sh` führt aus:

1. sauberen Git-Stand prüfen
2. Dependencies installieren
3. Typecheck
4. Tests
5. Frontend-/API-Build
6. Datenbankmigrationen
7. atomaren Release aktivieren
8. API-Service neu starten
9. Nginx validieren / reloaden
10. Healthchecks

Produktions-Secrets liegen außerhalb des Repositorys.

## Abschlussstatus

Die Architektur unterstützt den vollständigen freigegebenen MVP-End-to-End-Prozess einschließlich Sachbearbeiterportal, versionierter Aktenführung und PDF-Prüfbericht.

Details: [PROJECT_CLOSURE.md](PROJECT_CLOSURE.md).
