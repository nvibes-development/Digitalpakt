# Fachliche Akzeptanzkriterien und Definition of Done

**Stand:** 1. Oktober 2026  
**Product-Owner-Refinement:** Human-in-the-Loop-Prüfmodell

## Übergreifendes Produktprinzip

KLARFÖRDERN sammelt und strukturiert die für eine Vorprüfung relevanten Daten. Die fachliche Entscheidung wird im aktuellen MVP **nicht automatisch** aus einem Förderregelwerk erzeugt.

Verbindlich gilt:

> KLARFÖRDERN unterstützt die Prüfung. Die fachliche Entscheidung trifft ein autorisierter Sachbearbeiter.

Die ursprünglichen automatischen Förderregel-Akzeptanzkriterien wurden durch Product-Owner-Entscheidung für den MVP ersetzt.

---

# 1. Schuldaten

## Akzeptanzkriterien

- [x] Bundesland kann erfasst werden.
- [x] Allgemeinbildende oder berufsbildende Schule kann erfasst werden.
- [x] Schulart kann erfasst werden.
- [x] Trägerschaft kann erfasst werden.
- [x] Anerkennungsstatus wird bei privaten Schulen berücksichtigt.
- [x] Pflichtfelder sind gekennzeichnet.
- [x] Fehlende oder ungültige Angaben werden verständlich angezeigt.
- [x] Schuldaten werden persistent gespeichert.
- [x] Schuldaten können später erneut geöffnet werden.
- [x] Ohne verbindliches Fachregelwerk wird keine automatische positive oder negative Förderentscheidung erfunden.

---

# 2. Maßnahme

## Akzeptanzkriterien

- [x] Maßnahme kann angelegt werden.
- [x] Bezeichnung und Beschreibung können erfasst werden.
- [x] relevante Rahmendaten können gespeichert werden.
- [x] Kosten können erfasst werden.
- [x] Zeitraum kann erfasst werden.
- [x] Umsetzungsstatus kann erfasst werden.
- [x] genau ein MVP-Förderbereich kann ausgewählt werden.
- [x] mehrere Maßnahmen können einer Schule zugeordnet werden.
- [x] jede Maßnahme bleibt fachlich und technisch getrennt.

---

# 3. Förderbereiche

Unterstützt:

- [x] IT-Infrastruktur, Netzwerk und WLAN
- [x] Digitale Endgeräte
- [x] Bildungssoftware und digitale Lernplattformen

Pro Maßnahme:

- [x] genau ein Förderbereich

---

# 4. Förderfragen

Der aktuelle MVP verwendet neun verbindliche Förderfragen.

## Akzeptanzkriterien

- [x] Antwortmöglichkeiten: Ja / Nein / Nicht bekannt.
- [x] alle neun Fragen werden angezeigt.
- [x] Antworten werden maßnahmenbezogen gespeichert.
- [x] bereits gespeicherte Antworten werden erneut geladen.
- [x] alle neun Fragen müssen vor Einreichung beantwortet sein.
- [x] Antworten werden nach Einreichung gesperrt.
- [x] bei einer Nachforderung werden Antworten wieder bearbeitbar.
- [x] Sachbearbeiter sieht die Antworten in der digitalen Akte.
- [x] Antworten erzeugen keine automatische Förderentscheidung.

---

# 5. Dokumente

## Akzeptanzkriterien

- [x] Dokumente sind einer Maßnahme zugeordnet.
- [x] PDF wird unterstützt.
- [x] Word wird unterstützt.
- [x] Excel wird unterstützt.
- [x] maximale Dateigröße 10 MB.
- [x] Upload.
- [x] Liste.
- [x] Download.
- [x] Löschen vor Einreichung.
- [x] Sperre nach Einreichung.
- [x] Wiederfreigabe bei Nachforderung.
- [x] Blob Storage ist privat.
- [x] Zugriff wird serverseitig autorisiert.
- [x] Sachbearbeiter kann Dokumente aus der digitalen Akte herunterladen.

---

# 6. Einreichung

## Akzeptanzkriterien

- [x] Einreichung erst nach neun Antworten.
- [x] Einreichung erst mit mindestens einem Dokument.
- [x] Vorgangsnummer wird erzeugt.
- [x] Submission-Version wird gespeichert.
- [x] Antragsteller-Snapshot wird gespeichert.
- [x] Schul-Snapshot wird gespeichert.
- [x] Maßnahmen-Snapshot wird gespeichert.
- [x] Antworten-Snapshot wird gespeichert.
- [x] Dokumentmetadaten-Snapshot wird gespeichert.
- [x] historische Submission bleibt unverändert.

---

# 7. Sachbearbeiterzugang

## Akzeptanzkriterien

- [x] `case_worker`-Rolle vorhanden.
- [x] öffentliche Registrierung erzeugt keinen Case Worker.
- [x] `/review` ist geschützt.
- [x] `/api/review/*` ist serverseitig geschützt.
- [x] Schulbenutzer besitzt keinen berechtigten Review-Zugriff.
- [x] initialer Master-Sachbearbeiter ist `sachbearbeiter@nvibes.de`.
- [x] Rollen können nicht über das normale Profil selbst erhöht werden.

---

# 8. Posteingang und digitale Akte

## Akzeptanzkriterien

- [x] neue Einreichungen erscheinen im Posteingang.
- [x] erneut eingereichte Vorgänge erscheinen im Posteingang.
- [x] Suche vorhanden.
- [x] Sortierung vorhanden.
- [x] Vorgangsnummer sichtbar.
- [x] Antragsteller sichtbar.
- [x] Schule sichtbar.
- [x] Maßnahme sichtbar.
- [x] Antworten sichtbar.
- [x] Dokumente sichtbar.
- [x] Submission-Version sichtbar.
- [x] Verlauf sichtbar.

