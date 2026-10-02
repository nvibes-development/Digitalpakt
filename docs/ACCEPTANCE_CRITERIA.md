# Fachliche Akzeptanzkriterien und Definition of Done – Abschlussstand

**Stand:** 02.10.2026  
**Status:** Product-Owner-Abschlussreview abgeschlossen

## Produktprinzip

> **KLARFÖRDERN unterstützt die Prüfung. Die fachliche Entscheidung trifft ein autorisierter Sachbearbeiter.**

Die Anwendung erzeugt keine automatische Förderentscheidung aus einem unvollständigen oder erfundenen Regelwerk.

## 1. Schuldaten

- [x] Bundesland erfassbar
- [x] allgemeinbildende / berufsbildende Schule erfassbar
- [x] Schulart erfassbar
- [x] Trägerschaft erfassbar
- [x] Anerkennungsstatus bei privaten Schulen berücksichtigt
- [x] Pflichtfelder gekennzeichnet
- [x] verständliche Validierung
- [x] persistente Speicherung
- [x] spätere Wiederaufnahme möglich
- [x] keine erfundene automatische Antragsberechtigung

## 2. Maßnahme

- [x] Maßnahme anlegen
- [x] Bezeichnung und Beschreibung
- [x] Rahmendaten
- [x] Kosten
- [x] Zeitraum
- [x] Umsetzungsstatus
- [x] genau ein MVP-Förderbereich
- [x] mehrere Maßnahmen je Schule
- [x] fachlich und technisch getrennte Maßnahmen

## 3. Förderbereiche

- [x] IT-Infrastruktur, Netzwerk und WLAN
- [x] Digitale Endgeräte
- [x] Bildungssoftware und digitale Lernplattformen
- [x] genau ein Förderbereich pro Maßnahme

## 4. Förderfragen

- [x] neun verbindliche Fragen
- [x] Ja / Nein / Nicht bekannt
- [x] maßnahmenbezogene Speicherung
- [x] gespeicherte Antworten erneut laden
- [x] vollständige Antworten vor Einreichung
- [x] Sperre nach Einreichung
- [x] Wiederfreigabe bei Nachforderung
- [x] Anzeige in digitaler Akte
- [x] keine automatische Förderentscheidung

## 5. Dokumente

- [x] maßnahmenbezogen
- [x] PDF
- [x] Word
- [x] Excel
- [x] maximal 10 MB
- [x] Upload
- [x] Liste
- [x] Download
- [x] Löschen vor Einreichung
- [x] Sperre nach Einreichung
- [x] Wiederfreigabe bei Nachforderung
- [x] privater Azure Blob Storage
- [x] serverseitige Autorisierung
- [x] Sachbearbeiterdownload

## 6. Einreichung und Versionierung

- [x] Einreichung erst nach neun Antworten
- [x] mindestens ein Dokument erforderlich
- [x] Vorgangsnummer
- [x] Submission-Version
- [x] Antragsteller-Snapshot
- [x] Schul-Snapshot
- [x] Maßnahmen-Snapshot
- [x] Antworten-Snapshot
- [x] Dokumentmetadaten-Snapshot
- [x] historische Submission bleibt unverändert
- [x] Wiedereinreichung erzeugt neue Version

## 7. Sachbearbeiterzugang

- [x] `case_worker`
- [x] öffentliche Registrierung erzeugt keinen Case Worker
- [x] `/review` geschützt
- [x] `/api/review/*` serverseitig geschützt
- [x] Schulbenutzer besitzt keinen Review-Zugriff
- [x] Master-Sachbearbeiter `sachbearbeiter@nvibes.de`
- [x] keine Self-Service-Rollenerhöhung

## 8. Posteingang und digitale Akte

- [x] neue Einreichungen im Posteingang
- [x] Wiedereinreichungen im Posteingang
- [x] Suche
- [x] Sortierung
- [x] Vorgangsnummer
- [x] Antragsteller
- [x] Schule
- [x] Maßnahme
- [x] Förderbereich
- [x] Antworten
- [x] Dokumente
- [x] Submission-Version
- [x] Verlauf

## 9. Vorgangsübernahme

- [x] Übernahme möglich
- [x] atomare Zuweisung
- [x] Sachbearbeiter gespeichert
- [x] Übernahmezeitpunkt gespeichert
- [x] Entscheidung nur im vorgesehenen Review-Zustand

