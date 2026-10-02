# Abschlussdokumentation – KLARFÖRDERN

**Abschlussarbeit:** Agiles Projekt mit Scrum  
**Produkt:** KLARFÖRDERN – Förderfähigkeit. Einfach klar.  
**Bearbeitungszeitraum:** 28.09.–05.10.2026  
**Präsentation:** 06.10.2026  
**Produktions-URL:** https://digitalpakt.nvibes.de  
**Dokumentationsstand:** 02.10.2026

> **Hinweis zur Vollständigkeit:** Diese Dokumentation bildet den im Repository belegbaren Stand ab. Bereiche, für die aktuell noch kein belastbarer Ereignisnachweis im Repository vorliegt, sind ausdrücklich als „Nachweis ergänzen“ markiert. Sie dürfen vor der Abgabe nur mit tatsächlich vorhandenen Teamnotizen, Chatverläufen, Board-Screenshots oder realen Erinnerungen ergänzt werden.

---

# 1. Projektvorstellung

KLARFÖRDERN ist eine PWA zur strukturierten Erfassung, Einreichung und menschlich verantworteten Vorprüfung schulischer Digitalisierungsvorhaben im Kontext des DigitalPakts 2.0.

Das Produkt führt Schulen von der Datenerfassung bis zu einer nachvollziehbaren menschlichen Ersteinschätzung.

## Product Goal

> Schulen können Digitalisierungsvorhaben vollständig erfassen und zur Prüfung einreichen. Ein autorisierter Sachbearbeiter erhält eine strukturierte, versionierte digitale Akte und dokumentiert eine nachvollziehbare menschliche Ersteinschätzung.

Das Ergebnis ist ausdrücklich keine Förderzusage und kein Bewilligungsbescheid.

## Produktprinzip

> **KLARFÖRDERN unterstützt die Prüfung. Die fachliche Entscheidung trifft ein autorisierter Sachbearbeiter.**

---

# 2. Team und Rollen

| Teammitglied | Rolle | Schwerpunkt |
|---|---|---|
| Anelia Zhilisbayev | Product Owner | Product Goal, Product Backlog, Priorisierung, Zielgruppenperspektive |
| Mohamad Feras Arman | Developer | Entwicklung, Automatisierung, Workflows |
| Viktoriia Iakobchuk | UAT & QA | User Acceptance Testing, Qualitätssicherung |
| Christian Schreiber | Scrum Master & Developer | Scrum-Prozess, Azure-Architektur, Infrastruktur, Entwicklung |

## Gelebte Verantwortlichkeiten

### Product Owner

Verantwortlich für:

- Product Goal
- Priorisierung
- Product Backlog
- fachliche Scope-Entscheidungen
- Abnahme des Produktwerts

Besonders wichtige Entscheidung:

Die automatische Förderregel-Engine wurde nicht mit erfundenen Regeln umgesetzt. Stattdessen wurde der Human-in-the-Loop-Sachbearbeiterworkflow priorisiert.

### Scrum Master

Verantwortlich für:

- Scrum-Prozess
- Organisation und Moderation
- Impediments
- Transparenz
- kontinuierliche Verbesserung

### Developer

Verantwortlich für:

- Umsetzung der Sprint Backlogs
- Integration
- Tests
- Deployment
- Qualität des Inkrements

### UAT & QA

Verantwortlich für:

- fachliche Tests
- Akzeptanzkriterien
- Fehlerfindung
- produktnahe Abnahme

## Teamreflexion

**[NACHWEIS ERGÄNZEN]**

Hier vor Abgabe konkrete Beispiele ergänzen:

- Product-Owner-Priorisierungsentscheidung
- Scrum-Master-Impediment
- QA/UAT-Fund
- Zusammenarbeit im Development

---

# 3. Vision Kick-off

## Ausgangsproblem

Schulen müssen bei Digitalisierungsvorhaben eine Vielzahl fachlicher, technischer und organisatorischer Informationen zusammentragen.

Die Produktidee war deshalb eine Anwendung, die diesen Prozess strukturiert und verständlich vorbereitet.

## Initiale Produktidee

Der ursprüngliche Ansatz bestand aus:

- Schuldaten
- Maßnahme
- Förderbereich
- Förderfragen
- automatische Förderlogik
- Ergebnis

## Zielgruppen

- Schulen
- Schulträger
- Projektverantwortliche
- IT- und Medienverantwortliche
- Sachbearbeiter

## Initiale Risiken

