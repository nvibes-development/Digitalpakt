import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const steps = ['Schuldaten', 'Antragsberechtigung', 'Maßnahme', 'Förderbereich', 'Förderkriterien', 'Ergebnis'];

export function DashboardPage() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [starting, setStarting] = useState(false);
  async function start() {
    setStarting(true); setError('');
    try {
      const response = await fetch('/api/schools/current/checks', { method: 'POST', credentials: 'same-origin' });
      if (!response.ok) throw new Error('START_FAILED');
      navigate('/app/school');
    } catch { setError('Der Förderfähigkeitscheck konnte nicht gestartet werden. Bitte versuchen Sie es erneut.'); setStarting(false); }
  }
  return <section className="app-panel" aria-labelledby="dashboard-title"><p className="eyebrow">KLARFÖRDERN</p><h1 id="dashboard-title">Förderfähigkeitscheck</h1><p>Prüfen Sie strukturiert, welche Angaben für eine unverbindliche Ersteinschätzung erforderlich sind.</p><ol className="check-flow">{steps.map((step, index) => <li key={step}><span>{index + 1}</span>{step}</li>)}</ol><p className="disclaimer">Die Ergebnisse sind unverbindliche Ersteinschätzungen und keine Förderzusage oder rechtsverbindliche Entscheidung.</p><button className="primary-button" type="button" onClick={() => void start()} disabled={starting}>{starting ? 'Check wird gestartet …' : 'Förderfähigkeitscheck starten'}</button>{error && <p className="form-error" role="alert">{error}</p>}</section>;
}
