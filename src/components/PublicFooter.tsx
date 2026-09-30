import { Link } from 'react-router-dom';

export function PublicFooter() {
  return (
    <footer className="public-footer">
      <p>© 2026 KLARFÖRDERN</p>
      <nav aria-label="Rechtliche Hinweise">
        <Link to="/impressum">Impressum</Link>
        <Link to="/datenschutz">Datenschutz</Link>
      </nav>
    </footer>
  );
}