1. Förderregeln unterscheiden sich fachlich und regional.
2. Eine unvollständige Regelbasis könnte zu falschen Aussagen führen.
3. Personenbezogene Daten und Dokumente müssen sicher verarbeitet werden.
4. Einreichungen müssen historisch nachvollziehbar bleiben.
5. Das Ergebnis darf nicht mit einem behördlichen Bescheid verwechselt werden.

## Product Goal

Das finale Product Goal ist im README und in der Product Definition dokumentiert.

## Vision-Kick-off-Event

**[NACHWEIS ERGÄNZEN]**

Vor Abgabe ergänzen:

- Datum
- Teilnehmer
- ursprüngliche Vision
- wichtigste Annahmen
- wichtigste Risiken
- initiales Backlog
- initiale Priorisierung

---

# 4. Agile Werkzeuge und Methoden

Verwendet wurden:

- GitHub Issues
- GitHub Project / Sprint Board
- Epics
- Product Items
- User Stories
- Acceptance Criteria
- Definition of Done
- Prioritäten
- Milestones
- Pull Requests
- Reviews
- Product-Owner-UAT
- versionierte Dokumentation

## Kanban / Board

Verwendete Status:

- Backlog
- Ready
- In progress
- In review
- Done

**[SCREENSHOT EINFÜGEN]**

## Story Points / Schätzung

**[NACHWEIS ERGÄNZEN]**

Falls Story Points tatsächlich gepflegt wurden:

- Schätzmethode nennen
- Fibonacci-Skala dokumentieren
- Beispiel-PBIs nennen
- Screenshot einfügen

Falls nicht belastbar belegt, offen als nur teilweise eingesetzt dokumentieren.

## Burndown / Velocity

**[NACHWEIS ERGÄNZEN ODER OFFEN REFLEKTIEREN]**

Nur echte historische Daten verwenden.

---

# 5. Product Backlog und Refinement

Das Product Backlog wurde über GitHub Issues strukturiert.

## Hierarchie

```text
Sprint-Epic
→ fachliches Epic
→ Product Item
→ technische Umsetzung / Pull Request
```

## Wesentliche Refinement-Entscheidung

Während der Entwicklung wurde sichtbar, dass kein belastbares, freigegebenes und versioniertes Förderregelwerk vorlag.

Das Team entschied deshalb bewusst:

- keine automatischen Förderregeln erfinden
- keine automatische positive / negative Förderentscheidung erzeugen
- Entscheidung an autorisierten Sachbearbeiter übergeben

Betroffene ursprüngliche Product Items:

- #27
- #28
- #31

Status:

**Not planned / ersetzt**

Der Ersatz:

- digitale Akte
- Human-in-the-Loop
- Grün / Gelb / Rot
- Nachforderung
- Rückkanal
- Wiedereinreichung
- Audit
- PDF-Prüfbericht

Diese Scope-Änderung ist ein zentrales Beispiel für Product Backlog Refinement und Wertmaximierung.

---

# 6. Sprint 1 – Infrastruktur

**Zeitraum:** 28.09.–29.09.2026

## Sprint Goal

Produktive technische Basis bereitstellen, auf der KLARFÖRDERN erreichbar und weiterentwickelbar ist.

## Sprint Backlog / Ergebnisse

- Azure VM
- Linux-Basis
- Nginx
- Node-/React-Build
- GitHub Deployment
- DNS
- Cloudflare
- TLS
- Landingpage
- PWA-Shell

## Increment 1

Ein produktiv erreichbarer, auslieferbarer Webauftritt mit technischer Basis.

Damit war das erste nutzbare Increment vorhanden.

## Sprint Planning

**[NACHWEIS ERGÄNZEN]**

Benötigt:

- Teilnehmer
- Sprint Goal
- ausgewählte Items
- Plan
- ggf. Schätzungen

## Dailys

**[NACHWEIS ERGÄNZEN]**

Mindestens als Tabelle:

| Datum | Fortschritt | nächster Schritt | Impediment |
|---|---|---|---|

## Sprint Review

**[NACHWEIS ERGÄNZEN]**

Dokumentieren:

- Teilnehmer
- demonstriertes Increment
- Feedback
- Product-Owner-Entscheidung
- Backlog-Auswirkung

## Retrospektive

**[NACHWEIS ERGÄNZEN]**

- Was lief gut?
- Was lief schlecht?
- Was lernen wir?
- konkrete Verbesserungsmaßnahme für Sprint 2

---

