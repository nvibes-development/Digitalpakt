# DigitalPakt Check

Eine Web-App zur strukturierten Vorprüfung von Digitalisierungsvorhaben im Kontext des **DigitalPakts 2.0**.

> **Projektkontext:** Abschlussarbeit „Agiles Projekt mit Scrum“

## Ziel der App

Der Prototyp prüft zunächst die **Antragsberechtigung der Schule** und anschließend die **Förderfähigkeit einer geplanten Digitalisierungsmaßnahme**.

Die Anwendung führt die Schulleitung durch einen strukturierten Fragenprozess und erzeugt anschließend eine nachvollziehbare Auswertung. Die Ergebnisse dienen als **unverbindliche Ersteinschätzung**.

Für die Schule wird unterschieden zwischen:

- **antragsberechtigt**
- **nicht abschließend prüfbar**
- **nicht antragsberechtigt**

Aus Antragsberechtigung und Maßnahmenprüfung entsteht anschließend ein Gesamtergebnis:

- **Antrag grundsätzlich möglich**
- **weitere Angaben oder Nachweise erforderlich**
- **Antrag derzeit nicht möglich**

Dazu werden Begründung, erfüllte und nicht erfüllte Voraussetzungen, fehlende Angaben, benötigte Nachweise, verwendete Förderkriterien und empfohlene nächste Schritte dargestellt.

Die App dient als **Orientierungs- und Vorbereitungshilfe**. Sie ersetzt keine rechtsverbindliche Prüfung, keine Förderberatung und keine Förderentscheidung durch die zuständigen Stellen.

## Sachbearbeiterportal

Neben dem Schulportal gibt es einen geschützten Arbeitsbereich für autorisierte Sachbearbeiter. Er stellt eingereichte Angaben, Antworten und Dokumente als digitale Akte zusammen, ermöglicht Nachforderungen und dokumentiert eine menschliche Ersteinschätzung. KLARFÖRDERN selbst trifft keine verbindliche Förderentscheidung.

## Problemstellung

Die Vorbereitung eines Digitalisierungsvorhabens kann für Schulen und Schulträger komplex sein. Anforderungen, Zuständigkeiten, technische Rahmenbedingungen, pädagogische Zielsetzungen und Förderbedingungen müssen zusammengeführt werden.

**DigitalPakt Check** soll diesen Prozess vereinfachen und Nutzer Schritt für Schritt durch eine strukturierte Vorprüfung führen.

## Zielgruppen

- Schulen
- Schulträger
- Projektverantwortliche für schulische Digitalisierung
- Verantwortliche für IT, Medienentwicklung und Beschaffung

## Product Goal

> Schulleitungen können Angaben zu ihrer Schule und zu einer geplanten Digitalisierungsmaßnahme erfassen und eine unverbindliche Ersteinschätzung erhalten, ob die Schule grundsätzlich antragsberechtigt ist und ob für die geplante Maßnahme nach den hinterlegten Kriterien grundsätzlich ein Förderantrag möglich sein könnte.

## Fachliche Projektdokumentation

Die detaillierte, vom Team erarbeitete Produktdefinition und Backlog-Struktur ist zusätzlich in folgenden Dokumenten festgehalten:

- [Produktdefinition](docs/PRODUCT_DEFINITION.md)
- [Product Backlog](docs/PRODUCT_BACKLOG.md)
- [Fachliche Akzeptanzkriterien & Definition of Done](docs/ACCEPTANCE_CRITERIA.md)
- [Projektteam & Rollen](docs/TEAM.md)
- [Branding und Design-System](docs/BRANDING.md)
- [Technische Architektur](docs/ARCHITECTURE.md)

## Projekt-Kick-off

### Ausgangslage

Im Rahmen des DigitalPakts 2.0 soll eine Web-App entwickelt werden, mit der Schulen und Schulträger geplante Digitalisierungsvorhaben strukturiert erfassen und vorprüfen können.

Das Projekt wird als Scrum-Abschlussprojekt innerhalb eines kurzen, fest vorgegebenen Zeitraums umgesetzt. Deshalb liegt der Schwerpunkt auf klaren Sprint-Zielen, nutzbaren Inkrementen, transparenter Zusammenarbeit und nachvollziehbarer Dokumentation.

### Ziel

