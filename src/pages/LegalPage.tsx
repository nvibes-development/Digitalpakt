import { Link } from 'react-router-dom';
import { PublicFooter } from '../components/PublicFooter';

type LegalPageProps = {
  type: 'impressum' | 'datenschutz';
};

export function LegalPage({ type }: LegalPageProps) {
  const title = type === 'impressum' ? 'Impressum' : 'Datenschutz';

  return (
    <>
      <main className="route-card page-shell">
        <section className="route-panel" aria-labelledby="legal-title">
          <Link className="back-link" to="/">
            ← Zur Startseite
          </Link>
          <h1 id="legal-title">{title}</h1>
          <p>
            Die rechtlichen Inhalte werden durch die verantwortliche Redaktion
            bereitgestellt. Bis dahin enthält diese technische Seite bewusst
            keine erfundenen Betreiber- oder Datenschutzangaben.
          </p>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}
