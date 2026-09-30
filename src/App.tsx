import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { SessionProvider, useSession } from './auth/SessionContext';
import { AppShell } from './components/AppShell';
import { AuthPage } from './pages/AuthPage';
import { LandingPage } from './pages/LandingPage';
import { LegalPage } from './pages/LegalPage';
import { NotFoundPage } from './pages/NotFoundPage';

function ProtectedAppRoute() {
  const { status } = useSession();

  if (status === 'loading') {
    return <main className="route-state">Sitzung wird geprüft …</main>;
  }

  if (status === 'unauthenticated') {
    return <Navigate replace to="/login" />;
  }

  return <AppShell />;
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/check" element={<Navigate replace to="/login" />} />
      <Route path="/login" element={<AuthPage mode="login" />} />
      <Route path="/register" element={<AuthPage mode="register" />} />
      <Route path="/impressum" element={<LegalPage type="impressum" />} />
      <Route path="/datenschutz" element={<LegalPage type="datenschutz" />} />
      <Route path="/app/*" element={<ProtectedAppRoute />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <SessionProvider>
        <AppRoutes />
      </SessionProvider>
    </BrowserRouter>
  );
}
