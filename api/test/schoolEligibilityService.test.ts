// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { evaluateSchoolEligibility, schoolEligibilityRuleVersion } from '../src/schoolEligibilityService.js';

const completePublicSchool = { federalState: 'SN', educationType: 'general', schoolType: 'Gymnasium', sponsorshipType: 'public', recognitionStatus: null } as const;

describe('school eligibility completeness service', () => {
  it('returns needs_information and names a missing required field', () => {
    const result = evaluateSchoolEligibility({ ...completePublicSchool, federalState: null }, new Date('2026-09-30T12:00:00.000Z'));
    expect(result).toMatchObject({ status: 'needs_information', missingFields: ['federalState'], ruleVersion: schoolEligibilityRuleVersion, evaluatedAt: '2026-09-30T12:00:00.000Z' });
  });

  it('keeps complete data at needs_information while specialist rules are pending', () => {
    const result = evaluateSchoolEligibility(completePublicSchool);
    expect(result.status).toBe('needs_information');
    expect(result.missingFields).toEqual([]);
    expect(result.reasons[0]).toContain('noch nicht hinterlegt');
  });

  it('requires recognition status only for private sponsorship', () => {
    expect(evaluateSchoolEligibility({ ...completePublicSchool, sponsorshipType: 'private', recognitionStatus: null }).missingFields).toContain('recognitionStatus');
    expect(evaluateSchoolEligibility(completePublicSchool).missingFields).not.toContain('recognitionStatus');
  });

  it('does not infer eligible or not_eligible for any supported completeness state', () => {
    for (const school of [completePublicSchool, { ...completePublicSchool, schoolType: null }, { ...completePublicSchool, sponsorshipType: 'private', recognitionStatus: 'state_recognized' }]) {
      expect(evaluateSchoolEligibility(school).status).toBe('needs_information');
    }
  });
});