Ziel ist eine PWA, die Nutzer von der Erfassung eines Vorhabens über eine erste Kriterienprüfung bis zu einer verständlichen Auswertung mit Handlungsempfehlungen führt.

Die Anwendung soll unter folgender Adresse bereitgestellt werden:

**https://digitalpakt.nvibes.de**

### Stakeholder

- Schulen
- Schulträger
- Projektteam
- Trainer bzw. fachliche Ansprechpartner
- potenzielle Anwender der Anwendung

### Risiken

- begrenzter Projektzeitraum
- unklare oder sich ändernde fachliche Anforderungen
- Abhängigkeiten von Azure, DNS und Cloudflare
- mögliche Verzögerungen bei Infrastruktur oder Deployment
- unterschiedliche Förderbedingungen und Richtlinien der Bundesländer
- fachliche Kriterien dürfen nicht als verbindliche Förderentscheidung dargestellt werden
- technische Abhängigkeiten zwischen Infrastruktur, Anwendung und Deployment

### Vorgehensweise

Das Projekt wird in **genau drei Sprints** umgesetzt:

1. **Sprint 1 – Infrastruktur**
2. **Sprint 2 – Erfassen & Prüfen**
3. **Sprint 3 – Auswerten & Handeln**

Jeder Sprint liefert ein funktionsfähiges und demonstrierbares Increment.

## Scrum-Team und Accountabilities

Das Projektteam besteht aus vier Mitgliedern mit klar verteilten Scrum- und Fachverantwortlichkeiten.

### Product Owner & Marketingspezialistin

**Anelia Zhilisbayev**

Verantwortlich für:

- Product Goal
- Priorisierung des Product Backlogs
- fachliche Anforderungen
- Stakeholder-Abstimmung
- Transparenz und Verständlichkeit der Product Backlog Items
- Markt- und Zielgruppenperspektive
- Kommunikation des Produktnutzens

### Scrum Master, Azure Architect & Developer

**Christian Schreiber**

Verantwortlich für:

- Unterstützung des Scrum-Prozesses
- Moderation und Unterstützung der Scrum Events
- Sichtbarmachung und Beseitigung von Hindernissen
- Förderung der Selbstorganisation des Teams
- Unterstützung kontinuierlicher Verbesserung
- Azure-Architektur und technische Infrastruktur
- Entwicklung und Integration des Produkts

### Automatisierungsexperte & Developer

**Mohamad Feras Arman**

Verantwortlich für:

- Automatisierung von Abläufen und technischen Prozessen
- Entwicklung und technische Umsetzung
- Unterstützung bei Integrationen und Workflows
- Mitarbeit an Sprint-Zielen und Increments
- technische Qualität der umgesetzten Funktionen

### UAT & QA

**Viktoriia Iakobchuk**

Verantwortlich für:

- User Acceptance Testing (UAT)
- Qualitätssicherung
- Prüfung der Akzeptanzkriterien
- funktionale Tests der Inkremente
- Dokumentation von Fehlern und Abweichungen
- Unterstützung bei Sprint Reviews und Abnahme der umgesetzten Funktionen

### Gemeinsame Verantwortung des Teams

Alle Teammitglieder wirken gemeinsam an:

- Sprint Planning
- Backlog Refinement
- Aufwandsschätzung
- Umsetzung der Sprint-Ziele
- Qualität des jeweiligen Increments
- Sprint Review
- Retrospektive
- kontinuierlicher Verbesserung

Eine ausführlichere Rollenübersicht befindet sich in [docs/TEAM.md](docs/TEAM.md).

## Kernprozess

**Schuldaten erfassen → Antragsberechtigung prüfen → Maßnahme erfassen → Förderbereich auswählen → Förderkriterien beantworten → Maßnahme auswerten → Gesamtergebnis erhalten → nächste Schritte erkennen**

Der MVP unterstützt zunächst drei Förderbereiche:

1. IT-Infrastruktur, Netzwerk und WLAN
2. Digitale Endgeräte
3. Bildungssoftware und digitale Lernplattformen

Pro Prüfung wird genau ein Förderbereich ausgewählt. Weitere Förderbereiche werden als außerhalb des MVP gekennzeichnet.

## Geplante Kernfunktionen

### Vorhabenerfassung

Ein Nutzer kann ein geplantes Digitalisierungsvorhaben strukturiert anlegen und die wichtigsten Eckdaten erfassen.

### DigitalPakt-Check

