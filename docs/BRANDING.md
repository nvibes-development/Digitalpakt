# DigitalPakt Check Branding

## 1. Designprinzip

DigitalPakt Check wirkt freundlich, verständlich und seriös. Die Oberfläche nutzt viel Weißraum, klare Hierarchie, ruhig abgegrenzte Karten und wenige, konsistent eingesetzte Markenfarben. Fachliche Förderbewertungen bleiben visuell von der Markenkommunikation getrennt.

## 2. Verbindliche Farbpalette

| Token | Wert | Erlaubte Verwendung |
| --- | --- | --- |
| `--color-primary` | `#105B5C` | Hauptüberschriften, wichtige Texte, Brand-Elemente, Icons, aktive/dunkle Markenflächen |
| `--color-accent` | `#008D7B` | Primäre Buttons, Links, Interaktionen, Fokuszustände, Akzentlinien |
| `--color-support` | `#56D6C1` | Sekundäre Akzente, unterstützende Icons, dezente funktionale Hervorhebungen |
| `--color-tint` | `#E9F9F5` | Informationsflächen, Sections, ruhige Hintergrundflächen und Formularkontexte |
| `--color-surface` | `#FFFFFF` | Seitenhintergrund, Karten, Panels, Dialoge und Eingabeflächen |

Reguläre UI-Elemente verwenden keine zusätzlichen Markenfarben. Neutrale Text-, Border- und Fokuswerte sind aus Petrol/Teal abgeleitet und dienen nur Lesbarkeit, Kontrast und Zuständen.

## 3. Typografie

Die UI verwendet die bestehende moderne Sans-Serif-Systemschriftfolge.

- H1: 32–36 px, Gewicht 700
- H2: 24–28 px, Gewicht 700
- Body: 16 px, Gewicht 400, Zeilenhöhe 1.45–1.6
- Label/Eyebrow: 13–14 px, Gewicht 600

## 4. Buttons, Links und Fokus

- Primäre Aktionen: Primary `#105B5C` mit weißem Text. Accent `#008D7B` bleibt für Interaktion, Fokus und Akzente verfügbar; die Kombination Accent/weiß erreicht bei normaler Textgröße nicht den erforderlichen Kontrast.
- Sekundäre Aktionen: weiße Oberfläche, Accent-Rahmen und Accent-Text.
- Hover für primäre Aktionen nutzt Support als klaren Innenakzent; Mint ist keine primäre Buttonfarbe.
- Fokus bleibt sichtbar mit einem Accent-basierten Fokus-Ring. Fokusindikatoren werden nie entfernt.

## 5. Icons und Markenassets

Produkt-Icons sind linear und konsistent; Primary oder Accent sind die Standardfarben. Support ist nur eine gezielte Sekundärfarbe.

Das vorhandene farbige App-Icon/Favicon wird verwendet. PWA-SVG-Icons sind auf das Primary/Accent-Branding abgestimmt. Offizielle BMBFSFJ- und DigitalPakt-Schule-Logos bleiben als externe Markenassets in ihren bereitgestellten Originalfarben und sind keine dekorativen UI-Farben.

## 6. Statusfarben

Grün, Gelb und Rot sind ausschließlich für fachliche Förderergebniszustände zulässig:

- positiv/förderfähig: Grün
- nicht abschließend prüfbar: Gelb
- negativ/nicht förderfähig: Rot

Sie werden nicht als Marken-, Interaktions- oder Dekorationsfarben verwendet.

## 7. CSS Tokens

Die zentralen Tokens liegen in `src/styles.css` unter `:root`:

```css
--color-primary: #105B5C;
--color-accent: #008D7B;
--color-support: #56D6C1;
--color-tint: #E9F9F5;
--color-surface: #FFFFFF;
```

Neue Komponenten müssen diese Tokens verwenden und dürfen kein paralleles Theme-System einführen.

## 8. Accessibility

- Text- und Button-Kontraste werden gegen ihre Flächen geprüft.
- Text auf White und Tint verwendet Primary oder abgeleitete dunkle neutrale Textwerte.
- Interaktive Elemente behalten sichtbare Fokuszustände.
- Mint wird nicht als alleinige Text- oder primäre Buttonfarbe eingesetzt.
- Die responsiven Regeln gelten einheitlich für Desktop, Tablet, Smartphone und PWA.
