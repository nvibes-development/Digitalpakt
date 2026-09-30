import { Link } from 'react-router-dom';

const navigation = [
  ['Übersicht', '/app'],
  ['Neue Maßnahme', '/app/measures/new'],
  ['Meine Maßnahmen', '/app/measures'],
  ['Schuldaten', '/app/school'],
  ['Dokumente', '/app/documents'],
  ['Hilfe', '/app/help'],
] as const;

export function AppShell() {
  return (
    <div className="app-shell">
      <aside className="app-sidebar" aria-label="App-Navigation">
        <Link className="app-sidebar-brand" to="/app">
          <img src="/digitalpakt-check-icon.svg" alt="" />
          <span>KLARFÖRDERN</span>
        </Link>
        <nav>
          <ul>
            {navigation.map(([label, to]) => (
              <li key={to}>
                <Link to={to}>{label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="app-sidebar-legal">
          <Link to="/impressum">Impressum</Link>
          <Link to="/datenschutz">Datenschutz</Link>
        </div>
      </aside>
      <main className="app-content">
        <section className="app-placeholder" aria-labelledby="app-placeholder-title">
          <h1 id="app-placeholder-title">KLARFÖRDERN App</h1>
          <p>Der geschützte Arbeitsbereich wird schrittweise aufgebaut.</p>
        </section>
      </main>
    </div>
  );
}
