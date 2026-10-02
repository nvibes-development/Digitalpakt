# Gap-Analyse – Projektauftrag vs. KLARFÖRDERN-Projektstand

**Stand:** 02.10.2026  
**Basis:** Projektauftrag „Abschlussarbeit – Agiles Projekt mit Scrum“, GitHub-Repository `nvibes-development/Digitalpakt`, aktueller dokumentierter MVP-Abschluss

## Bewertungslogik des Projektauftrags

Der Projektauftrag bewertet nicht nur das Endprodukt, sondern vor allem die sichtbare Anwendung von Scrum. Besonders relevant sind:

- gelebte Scrum-Rollen
- mindestens drei vollständige Sprints
- Vision Kick-off und Sprint Planning
- Backlog Management, Dailys, Sprint Reviews und Stakeholder-Feedback
- Retrospektiven und kontinuierliche Verbesserung
- mindestens zwei Inkremente plus fertiges Release
- agile Werkzeuge und Methoden
- nachvollziehbare Gesamtdokumentation inklusive KI-Nutzung und Prompts

Die Bewertung gewichtet **40 % Inkremente / Endprodukt** und **60 % Scrum-Prozess / Dokumentation**.

---

# 1. Gesamtbewertung der Nachweislage

| Bewertungsbereich | Projektstand | Nachweislage im Repository | Gap |
|---|---|---|---|
| Team & Scrum-Rollen | umgesetzt | **gut** | Reflexion der tatsächlich gelebten Rollen noch stärker dokumentieren |
| 3 vollständige Sprints | fachlich/technisch umgesetzt | **mittel** | Events pro Sprint nicht vollständig protokolliert |
| Vision Kick-off | am ersten Projekttag mit Denny durchgeführt | **nachträglich verschriftlicht** | konkreter Event-Nachweis jetzt dokumentiert |
| Sprint Planning | Sprintstruktur vorhanden | **mittel** | konkrete Sprint Goals, Planning-Entscheidungen und Sprint Backlogs nicht vollständig als Event dokumentiert |
| Product Backlog | sehr gut | **sehr gut** | kaum Gap |
| Refinement | Scope-Änderung gut dokumentiert | **gut** | konkrete Refinement-Termine / Entscheidungen nur teilweise sichtbar |
| Dailys | täglich durchgeführt | **mündlich durchgeführt, jetzt nachträglich verschriftlicht** | Einzelprotokolle fehlen; Prozessnachweis jetzt in `SCRUM_PROCESS_EVIDENCE.md` |
| Sprint Reviews | Sprint 1 und 2 durchgeführt | **nachträglich verschriftlicht** | Denny und Sergey als Review-Teilnehmer dokumentiert; Sprint 3 erst nach tatsächlichem Sprintende ergänzen |
| Retrospektiven | Sprint 1 und 2 durchgeführt | **nachträglich verschriftlicht** | konkrete Retro-Ergebnisse nur aus realer Erinnerung/Notizen ergänzen; Sprint 3 noch nicht fällig |
| Stakeholder-Feedback | indirekt in Scope-Änderungen erkennbar | **schwach** | Quelle, Zeitpunkt, Feedback und Verarbeitung fehlen |
| agile Schätzung | Fibonacci-Story-Points im Team verwendet und im Daily re-evaluiert | **inhaltlich erfüllt** | Board-/Dokumentnachweis noch als Screenshot/Artefakt einbinden |
| Kanban / GitHub Project | Projektstruktur vorhanden | **gut, aber außerhalb Repo schwer sichtbar** | Screenshots / Board-Zustände in Abschlussdokumentation aufnehmen |
| Burn-up / Velocity | GitHub Burn-up vorhanden; Story Points zur Velocity-Betrachtung genutzt | **inhaltlich erfüllt** | vorhandenen Burn-up-Screenshot/Dokumentnachweis in Abschlussunterlagen einbinden |
| Definition of Done | sehr gut | **sehr gut** | final erfüllt |
| Inkremente | sehr gut | **sehr gut** | Zwischenstände mit Screenshots noch expliziter als Increment 1/2/Release präsentieren |
| Endprodukt / Release | produktiv umgesetzt | **sehr gut** | kaum Gap |
| KI-Nutzung / Prompts | pi.dev eingesetzt | **teilweise dokumentiert** | repräsentative Master-LLM-Prompts als Anhang ergänzen |
| Risiken | einzelne technische Risiken implizit sichtbar | **schwach** | explizites Risikoregister / Umgang dokumentieren |
| Reflexion / Learnings | Product-Entscheidungen dokumentiert | **mittel** | persönliche/teambezogene Learnings stärker ausarbeiten |

