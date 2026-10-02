// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { createReportPdf, reportFilename } from '../src/report.js';

describe('review report PDF', () => {
  it('contains public report data but never receives an internal note', async () => {
    const pdf=await createReportPdf({caseNumber:'ABCD1234_02102026',submissionNumber:2,submittedAt:'2026-10-02T09:00:00.000Z',status:'NOT_ELIGIBLE',decision:'NOT_ELIGIBLE',decisionAt:'2026-10-02T09:27:00.000Z',publicReason:'Öffentliche Begründung für die Schule',caseWorker:{firstName:'Erika',lastName:'Muster',role:'case_worker'},applicant:{firstName:'Max',lastName:'Mustermann',email:'max@example.test'},school:{name:'Beispielschule',location:'Hamburg'},measure:{name:'WLAN-Ausbau',fundingArea:'infrastructure_network_wlan',description:'Lange Beschreibung'},answers:[{questionNumber:1,answer:'yes'}],documents:[{filename:'Netzwerkkonzept.pdf',uploadedAt:'2026-10-01T09:00:00.000Z',mimeType:'application/pdf'}],internalNote:'interne-notiz-darf-nicht-erscheinen'} as any);
    const text=pdf.toString('latin1'); const decoded=[...text.matchAll(/<([0-9a-f]+)>/gi)].map(match=>Buffer.from(match[1],'hex').toString('latin1')).join('');
    expect(pdf.subarray(0,4).toString()).toBe('%PDF');
    expect(decoded).toContain('ABCD1234_02102026');
    expect(decoded).toContain('Beispielschule');
    expect(decoded).toContain('Netzwerkkonzept.pdf');
    expect(decoded).toContain('Keine automatische Förderentscheidung');
    expect(decoded).not.toContain('interne-notiz-darf-nicht-erscheinen');
  });
  it('creates a safe ASCII filename', () => expect(reportFilename('AB/CD 1','WLAN-Ausbau: Schule Ü').includes('/')).toBe(false));
});
