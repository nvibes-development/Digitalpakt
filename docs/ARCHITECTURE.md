# KLARFÖRDERN Architektur

## Phase-1-Grundlage

KLARFÖRDERN bleibt eine React/Vite-PWA unter `https://digitalpakt.nvibes.de`. Die öffentliche Landingpage wird durch React Router von den künftigen geschützten App-Routen getrennt.

```text
Internet → Cloudflare → Nginx
                         ├── /       React-PWA (statischer Vite-Build)
                         └── /api/*  Node.js REST API (localhost:3000)
                                      └── PostgreSQL
```

## Frontend

- React 19, TypeScript, Vite und `vite-plugin-pwa`
- React Router verwaltet öffentliche, Legal-, Auth- und `/app/*`-Routen.
- `/app/*` ist durch die Cookie-basierte Session-Abfrage geschützt. In Phase 1 antwortet `/api/auth/me` bewusst mit `401`, bis die Authentifizierung implementiert ist.
- Das App-Shell-Navigationsgerüst enthält keine fachlichen Daten und wird in den zugeordneten PBIs erweitert.

## API

Die API liegt unter `api/` und wird als einzelner Fastify-Node-Prozess betrieben. Sie lauscht ausschließlich auf `127.0.0.1:3000`; Nginx ist der einzige öffentliche Einstieg.

- `GET /api/health` liefert eine nicht-sensitive Verfügbarkeitsantwort.
- Einheitliche API-Fehler enthalten einen technischen Code und eine Request-ID, aber keine Secrets.
- Cookie- und Authorization-Header werden in Fastify-Logs redigiert.

## Datenbank und Migrationen

PostgreSQL ist die verbindliche Persistenzbasis. Versionierte SQL-Migrationen liegen in `api/migrations/`; `npm run db:migrate` führt sie transaktional aus und protokolliert sie in `schema_migrations`.

Die Phase-1-Migration legt nur die technische Migrationsbasis und `application_metadata` an. Fachliche Tabellen werden ausschließlich in den zugehörigen PBIs ergänzt.

`DATABASE_URL` liegt ausschließlich außerhalb des Repositorys in `/etc/klarfoerdern/api.env`. Die Beispieldatei `api/.env.example` enthält keinen verwendbaren Wert.

## School Eligibility Rule Set Pending

**Fachlicher Blocker:** Für Kombinationen aus Bundesland, `educationType`, Schulart, Trägerschaft und Anerkennungsstatus liegt noch kein verbindliches, freigegebenes Regelwerk vor. Vor einer positiven oder negativen Entscheidung wird eine versionierte Regeldefinition mit Ergebnis (`eligible`, `needs_information`, `not_eligible`), Begründung und Regelreferenz benötigt. Bis dahin werden keine Regeln erfunden.

## School Eligibility – technische Vorbereitung ohne Fachregel

Die Phase zur Erfassung der Schuldaten speichert `schools` und autorisierte `school_memberships` in PostgreSQL. Alle Zugriffe auf die aktuelle Schule werden serverseitig über die aktive Sitzung und diese Membership eingeschränkt; eine Anmeldung allein erlaubt keinen Zugriff auf fremde Schuldaten.

`schoolEligibilityService` wertet aktuell ausschließlich Vollständigkeit, formale Eingabevalidität und die bedingte Relevanz des Anerkennungsstatus bei freier/privater Trägerschaft aus. Seine stabile Ausgabe enthält `status`, `reasons`, `missingFields`, `evaluatedAt` und `ruleVersion`. Der aktuelle technische Regelstand ist bewusst `school-eligibility-pending`.

Solange kein verbindliches, fachlich freigegebenes Regelwerk dokumentiert ist, gibt der Service **ausschließlich** `needs_information` aus — auch bei vollständigen Schuldaten. Die technisch vorbereiteten Status `eligible` und `not_eligible` werden durch keinen aktuellen Codepfad ausgelöst. Es wurden ausdrücklich keine Förder- oder Eligibility-Regeln erfunden.

## Produktion

`deploy/deploy.sh` führt Typecheck, Tests, beide Builds und die Migration aus, aktiviert den statischen Release atomar und startet anschließend `klarfoerdern-api.service` neu. Die Systemd-Unit und Nginx-Konfiguration sind versioniert unter `deploy/`; Secrets werden nicht versioniert.