---

# 2. Team und Scrum-Rollen

## Vorhandener Nachweis

`docs/TEAM.md` dokumentiert:

- Anelia Zhilisbayev – Product Owner
- Mohamad Feras Arman – Developer
- Viktoriia Iakobchuk – UAT & QA
- Christian Schreiber – Scrum Master & Developer

Die Verantwortlichkeiten sind klar beschrieben.

## Bewertung

**Status: weitgehend erfüllt**

## Gap

Für die volle Bewertung sollte zusätzlich sichtbar werden, **wie** die Rollen tatsächlich gelebt wurden.

Noch ergänzen:

- Beispiel für eine Priorisierungsentscheidung des Product Owners
- Beispiel für ein vom Scrum Master gelöstes Impediment
- Beispiel für QA/UAT-Feedback
- Beispiel für Developer-Zusammenarbeit
- kurze Teamreflexion: Was hat in der Rollenverteilung funktioniert, was nicht?

---

# 3. Drei vollständige Sprints

## Vorhandener Nachweis

Dokumentiert sind:

### Sprint 1
**28.09.–29.09.2026**  
Ziel: Infrastruktur

### Sprint 2
**30.09.–02.10.2026**  
Ziel: Erfassen & Einreichen

### Sprint 3
**03.10.–05.10.2026**  
Ziel: Auswerten & Handeln

Technische und fachliche Ergebnisse sind in README, Product Backlog, GitHub-Hierarchie und Projektabschluss nachvollziehbar.

## Bewertung

**Produktfortschritt: sehr gut**

## Gap

Der Projektauftrag bewertet nicht nur Sprint-Ergebnisse, sondern vollständige Scrum-Sprints mit Events.

Die Events wurden durchgeführt, aber nicht als einzelne GitHub-Protokolle gespeichert. Der Prozessnachweis ist jetzt in `SCRUM_PROCESS_EVIDENCE.md` verschriftlicht. Für Sprint 3 gilt: Review und Retro dürfen erst nach dem tatsächlichen Sprintende 05.10.2026 als durchgeführt dokumentiert werden.

Das ist eine der wichtigsten verbleibenden Dokumentationslücken.

---

# 4. Vision Kick-off

## Vorhandener Nachweis

Das finale Product Goal ist klar:

> Schulen können Digitalisierungsvorhaben vollständig erfassen und zur Prüfung einreichen. Ein autorisierter Sachbearbeiter erhält eine strukturierte, versionierte digitale Akte und dokumentiert eine nachvollziehbare menschliche Ersteinschätzung.

Außerdem liegen vor:

- Zielgruppen
- Produktdefinition
- drei MVP-Förderbereiche
- Risiken rund um fehlendes Förderregelwerk
- Human-in-the-Loop-Scope-Entscheidung

## Bewertung

**Inhaltlich vorhanden, Event-Nachweis unvollständig**

## Gap

Es gibt keine dedizierte Dokumentation:

- Datum / Teilnehmer des Vision Kick-offs
- Ausgangsproblem
- Produktvision zu Projektbeginn
- initiale Risiken
- initiale Annahmen
- initiales Product Backlog
- initiale Priorisierung

## Empfehlung

In der Abschlussdokumentation einen Abschnitt „Vision Kick-off“ ergänzen, der klar zwischen **initialem Zielbild** und **späterem Refinement** unterscheidet.

---

# 5. Product Backlog und Refinement

## Vorhandener Nachweis

Sehr stark dokumentiert:

- Epics
- Product Items
- GitHub-Hierarchie
- Acceptance Criteria
- Definition of Done
- Scope-Änderung
- Human-in-the-Loop als Ersatz für automatische Förderregel-Engine
- alle Done-/Not-planned-Entscheidungen

## Bewertung

**Sehr gut erfüllt**

Die Scope-Änderung von automatischer Regel-Engine zu menschlicher Sachbearbeitung ist ein besonders gutes Refinement-Beispiel:

- fachlicher Blocker erkannt
- keine Regeln erfunden
- Produktziel neu zugeschnitten
- Nutzerwert erhalten
- Backlog angepasst
- Issues korrekt als Not planned / ersetzt geschlossen

