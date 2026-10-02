# KLARFÖRDERN – Branding und Design-System

**Stand:** 02.10.2026  
**Status:** finales MVP-Design

## 1. Designprinzip

KLARFÖRDERN wirkt freundlich, verständlich und seriös. Die Oberfläche nutzt viel Weißraum, klare Hierarchie, ruhig abgegrenzte Karten und wenige konsistente Markenfarben.

Fachliche Statusfarben bleiben von der Markenkommunikation getrennt.

## 2. Verbindliche Farbpalette

| Token | Wert | Verwendung |
|---|---|---|
| `--color-primary` | `#105B5C` | Hauptüberschriften, wichtige Texte, Brand-Elemente |
| `--color-accent` | `#008D7B` | Links, Interaktionen, Fokus, Akzente |
| `--color-support` | `#56D6C1` | unterstützende Akzente |
| `--color-tint` | `#E9F9F5` | Informations- und Hintergrundflächen |
| `--color-surface` | `#FFFFFF` | Karten, Panels, Dialoge, Eingabeflächen |

## 3. Typografie

Die Anwendung verwendet eine moderne Sans-Serif-Systemschriftfolge.

- H1: 32–36 px, 700
- H2: 24–28 px, 700
- Body: 16 px, 400, Zeilenhöhe 1.45–1.6
- Label / Eyebrow: 13–14 px, 600

## 4. Interaktionen

Primäre Aktionen:

- Petrol `#105B5C`
- weißer Text

Sekundäre Aktionen:

- weiße Oberfläche
- Accent-Rahmen
- Accent-Text

Fokuszustände bleiben immer sichtbar.

## 5. Markenassets

Verbindliche App-Icon-Quelle:

`public/digitalpakt-check-icon.svg`

PWA-Varianten:

- `digitalpakt-check-icon-192.png`
- `digitalpakt-check-icon-512.png`
- `digitalpakt-check-icon-maskable-512.png`

Offizielle BMBFSFJ- und DigitalPakt-Schule-Logos bleiben in ihren Originalfarben.

## 6. Statusfarben

Statusfarben sind ausschließlich fachlich:

- Grün → grundsätzlich förderfähig
- Gelb → Nachbearbeitung erforderlich
- Rot → derzeit nicht förderfähig

Der Status wird zusätzlich immer als Text dargestellt und niemals ausschließlich durch Farbe vermittelt.

## 7. CSS Tokens

Die zentralen Tokens liegen in `src/styles.css`.

```css
--color-primary: #105B5C;
--color-accent: #008D7B;
--color-support: #56D6C1;
--color-tint: #E9F9F5;
--color-surface: #FFFFFF;
```

## 8. Schulportal

Das Schulportal verwendet:

- linke Navigation auf Desktop
- klare Karten
- Statusanzeige je Maßnahme
- Anmerkungsdialog für öffentliche Sachbearbeitertexte
- responsive Darstellung

## 9. Sachbearbeiterportal

Das Sachbearbeiterportal verwendet dasselbe Design-System und ergänzt:

- Posteingang
- Tabellen
- digitale Akten
- Grün-/Gelb-/Rot-Entscheidungsbuttons
- Dokumentlisten
- PDF-Export

## 10. PDF-Prüfbericht

Der PDF-Prüfbericht verwendet die KLARFÖRDERN-Marke:

- KLARFÖRDERN-Icon
- Primary Petrol
- Tint-Flächen
- klare Abschnittshierarchie
- Status immer als Text
- Human-in-the-Loop- und Unverbindlichkeits-Hinweis

## 11. Accessibility

- sichtbare Fokuszustände
- Labels für Eingaben
- Status nicht nur über Farbe
- verständliche Buttontexte bzw. `aria-label`
- responsive Bedienung
- ausreichend große Touch-Ziele
- lesbare Kontraste
- 200-%-Zoom in UAT berücksichtigt

## Abschluss

Das Design-System ist im abgeschlossenen MVP konsistent über Landingpage, Schulportal, Sachbearbeiterportal und PDF-Prüfbericht angewendet.
