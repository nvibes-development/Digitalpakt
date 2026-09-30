import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import './styles.css';

registerSW({ immediate: true });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <main className="page-shell">
      <section className="hero" aria-labelledby="app-title">
        <div className="hero-logos">
          <img
            className="hero-logo hero-logo-ministry"
            src="/logo-bmbfsfj-weisser-hintergrund-data.svg"
            alt="BMBFSFJ"
          />
          <img
            className="hero-logo hero-logo-digitalpakt"
            src="/digitalpaktschule.svg"
            alt="DigitalPakt Schule"
          />
        </div>

        <p className="eyebrow">DigitalPakt 2.0 · Förderfähigkeit vorprüfen</p>

        <div className="app-brand">
          <img src="/digitalpakt-check-icon.svg" alt="" />
          <h1 id="app-title">KLARFÖRDERN</h1>
        </div>

        <h2 className="hero-question">
          Ist Ihr Digitalisierungsvorhaben grundsätzlich förderfähig?
        </h2>

        <p className="intro">
          Prüfen Sie Ihr geplantes Schul-Digitalisierungsprojekt strukturiert
          anhand zentraler Anforderungen des DigitalPakts 2.0. Schnell,
          verständlich und unverbindlich.
        </p>

        <div className="hero-actions">
          <a className="primary-button" href="/check">
            Check starten
          </a>

          <a className="secondary-button" href="#so-funktionierts">
            So funktioniert&apos;s
          </a>
        </div>

        <ul className="benefits" aria-label="Vorteile">
          <li>✓ Unverbindliche Vorprüfung</li>
          <li>✓ Ergebnis in wenigen Minuten</li>
          <li>✓ Orientierung vor Antragstellung</li>
        </ul>

        <p className="disclaimer">
          Keine Förderzusage und keine Rechts- oder Förderberatung. Maßgeblich
          sind die jeweiligen Förderbedingungen und Verfahren des zuständigen
          Bundeslandes.
        </p>
      </section>

      <section id="so-funktionierts" className="info-section">
        <p className="eyebrow">DigitalPakt 2.0</p>

        <h2>5 Milliarden Euro für die digitale Bildung</h2>

        <p>
          Bund und Länder investieren gemeinsam fünf Milliarden Euro in die
          digitale Bildung an allgemeinbildenden und berufsbildenden Schulen.
          Der DigitalPakt 2.0 verbindet digitale Infrastruktur mit Schul- und
          Unterrichtsentwicklung sowie der Qualifizierung von Lehrkräften.
        </p>

        <video
          className="info-video"
          controls
          preload="metadata"
          aria-label="Video zum DigitalPakt 2.0"
        >
          <source src="/23863_8b714eb56486490_web.mp4" type="video/mp4" />
          Ihr Browser unterstützt keine eingebetteten Videos.
        </video>
      </section>
    </main>
  </StrictMode>,
);