Die Anwendung prüft das Vorhaben anhand eines definierten Kriterienkatalogs und kennzeichnet den jeweiligen Status, zum Beispiel:

- Erfüllt
- Noch zu prüfen
- Fehlende Angabe
- Handlungsbedarf

### Ergebnisübersicht

Die Ergebnisse werden verständlich zusammengefasst, damit Nutzer schnell erkennen können, wo das Vorhaben bereits gut vorbereitet ist und wo noch Arbeit erforderlich ist.

### Maßnahmen und nächste Schritte

Aus den Prüfergebnissen werden konkrete nächste Schritte abgeleitet, damit die Nutzer ihr Vorhaben gezielt weiterentwickeln können.

### Prüfbericht

Eine kompakte Zusammenfassung des Vorhabens und der Prüfergebnisse soll als druckbare Ansicht bzw. Prüfbericht bereitgestellt werden.

## Scrum-Projekt und Sprint-Struktur

### Sprint 1 – Infrastruktur

**Zeitraum:** 28.09.2026 – 29.09.2026

**Epic:** Azure-App-Architektur bereitstellen

**Sprint Goal:**  
Die technische Basis der Anwendung wird bereitgestellt, sodass die PWA öffentlich unter **https://digitalpakt.nvibes.de** erreichbar ist.

**Sprint-Increment:**

- Azure-Hosting-Basis
- Linux-System
- Nginx
- Node.js-/React-PWA-Build-Umgebung
- GitHub-Anbindung
- DNS und Cloudflare
- HTTPS/TLS
- öffentlich erreichbare Landingpage **„DigitalPakt 2.0“**

### Sprint 2 – Erfassen & Prüfen

**Zeitraum:** 30.09.2026 – 02.10.2026

**Epic:** Digitalisierungsvorhaben erfassen und vorprüfen

**Sprint Goal:**  
Die Schulleitung kann zunächst die grundsätzliche Antragsberechtigung der Schule prüfen und anschließend eine geplante Digitalisierungsmaßnahme anhand der MVP-Förderkriterien vorprüfen.

**Sprint-Increment:**

- förderrelevante Schuldaten erfassen
- Antragsberechtigung prüfen
- Digitalisierungsmaßnahme und Rahmendaten erfassen
- einen MVP-Förderbereich auswählen
- Förderkriterien mit Ja / Nein / Nicht bekannt beantworten
- fehlende Informationen erkennen
- hinterlegte Förderregeln anwenden
- vorläufiges Maßnahmenergebnis anzeigen

### Sprint 3 – Auswerten & Handeln

**Zeitraum:** 03.10.2026 – 05.10.2026

**Epic:** Auswertung, Handlungsempfehlungen und Prüfbericht bereitstellen

**Sprint Goal:**  
Aus der Vorprüfung entsteht eine verständliche Auswertung mit konkreten nächsten Schritten.

**Sprint-Increment:**

- Ergebnisübersicht
- erfüllte, offene und kritische Punkte
- Handlungsempfehlungen
- priorisierte nächste Schritte
- Prüfbericht bzw. Druckansicht
- UX-Feinschliff
- Umsetzung relevanten Stakeholder-Feedbacks

## Inkrementelles Produktverständnis

Jeder Sprint liefert ein **funktionsfähiges und nutzbares Increment**.

Der Produktfortschritt folgt dem Prinzip:

**Infrastruktur → Erfassen & Prüfen → Auswerten & Handeln**

Am Ende von Sprint 3 ist der vollständige Nutzerfluss nutzbar:

**Erfassen → Prüfen → Auswerten → Handeln**

## Definition of Done

Die folgende Definition of Done gilt **zentral für das gesamte Projekt**.

Ein Product Backlog Item gilt als **Done**, wenn:

- [ ] alle vereinbarten Akzeptanzkriterien erfüllt sind,
- [ ] die Umsetzung vollständig und funktionsfähig ist,
- [ ] notwendige Tests durchgeführt wurden,
- [ ] keine bekannten kritischen Fehler bestehen,
- [ ] die Funktion in das aktuelle Increment integriert ist,
- [ ] relevante Dokumentation aktualisiert wurde,
- [ ] die Umsetzung im GitHub Project nachvollziehbar dokumentiert ist,
- [ ] das Ergebnis im Sprint Review demonstriert werden kann.

