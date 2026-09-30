import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <main className="route-card page-shell">
      <section className="route-panel" aria-labelledby="not-found-title">
        <h1 id="not-found-title">Seite nicht gefunden</h1>
        <p>Die angeforderte Seite ist nicht verfügbar.</p>
        <Link className="primary-button" to="/">
          Zur Startseite
        </Link>
      </section>
    </main>
  );
}