## Gap

Für maximale Transparenz sollte dokumentiert werden:

- wann diese Refinement-Entscheidung fiel
- wer daran beteiligt war
- welches Problem Anlass war
- welche Alternativen diskutiert wurden
- warum Human-in-the-Loop den höheren Wert hatte

---

# 6. Dailys

## Vorhandener Nachweis

**Daily Scrums wurden täglich im LearnSpace 3D durchgeführt und sind nun in `SCRUM_PROCESS_EVIDENCE.md` nachträglich verschriftlicht.**

## Bewertung

**Durchführung belegt, historische Einzelprotokolle fehlen.**

Der Projektauftrag fordert regelmäßige Dailys und bewertet die zweckmäßige Durchführung. Die reale Arbeitsweise ist jetzt transparent dokumentiert.

## Benötigter Nachweis

Mindestens eine kompakte Daily-Tabelle je Sprint:

| Datum | Was wurde erreicht? | Nächster Schritt | Impediment / Entscheidung |
|---|---|---|---|

Wichtig:

Nicht rückwirkend Inhalte erfinden.

Nur aus vorhandenen Notizen, Chatverläufen, GitHub-Aktivitäten oder realen Erinnerungen rekonstruieren.

---

# 7. Sprint Reviews und Stakeholder-Feedback

## Vorhandener Nachweis

Repository dokumentiert:

- Product-Owner-Abnahmen
- UAT
- technische Nachbesserungen
- Scope-Refinement

Aber:

**kein klarer Review-Nachweis mit Stakeholdern und deren Feedback.**

## Bewertung

**Kritische Dokumentationslücke**

Der Auftrag nennt ausdrücklich Reviews mit Denny und 1–2 Personen aus anderen Teams.

## Benötigter Nachweis

Pro Sprint:

- Datum
- Teilnehmer
- demonstriertes Increment
- erhaltenes Feedback
- Entscheidung des Product Owners
- daraus resultierende Backlog-Änderung

Beispielstruktur:

| Feedback | Quelle | Entscheidung | Backlog-Auswirkung |
|---|---|---|---|

---

# 8. Retrospektiven

## Vorhandener Nachweis

Retrospektiven sind in `docs/TEAM.md` als Arbeitsweise erwähnt.

Es gibt jedoch keine dokumentierten Retro-Ergebnisse je Sprint.

## Bewertung

**Kritische Dokumentationslücke**

## Benötigter Nachweis

Für jeden Sprint mindestens:

### Was lief gut?
### Was lief nicht gut?
### Was lernen wir?
### Welche konkrete Maßnahme nehmen wir in den nächsten Sprint?

Besonders wertvoll wären tatsächlich erkennbare Verbesserungen, z. B.:

- kleinere / klarere Product Items
- stärkere Akzeptanzkriterien
- keine erfundenen Förderregeln
- verstärkte UAT
- versionierte Submissions
- klarere Trennung public/internal
- PDF-Abnahme mit Negativtests

Diese Punkte sind im Produkt sichtbar, müssen aber als Retro-Ursache nur dann dargestellt werden, wenn sie tatsächlich aus einer Retro entstanden sind.

---

# 9. Agile Schätzung

## Vorhandener Nachweis

Im finalen Repository wurde kein eindeutiger Nachweis für:

- Story Points
- Planning Poker
- Velocity

gefunden.

## Bewertung

**Dokumentationslücke**

## Empfehlung

Wenn das GitHub Project Story Points enthält:

- Screenshot des Project Boards
- kurze Erklärung der Fibonacci-Skala
- 3–5 Beispiel-PBIs mit Schätzung
- kurzer Vergleich „geplant vs. tatsächlich“

Wenn keine belastbare Schätzung durchgeführt wurde, nicht nachträglich behaupten.

Dann offen dokumentieren:

> Schätzungen wurden nur teilweise eingesetzt; der Schwerpunkt lag auf priorisiertem Flow und Abnahmekriterien.

---

# 10. Kanban / GitHub Project

## Vorhandener Nachweis

GitHub-Issue-Hierarchie und Product Backlog sind sehr gut dokumentiert.

Der Projektauftrag verlangt sichtbare agile Werkzeuge; GitHub Project ist dafür ein guter Nachweis.

## Gap