Für technische Änderungen gilt zusätzlich:

- [ ] Secrets, Passwörter und private Schlüssel befinden sich nicht im Repository,
- [ ] Änderungen sind versioniert und reproduzierbar,
- [ ] die bestehende Anwendung wird durch die Änderung nicht erkennbar beschädigt.

Die Definition of Done kann im Projektverlauf durch Erkenntnisse aus den Retrospektiven gemeinsam weiterentwickelt werden. Änderungen werden transparent dokumentiert.

## Product Backlog und Refinement

Das Product Backlog wird bewusst **nicht vollständig im Voraus festgelegt**.

Product Backlog Items werden gemeinsam im Team:

- vorgeschlagen,
- diskutiert,
- fachlich präzisiert,
- priorisiert,
- mit Akzeptanzkriterien versehen,
- geschätzt,
- und geeigneten Sprints zugeordnet.

Damit bleibt ausreichend Raum für Team-Ownership, Stakeholder-Feedback und Erkenntnisse aus Reviews und Retrospektiven.

## Scrum Events

### Sprint Planning

Zu Beginn jedes Sprints werden Sprint Goal, relevante Product Backlog Items und der geplante Arbeitsumfang gemeinsam festgelegt.

### Daily Scrum

Während der Sprints stimmt sich das Development Team regelmäßig über Fortschritt, nächste Schritte und Hindernisse ab.

### Backlog Refinement

Das Product Backlog wird während des Projekts kontinuierlich präzisiert und an neue Erkenntnisse angepasst.

### Sprint Review

Nach jedem Sprint wird das entstandene Increment demonstriert. Stakeholder-Feedback wird dokumentiert und bei Bedarf in das Product Backlog übernommen.

### Sprint Retrospektive

Nach jedem Sprint reflektiert das Team die Zusammenarbeit und legt mindestens eine konkrete Verbesserungsmaßnahme für den folgenden Sprint fest.

## Scrum-Artefakte und Dokumentation

Im Projekt werden unter anderem folgende Artefakte gepflegt:

- Product Goal
- Product Backlog
- Sprint Backlogs
- Sprint Goals
- Epics
- User Stories und Tasks
- Akzeptanzkriterien
- Definition of Done
- Story Points
- Prioritäten
- Sprint Reviews
- Retrospektiven
- Stakeholder-Feedback
- Entscheidungen und Änderungen am Backlog
- Screenshots der jeweiligen Inkremente
- GitHub Project Board und Sprint-Visualisierung

Die Dokumentation soll nachvollziehbar zeigen, **wie sich Produkt und Arbeitsweise über die drei Sprints entwickeln**.

## KI-Nutzung und Quellen

Der Einsatz von KI-Werkzeugen im Projekt ist zulässig und wird transparent dokumentiert.

Dokumentiert werden insbesondere:

- verwendetes KI-Werkzeug,
- Zweck der Nutzung,
- relevante Prompts bzw. Aufgabenstellungen,
- wesentliche übernommene oder angepasste Ergebnisse,
- fachliche Prüfung durch das Team.

Fachliche Quellen zum DigitalPakt 2.0 werden ebenfalls nachvollziehbar dokumentiert.

## Projektzeitraum

Bearbeitungszeitraum der Abschlussarbeit:

**28.09.2026 – 05.10.2026**

Projektvorstellung:

**06.10.2026**

## Fachlicher Hintergrund

Das Projekt orientiert sich am **DigitalPakt 2.0** und dessen Ziel, die digitale Entwicklung von Schulen weiter zu unterstützen.

Offizielle Informationen:

https://www.digitalpaktschule.de/de/digitalpakt-2-0-1874.html

Für konkrete Förderbedingungen sind die jeweils gültigen Vorgaben und Richtlinien der zuständigen Stellen und Bundesländer maßgeblich.

## Hinweis

**DigitalPakt Check ist kein offizielles Angebot des Bundes, eines Bundeslandes oder einer Förderstelle.**

Die Anwendung liefert ausschließlich eine strukturierte Vorprüfung und Orientierung. Ein positives Ergebnis stellt keine Förderzusage und keine verbindliche Aussage über die Förderfähigkeit eines Vorhabens dar.

## Projektstatus

🚧 **In Entwicklung**

Das Repository wird im Rahmen des Scrum-Projekts schrittweise mit jedem Sprint erweitert.
