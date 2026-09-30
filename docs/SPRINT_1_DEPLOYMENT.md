# Sprint 1 – Deployment und Betrieb

> **Status:** Produktive Bereitstellung am 2026-09-29 verifiziert. Diese Datei enthält weiterhin den reproduzierbaren Ablauf und zusätzlich den nicht-sensitiven Produktionsnachweis.

## Architektur

- **Quelle:** GitHub-Repository `nvibes-development/Digitalpakt`, Branch `main`
- **Anwendung:** React/Vite-PWA; statischer Build nach `dist/`
- **Webserver:** Nginx
- **API:** Node.js/Fastify auf `127.0.0.1:3000`, via Nginx ausschließlich unter `/api/*` erreichbar
- **Datenbank:** lokales PostgreSQL; Zugang ausschließlich über die nicht versionierte `/etc/klarfoerdern/api.env`
- **vorgesehener VM-Pfad:** `/srv/digitalpakt/app`
- **Release-Pfad:** `/srv/digitalpakt/releases/<Git-Commit>`
- **aktiver Release:** atomarer Symlink `/srv/digitalpakt/current`
- **vorgesehene Nginx-Site:** `deploy/nginx/digitalpakt.nvibes.de.conf`

Die Pfade sind Teil der versionierten Deployment-Vorlage. Sie werden erst nach der VM-Prüfung als produktiv bestätigt.

## Einmalige Server-Vorbereitung

1. Die VM anhand ihres aktuellen Azure-Ressourcen- und NSG-Zustands prüfen; nur TCP 22, 80 und 443 dürfen eingehend nötig sein. SSH ist auf vertrauenswürdige Administrationsnetze zu begrenzen, sofern der bestehende Zugriffspfad dadurch nicht unterbrochen wird.
2. Alte Dienste und Artefakte nur entfernen, wenn sie eindeutig der früheren Mars-Anwendung zuzuordnen sind. Vorher einen inventarisierenden, nicht-sekretären Snapshot der Services, Nginx-Sites, Prozesse, offenen Ports und Release-Pfade erstellen.
3. Debian-Paketindex und Sicherheitsupdates einspielen; danach Neustartbedarf und SSH-Erreichbarkeit prüfen.
4. Nginx, Git, Node.js 22 LTS und die Build-Werkzeuge installieren. Die tatsächlich installierten Versionen dokumentieren.
5. `/srv/digitalpakt/{app,releases}` erstellen, Eigentümer auf den dedizierten Deployment-Benutzer beschränken und das öffentliche GitHub-Repository nach `/srv/digitalpakt/app` klonen.
6. `deploy/nginx/digitalpakt.nvibes.de.conf` nach `/etc/nginx/sites-available/` übernehmen, aktivieren und mit `nginx -t` prüfen. Die Standardsite deaktivieren, sofern sie eindeutig nicht anderweitig verwendet wird.
7. Erst nach bestätigter DNS-Auflösung für `digitalpakt.nvibes.de` ein Let’s-Encrypt-Zertifikat mit Certbot/Nginx beziehen. Automatische Erneuerung mit einem Dry Run prüfen.

## Reproduzierbares Release

Auf der VM, aus dem sauberen Git-Checkout:

```bash
cd /srv/digitalpakt/app
git fetch origin
git checkout main
git pull --ff-only origin main
./deploy/deploy.sh
```

`deploy/deploy.sh` bricht bei lokal veränderten Dateien ab, führt `npm ci`, Typecheck, Tests, Frontend-/API-Produktionsbuild und versionierte Datenbankmigrationen aus. Danach aktiviert es den Frontend-Build atomar, startet `klarfoerdern-api.service` und validiert/reloadet Nginx. Die nicht versionierte API-Umgebungsdatei muss vor einem Release vorhanden und lesbar sein. Jeder Release ist über den Commit-SHA im Release-Pfad nachvollziehbar.

## Rollback

Der vorige Release bleibt unter `/srv/digitalpakt/releases/` erhalten. Nach Prüfung des Ziel-Release-Verzeichnisses kann der Symlink auf den vorherigen Commit zurückgesetzt werden; danach sind `nginx -t`, Nginx-Reload und HTTPS-Health-Checks verpflichtend. Kein Rollback darf unbestätigte oder lokale Artefakte aktivieren.

## DNS, Cloudflare und TLS