---

# 9. Übernahme

## Akzeptanzkriterien

- [x] Sachbearbeiter kann Vorgang übernehmen.
- [x] Übernahme erfolgt atomar.
- [x] zugewiesener Sachbearbeiter wird gespeichert.
- [x] Bearbeitungszeitpunkt wird gespeichert.
- [x] Entscheidung ist nur im vorgesehenen Review-Zustand möglich.

---

# 10. Menschliche Entscheidung

## Grün

- [x] „Grundsätzlich förderfähig“ kann gespeichert werden.
- [x] Entscheidung ist einem Sachbearbeiter zugeordnet.
- [x] Entscheidung ist einer Submission zugeordnet.
- [x] öffentliche Nachricht ist technisch optional speicherbar.
- [x] Ergebnis bleibt unverbindliche Ersteinschätzung.

## Gelb

- [x] Nachforderung ist möglich.
- [x] öffentliche Nachricht ist Pflicht.
- [x] betroffene Bereiche können technisch markiert werden.
- [x] Maßnahme wird für die Schule wieder bearbeitbar.
- [x] erneute Einreichung erzeugt neue Submission-Version.

## Rot

- [x] „Derzeit nicht förderfähig“ ist möglich.
- [x] öffentliche Begründung ist Pflicht.
- [x] interner Vermerk bleibt getrennt.

---

# 11. Rückkanal zur Schule

## Bereits umgesetzt

- [x] Bearbeitungsstatus wird in „Meine Maßnahmen“ angezeigt.
- [x] Grün wird als grundsätzlich förderfähig angezeigt.
- [x] Gelb wird als Nachbearbeitung erforderlich angezeigt.
- [x] Rot wird als derzeit nicht grundsätzlich förderfähig angezeigt.
- [x] Bearbeitungszeitpunkt wird angezeigt.

## Noch offen

- [ ] Gelbe Sachbearbeiternachricht wird im Schulportal angezeigt.
- [ ] Rote Begründung wird im Schulportal angezeigt.
- [ ] optionale grüne Nachricht wird bei Vorhandensein angezeigt.
- [ ] School-API liefert nur öffentliche Nachricht, niemals internen Vermerk.

Siehe #117, #29, #30, #32.

---

# 12. Audit und Historie

## Akzeptanzkriterien

- [x] Einreichung wird protokolliert.
- [x] Öffnen / Übernahme wird protokolliert.
- [x] Nachforderung wird protokolliert.
- [x] Wiedereinreichung wird protokolliert.
- [x] Entscheidung wird protokolliert.
- [x] Submission-Versionen bleiben erhalten.
- [x] Audit enthält keine Dokumentinhalte oder Zugangsdaten.
- [x] interne Vermerke werden nicht im Schulportal ausgeliefert.

---

# 13. Ergebnisexport

## Bereits umgesetzt

- [x] Ergebnis wird persistent gespeichert.
- [x] Entscheidung und Zeitpunkt werden gespeichert.
- [x] Submission-Daten bleiben historisch erhalten.

## Implementiert – produktive Abnahme offen

- [x] PDF-Export ist nur für `ELIGIBLE` und `NOT_ELIGIBLE` serverseitig verfügbar.
- [x] Förderbereich der abgeschlossenen Liste stammt aus dem Submission-Snapshot.
- [x] Bericht verwendet Submission-Snapshots, Entscheidung und Entscheidungszeitpunkt derselben Submission.
- [x] Bericht enthält öffentliche Begründung, jedoch niemals `internal_note` oder Blob-Pfade.
- [x] Bericht enthält Prüfzeitpunkt, Human-in-the-Loop-Hinweis und Unverbindlichkeits-Hinweis.
- [x] Endpunkt verlangt serverseitig `case_worker` oder `case_worker_admin`.
- [ ] Produktive UAT eines grünen und eines roten PDF-Berichts durch den Product Owner.

Siehe #33.

---

# 14. Bewusst nicht umgesetzte automatische Regel-Engine

Die folgenden Anforderungen sind für den aktuellen MVP nicht mehr Teil der Definition of Done:

- automatische Förderregeln auswerten,
- automatisch antragsberechtigt / nicht antragsberechtigt entscheiden,
- automatisch Förderstatus bestimmen,
- automatischen Regelstand als Entscheidungsgrundlage anzeigen.

Diese Punkte wurden durch den Human-in-the-Loop-Prozess ersetzt.

GitHub:

- #27 – not planned
- #28 – not planned
- #31 – not planned

---

# Projektweite Definition of Done

Ein Product Backlog Item gilt als Done, wenn:

- [ ] alle für den aktuellen freigegebenen Scope vereinbarten Akzeptanzkriterien erfüllt sind,
- [ ] Umsetzung vollständig und funktionsfähig ist,
- [ ] notwendige fachliche und technische Tests durchgeführt wurden,
- [ ] keine bekannten kritischen Fehler bestehen,
- [ ] Funktion in den Hauptentwicklungsstand integriert ist,
- [ ] relevante Dokumentation aktualisiert wurde,
- [ ] GitHub-Status nachvollziehbar ist,
- [ ] Product Owner die Funktion abgenommen hat.

Für technische Änderungen zusätzlich:

- [ ] Secrets, Passwörter und private Schlüssel befinden sich nicht im Repository,
- [ ] Datenbankänderungen sind versioniert,
- [ ] geschützte Funktionen prüfen Berechtigungen serverseitig,
- [ ] die bestehende Anwendung wird nicht erkennbar beschädigt.
