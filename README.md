# KLARFÖRDERN

**Förderfähigkeit. Einfach klar.**

KLARFÖRDERN ist eine PWA zur strukturierten Erfassung, Einreichung und menschlich verantworteten Vorprüfung schulischer Digitalisierungsvorhaben im Kontext des DigitalPakts 2.0.

> **Projektkontext:** Abschlussarbeit „Agiles Projekt mit Scrum“  
> **Projektabschluss:** 02.10.2026  
> **Produktions-URL:** https://digitalpakt.nvibes.de  
> **Status:** ✅ MVP abgeschlossen und produktiv abgenommen

## Product Goal

> Schulen können Digitalisierungsvorhaben vollständig erfassen und zur Prüfung einreichen. Ein autorisierter Sachbearbeiter erhält eine strukturierte, versionierte digitale Akte und dokumentiert eine nachvollziehbare menschliche Ersteinschätzung.

KLARFÖRDERN trifft **keine automatische verbindliche Förderentscheidung**.

Verbindliches Produktprinzip:

> **KLARFÖRDERN unterstützt die Prüfung. Die fachliche Entscheidung trifft ein autorisierter Sachbearbeiter.**

## End-to-End-Prozess

```text
Registrierung / Login
→ Schuldaten
→ Maßnahme
→ Förderbereich
→ neun Förderfragen
→ Dokumente
→ Einreichung
→ versionierte Submission
→ Sachbearbeiter-Posteingang
→ digitale Akte
→ menschliche Prüfung
→ Grün / Gelb / Rot
→ Rückmeldung
→ ggf. Nachbearbeitung und Wiedereinreichung
→ Abschluss
→ PDF-Prüfbericht
```

## Rollen

### Schulportal

Rolle:

`school_admin`

Funktionen:

- Registrierung und Anmeldung
- Profilverwaltung
- Schuldaten erfassen
- mehrere Maßnahmen anlegen
- Förderbereich auswählen
- neun Förderfragen beantworten
- Dokumente hochladen und verwalten
- Maßnahme zur Prüfung einreichen
- Bearbeitungsstatus verfolgen
- Anmerkungen der Sachbearbeitung lesen
- bei Nachforderung weiterbearbeiten
- erneut einreichen
- Ergebnis einsehen

### Sachbearbeiterportal

Rolle:

`case_worker`

Geschützter Bereich:

`/review`

Initialer produktiver Master-Sachbearbeiter:

`sachbearbeiter@nvibes.de`

Funktionen:

- Posteingang
- In Bearbeitung
- Nachforderungen
- Abgeschlossen
- Suche und Sortierung
- digitale Akte
- Dokumentdownload
- atomare Vorgangsübernahme
- interne Vermerke
- öffentliche Anmerkungen
- menschliche Grün-/Gelb-/Rot-Entscheidung
- Audit-Verlauf
- PDF-Prüfbericht

Zugangsdaten werden nicht im Repository dokumentiert.

## Entscheidungsmodell

### 🟢 Grundsätzlich förderfähig

Status:

`ELIGIBLE`

Die Maßnahme wurde durch die Sachbearbeitung als grundsätzlich förderfähig eingeschätzt.

### 🟡 Nachbearbeitung erforderlich

Status:

`NEEDS_CHANGES`

Die Schule erhält eine öffentliche Nachforderung, kann Angaben und Dokumente ergänzen und anschließend erneut einreichen.

### 🔴 Derzeit nicht förderfähig

Status:

`NOT_ELIGIBLE`

Eine öffentliche Begründung ist Pflicht und wird der Schule angezeigt.

Alle Ergebnisse bleiben **unverbindliche Ersteinschätzungen**.

## Förderbereiche im MVP

1. **IT-Infrastruktur, Netzwerk und WLAN**
2. **Digitale Endgeräte**
3. **Bildungssoftware und digitale Lernplattformen**

Pro Maßnahme wird genau ein Förderbereich gespeichert.

## Förderfragen

Der MVP verwendet neun verbindliche Fragen.

Antwortmöglichkeiten:

- Ja
- Nein
- Nicht bekannt

Alle neun Fragen müssen vor Einreichung beantwortet sein.

Die Antworten dienen der strukturierten Akte und erzeugen **keine automatische Förderentscheidung**.

## Dokumente

Unterstützt:

- PDF
- Word
- Excel
- maximal 10 MB

Die Dokumente werden maßnahmenbezogen gespeichert.

Sicherheit:

- privater Azure Blob Storage
- Managed Identity
- serverseitige Autorisierung
- keine Storage Keys im Frontend

## Submission-Versionierung

Bei jeder Einreichung wird ein historischer Snapshot gespeichert.

Enthalten:

- Antragsteller
- Schule
- Maßnahme
- Antworten
- Dokumentmetadaten

Eine Wiedereinreichung erzeugt eine neue Submission-Version. Alte Einreichungen werden nicht überschrieben.

## PDF-Prüfbericht

Abgeschlossene Vorgänge können aus dem Sachbearbeiterbereich als PDF exportiert werden.

Exportierbar:

- `ELIGIBLE`
- `NOT_ELIGIBLE`

Der Prüfbericht enthält:

- KLARFÖRDERN-Branding
- Vorgangsnummer
- Submission-Version
- Prüfzeitpunkt
- Antragsteller
- Schuldaten
- Maßnahmendaten
- Förderbereich
- neun Förderfragen und Antworten
- Dokumentenliste
- Sachbearbeitung
- menschliche Entscheidung
- öffentliche Begründung / Anmerkung
- Hinweis auf Human-in-the-Loop
- Unverbindlichkeits-Hinweis

Nicht enthalten:

