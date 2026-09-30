import { Link } from 'react-router-dom';

type AuthPageProps = {
  mode: 'login' | 'register';
};

export function AuthPage({ mode }: AuthPageProps) {
  const isLogin = mode === 'login';

  return (
    <main className="route-card page-shell">
      <section className="route-panel" aria-labelledby="auth-title">
        <Link className="back-link" to="/">
          ← Zur Startseite
        </Link>
        <img className="route-logo" src="/digitalpakt-check-icon.svg" alt="" />
        <h1 id="auth-title">{isLogin ? 'Anmelden' : 'Registrieren'}</h1>
        <p>
          {isLogin
            ? 'Die Anmeldung wird im nächsten Umsetzungsschritt freigeschaltet.'
            : 'Die Registrierung wird im nächsten Umsetzungsschritt freigeschaltet.'}
        </p>
        <p className="disclaimer">
          KLARFÖRDERN verarbeitet noch keine Kontodaten. Es werden in diesem
          Zwischenschritt keine Eingaben abgefragt oder gespeichert.
        </p>
        <Link className="secondary-button" to={isLogin ? '/register' : '/login'}>
          {isLogin ? 'Zur Registrierung' : 'Zur Anmeldung'}
        </Link>
      </section>
    </main>
  );
}
