# Fachliche Akzeptanzkriterien und Definition of Done

## Übergreifende fachliche Akzeptanzkriterien

Die Förderlogik gilt nur dann als fachlich korrekt, wenn die folgenden Fälle reproduzierbar erfüllt werden.

### 🟢 Grundsätzlich förderfähig

**Given** eine Maßnahme ist einem förderfähigen Bereich zugeordnet  
**And** alle zwingenden Voraussetzungen sind erfüllt  
**And** alle für die Entscheidung erforderlichen Informationen liegen vor  
**When** die Förderfähigkeitsprüfung durchgeführt wird  
**Then** lautet das Ergebnis 🟢 **„Grundsätzlich förderfähig“**.

### 🟡 Förderfähigkeit noch nicht abschließend prüfbar

**Given** mindestens eine entscheidungsrelevante Voraussetzung kann aufgrund fehlender Angaben oder Nachweise nicht geprüft werden  
**And** es liegt keine bereits festgestellte Ausschlussbedingung vor  
**When** die Prüfung durchgeführt wird  
**Then** lautet das Ergebnis 🟡 **„Förderfähigkeit noch nicht abschließend prüfbar“**  
**And** die fehlenden Angaben / Nachweise werden konkret benannt.

### 🔴 Nach den hinterlegten Kriterien derzeit nicht förderfähig

**Given** mindestens eine zwingende Fördervoraussetzung ist nachweislich nicht erfüllt  
**When** die Prüfung durchgeführt wird  
**Then** lautet das Ergebnis 🔴 **„Nach den hinterlegten Kriterien derzeit nicht förderfähig“**  
**And** die nicht erfüllte Voraussetzung wird benannt  
**And** die zugrunde liegende Förderregel wird ausgewiesen.

## Fachliche Qualitätsprinzipien

- Die Farbe wird nie ohne textliche Statusbezeichnung dargestellt.
- Fehlende Informationen werden von nicht erfüllten Voraussetzungen unterschieden.
- Das Gesamtergebnis ist aus den Ergebnissen der Einzelregeln reproduzierbar.
- Bei identischen Eingaben und identischem Regelstand entsteht dasselbe Prüfergebnis.
- Historische Ergebnisse bleiben mit dem zum Prüfzeitpunkt verwendeten Regelstand nachvollziehbar.
- Eine spätere Änderung einer Förderregel verändert ein historisch gespeichertes Prüfergebnis nicht unbemerkt.

## Projektweite Definition of Done

Ein Product Backlog Item gilt als **Done**, wenn:

- [ ] alle vereinbarten Akzeptanzkriterien erfüllt sind,
- [ ] die Umsetzung vollständig und funktionsfähig ist,
- [ ] notwendige fachliche und technische Tests durchgeführt wurden,
- [ ] keine bekannten kritischen Fehler bestehen,
- [ ] die Funktion in das aktuelle Increment integriert ist,
- [ ] relevante Dokumentation aktualisiert wurde,
- [ ] die Umsetzung im GitHub Project nachvollziehbar dokumentiert ist,
- [ ] und das Ergebnis im Sprint Review demonstriert werden kann.

Für technische Änderungen gilt zusätzlich:

- [ ] Secrets, Passwörter und private Schlüssel befinden sich nicht im Repository,
- [ ] Änderungen sind versioniert und reproduzierbar,
- [ ] die bestehende Anwendung wird durch die Änderung nicht erkennbar beschädigt.

Die Definition of Done kann durch Erkenntnisse aus Retrospektiven gemeinsam weiterentwickelt werden. Änderungen werden transparent dokumentiert.