Der finale Repository-Text zeigt das Board nicht visuell.

## Empfehlung

In die Abschlussdokumentation aufnehmen:

- Screenshot Sprint Board
- Spalten:
  - Backlog
  - Ready
  - In progress
  - In review
  - Done
- Priority
- Responsible
- Story Points, falls tatsächlich gepflegt
- Milestones / Sprint-Zuordnung

---

# 11. Burndown / Charts

## Vorhandener Nachweis

Kein Burndown oder vergleichbarer Chart im Repository gefunden.

## Bewertung

**Lücke im Bereich agile Werkzeuge**

Der Auftrag nennt Burndown nur als Beispiel, nicht zwingend als Pflicht.

## Empfehlung

Wenn historische Boarddaten vorliegen:

- Sprint-Burndown erstellen
- alternativ Cumulative Flow / Done-items-over-time

Wichtig:

Keine künstlichen historischen Daten erzeugen.

Wenn keine belastbare Historie vorhanden ist, offen dokumentieren, welche anderen agilen Werkzeuge stattdessen verwendet wurden.

---

# 12. Inkremente und Release

## Vorhandener Nachweis

Sehr stark.

### Increment 1
Infrastruktur + produktive Landingpage / PWA-Basis

### Increment 2
Authentifizierung + Schuldaten + Maßnahmen + Förderbereiche + Fragen + Dokumente + Einreichung

### Final Release
vollständiger Human-in-the-Loop-Workflow:

- Sachbearbeiterportal
- digitale Akte
- Grün / Gelb / Rot
- Rückkanal
- Wiedereinreichung
- Audit
- PDF-Prüfbericht

## Bewertung

**Sehr gut erfüllt**

## Gap

Für die Abschlussdokumentation sollten die drei Zustände visuell mit Screenshots gegenübergestellt werden.

---

# 13. Definition of Done

## Vorhandener Nachweis

Sehr gut dokumentiert in:

- `docs/ACCEPTANCE_CRITERIA.md`
- Issues
- Product-Owner-Abnahme
- Projektabschluss

Alle Done-Issues besitzen laut Abschlussaudit keine offenen Checkboxen.

## Bewertung

**Sehr gut erfüllt**

---

# 14. Risiken

## Im Projekt tatsächlich erkennbare Risiken

Aus dem Repository / Projektverlauf ableitbar:

1. **fehlende belastbare Förderregelbasis**
   - Reaktion: keine Regeln erfinden
   - Scope-Änderung zu Human-in-the-Loop

2. **Datenschutz / sensible Schuldaten und Dokumente**
   - Reaktion: serverseitige Autorisierung, privater Blob Storage, Managed Identity

3. **unautorisierter Rollen- oder Dokumentzugriff**
   - Reaktion: serverseitige Rollenprüfung, Membership, getrennte Review-Endpunkte

4. **historische Daten werden durch Nachbearbeitung überschrieben**
   - Reaktion: versionierte Submission-Snapshots

5. **interne Sachbearbeiternotizen gelangen zum Antragsteller**
   - Reaktion: technische Trennung `public_reason` / `internal_note`

6. **PDF exportiert interne Daten**
   - Reaktion: separate Report-Datenstruktur und Tests

## Bewertung

**Risiken wurden technisch sehr gut behandelt, aber bisher nicht als formales Risikoregister dokumentiert.**

---

# 15. KI-Nutzung und Prompts

## Vorhandener Nachweis

Im Repository gibt es derzeit keine ausreichende Dokumentation der verwendeten KI-Prompts.

Der Projektauftrag verlangt ausdrücklich, KI bewusst zu nutzen und Quellen sowie Prompts zu dokumentieren.

## Bewertung

**Kritische Dokumentationslücke**

## Benötigter Abschnitt

Dokumentieren:

- verwendetes KI-System / Agent
- Zweck
- Beispiele wichtiger Prompts
- welche Ergebnisse übernommen wurden
- welche Ergebnisse geprüft / korrigiert wurden
- menschliche Verantwortung
- Beispiele, bei denen KI-Vorschläge bewusst nicht übernommen wurden

Besonders geeignet:

1. Architektur-/Implementierungsprompts für pi.dev
2. Prompt für Sachbearbeiterportal
3. Prompt für PDF-Export
4. Prompt für Dokumentations-/Backlog-Abgleich
5. Beispiele für Review und UAT