## 10. Menschliche Entscheidung

### Grün

- [x] `ELIGIBLE`
- [x] Sachbearbeiterzuordnung
- [x] Submission-Zuordnung
- [x] optionale öffentliche Nachricht
- [x] unverbindliche Ersteinschätzung

### Gelb

- [x] `NEEDS_CHANGES`
- [x] Pflichtnachricht
- [x] betroffene Bereiche technisch markierbar
- [x] Bearbeitung wieder freigegeben
- [x] Wiedereinreichung

### Rot

- [x] `NOT_ELIGIBLE`
- [x] öffentliche Begründung Pflicht
- [x] interner Vermerk getrennt

## 11. Rückkanal

- [x] Status in „Meine Maßnahmen“
- [x] Grün sichtbar
- [x] Gelb sichtbar
- [x] Rot sichtbar
- [x] Bearbeitungszeitpunkt sichtbar
- [x] gelbe Nachforderung sichtbar
- [x] rote Begründung sichtbar
- [x] optionale grüne Nachricht sichtbar
- [x] Schul-API liefert keine internen Vermerke

## 12. Audit und Historie

- [x] Einreichung protokolliert
- [x] Öffnen / Übernahme protokolliert
- [x] Nachforderung protokolliert
- [x] Wiedereinreichung protokolliert
- [x] Entscheidung protokolliert
- [x] Submission-Versionen erhalten
- [x] keine Dokumentinhalte / Zugangsdaten im Audit
- [x] interne Vermerke nicht im Schulportal

## 13. PDF-Prüfbericht

- [x] Ergebnis persistent gespeichert
- [x] Entscheidung und Zeitpunkt gespeichert
- [x] historische Submission erhalten
- [x] Export nur für `ELIGIBLE` und `NOT_ELIGIBLE`
- [x] Förderbereich aus Submission-Snapshot
- [x] PDF enthält Vorgangsnummer
- [x] PDF enthält Submission-Version
- [x] PDF enthält Antragsteller
- [x] PDF enthält Schuldaten
- [x] PDF enthält Maßnahmendaten
- [x] PDF enthält Förderbereich
- [x] PDF enthält neun Fragen und Antworten
- [x] PDF enthält Dokumentliste
- [x] PDF enthält Sachbearbeitung
- [x] PDF enthält menschliche Entscheidung
- [x] PDF enthält öffentliche Begründung
- [x] PDF enthält Prüfzeitpunkt
- [x] PDF enthält Human-in-the-Loop-Hinweis
- [x] PDF enthält Unverbindlichkeits-Hinweis
- [x] PDF enthält keinen internen Vermerk
- [x] PDF enthält keine Blob-Pfade / technischen IDs
- [x] serverseitige Sachbearbeiterautorisierung
- [x] grüner Bericht produktiv getestet
- [x] roter Bericht produktiv getestet
- [x] lange Texte und mehrere Dokumente produktiv getestet

## 14. Bewusst ersetzte Automatik

Nicht Bestandteil des freigegebenen MVP:

- automatische Förderregel-Engine
- automatische Förderstatusentscheidung
- automatische Regelversionsanzeige

GitHub:

- #27 – Not planned
- #28 – Not planned
- #31 – Not planned

Ersatz:

Human-in-the-Loop-Sachbearbeiterworkflow.

## Projektweite Definition of Done – final erfüllt

- [x] alle freigegebenen Akzeptanzkriterien erfüllt
- [x] Umsetzung vollständig und funktionsfähig
- [x] notwendige fachliche und technische Tests durchgeführt
- [x] keine bekannten kritischen Fehler
- [x] Funktionen in `main` integriert
- [x] relevante Dokumentation aktualisiert
- [x] GitHub-Status nachvollziehbar
- [x] Product-Owner-Abnahme durchgeführt
- [x] keine offenen Checkboxen in Done-Issues
- [x] keine Secrets / privaten Schlüssel im Repository
- [x] Datenbankänderungen versioniert
- [x] geschützte Funktionen serverseitig autorisiert
- [x] Deployment reproduzierbar

## Abschluss

Der freigegebene MVP erfüllt die Definition of Done.

Siehe [PROJECT_CLOSURE.md](PROJECT_CLOSURE.md).
