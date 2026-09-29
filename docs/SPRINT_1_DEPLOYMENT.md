# Sprint 1 – Deployment und Betrieb

> **Status:** Deployment-Vorlage. Live-Werte und ausgeführte Schritte werden erst nach unabhängiger Prüfung der Azure-VM dokumentiert.

## Architektur

- **Quelle:** GitHub-Repository `nvibes-development/Digitalpakt`, Branch `main`
- **Anwendung:** React/Vite-PWA; statischer Build nach `dist/`
- **Webserver:** Nginx
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

`deploy/deploy.sh` bricht bei lokal veränderten Dateien ab, führt `npm ci`, Typecheck und Produktionsbuild aus, aktiviert den Build atomar und validiert/reloadet Nginx. Jeder Release ist über den Commit-SHA im Release-Pfad nachvollziehbar.

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
