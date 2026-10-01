import { ChangeEvent, useEffect, useRef, useState } from 'react';

type Measure = { id:string; schoolId:string; updatedAt:string; name:string|null; description:string|null; affectedAreaSqm:number|null; studentCount:number|null; teacherCount:number|null; existingEquipment:string|null; previousDigitalisationMeasures:string|null; receivedFunding:string|null; implementationPeriod:string|null; estimatedCostEur:number|null; implementationStatus:'planned'|'started'|'completed'|null; fundingArea:'infrastructure_network_wlan'|'digital_devices'|'educational_software_platforms'|null };
const areas = [
  ['infrastructure_network_wlan', 'IT-Infrastruktur, Netzwerk und WLAN'],
  ['digital_devices', 'Digitale Endgeräte'],
  ['educational_software_platforms', 'Bildungssoftware und digitale Lernplattformen'],
] as const;

export function MeasurePage() {
  const [measure, setMeasure] = useState<Measure|null>(null);
  const [state, setState] = useState<'loading'|'saving'|'saved'|'error'>('loading');
  const timer = useRef<number|undefined>(undefined);
  useEffect(() => { void (async () => { try { let response = await fetch('/api/measures/current', { credentials:'same-origin' }); if (response.status === 404) response = await fetch('/api/measures', { method:'POST', credentials:'same-origin' }); if (!response.ok) throw new Error(); setMeasure((await response.json()).measure); setState('saved'); } catch { setState('error'); } })(); return () => window.clearTimeout(timer.current); }, []);
  function save(next: Measure) { window.clearTimeout(timer.current); setState('saving'); timer.current = window.setTimeout(async () => { try { const { id, schoolId: _schoolId, updatedAt: _updatedAt, ...payload } = next; const response = await fetch(`/api/measures/${id}`, { method:'PATCH', credentials:'same-origin', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload) }); if (!response.ok) throw new Error(); setMeasure((await response.json()).measure); setState('saved'); } catch { setState('error'); } }, 500); }
  function change(event: ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) { if (!measure) return; const { name, value, type } = event.currentTarget; if (type === 'number' && value !== '') { const numericValue = Number(value.replace(',', '.')); if (!Number.isFinite(numericValue)) { setState('error'); return; } const next = { ...measure, [name]: numericValue } as Measure; setMeasure(next); save(next); return; } const next = { ...measure, [name]: type === 'number' ? null : (value || null) } as Measure; setMeasure(next); save(next); }
  if (state === 'loading') return <p className="app-loading">Maßnahme wird angelegt …</p>;
  if (!measure) return <section className="app-panel"><h1>Maßnahme anlegen</h1><p className="form-error" role="alert">Die Maßnahme konnte nicht angelegt werden. Erfassen Sie zuerst Ihre Schuldaten.</p></section>;
  return <section className="app-panel school-page" aria-labelledby="measure-title"><p className="eyebrow">Nächster Arbeitsschritt</p><h1 id="measure-title">Digitalisierungsmaßnahme erfassen</h1><p>Die Erfassung einer Maßnahme ist keine Aussage zur Antragsberechtigung Ihrer Schule.</p><p className={`save-status ${state}`} role="status">{state === 'saving' ? 'Speichert …' : state === 'saved' ? 'Alle Änderungen gespeichert.' : 'Speichern nicht möglich. Bitte versuchen Sie es erneut.'}</p>
    <form className="school-form" onSubmit={(event) => event.preventDefault()}>
      <label>Bezeichnung der Maßnahme <strong aria-hidden="true">*</strong><input name="name" value={measure.name ?? ''} onChange={change} required maxLength={200} placeholder="z. B. WLAN-Ausbau" /></label>
      <label>Kurzbeschreibung <textarea name="description" value={measure.description ?? ''} onChange={change} maxLength={4000} /></label>
      <label>Schulfläche / betroffene Fläche in m²<input name="affectedAreaSqm" type="number" min="0" step="0.01" value={measure.affectedAreaSqm ?? ''} onChange={change} /></label>
      <label>Anzahl der Schülerinnen und Schüler<input name="studentCount" type="number" min="0" step="1" value={measure.studentCount ?? ''} onChange={change} /></label>
      <label>Anzahl der Lehrkräfte<input name="teacherCount" type="number" min="0" step="1" value={measure.teacherCount ?? ''} onChange={change} /></label>
      <label>Vorhandene technische Ausstattung<textarea name="existingEquipment" value={measure.existingEquipment ?? ''} onChange={change} maxLength={4000} /></label>
      <label>Frühere Digitalisierungsmaßnahmen<textarea name="previousDigitalisationMeasures" value={measure.previousDigitalisationMeasures ?? ''} onChange={change} maxLength={4000} /></label>
      <label>Bereits erhaltene Fördermittel<textarea name="receivedFunding" value={measure.receivedFunding ?? ''} onChange={change} maxLength={4000} /></label>
      <label>Umsetzungszeitraum<input name="implementationPeriod" value={measure.implementationPeriod ?? ''} onChange={change} maxLength={200} placeholder="z. B. 09/2026–06/2027" /></label>
      <label>Voraussichtliche Kosten in EUR<input name="estimatedCostEur" type="number" min="0" step="0.01" value={measure.estimatedCostEur ?? ''} onChange={change} /></label>
      <label>Umsetzungsstatus<select name="implementationStatus" value={measure.implementationStatus ?? ''} onChange={change}><option value="">Bitte auswählen</option><option value="planned">Geplant</option><option value="started">Begonnen</option><option value="completed">Abgeschlossen</option></select></label>
      <fieldset><legend>Förderbereich <strong aria-hidden="true">*</strong></legend>{areas.map(([value,label]) => <label key={value}><input type="radio" name="fundingArea" value={value} checked={measure.fundingArea === value} onChange={change} /> {label}</label>)}</fieldset>
    </form>
    <section className="eligibility-panel"><h2>Förderbereich im MVP</h2><p>Pro Maßnahme kann genau ein Förderbereich ausgewählt werden. Andere Förderbereiche liegen außerhalb des MVP und werden nicht bewertet.</p></section>
  </section>;
}