# 7. Sprint 2 – Erfassen und Einreichen

**Zeitraum:** 30.09.–02.10.2026

## Sprint Goal

Schulbenutzer sollen ein Digitalisierungsvorhaben vollständig erfassen, mit Fragen und Dokumenten ergänzen und zur Prüfung einreichen können.

## Gelieferte Funktionen

- Registrierung
- Login / Logout
- Profile
- Schuldaten
- Maßnahmen
- drei Förderbereiche
- neun Förderfragen
- Dokumente
- Persistenz
- Einreichung
- Vorgangsnummer
- Submission-Grundlage

## Increment 2

Ein vollständiger Schulportal-Flow:

```text
Login
→ Schuldaten
→ Maßnahme
→ Förderbereich
→ Fragen
→ Dokumente
→ Einreichen
```

Dieser Flow war als eigenständiges Increment nutzbar.

## Sprint Planning

**[NACHWEIS ERGÄNZEN]**

## Dailys

**[NACHWEIS ERGÄNZEN]**

## Sprint Review

**[NACHWEIS ERGÄNZEN]**

Besonders relevant:

Feedback zur Nutzbarkeit, Fragen, Dokumentenprozess und Einreichung.

## Retrospektive

**[NACHWEIS ERGÄNZEN]**

## Refinement im Sprint

Gut belegbar ist die Erkenntnis:

Eine automatische Förderentscheidung ohne belastbare Regeln wäre fachlich falsch.

Diese Erkenntnis führte zur Umplanung des folgenden Inkrements.

---

# 8. Sprint 3 – Auswerten und Handeln

**Zeitraum:** 03.10.–05.10.2026  
**fachlicher MVP bereits am 02.10.2026 produktiv abgenommen; Sprintzeitraum bleibt gemäß Projektplanung dokumentiert**

## Sprint Goal

Eine eingereichte Maßnahme soll durch einen autorisierten Sachbearbeiter nachvollziehbar geprüft, rückgemeldet und abgeschlossen werden können.

## Gelieferte Funktionen

- Sachbearbeiterrolle
- Review-Shell
- Posteingang
- Suche und Sortierung
- digitale Akte
- Vorgangsübernahme
- Dokumentdownload
- öffentliche Nachricht
- interner Vermerk
- Grün / Gelb / Rot
- Nachforderung
- Bearbeitungsfreigabe
- Wiedereinreichung
- Submission-Versionierung
- Audit
- Rückkanal
- PDF-Prüfbericht

## Final Release

Der vollständige Prozess:

```text
Schule
→ einreichen

Sachbearbeiter
→ Posteingang
→ digitale Akte
→ prüfen
→ Grün / Gelb / Rot

bei Gelb:
Schule → nachbearbeiten → erneut einreichen

bei Grün / Rot:
Abschluss → PDF-Prüfbericht
```

## Sprint Planning

**[NACHWEIS ERGÄNZEN]**

## Dailys

**[NACHWEIS ERGÄNZEN]**

## Sprint Review

**[NACHWEIS ERGÄNZEN]**

Produktiv getestet wurden:

- Gelb-Rückkanal
- Rot-Begründung
- Grün-Status
- Wiedereinreichung
- Förderbereich
- PDF Grün
- PDF Rot
- lange Texte / mehrere Dokumente

## Retrospektive

**[NACHWEIS ERGÄNZEN]**

---

# 9. Stakeholder-Feedback

Der Projektauftrag verlangt konkrete Reviews mit Stakeholdern und sichtbare Verarbeitung des Feedbacks.

## Im Repository belegbar

- Product-Owner-Abnahmen
- UAT
- Scope-Änderungen
- UI-/Workflow-Nachbesserungen

## Noch nicht ausreichend als Event dokumentiert

**[NACHWEIS ERGÄNZEN]**

Pro Sprint:

| Datum | Stakeholder | Feedback | Product-Owner-Entscheidung | Backlog-Auswirkung |
|---|---|---|---|---|

Keine Feedbackaussagen erfinden.

---

# 10. Definition of Done

Die finale Definition of Done ist in `docs/ACCEPTANCE_CRITERIA.md` dokumentiert.

Zum Projektabschluss bestätigt:

- alle freigegebenen Akzeptanzkriterien erfüllt
- notwendige Tests durchgeführt
- keine bekannten kritischen Fehler
- Änderungen in `main`
- Dokumentation aktualisiert
- Product-Owner-Abnahme
- keine offenen Checkboxen in Done-Issues
- keine Secrets im Repository
- Datenbankänderungen versioniert
- serverseitige Autorisierung
- reproduzierbares Deployment

