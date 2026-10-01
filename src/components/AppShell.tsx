import { useState } from 'react';
import { BsBuilding, BsClipboardCheck, BsFolder, BsHouseDoor, BsPatchQuestion, BsPersonCircle, BsPlusCircle, BsQuestionCircle } from 'react-icons/bs';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSession } from '../auth/SessionContext';
import { PublicFooter } from './PublicFooter';
import { DashboardPage } from '../pages/DashboardPage';
import { SchoolPage } from '../pages/SchoolPage';
import { MeasurePage } from '../pages/MeasurePage';
import { MeasuresPage } from '../pages/MeasuresPage';
import { DocumentsPage } from '../pages/DocumentsPage';
import { ProfilePage } from '../pages/ProfilePage';
import { QuestionsPage } from '../pages/QuestionsPage';
import { HelpPage } from '../pages/HelpPage';

const navigation = [
  ['Übersicht', '/app', BsHouseDoor],
  ['Schuldaten', '/app/school', BsBuilding],
  ['Neue Maßnahme', '/app/measures/new', BsPlusCircle],
  ['Meine Maßnahmen', '/app/measures', BsClipboardCheck],
  ['Fragen', '/app/questions', BsPatchQuestion],
  ['Dokumente', '/app/documents', BsFolder],
  ['Hilfe', '/app/help', BsQuestionCircle],
] as const;

export function AppShell() {
  const { logout, user } = useSession();
  const navigate = useNavigate();
  const location = useLocation();
  const [logoutError, setLogoutError] = useState('');
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  async function handleLogout() {
    setLogoutError('');
    try {
      await logout();
      setAccountMenuOpen(false);
      navigate('/login', { replace: true });
    } catch {
      setLogoutError('Die Abmeldung ist derzeit nicht möglich. Bitte versuchen Sie es erneut.');
    }
  }

  return (
    <div className="app-shell">
      <aside className="app-sidebar" aria-label="App-Navigation">
        <div className="app-sidebar-header">
          <Link className="app-sidebar-brand" to="/app">
            <img src="/digitalpakt-check-icon.svg" alt="" />
            <span>KLARFÖRDERN</span>
          </Link>
          <div className="account-menu">
            <button className="account-trigger" type="button" aria-label="Kontomenü öffnen" aria-expanded={accountMenuOpen} aria-haspopup="menu" onClick={() => setAccountMenuOpen((open) => !open)}><BsPersonCircle aria-hidden="true" /></button>
            {accountMenuOpen && <div className="account-menu-popover" role="menu"><p>Angemeldet als<br/><strong>{user?.email}</strong></p><Link to="/app/profile" role="menuitem" onClick={() => setAccountMenuOpen(false)}>Profildaten</Link><button type="button" role="menuitem" onClick={() => void handleLogout()}>Abmelden</button></div>}
          </div>
        </div>
        <nav>
          <ul>
            {navigation.map(([label, to, Icon]) => (
              <li key={to}>
                <Link to={to}><Icon aria-hidden="true" /> <span>{label}</span></Link>
              </li>
            ))}
          </ul>
        </nav>
        {logoutError && <p className="form-error" role="alert">{logoutError}</p>}
      </aside>
      <div className="app-main">
        <main className="app-content">
          {location.pathname === '/app/school' ? <SchoolPage /> : location.pathname === '/app' ? <DashboardPage /> : location.pathname === '/app/measures/new' ? <MeasurePage /> : location.pathname === '/app/measures' ? <MeasuresPage /> : location.pathname === '/app/documents' ? <DocumentsPage /> : location.pathname === '/app/questions' ? <QuestionsPage /> : location.pathname === '/app/profile' ? <ProfilePage /> : location.pathname === '/app/help' ? <HelpPage /> : location.pathname.startsWith('/app/measures/') ? <MeasurePage measureId={location.pathname.slice('/app/measures/'.length)} /> : <section className="app-placeholder" aria-labelledby="app-placeholder-title"><h1 id="app-placeholder-title">KLARFÖRDERN App</h1><p>Dieser Arbeitsschritt wird im nächsten Product Item ergänzt.</p></section>}
        </main>
        <PublicFooter />
      </div>
    </div>
  );
}
