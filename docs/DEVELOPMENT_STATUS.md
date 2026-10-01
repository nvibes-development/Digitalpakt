# Entwicklungsstand – KLARFÖRDERN

**Stand:** 1. Oktober 2026  
**Autoritative Quelle:** GitHub `main`  
**Produktiv verifizierter Release:** `10270d4bdac7a0ec01bd7dd33df4b0e2a3c88148`

## Produktiver Funktionsumfang

### Zugang, Datenschutz und Rechtliches

- Registrierung, Anmeldung, serverseitige Sitzung und Abmeldung sind umgesetzt.
- Das Registrierungsformular verlangt mindestens zwölf Zeichen für Passwörter und weist darauf hin.
- Das Impressum und die Datenschutzerklärung sind unter `/impressum` bzw. `/datenschutz` erreichbar. Die Datenschutz-Kontaktadresse ist `contact@nvibes.de`.
- Die Datenschutzerklärung ist eine veröffentlichte Produktinformation; rechtliche Prüfung und fortlaufende Aktualisierung bleiben Verantwortung des Verantwortlichen.

### Schule und Antragsberechtigung

- Eine Schule und ihre Mitgliedschaften werden persistent gespeichert und serverseitig gegen die Mitgliedschaft des angemeldeten Benutzers autorisiert.
- Förderdaten zur Schule, inklusive bedingter Angaben zum Anerkennungsstatus, werden validiert und gespeichert.
- Die UI kennzeichnet unvollständige Angaben und führt zur Erfassung fehlender Daten.
- **Wichtig:** Es existiert noch keine fachlich verbindliche Regelbasis zur Antragsberechtigung. Der technische Dienst liefert deshalb ausschließlich `needs_information`; er entscheidet weder `eligible` noch `not_eligible`.

### Maßnahmen und Förderbereiche

- Mehrere Maßnahmen können pro Schule angelegt, bearbeitet, geöffnet und isoliert gespeichert werden.
- Maßnahmendaten umfassen unter anderem Bezeichnung, Kurzbeschreibung, Status, Förderbereich, Kosten und Umsetzungszeitraum.
- Im MVP sind die Förderbereiche IT-Infrastruktur/Netzwerk/WLAN, digitale Endgeräte sowie Bildungssoftware/digitale Lernplattformen verfügbar. Nicht-MVP-Bereiche werden nicht als reguläre MVP-Auswahl akzeptiert.
- Die Navigation enthält Übersicht, Schuldaten, neue und bestehende Maßnahmen, Fragen, Dokumente und Hilfe.
- Eine Maßnahme kann erst zur Überprüfung gesendet werden, wenn neun Fragen beantwortet und mindestens ein Dokument vorhanden ist. Die Einreichung erhält eine eindeutige Bearbeitungsnummer (`12 alphanumerische Zeichen_DDMMJJJJ`) und sperrt die Maßnahmendaten, Antworten und Dokumentänderungen.

### Maßnahmen-Dokumente

- Dokumente werden pro Maßnahme und nur für berechtigte Schulmitglieder verwaltet.
- Zulässig sind PDF, Word (`.doc`, `.docx`) und Excel (`.xls`, `.xlsx`) bis 10 MB.
- Die Dokumentenansicht bietet Maßnahmenauswahl, Upload, fortlaufende Nummerierung, Dateiname, Upload- und Prüfdatum sowie Download und Löschen.
- Blob-Pfade werden serverseitig aus der Maßnahme abgeleitet. Download und Löschen prüfen die Mitgliedschaft erneut auf dem Server.
- Azure Blob Storage: Container `digitalpakt` ist privat. Die Produktions-VM verwendet eine systemzugewiesene Managed Identity mit der erforderlichen Blob-Datenrolle; es werden keine Storage-Keys oder Connection Strings in Code oder Konfiguration gespeichert.
- Nach der Einreichung bleiben Downloads möglich; Upload und Löschen sind UI- und serverseitig gesperrt.

## Technische Umsetzung

- Web: React/Vite/PWA.
- API: Fastify/TypeScript/PostgreSQL.
- Datenbankmigrationen: `001` bis `009`; `006` ergänzt Maßnahmendokumente, `007` Profildaten, `008` maßnahmenbezogene Antworten und `009` Einreichungsstatus/Bearbeitungsnummer.
- Azure Blob SDK: `DefaultAzureCredential` nutzt auf Produktion die Managed Identity.
- Dokumenten-API:
  - `GET /api/measures/:measureId/documents`
  - `POST /api/measures/:measureId/documents`
  - `GET /api/documents/:documentId/download`
  - `DELETE /api/documents/:documentId`

