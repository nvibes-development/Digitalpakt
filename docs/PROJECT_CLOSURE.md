# Projektabschluss – KLARFÖRDERN

**Abschlussdatum:** 02.10.2026  
**Projekt:** Scrum-Abschlussarbeit „Agiles Projekt mit Scrum“  
**Produkt:** KLARFÖRDERN – Förderfähigkeit. Einfach klar.  
**Produktions-URL:** https://digitalpakt.nvibes.de  
**Implementierungsbaseline:** `eb8379f24277adbe14a0558f9cf2a714dcbcf96a` – PDF-Prüfbericht / PR #129

## 1. Abschlussstatus

Das im aktuellen MVP freigegebene Product Goal ist erreicht.

Der vollständige End-to-End-Prozess ist produktiv umgesetzt:

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
→ Rückmeldung an die Schule
→ bei Gelb: Nachbearbeitung und Wiedereinreichung
→ bei Grün/Rot: Abschluss
→ PDF-Prüfbericht
```

Alle GitHub-Issues sind zum Projektabschluss entweder:

- **Done / completed**, oder
- bewusst **Not planned**, weil die ursprünglich geplante automatische Förderregel-Engine durch den freigegebenen Human-in-the-Loop-Ansatz ersetzt wurde.

Es bestehen keine offenen Product-Backlog-Issues für den freigegebenen MVP-Scope.

## 2. Product-Owner-Scope-Entscheidung

Die ursprüngliche Planung sah eine automatische Förderregel-Engine vor. Dafür lag im Projektzeitraum kein belastbares, versioniertes Förderregelwerk vor.

Der Product Owner hat deshalb folgende Anforderungen bewusst ersetzt:

- #27 – automatische Förderregeln anwenden
- #28 – automatischen Förderstatus bestimmen
- #31 – zugrunde liegende automatische Förderregeln anzeigen

Diese Issues sind korrekt als **Not planned** dokumentiert.

Ersatz ist der vollständige Human-in-the-Loop-Prüfworkflow:

> KLARFÖRDERN unterstützt die Prüfung. Die fachliche Entscheidung trifft ein autorisierter Sachbearbeiter.

## 3. Schulportal – gelieferter Umfang

- Registrierung und Login
- sichere serverseitige Sitzung
- Profilverwaltung
- Passwortänderung
- sichere Kontolöschung
- Schuldaten erfassen und speichern
- mehrere Maßnahmen je Schule
- drei MVP-Förderbereiche
- neun Förderfragen mit Ja / Nein / Nicht bekannt
- Dokumente hochladen, auflisten, herunterladen und löschen
- Einreichung erst nach vollständigen Antworten und mindestens einem Dokument
- Vorgangsnummer
- Bearbeitungsstatus
- öffentliche Sachbearbeiternachricht / Begründung
- Nachbearbeitung bei Gelb
- Wiedereinreichung
- Maßnahmenübersicht
- Anzeige Grün / Gelb / Rot
- Historie über versionierte Submissions

## 4. Sachbearbeiterportal – gelieferter Umfang

Geschützter Bereich unter `/review`.

Initialer produktiver Master-Sachbearbeiter:

`sachbearbeiter@nvibes.de`

Rolle:

`case_worker`

Umgesetzt:

- rollenbasierter Zugang
- Posteingang
- Suche und Sortierung
- In Bearbeitung
- Nachforderungen
- Abgeschlossen
- digitale Vorgangsakte
- Antragstellerdaten
- Schuldaten
- Maßnahmendaten
- Förderbereich
- Förderfragen und Antworten
- Dokumentenliste und autorisierter Download
- atomare Vorgangsübernahme
- öffentliche Nachricht
- interner Vermerk
- menschliche Entscheidung:
  - grundsätzlich förderfähig
  - Nachbearbeitung erforderlich
  - derzeit nicht förderfähig
- Wiedereinreichung
- Submission-Versionierung
- Audit-Grundlage
- abgeschlossene Vorgänge als PDF-Prüfbericht

## 5. PDF-Prüfbericht

Abgeschlossene Vorgänge mit Status `ELIGIBLE` oder `NOT_ELIGIBLE` können aus „Abgeschlossen“ als PDF exportiert werden.

Der Bericht enthält:

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
- Human-in-the-Loop-Hinweis
- Hinweis auf die unverbindliche Ersteinschätzung

Nicht exportiert werden:

- interne Vermerke
- Blob-Pfade
- technische IDs
- Secrets

Die produktive UAT wurde für einen grünen und einen roten Prüfbericht sowie für lange Texte und mehrere Dokumente erfolgreich durchgeführt.

## 6. Persistenz und Nachvollziehbarkeit

PostgreSQL mit versionierten Migrationen.

Wichtige Tabellen und Konzepte:

- Benutzer und Sessions
- Schulen und SchoolMemberships
- Maßnahmen
- Förderfragen und Antworten
- Dokumentmetadaten
- `measure_submissions`
- `case_decisions`
- `case_requests`
- `audit_events`

Einreichungen werden als unveränderliche Snapshots historisiert. Eine Wiedereinreichung erzeugt eine neue Submission-Version und überschreibt den alten Stand nicht.

## 7. Sicherheit

Umgesetzt:

- HttpOnly/Secure/SameSite-Session-Cookie
- serverseitige Rollenprüfung
- Schulzugriffe über Membership
- Review-Endpunkte nur für Sachbearbeiter
- CSRF-Origin-Prüfung für schreibende Requests
- Rate Limits für Auth
- Argon2id-Passwortspeicherung
- private Azure Blob Storage Ablage
- Managed Identity
- keine Storage Keys im Frontend
- keine Secrets im Repository
- redigierte Session-/Authorization-Logs
- Trennung von öffentlicher Nachricht und internem Vermerk
- PDF-Export ohne interne Vermerke

## 8. Architektur

- React 19
- TypeScript
- Vite
- PWA
- React Router
- Fastify
- PostgreSQL
- Azure VM
- Nginx
- Azure Blob Storage
- Managed Identity
- Cloudflare
- HTTPS/TLS
- versionierte SQL-Migrationen
- atomarer Release-Prozess

Keine Microservices, kein Kubernetes und keine externe Reporting-Plattform wurden für den MVP benötigt.

## 9. Scrum-Abschluss

### Sprint 1 – Infrastruktur

**Status:** abgeschlossen

Ergebnis:

- Azure-Hosting
- Linux
- Nginx
- Build-Umgebung
- GitHub-Deployment
- DNS
- Cloudflare
- TLS
- Landingpage

### Sprint 2 – Erfassen & Einreichen

**Status:** abgeschlossen

Ergebnis:

- Authentifizierung
- Schuldaten
- Maßnahmen
- Förderbereiche
- Förderfragen
- Persistenz
- Dokumente
- Einreichung

### Sprint 3 – Auswerten & Handeln

**Status:** abgeschlossen

Ergebnis:

- Sachbearbeiterportal
- digitale Akte
- Human-in-the-Loop
- Grün / Gelb / Rot
- Nachforderung
- Rückkanal
- Wiedereinreichung
- Submission-Historie
- Audit
- PDF-Prüfbericht

## 10. Product Backlog – Abschluss

Completed:

- PI-01 bis PI-06
- PI-09, PI-10, PI-12, PI-13
- PI-14 bis PI-18
- kompletter Sachbearbeiterportal-Workflow #105 und #114–#119

Bewusst ersetzt / Not planned:

- PI-07 #27
- PI-08 #28
- PI-11 #31

Damit ist der freigegebene MVP-Backlog abgeschlossen.

## 11. Product-Owner-Abnahme

Am 02.10.2026 wurde der Gesamtstand erneut gegen das Repository, die Issues und die produktive Anwendung geprüft.

Bestätigt:

- [x] alle Done-Issues besitzen keine offenen Checklistenpunkte
- [x] alle bewusst verworfenen Automatik-Issues sind als Not planned dokumentiert
- [x] Schulportal produktiv getestet
- [x] Sachbearbeiterportal produktiv getestet
- [x] Grün getestet
- [x] Gelb getestet
- [x] Rot getestet
- [x] Rückkanal getestet
- [x] Wiedereinreichung getestet
- [x] Dokumentzugriff getestet
- [x] PDF grün getestet
- [x] PDF rot getestet
- [x] PDF mit langen Texten und mehreren Dokumenten getestet
- [x] Förderbereich in „Abgeschlossen“ korrekt
- [x] Abschlussdokumentation aktualisiert

## 12. Abgrenzung

KLARFÖRDERN ist kein offizielles Angebot einer Förderstelle.

Die Anwendung liefert eine **unverbindliche Ersteinschätzung**. Auch eine grüne menschliche Prüfung stellt keine Förderzusage und keinen Bewilligungsbescheid dar.

## 13. Weiterentwicklung nach dem Abschlussprojekt

Mögliche spätere Erweiterungen, ausdrücklich außerhalb des aktuellen MVP:

- fachlich freigegebene, versionierte Förderregelsets
- mehrere Sachbearbeiterorganisationen und Zuweisungsregeln
- Benachrichtigungen
- KI-gestützte, klar gekennzeichnete Aktenzusammenfassungen
- weitergehende Berichte und Statistiken
- zusätzliche Förderbereiche

Diese Punkte sind **kein Restmangel des abgeschlossenen MVP**, sondern mögliche zukünftige Produktentwicklung.