- interne Vermerke
- Blob-Pfade
- technische IDs
- Secrets

## Bewusste Scope-Entscheidung

Die ursprüngliche Projektplanung enthielt eine automatische Förderregel-Engine.

Im Projektzeitraum lag dafür kein belastbares, freigegebenes und versioniertes Förderregelwerk vor.

Deshalb wurden folgende Product Items bewusst ersetzt und als **Not planned** abgeschlossen:

- #27 – Förderregeln auf Antworten anwenden
- #28 – Förderstatus automatisch bestimmen
- #31 – automatische Förderregeln anzeigen

Der Ersatz ist das produktiv umgesetzte Human-in-the-Loop-Sachbearbeiterportal.

Dies ist eine bewusste Product-Owner-Scope-Entscheidung und kein offener Implementierungsmangel.

## Technische Architektur

```text
Internet
  ↓
Cloudflare
  ↓
Nginx
  ├── React/Vite PWA
  └── /api/*
        ↓
     Fastify
        ↓
     PostgreSQL

Dokumente
  ↓
Azure Blob Storage
  ↓
Managed Identity
```

Technologien:

- React 19
- TypeScript
- Vite
- PWA
- React Router
- Node.js
- Fastify
- PostgreSQL
- PDFKit
- Azure VM
- Azure Blob Storage
- Managed Identity
- Nginx
- Cloudflare
- HTTPS/TLS

## Sicherheit

Umgesetzt:

- Argon2id
- serverseitige Sessions
- HttpOnly/Secure/SameSite-Cookies
- serverseitige Rollenprüfung
- SchoolMembership-basierte Mandantentrennung
- CSRF-Origin-Prüfung
- Rate Limits
- private Dokumentablage
- Managed Identity
- keine Secrets im Repository
- redigierte Auth-/Cookie-Logs
- Trennung öffentlicher und interner Sachbearbeitertexte

## Scrum-Team

| Teammitglied | Rolle | Schwerpunkt |
|---|---|---|
| **Anelia Zhilisbayev** | Product Owner | Product Backlog, Marketing, Zielgruppenperspektive |
| **Mohamad Feras Arman** | Developer | Automatisierung, Entwicklung, Workflows |
| **Viktoriia Iakobchuk** | UAT & QA | User Acceptance Testing, Qualitätssicherung |
| **Christian Schreiber** | Scrum Master & Developer | Azure Architecture, Infrastruktur, Entwicklung |

Details: [docs/TEAM.md](docs/TEAM.md)

## Sprint-Abschluss

### Sprint 1 – Infrastruktur

**28.09.–29.09.2026**  
**Status:** ✅ abgeschlossen

Geliefert:

- Azure VM
- Linux-Basis
- Nginx
- Node-/React-Build
- GitHub Deployment
- DNS
- Cloudflare
- TLS
- Landingpage

### Sprint 2 – Erfassen & Einreichen

**30.09.–02.10.2026**  
**Status:** ✅ abgeschlossen

Geliefert:

- Authentifizierung
- Profile
- Schuldaten
- Maßnahmen
- Förderbereiche
- Förderfragen
- Dokumente
- Persistenz
- Einreichung

### Sprint 3 – Auswerten & Handeln

**03.10.–05.10.2026**  
**fachlicher MVP bereits am 02.10.2026 vollständig abgenommen**  
**Status:** ✅ abgeschlossen im freigegebenen MVP-Scope

Geliefert:

- Sachbearbeiterportal
- digitale Akte
- Human-in-the-Loop
- Grün / Gelb / Rot
- Nachforderungen
- Rückkanal
- Wiedereinreichung
- Submission-Historie
- Audit
- PDF-Prüfbericht

## GitHub-Abschlussstatus

Zum Product-Owner-Abschlussreview am 02.10.2026:

- alle umgesetzten Issues: **Done / completed**
- alle bewusst ersetzten Automatik-Issues: **Not planned**
- keine offenen Product-Backlog-Issues im freigegebenen MVP-Scope
- keine offenen Checkboxen in abgeschlossenen Done-Issues

## Dokumentation

- [Produktdefinition](docs/PRODUCT_DEFINITION.md)
- [Product Backlog](docs/PRODUCT_BACKLOG.md)
- [Akzeptanzkriterien & Definition of Done](docs/ACCEPTANCE_CRITERIA.md)
- [Architektur](docs/ARCHITECTURE.md)
- [Sachbearbeiterportal](docs/CASE_WORKER_PORTAL.md)
- [GitHub-/Scrum-Hierarchie](docs/GITHUB_HIERARCHY.md)
- [Branding](docs/BRANDING.md)
- [Team & Rollen](docs/TEAM.md)
- [Entwicklungsstand](docs/DEVELOPMENT_STATUS.md)
- [Projektabschluss](docs/PROJECT_CLOSURE.md)
- [Sprint-1 Deployment](docs/SPRINT_1_DEPLOYMENT.md)

## Projektzeitraum

Bearbeitungszeitraum:

**28.09.2026 – 05.10.2026**

Projektvorstellung:

**06.10.2026**

## Abgrenzung

KLARFÖRDERN ist kein offizielles Angebot des Bundes, eines Bundeslandes oder einer Förderstelle.

Das Ergebnis ist eine **unverbindliche Ersteinschätzung** und stellt keine Förderzusage, keinen Bewilligungsbescheid und keine rechtsverbindliche Förderentscheidung dar.

## Projektstatus

✅ **MVP abgeschlossen und Product-Owner-abgenommen**

Weitere Funktionen sind mögliche Produktweiterentwicklungen und keine offenen Restpunkte der Abschlussarbeit.
