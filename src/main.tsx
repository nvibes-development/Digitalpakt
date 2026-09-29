import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import './styles.css';

registerSW({ immediate: true });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <main className="page-shell">
      <section className="hero" aria-labelledby="page-title">
        <p className="eyebrow">DigitalPakt 2.0 · Prototyp</p>
        <h1 id="page-title">Welcome to DigitalPakt Check</h1>
        <p className="intro">
          DigitalPakt Check ist ein Prototyp für die unverbindliche Vorprüfung
          geplanter Digitalisierungsvorhaben im Kontext des DigitalPakts 2.0.
        </p>
        <p className="notice">
          Die Anwendung ist eine Orientierungshilfe und ersetzt keine
          rechtsverbindliche Förderberatung oder Förderentscheidung.
        </p>
      </section>
    </main>
  </StrictMode>,
);
