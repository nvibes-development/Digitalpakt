export const schoolEligibilityRuleVersion = 'school-eligibility-pending' as const;

export type SchoolEligibilityStatus = 'needs_information' | 'eligible' | 'not_eligible';
export type SchoolEligibilityField = 'federalState' | 'educationType' | 'schoolType' | 'sponsorshipType' | 'recognitionStatus';

export type SchoolEligibilityInput = {
  federalState: string | null;
  educationType: string | null;
  schoolType: string | null;
  sponsorshipType: string | null;
  recognitionStatus: string | null;
};

export type SchoolEligibilityResult = {
  status: SchoolEligibilityStatus;
  reasons: string[];
  missingFields: SchoolEligibilityField[];
  evaluatedAt: string;
  ruleVersion: typeof schoolEligibilityRuleVersion;
};

export function evaluateSchoolEligibility(school: SchoolEligibilityInput, evaluatedAt = new Date()): SchoolEligibilityResult {
  const missingFields: SchoolEligibilityField[] = [];
  if (!school.federalState) missingFields.push('federalState');
  if (!school.educationType) missingFields.push('educationType');
  if (!school.schoolType) missingFields.push('schoolType');
  if (!school.sponsorshipType) missingFields.push('sponsorshipType');
  if (school.sponsorshipType === 'private' && !school.recognitionStatus) missingFields.push('recognitionStatus');

  return {
    // No approved specialist rules exist. This service must therefore never infer
    // eligible or not_eligible from school data alone.
    status: 'needs_information',
    reasons: missingFields.length > 0
      ? ['Entscheidungsrelevante Schuldaten sind noch unvollständig.']
      : ['Die Schuldaten sind vollständig. Verbindliche fachliche Prüfkriterien zur Antragsberechtigung sind noch nicht hinterlegt.'],
    missingFields,
    evaluatedAt: evaluatedAt.toISOString(),
    ruleVersion: schoolEligibilityRuleVersion,
  };
}
