# Entwicklungsstand – KLARFÖRDERN

**Stand:** 02.10.2026  
**Status:** ✅ MVP abgeschlossen und Product-Owner-abgenommen  
**Produktions-URL:** https://digitalpakt.nvibes.de  
**Implementierungsbaseline:** `eb8379f24277adbe14a0558f9cf2a714dcbcf96a`

## Produktstatus

Der vollständige freigegebene End-to-End-Prozess ist produktiv umgesetzt:

```text
Registrierung / Login
→ Schuldaten
→ Maßnahme
→ Förderbereich
→ neun Förderfragen
→ Dokumente
→ Einreichung
→ Submission-Snapshot
→ Sachbearbeiter-Posteingang
→ digitale Akte
→ menschliche Prüfung
→ Grün / Gelb / Rot
→ Rückmeldung
→ ggf. Nachbearbeitung und Wiedereinreichung
→ Abschluss
→ PDF-Prüfbericht
```

## Zugang und Rollen

### Schule

`school_admin`

### Sachbearbeitung

`case_worker`

Initialer Master-Sachbearbeiter:

`sachbearbeiter@nvibes.de`

Öffentliche Registrierung erzeugt ausschließlich `school_admin`.

## Authentifizierung und Profil

Umgesetzt und getestet:

- Registrierung
- Login
- Logout
- serverseitige Sessions
- rollenabhängige Weiterleitung
- Profilverwaltung
- E-Mail-Änderung
- Passwortänderung
- Kontolöschung
- Schutz geteilter Schuldaten
- Impressum
- Datenschutz
- In-App-Hilfe

## Schuldaten

Umgesetzt:

- SchoolMemberships
- Mandantentrennung
- Bundesland
- Schulform
- Schulart
- Trägerschaft
- Anerkennungsstatus
- Validierung
- Persistenz

Die technische Eligibility-Komponente erzeugt ohne freigegebenes Regelwerk keine automatische fachliche Entscheidung.

## Maßnahmen

Umgesetzt:

- mehrere Maßnahmen je Schule
- Bezeichnung
- Beschreibung
- Kosten
- Zeitraum
- Umsetzungsstatus
- technische Ausstattung
- frühere Maßnahmen
- frühere Fördermittel
- drei Förderbereiche
- Maßnahmenübersicht
- Status
- Wiedereinreichung
- Submission-Historie

## Förderbereiche

1. IT-Infrastruktur, Netzwerk und WLAN
2. Digitale Endgeräte
3. Bildungssoftware und digitale Lernplattformen

## Förderfragen

- neun verbindliche Fragen
- Ja / Nein / Nicht bekannt
- persistente Antworten
- Sperre nach Einreichung
- Wiederfreigabe bei Nachforderung
- Anzeige in Sachbearbeiterakte

Keine automatische Förderentscheidung.

## Dokumente

- PDF / Word / Excel
- maximal 10 MB
- Upload
- Liste
- Download
- Löschen
- private Azure Blob Storage Ablage
- Managed Identity
- serverseitige Autorisierung
- Review-Download
- Sperre nach Einreichung
- Wiederfreigabe bei Nachforderung

## Einreichung

Voraussetzungen:

- neun beantwortete Fragen
- mindestens ein Dokument

Erzeugt:

- Vorgangsnummer
- Submission-Version
- Snapshots von Antragsteller, Schule, Maßnahme, Antworten und Dokumentmetadaten

## Sachbearbeiterportal

Route:

`/review`

Umgesetzt:

- Posteingang
- Suche
- Sortierung
- In Bearbeitung
- Nachforderungen
- Abgeschlossen
- digitale Akte
- Vorgangsübernahme
- Förderbereich
- Dokumente
- öffentliche Nachricht
- interner Vermerk
- Grün / Gelb / Rot
- Rückkanal
- Wiedereinreichung
- Submission-Versionierung
- Audit
- PDF-Prüfbericht

## Rückkanal

Produktiv getestet:

- Gelb: Nachforderung sichtbar
- Rot: Begründung sichtbar
- Grün: optionale öffentliche Nachricht möglich

Interne Vermerke werden nicht an das Schulportal ausgeliefert.

## PDF-Prüfbericht

Endpunkt:

`GET /api/review/cases/:caseId/report.pdf`

Nur für:

- `ELIGIBLE`
- `NOT_ELIGIBLE`

Nur für autorisierte Sachbearbeiter.

Enthält:

- historische Submission
- Förderbereich
- Entscheidung
- öffentliche Begründung
- Sachbearbeiter
- Prüfzeitpunkt
- neun Antworten
- Dokumentliste
- Unverbindlichkeits-Hinweis

Ausgeschlossen:

- `internal_note`
- Blob-Pfade
- technische IDs

Produktiv abgenommen:

- [x] grüner PDF-Bericht
- [x] roter PDF-Bericht
- [x] lange Texte
- [x] mehrere Dokumente

## Datenmodell

Versionierte Migrationen `001` bis `010`.

Wichtige Bestandteile:

- Benutzer / Sessions
- Profile
- Schulen / Memberships
- Maßnahmen
- Fragen / Antworten
- Dokumente
- Submission
- `measure_submissions`
- `case_decisions`
- `case_requests`
- `audit_events`

## Sicherheit

- Argon2id
- HttpOnly/Secure/SameSite Cookie
- serverseitige Rollenprüfung
- CSRF-Origin-Prüfung
- Rate Limits
- private Blob-Dokumente
- Managed Identity
- keine Secrets im Repository
- redigierte Auth-Logs
- öffentliche / interne Sachbearbeitertexte getrennt

## Bewusst ersetzt

Als Not planned geschlossen:

- #27 automatische Förderregeln
- #28 automatischer Förderstatus
- #31 automatische Regelanzeige

Ersatz:

Human-in-the-Loop.

## GitHub-Abschluss

Am 02.10.2026 erneut geprüft:

- alle umgesetzten Issues geschlossen
- alle Done-Issues ohne offene Checkboxen
- bewusst ersetzte Issues korrekt als Not planned
- keine offenen Product-Backlog-Issues im MVP-Scope

## Abschluss

Der aktuelle Stand ist für die Abschlusspräsentation freigegeben.

Details: [PROJECT_CLOSURE.md](PROJECT_CLOSURE.md).
