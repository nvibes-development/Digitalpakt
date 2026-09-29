# Fachliche Akzeptanzkriterien und Definition of Done

## Übergreifende fachliche Akzeptanzkriterien

Die Förderlogik gilt nur dann als fachlich korrekt, wenn **Antragsberechtigung der Schule**, **Förderfähigkeit der Maßnahme** und **Gesamtergebnis** nachvollziehbar miteinander verknüpft werden.

## Teilprüfung 1 – Antragsberechtigung der Schule

### Antragsberechtigt

**Given** alle für die Antragsberechtigung erforderlichen Pflichtangaben liegen vor  
**And** die Schule erfüllt die hinterlegten Voraussetzungen  
**When** die Antragsberechtigung geprüft wird  
**Then** lautet das Ergebnis **„antragsberechtigt“**.

### Nicht abschließend prüfbar

**Given** mindestens eine entscheidungsrelevante Angabe zur Schule fehlt oder ist nicht eindeutig  
**When** die Antragsberechtigung geprüft wird  
**Then** lautet das Ergebnis **„nicht abschließend prüfbar“**  
**And** die fehlenden Angaben werden konkret benannt.

### Nicht antragsberechtigt

**Given** mindestens eine zwingende Voraussetzung für die Antragsberechtigung ist nach den hinterlegten Kriterien nicht erfüllt  
**When** die Antragsberechtigung geprüft wird  
**Then** lautet das Ergebnis **„nicht antragsberechtigt“**  
**And** das Ergebnis wird verständlich begründet.

## Teilprüfung 2 – Förderfähigkeit der Maßnahme

**Given** die Schule ist antragsberechtigt  
**And** eine Maßnahme und die erforderlichen Rahmendaten wurden erfasst  
**And** genau ein MVP-Förderbereich wurde ausgewählt  
**When** die Förderkriterien beantwortet und ausgewertet werden  
**Then** wird ein nachvollziehbares vorläufiges Ergebnis zur Förderfähigkeit der Maßnahme erzeugt.

Die Antworten auf Förderkriterien sind:

- **Ja**
- **Nein**
- **Nicht bekannt**

Fehlende Informationen müssen von nachweislich nicht erfüllten Voraussetzungen unterschieden werden.

## Gesamtergebnis

### Antrag grundsätzlich möglich

**Given** die Schule ist antragsberechtigt  
**And** die Maßnahme erfüllt die für die Vorprüfung erforderlichen Kriterien  
**And** alle entscheidungsrelevanten Angaben liegen vor  
**When** das Gesamtergebnis gebildet wird  
**Then** lautet das Ergebnis **„Antrag grundsätzlich möglich“**.

### Weitere Angaben oder Nachweise erforderlich

**Given** die Schule oder Maßnahme kann aufgrund fehlender Angaben oder Nachweise noch nicht abschließend bewertet werden  
**And** es liegt keine festgestellte Ausschlussbedingung vor  
**When** das Gesamtergebnis gebildet wird  
**Then** lautet das Ergebnis **„weitere Angaben oder Nachweise erforderlich“**  
**And** die fehlenden Angaben oder Nachweise werden konkret benannt.

### Antrag derzeit nicht möglich

**Given** die Schule ist nicht antragsberechtigt oder eine zwingende Voraussetzung der Maßnahme ist nachweislich nicht erfüllt  
**When** das Gesamtergebnis gebildet wird  
**Then** lautet das Ergebnis **„Antrag derzeit nicht möglich“**  
**And** die maßgebliche Voraussetzung wird benannt  
**And** die verwendeten Förderkriterien werden nachvollziehbar ausgewiesen.

## Fachliche Qualitätsprinzipien

- Ergebnisse sind immer als **unverbindliche Ersteinschätzung** gekennzeichnet.
- Fehlende Informationen werden von nicht erfüllten Voraussetzungen unterschieden.
- Antragsberechtigung und Maßnahmenprüfung werden getrennt dargestellt.
- Das Gesamtergebnis ist aus den beiden Teilprüfungen reproduzierbar.
- Bei identischen Eingaben und identischem Regelstand entsteht dasselbe Prüfergebnis.
- Der verwendete Regelstand bleibt nachvollziehbar.
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