Keine Passwörter, Tokens oder Secrets aufnehmen.

---

# 16. Reflexion und Learnings

## Bereits sichtbare Learnings

Gut belegbar:

- kein fachliches Regelwerk erfinden
- Scope darf sich im Refinement ändern
- eine technisch mögliche Automatisierung ist nicht automatisch das beste Produkt
- Human-in-the-Loop kann Nutzerwert erhöhen und Risiko reduzieren
- historische Snapshots sind wichtig, sobald Nachbearbeitung möglich ist
- öffentliche und interne Kommunikation müssen technisch getrennt werden
- Definition of Done und UAT verhindern vorschnelles „Done“
- Dokumentation muss parallel zur Entwicklung gepflegt werden

## Noch ergänzen

Persönliche / Teamreflexion:

- Was war die größte Überraschung?
- Was würden wir in einem nächsten Projekt anders machen?
- Welche Scrum-Events hatten den größten Nutzen?
- Wo waren Timeboxes schwierig?
- Welche Impediments kosteten am meisten Zeit?

---

# 17. Priorisierte Restarbeit für die Dokumentation

## Priorität 1 – bewertungsrelevant / kritisch

1. Daily-Nachweise ergänzen
2. Sprint Reviews + Stakeholder-Feedback ergänzen
3. Retrospektiven je Sprint ergänzen
4. KI-Nutzung + wichtigste Prompts dokumentieren
5. Vision Kick-off als Event dokumentieren

## Priorität 2 – starke Verbesserung

6. Sprint Planning je Sprint dokumentieren
7. Story Points / Schätzung belegen
8. GitHub Project / Kanban mit Screenshots aufnehmen
9. Burndown oder alternative agile Metrik aufnehmen
10. Risikoregister ergänzen

## Priorität 3 – Präsentationsqualität

11. Increment-1-/Increment-2-/Release-Screenshots
12. finalen Prozess als Diagramm
13. persönliche Learnings
14. klare Traceability Auftrag → Artefakt → Nachweis

---

# 18. Fazit

Technisch und produktseitig ist KLARFÖRDERN sehr stark abgeschlossen.

Das größte Bewertungsrisiko liegt **nicht mehr im Produkt**, sondern in der fehlenden expliziten Dokumentation der Scrum-Events und der KI-Nutzung.

Die Abschlussdokumentation sollte deshalb nicht noch mehr technische Details sammeln, sondern gezielt die verbleibenden Prozessnachweise sichtbar machen.

Die wichtigsten noch zu belegenden Punkte sind:

- Dailys
- Reviews / Stakeholder-Feedback
- Retrospektiven
- Vision Kick-off
- Sprint Planning
- agile Schätzung / Charts
- KI-Prompts

Bis diese Nachweise ergänzt sind, sollten sie nicht als vollständig erfüllt dargestellt werden.


# Aktualisierung vom 02.10.2026 – Scrum-Prozessnachweise

Nach zusätzlicher Product-Owner-/Team-Auskunft wurden folgende bislang nur unzureichend dokumentierte Punkte geklärt und in `docs/SCRUM_PROCESS_EVIDENCE.md` verschriftlicht:

- [x] Daily Scrums täglich im LearnSpace 3D durchgeführt
- [x] Product Owner regelmäßig beteiligt
- [x] Board-/PBI-Status gemeinsam gesichtet
- [x] Stopper, Sprintfortschritt und Timebox täglich geprüft
- [x] Story Points nach Fibonacci verwendet
- [x] Story Points bei Bedarf im Daily neu bewertet
- [x] Sprint Reviews mit Denny und Sergey für bereits abgeschlossene Sprints durchgeführt
- [x] Retrospektiven am Sprintende durchgeführt
- [x] Vision Kick-off am ersten Projekttag mit Denny durchgeführt
- [x] GitHub Burn-up als Fortschrittsnachweis vorhanden
- [x] pi.dev als KI-Entwicklungsagent verwendet

Verbleibende Dokumentationsarbeit ist damit vor allem das **Einbinden vorhandener Nachweise** (Burn-up/Board-Screenshots, ggf. Story-Point-Ansichten) sowie die **Auswahl repräsentativer Master-LLM-Prompts**. Sprint-3-Review und Sprint-3-Retrospektive sind am Stand 02.10.2026 noch nicht fällig und werden erst nach tatsächlicher Durchführung dokumentiert.