- DNS-Ziel: `digitalpakt.nvibes.de` → bestätigte öffentliche Azure-IP der dedizierten VM.
- Cloudflare-Modus, Zone, Record-ID und Proxy-Status werden nicht geraten: vor der Änderung live prüfen und danach im Sprint-1-Issue festhalten.
- Bei aktivem Cloudflare-Proxy ist **Full (strict)** mit einem gültigen Origin-Zertifikat erforderlich; kein Flexible TLS.
- HTTP wird am Origin auf HTTPS umgeleitet. TLS-Schlüssel liegen ausschließlich auf dem Server unter `/etc/letsencrypt/`, nie im Repository.

## Finaler Health Check

```bash
curl --fail --location --proto '=https' https://digitalpakt.nvibes.de/
curl --fail https://digitalpakt.nvibes.de/manifest.webmanifest
curl --fail https://digitalpakt.nvibes.de/sw.js
curl --head http://digitalpakt.nvibes.de/
```

Zusätzlich im Browser prüfen: sichtbares H1, Desktop- und schmale Darstellung, installierbares Manifest, Service-Worker-Registrierung sowie keine kritischen Konsolenfehler.

## Produktionsnachweis – 2026-09-29

### Bereitstellung und Bereinigung

- GitHub `main` ist der einzige Deployment-Input. Der produktive Checkout unter `/srv/digitalpakt/app` und der atomare Release unter `/srv/digitalpakt/current` werden bei jedem Release auf den jeweils aktuell verifizierten GitHub-`main`-Commit aktualisiert; der aktive Commit wird über den Release-Pfad nachvollziehbar.
- Der vormals ausschließlich für MARS // ROOM verwendete Pfad `/var/www/mars-experience`, der Dienst `mars-session-hub.service`, die zugehörige Nginx-Site, das frühere Let’s-Encrypt-Zertifikat und der zugehörige Cloudflare-DNS-Record wurden entfernt. Es wurden keine anderen nVibes-Produktionsressourcen geändert.
- Die bestehende Azure-VM wird als technische Basis weiterverwendet. Ihr Azure-Ressourcenname und Hostname sind historische Bezeichner und wurden nicht als vermeintlich umbenennbare Ressourcen verändert.

### Server-Basis

- Debian 13 ist aktualisiert; der Cloud-Kernel `6.12.111+deb13-cloud-amd64` wurde installiert und nach einem kontrollierten Neustart verifiziert. Zum Prüfzeitpunkt waren keine Paketupdates und kein Neustart ausstehend.
- Nginx `1.26.3`, Git `2.47.3`, Node.js `22.23.3` und npm `10.9.9` sind installiert.
- UFW verwendet eingehend `deny` als Standard und erlaubt nur TCP 22, 80 und 443. Die abschließende Azure-NSG-Inventarisierung erfordert einen erneuerten Azure-MFA-Login und ist als verbleibender Infrastruktur-Nachweis offen.

### DNS und TLS

- Cloudflare Zone `nvibes.de`: `digitalpakt.nvibes.de` ist ein proxied A-Record mit der bestätigten VM-Origin-IP `20.113.176.159`; der Zonenmodus ist `Full (strict)`.
- Ein Let’s-Encrypt-Zertifikat für `digitalpakt.nvibes.de` ist installiert. Certbot-Erneuerung wurde per Dry Run erfolgreich geprüft; Schlüssel verbleiben ausschließlich unter `/etc/letsencrypt/`.
- Nginx erzwingt HTTP → HTTPS und liefert Sicherheitsheader. `nginx -t` wurde vor jedem Reload erfolgreich ausgeführt.

### Validierung

- Auf der VM bestanden `npm ci`, `npm run check`, `npm run build`, die PWA-Generierung sowie der versionierte atomare Deployment-Ablauf.
- Origin- und öffentliche HTTPS-Requests lieferten HTTP 200 für `/`, `/manifest.webmanifest` und `/sw.js`; HTTP liefert einen HTTPS-Redirect.
- Die finale Browser-Visual-/Konsole-Prüfung ist nicht automatisiert dokumentiert, weil der vorhandene Edge-Control-Controller in dieser Sitzung nicht erreichbar war. Die React-Quelle und das ausgelieferte Bundle enthalten das geforderte H1; die responsive Regel für schmale Breiten ist versioniert.