---

# 11. Inkremente und Wertentwicklung

## Increment 1

**Produktive Infrastruktur + Landingpage**

Wert:

- reale URL
- auslieferbare technische Basis
- Grundlage für folgende Features

**[SCREENSHOT EINFÜGEN]**

## Increment 2

**Vollständiger Schulportal-Einreichungsflow**

Wert:

- Schule kann Daten und Vorhaben strukturiert einreichen
- Persistenz
- Dokumente
- Vorgangsnummer

**[SCREENSHOTS EINFÜGEN]**

## Final Release

**Human-in-the-Loop-Prüfworkflow + PDF**

Wert:

- vollständiger fachlicher Kreislauf
- nachvollziehbare menschliche Entscheidung
- Nachforderung und Korrektur
- Auditierbarkeit
- PDF-Prüfbericht

**[SCREENSHOTS EINFÜGEN]**

---

# 12. Risiken und Risikobehandlung

| Risiko | Auswirkung | Reaktion |
|---|---|---|
| keine belastbare Förderregelbasis | falsche automatische Entscheidung | Human-in-the-Loop statt erfundener Regeln |
| unautorisierter Schulzugriff | Datenschutzverletzung | SchoolMembership und serverseitige Autorisierung |
| unautorisierter Review-Zugriff | Einsicht in fremde Akten | `case_worker`-Rolle und Review-Guards |
| Dokumente öffentlich erreichbar | Datenschutz-/Security-Risiko | privater Blob Storage + Managed Identity |
| Nachbearbeitung überschreibt Historie | fehlende Nachvollziehbarkeit | Submission-Snapshots |
| interne Notiz wird öffentlich | Vertrauens-/Datenschutzproblem | `public_reason` und `internal_note` getrennt |
| PDF enthält interne Daten | Datenleck | eigene Report-Datenstruktur + Tests |

---

# 13. Qualität und Tests

Der Produktabschluss enthält:

- Typechecks
- Builds
- API-/Integrationstests
- UAT
- Rollenprüfungen
- Dokumentautorisierung
- Grün-/Gelb-/Rot-Tests
- Rückkanal
- Wiedereinreichung
- PDF-Inhaltstest
- Test auf Ausschluss interner Notizen
- Produktivtests für grünen und roten PDF-Bericht
- Layout-UAT mit langen Texten und mehreren Dokumenten

---

# 14. KI-Nutzung

Der Projektauftrag verlangt eine bewusste Dokumentation von KI-Nutzung, Quellen und wichtigen Prompts.

## Verwendete KI-Unterstützung

Im Projekt wurde KI unter anderem eingesetzt für:

- Architektur- und Implementierungsplanung
- Formulierung von technischen Master-Prompts
- Review des Product Backlogs
- Definition von Acceptance Criteria
- Planung des Sachbearbeiterportals
- Human-in-the-Loop-Workflow
- PDF-Export
- Dokumentationsreview
- Product-Owner-Abschlussaudit

## Menschliche Kontrolle

KI-Ergebnisse wurden nicht ungeprüft übernommen.

Beispiele für bewusste menschliche Entscheidungen:

- keine erfundenen Förderregeln
- automatische Förderentscheidung verworfen
- Human-in-the-Loop durch Product Owner freigegeben
- Issue #33 erst nach produktivem Grün-/Rot-/Layout-UAT auf Done
- Done-Issues nochmals auf offene Checkboxen geprüft

## Wichtige Prompts

### Prompt 1 – Sachbearbeiterportal

**Zweck:** vollständige Umsetzung des Human-in-the-Loop-Prüfworkflows.

**[PROMPT ODER GEKÜRZTEN AUSZUG EINFÜGEN]**

### Prompt 2 – PDF-Prüfbericht

**Zweck:** Umsetzung des serverseitigen PDF-Exports für abgeschlossene Maßnahmen.

**[PROMPT ODER GEKÜRZTEN AUSZUG EINFÜGEN]**

### Prompt 3 – Product-Owner-Abschlussaudit

**Zweck:** Issues, Repository und Dokumentation gegen den tatsächlichen Produktstand prüfen.

**[PROMPT ODER GEKÜRZTEN AUSZUG EINFÜGEN]**

## Quellen

- Projektauftrag / Bewertungsmatrix
- GitHub Repository
- GitHub Issues / Product Backlog
- produktive Anwendung
- technische Dokumentation im Repository

