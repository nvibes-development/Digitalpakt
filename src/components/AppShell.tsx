import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSession } from '../auth/SessionContext';
import { PublicFooter } from './PublicFooter';
import { DashboardPage } from '../pages/DashboardPage';
import { SchoolPage } from '../pages/SchoolPage';
import { MeasurePage } from '../pages/MeasurePage';
import { MeasuresPage } from '../pages/MeasuresPage';
import { DocumentsPage } from '../pages/DocumentsPage';

const navigation = [
  ['Übersicht', '/app'],
  ['Schuldaten', '/app/school'],
  ['Neue Maßnahme', '/app/measures/new'],
  ['Meine Maßnahmen', '/app/measures'],
  ['Dokumente', '/app/documents'],
  ['Hilfe', '/app/help'],
] as const;

export function AppShell() {
  const { logout } = useSession();
  const navigate = useNavigate();
  const location = useLocation();
  const [logoutError, setLogoutError] = useState('');

  async function handleLogout() {
    setLogoutError('');
    try {
      await logout();
      navigate('/login', { replace: true });
    } catch {
      setLogoutError('Die Abmeldung ist derzeit nicht möglich. Bitte versuchen Sie es erneut.');
    }
  }

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
        <button className="logout-button" type="button" onClick={() => void handleLogout()}>
          Abmelden
        </button>
        {logoutError && <p className="form-error" role="alert">{logoutError}</p>}
      </aside>
      <div className="app-main">
        <main className="app-content">
          {location.pathname === '/app/school' ? <SchoolPage /> : location.pathname === '/app' ? <DashboardPage /> : location.pathname === '/app/measures/new' ? <MeasurePage /> : location.pathname === '/app/measures' ? <MeasuresPage /> : location.pathname === '/app/documents' ? <DocumentsPage /> : location.pathname.startsWith('/app/measures/') ? <MeasurePage measureId={location.pathname.slice('/app/measures/'.length)} /> : <section className="app-placeholder" aria-labelledby="app-placeholder-title"><h1 id="app-placeholder-title">KLARFÖRDERN App</h1><p>Dieser Arbeitsschritt wird im nächsten Product Item ergänzt.</p></section>}
        </main>
        <PublicFooter />
      </div>
    </div>
  );
}
