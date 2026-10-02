# Produktdefinition – KLARFÖRDERN

**Stand:** 02.10.2026  
**Status:** finaler MVP-Scope abgeschlossen und Product-Owner-abgenommen

## Produktziel

KLARFÖRDERN unterstützt Schulen bei der strukturierten Vorbereitung und Einreichung schulischer Digitalisierungsvorhaben.

Die Anwendung sammelt Schuldaten, Maßnahmendaten, Förderfragen und Dokumente und stellt diese Informationen einem autorisierten Sachbearbeiter als versionierte digitale Akte zur Verfügung.

Die fachliche Entscheidung wird bewusst durch einen Menschen getroffen.

> **KLARFÖRDERN unterstützt die Prüfung. Die fachliche Entscheidung trifft ein autorisierter Sachbearbeiter.**

Das Ergebnis ist eine **unverbindliche Ersteinschätzung** und keine Förderzusage.

## Kernprozess

```text
Registrierung / Login
→ Schuldaten
→ Maßnahme
→ Förderbereich
→ neun Förderfragen
→ Dokumente
→ Einreichung
→ digitale Akte
→ Sachbearbeiterprüfung
→ Grün / Gelb / Rot
→ Rückmeldung
→ ggf. Nachbearbeitung und Wiedereinreichung
→ Abschluss
→ PDF-Prüfbericht
```

## Zielgruppen

- Schulen
- Schulträger
- Projektverantwortliche für schulische Digitalisierung
- IT- und Medienverantwortliche
- autorisierte Sachbearbeiter

## Rollen

### Schuladministrator

`school_admin`

Kann:

- Schuldaten verwalten
- Maßnahmen anlegen
- Förderbereich auswählen
- Förderfragen beantworten
- Dokumente verwalten
- Maßnahmen einreichen
- Status und öffentliche Rückmeldungen lesen
- bei Nachforderung nacharbeiten
- erneut einreichen

### Sachbearbeiter

`case_worker`

Kann:

- Posteingang bearbeiten
- digitale Akten lesen
- Dokumente herunterladen
- Vorgänge übernehmen
- öffentliche Hinweise und interne Vermerke erfassen
- menschliche Grün-/Gelb-/Rot-Entscheidung dokumentieren
- abgeschlossene Vorgänge als PDF exportieren

## Förderbereiche im MVP

1. **IT-Infrastruktur, Netzwerk und WLAN**
2. **Digitale Endgeräte**
3. **Bildungssoftware und digitale Lernplattformen**

Pro Maßnahme wird genau ein Förderbereich gewählt.

## Förderfragen

Der MVP verwendet neun verbindliche Fragen.

Antwortmöglichkeiten:

- Ja
- Nein
- Nicht bekannt

Alle Fragen müssen vor Einreichung beantwortet sein.

Die Antworten strukturieren die fachliche Akte, führen aber nicht automatisch zu einer Förderentscheidung.

## Dokumente

Unterstützt:

- PDF
- Word
- Excel
- maximal 10 MB

Dokumente werden maßnahmenbezogen in privatem Azure Blob Storage gespeichert.

## Einreichung und Versionierung

Eine Maßnahme kann eingereicht werden, wenn:

- alle neun Förderfragen beantwortet sind,
- mindestens ein Dokument vorhanden ist.

Bei jeder Einreichung wird eine unveränderliche Submission-Version erzeugt.

Gespeichert werden Snapshots von:

- Antragsteller
- Schule
- Maßnahme
- Antworten
- Dokumentmetadaten

Nach einer Nachforderung erzeugt die erneute Einreichung eine neue Version. Frühere Versionen bleiben erhalten.

## Menschliche Entscheidung

### Grün

**Grundsätzlich förderfähig**  
Technischer Status: `ELIGIBLE`

### Gelb

**Nachbearbeitung erforderlich**  
Technischer Status: `NEEDS_CHANGES`

Die Schule erhält eine öffentliche Nachforderung und kann Daten sowie Dokumente ergänzen.

### Rot

**Derzeit nicht förderfähig**  
Technischer Status: `NOT_ELIGIBLE`

Eine öffentliche Begründung ist Pflicht.

## Rückkanal

Öffentliche Sachbearbeitertexte werden dem Schulbenutzer angezeigt.

Interne Vermerke bleiben ausschließlich im Sachbearbeiterkontext und werden weder im Schulportal noch im PDF-Prüfbericht ausgegeben.

## PDF-Prüfbericht

Abgeschlossene grüne und rote Vorgänge können als PDF exportiert werden.

Der Bericht basiert auf der historisch geprüften Submission und enthält:

- Vorgangsnummer
- Submission-Version
- Prüfzeitpunkt
- Antragsteller
- Schuldaten
- Maßnahmendaten
- Förderbereich
- neun Fragen und Antworten
- Dokumentenliste
- Sachbearbeitung
- menschliche Entscheidung
- öffentliche Begründung
- Human-in-the-Loop-Hinweis
- Unverbindlichkeits-Hinweis

## Bewusste Scope-Entscheidung

Die ursprünglich geplante automatische Förderregel-Engine wurde nicht umgesetzt.

Grund:

Im Projektzeitraum lag kein belastbares, freigegebenes und versioniertes Förderregelwerk vor.

Ersetzt wurden:

- #27 – Förderregeln auf Antworten anwenden
- #28 – Förderstatus automatisch bestimmen
- #31 – automatische Förderregeln anzeigen

Der Ersatz ist der freigegebene Human-in-the-Loop-Prüfprozess.

## MVP-Abgrenzung

Nicht Bestandteil des abgeschlossenen MVP:

- automatische Förderentscheidung
- automatische Rechtsentscheidung
- KI-Entscheidung
- förmlicher Verwaltungsakt
- echte Förderzusage
- behördlicher Bewilligungsbescheid

## Abschlussstatus

Der freigegebene MVP-Scope ist abgeschlossen.

Alle Product-Backlog-Issues sind entweder:

- **Done / completed**, oder
- bewusst **Not planned / ersetzt**.

Siehe [PROJECT_CLOSURE.md](PROJECT_CLOSURE.md).