Keine Zugangsdaten, Secrets oder privaten Schlüssel in Prompts oder Dokumentation aufnehmen.

---

# 15. Herausforderungen und Entscheidungen

## Herausforderung 1 – Förderregelwerk fehlt

Statt die Lücke zu kaschieren, wurde der Scope verändert.

Learning:

> Fachliche Unsicherheit darf nicht durch technische Automatisierung versteckt werden.

## Herausforderung 2 – Entscheidung und Nachbearbeitung

Eine einfache Ergebnisanzeige reichte nicht.

Es wurde eine Statusmaschine mit Wiedereinreichung und Submission-Versionierung eingeführt.

Learning:

> Sobald Nutzer Daten nach einer Prüfung ändern dürfen, wird Versionierung fachlich relevant.

## Herausforderung 3 – interne und öffentliche Kommunikation

Die Sachbearbeitung benötigt interne Vermerke, die Schule aber nur öffentliche Rückmeldungen.

Learning:

> Informationsklassifikation muss im Datenmodell und nicht nur in der Oberfläche umgesetzt werden.

## Herausforderung 4 – „Done“ wirklich absichern

Issues wurden nicht nur technisch geschlossen, sondern nach Product-Owner-UAT nochmals gegen Akzeptanzkriterien geprüft.

Learning:

> Eine klare Definition of Done schützt vor vorschnellem Abschluss.

---

# 16. Reflexion und Learnings

Gut belegbare Erkenntnisse:

1. Scrum half, die Produktidee iterativ zu verändern, ohne das Gesamtziel zu verlieren.
2. Refinement war wichtiger als das starre Festhalten am ersten Lösungsansatz.
3. Der größte Produktwert entstand nicht durch mehr Automatisierung, sondern durch einen nachvollziehbaren menschlichen Workflow.
4. Acceptance Criteria und UAT waren entscheidend für Qualität.
5. Versionierung und Auditierbarkeit wurden erst durch den realen Workflow als fachliche Anforderungen sichtbar.
6. Technische Dokumentation und Product Backlog müssen gemeinsam gepflegt werden.
7. KI kann Entwicklung stark beschleunigen, ersetzt aber weder Product Ownership noch fachliche Verantwortung.

## Persönliche / Teamreflexion

**[NACHWEIS ERGÄNZEN]**

Noch aufnehmen:

- Was würden wir beim nächsten Projekt früher tun?
- Wo war Scrum besonders hilfreich?
- Wo war der Prozess schwierig?
- Welche Retro-Maßnahme hatte den größten Effekt?

---

# 17. Projektabschluss

Der freigegebene MVP-Scope ist abgeschlossen.

GitHub-Abschlussstatus:

- alle umgesetzten Issues: Done / completed
- automatisch geplante, aber fachlich ersetzte Issues: Not planned
- keine offenen Checkboxen in Done-Issues
- Product-Owner-UAT abgeschlossen

Das Endprodukt ist produktiv verfügbar.

## Abgrenzung

KLARFÖRDERN ist kein offizielles Angebot einer Förderstelle.

Die menschliche Prüfung liefert eine unverbindliche Ersteinschätzung und keinen Bewilligungsbescheid.

---

# 18. Nachweise / Anhang

Vor finalem Upload ergänzen:

- [ ] Screenshot Vision Kick-off / initiales Backlog
- [ ] Sprint-1-Planning-Nachweis
- [ ] Sprint-1-Dailys
- [ ] Sprint-1-Review
- [ ] Sprint-1-Retro
- [ ] Sprint-2-Planning-Nachweis
- [ ] Sprint-2-Dailys
- [ ] Sprint-2-Review
- [ ] Sprint-2-Retro
- [ ] Sprint-3-Planning-Nachweis
- [ ] Sprint-3-Dailys
- [ ] Sprint-3-Review
- [ ] Sprint-3-Retro
- [ ] Stakeholder-Feedback
- [ ] Board-Screenshot
- [ ] Story-Point-/Schätzungsnachweis, falls vorhanden
- [ ] Burndown / alternative Metrik, falls vorhanden
- [ ] Increment-1-Screenshots
- [ ] Increment-2-Screenshots
- [ ] Final-Release-Screenshots
- [ ] wichtigste KI-Prompts
- [ ] finale Teamreflexion

Diese Checkliste enthält ausschließlich die noch fehlenden **Dokumentationsnachweise**. Sie stellt keine offenen Produktfeatures dar.
