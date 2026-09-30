import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

type Eligibility = { status: 'needs_information' | 'eligible' | 'not_eligible'; reasons: string[]; missingFields: Field[]; evaluatedAt: string; ruleVersion: string };
type Field = 'federalState' | 'educationType' | 'schoolType' | 'sponsorshipType' | 'recognitionStatus';
type School = { id: string; name: string | null; location: string | null; federalState: string | null; educationType: string | null; schoolType: string | null; sponsorshipType: 'public' | 'private' | null; recognitionStatus: string | null; updatedAt: string };
type SchoolResponse = { school: School; eligibility: Eligibility };

const labels: Record<Field, string> = { federalState: 'Bundesland', educationType: 'Schulform', schoolType: 'Schulart', sponsorshipType: 'Trägerschaft', recognitionStatus: 'Anerkennungsstatus' };
const states = [['BW', 'Baden-Württemberg'], ['BY', 'Bayern'], ['BE', 'Berlin'], ['BB', 'Brandenburg'], ['HB', 'Bremen'], ['HH', 'Hamburg'], ['HE', 'Hessen'], ['MV', 'Mecklenburg-Vorpommern'], ['NI', 'Niedersachsen'], ['NW', 'Nordrhein-Westfalen'], ['RP', 'Rheinland-Pfalz'], ['SL', 'Saarland'], ['SN', 'Sachsen'], ['ST', 'Sachsen-Anhalt'], ['SH', 'Schleswig-Holstein'], ['TH', 'Thüringen']];

function Select({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) { return <select {...props}>{children}</select>; }

export function SchoolPage() {
  const [data, setData] = useState<SchoolResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const timer = useRef<number | undefined>(undefined);

  const load = async () => {
    const response = await fetch('/api/schools/current', { credentials: 'same-origin' });
    if (!response.ok) throw new Error('LOAD_FAILED');
    setData(await response.json());
  };
  useEffect(() => { void load().catch(() => setSaveState('error')).finally(() => setLoading(false)); }, []);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  function save(next: School) {
    window.clearTimeout(timer.current);
    setSaveState('saving');
    timer.current = window.setTimeout(async () => {
      try {
        const { id: _id, updatedAt: _updatedAt, ...payload } = next;
        const response = await fetch('/api/schools/current', { method: 'PATCH', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (!response.ok) throw new Error('SAVE_FAILED');
        setData(await response.json());
        setSaveState('saved');
      } catch { setSaveState('error'); }
    }, 500);
  }

  function change(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    if (!data) return;
    const { name, value } = event.currentTarget;
    const next = { ...data.school, [name]: value || null } as School;
    if (name === 'sponsorshipType' && value !== 'private') next.recognitionStatus = null;
    setData({ ...data, school: next });
    save(next);
  }

  if (loading) return <p className="app-loading">Schuldaten werden geladen …</p>;
  if (!data) return <section className="app-panel"><h1>Schuldaten</h1><p className="form-error" role="alert">Die Schuldaten konnten nicht geladen werden. Bitte laden Sie die Seite erneut.</p></section>;
  const { school, eligibility } = data;
  const complete = eligibility.missingFields.length === 0;
  return <section className="app-panel school-page" aria-labelledby="school-title">
    <p className="eyebrow">Förderfähigkeitscheck</p><h1 id="school-title">Schuldaten erfassen</h1>
    <p>Erfassen Sie die Angaben zu Ihrer Schule. Pflichtangaben sind mit <span aria-hidden="true">*</span><span className="sr-only">Pflichtangabe</span> gekennzeichnet.</p>
    <p className={`save-status ${saveState}`} role="status">{saveState === 'saving' ? 'Speichert …' : saveState === 'saved' ? 'Alle Änderungen gespeichert.' : saveState === 'error' ? 'Speichern nicht möglich. Bitte versuchen Sie es erneut.' : 'Änderungen werden automatisch gespeichert.'}</p>
    <form className="school-form" onSubmit={(event) => event.preventDefault()}>
      <label>Schulname<input name="name" value={school.name ?? ''} onChange={change} maxLength={200} autoComplete="organization" /></label>
      <label>Schulstandort<input name="location" value={school.location ?? ''} onChange={change} maxLength={200} autoComplete="address-level2" /></label>
      <label>Bundesland <strong aria-hidden="true">*</strong><Select name="federalState" value={school.federalState ?? ''} onChange={change} required><option value="">Bitte auswählen</option>{states.map(([value, text]) => <option key={value} value={value}>{text}</option>)}</Select></label>
      <fieldset><legend>Schulform <strong aria-hidden="true">*</strong></legend><label><input type="radio" name="educationType" value="general" checked={school.educationType === 'general'} onChange={change} required /> Allgemeinbildende Schule</label><label><input type="radio" name="educationType" value="vocational" checked={school.educationType === 'vocational'} onChange={change} /> Berufsbildende Schule</label></fieldset>
      <label>Schulart <strong aria-hidden="true">*</strong><input name="schoolType" value={school.schoolType ?? ''} onChange={change} required maxLength={200} placeholder="z. B. Gymnasium" /></label>
      <fieldset><legend>Trägerschaft <strong aria-hidden="true">*</strong></legend><label><input type="radio" name="sponsorshipType" value="public" checked={school.sponsorshipType === 'public'} onChange={change} required /> Öffentlich</label><label><input type="radio" name="sponsorshipType" value="private" checked={school.sponsorshipType === 'private'} onChange={change} /> Frei / privat</label></fieldset>
      {school.sponsorshipType === 'private' && <label>Anerkennungsstatus <strong aria-hidden="true">*</strong><Select name="recognitionStatus" value={school.recognitionStatus ?? ''} onChange={change} required><option value="">Bitte auswählen</option><option value="state_recognized">Staatlich anerkannt</option><option value="state_approved">Staatlich genehmigt</option><option value="not_specified">Nicht bekannt</option></Select></label>}
    </form>
    <button className="secondary-button eligibility-check-button" type="button" disabled={!complete} aria-describedby={!complete ? 'eligibility-completeness-hint' : undefined} onClick={() => void load().catch(() => setSaveState('error'))}>Antragsberechtigung prüfen</button>
    {!complete && <p id="eligibility-completeness-hint" className="save-status">Die Prüfung kann gestartet werden, sobald alle entscheidungsrelevanten Pflichtangaben vollständig sind.</p>}
    <EligibilityPanel eligibility={eligibility} />
    {complete && <p className="school-next"><strong>Schuldaten vollständig</strong><Link className="primary-button" to="/app/measures/new">Maßnahme anlegen</Link><span>Die Maßnahmenerfassung ist der nächste Arbeitsschritt und keine Aussage zur Antragsberechtigung.</span></p>}
  </section>;
}

function EligibilityPanel({ eligibility }: { eligibility: Eligibility }) {
  return <section className="eligibility-panel" aria-labelledby="eligibility-title"><h2 id="eligibility-title">Antragsberechtigung</h2><p className="eligibility-status">Nicht abschließend prüfbar</p>{eligibility.missingFields.length > 0 ? <><p>Für die Prüfung fehlen noch folgende Angaben:</p><ul>{eligibility.missingFields.map((field) => <li key={field}>{labels[field]}</li>)}</ul></> : <p>Die Schuldaten sind vollständig. Die fachlichen Regeln zur abschließenden Bewertung der Antragsberechtigung sind derzeit noch nicht hinterlegt.</p>}<p className="eligibility-note">Unverbindliche Ersteinschätzung · Technischer Regelstand: {eligibility.ruleVersion}</p></section>;
}