## Validierung

- Lokaler Typecheck und Produktionsbuild für die Dokumentenfunktion sowie Folgeänderungen: bestanden.
- Produktionsdeployment erfolgt aus dem exakten GitHub-`main`-Commit, führt Migrationen aus und aktiviert atomare Releases.
- Produktionsnachweise: Managed-Identity-Tokenabruf auf der VM HTTP 200; Containerzugriff ist nicht öffentlich; Dokument-Upload wurde visuell mit einer `.docx`-Datei bestätigt.
- Nicht vollständig automatisiert getestet: alle negativen Browserfälle (falsche Endung/MIME, Grenzwert 10 MB, Cross-School-Angriffe) sowie Download- und Löschvorgang mit mehreren Benutzerkonten.

## Offene fachliche und technische Arbeit

1. Verbindliche, versionierte Fachregeln zur Schul-Antragsberechtigung und Maßnahmenförderfähigkeit bereitstellen; ohne diese dürfen keine positiven oder negativen Förderentscheidungen erzeugt werden.
2. Dynamischen Fragenkatalog, Antwortspeicherung, Regelanwendung, nachvollziehbare Ergebnisse, Nachweise, Regelstand, nächste Schritte und Ergebnisexport implementieren.
3. Maßnahmenübersicht um den geforderten Förderstatus und das letzte Prüfdatum ergänzen, sobald echte Prüfergebnisse existieren.
4. Ergebnisverlauf und erneute Prüfung mit versioniertem Regelstand ergänzen.
5. Dokumentenfunktion mit automatisierten negativen Autorisierungs-, Typ-, Größen-, Download- und Delete-Tests erweitern; optional Prüfdatum durch einen fachlich definierten Prüfprozess pflegen.
6. Datenschutz- und Impressumstexte bei Änderungen an Verarbeitung, Hosting oder rechtlichen Angaben prüfen und aktualisieren.

## Profil, Fragen und Hilfe

- Das Kontomenü bietet Profildaten und Abmeldung. Die Profilpflege umfasst E-Mail, Vor-/Nachname, Anschrift sowie Telefon- und Handynummer; das Passwort kann mit aktuellem Passwort geändert werden.
- Eine Kontolöschung verlangt eine ausdrückliche Bestätigung. Sie löscht bei alleiniger Schulmitgliedschaft Konto, Schule, Maßnahmen, Antworten und Azure-Dokumente. Bei geteilten Schuldaten wird die automatische Löschung aus Datenschutz- und Mandantenschutzgründen abgelehnt.
- Der Fragenkatalog enthält die neun bereitgestellten Fragen mit den Antwortwerten Ja, Nein und Nicht bekannt. Alle neun Antworten sind vor einer Einreichung erforderlich.
- Die Hilfe unter `/app/help` dokumentiert Nutzung, Datenminimierung bei Dokumenten, Sperre nach Einreichung und die unverbindliche Natur der Anwendung.

## Release-Historie (aktueller Arbeitsschritt)

| Release | Inhalt |
|---|---|
| `ada23e8` | Maßnahmen-Dokumente, Migration und Azure Blob-Integration |
| `00aa12b` | Gestaltete Dateiauswahl |
| `6e2432d` | Bootstrap-Icons für Navigation und Dokumentaktionen |
| `85a1b71` | Vereinfachtes Anmelde-/Registrierungsformular |
| `783978d` | Passwort-Hinweis bei Registrierung |
| `e3c1def` | Datenschutzerklärung veröffentlicht |
| `a6c0f61` | Impressum auf Deutsch veröffentlicht |
| `0644ffc` | Datenschutz-Kontaktadresse ergänzt |
| `997b370` | Profilpflege, Passwortänderung und bestätigte Kontolöschung |
| `c169793` | Maßnahmenspezifischer Fragenkatalog |
| `a84d217` | Einreichung zur Überprüfung und Bearbeitungsnummer |
| `03c8b91` / `b5290bf` | Sperre von Dokumenten und Antworten nach Einreichung |
| `3b28f16` / `10270d4` | In-App-Hilfe und Abschnittsabstände |
