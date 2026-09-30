import { randomUUID } from 'node:crypto';
import { Pool } from 'pg';
import { z } from 'zod';
import { SafeUser } from './auth.js';
import { evaluateSchoolEligibility, SchoolEligibilityInput } from './schoolEligibilityService.js';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const federalStates = ['BW', 'BY', 'BE', 'BB', 'HB', 'HH', 'HE', 'MV', 'NI', 'NW', 'RP', 'SL', 'SN', 'ST', 'SH', 'TH'] as const;
const educationTypes = ['general', 'vocational'] as const;
const sponsorshipTypes = ['public', 'private'] as const;
const recognitionStatuses = ['state_recognized', 'state_approved', 'not_specified'] as const;

const optionalText = z.string().trim().min(1).max(200).nullable().optional();
export const schoolUpdateSchema = z.object({
  name: optionalText,
  federalState: z.enum(federalStates).nullable().optional(),
  educationType: z.enum(educationTypes).nullable().optional(),
  schoolType: optionalText,
  sponsorshipType: z.enum(sponsorshipTypes).nullable().optional(),
  recognitionStatus: z.enum(recognitionStatuses).nullable().optional(),
}).strict().superRefine((value, context) => {
  if (value.sponsorshipType !== 'private' && value.recognitionStatus !== undefined && value.recognitionStatus !== null) {
    context.addIssue({ code: 'custom', path: ['recognitionStatus'], message: 'Der Anerkennungsstatus ist nur bei freier oder privater Trägerschaft relevant.' });
  }
});

export type School = SchoolEligibilityInput & { id: string; name: string | null; updatedAt: string };

type SchoolRow = {
  id: string; name: string | null; federalState: string | null; educationType: string | null; schoolType: string | null;
  sponsorshipType: string | null; recognitionStatus: string | null; updatedAt: string;
};

const schoolColumns = `s.id, s.name, s.federal_state AS "federalState", s.education_type AS "educationType", s.school_type AS "schoolType", s.sponsorship_type AS "sponsorshipType", s.recognition_status AS "recognitionStatus", s.updated_at::text AS "updatedAt"`;

async function currentSchool(user: SafeUser): Promise<SchoolRow | null> {
  const result = await pool.query<SchoolRow>(`SELECT ${schoolColumns} FROM school_memberships sm JOIN schools s ON s.id = sm.school_id WHERE sm.user_id = $1 ORDER BY sm.created_at ASC LIMIT 1`, [user.id]);
  return result.rows[0] ?? null;
}

export async function getCurrentSchool(user: SafeUser) {
  const school = await currentSchool(user);
  return school ? { school, eligibility: evaluateSchoolEligibility(school) } : null;
}

export async function startSchoolCheck(user: SafeUser) {
  let school = await currentSchool(user);
  if (!school) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const schoolId = randomUUID();
      await client.query('INSERT INTO schools (id) VALUES ($1)', [schoolId]);
      await client.query(`INSERT INTO school_memberships (school_id, user_id, role) VALUES ($1, $2, 'school_admin')`, [schoolId, user.id]);
      const result = await client.query<SchoolRow>(`SELECT ${schoolColumns} FROM schools s WHERE s.id = $1`, [schoolId]);
      school = result.rows[0];
      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
  await pool.query(`INSERT INTO school_eligibility_checks (id, school_id, created_by, status, rule_version) VALUES ($1, $2, $3, 'needs_information', $4)`, [randomUUID(), school.id, user.id, 'school-eligibility-pending']);
  return { school, eligibility: evaluateSchoolEligibility(school) };
}

export async function updateCurrentSchool(user: SafeUser, update: z.infer<typeof schoolUpdateSchema>) {
  const school = await currentSchool(user);
  if (!school) return null;
  const next = {
    name: update.name === undefined ? school.name : update.name,
    federalState: update.federalState === undefined ? school.federalState : update.federalState,
    educationType: update.educationType === undefined ? school.educationType : update.educationType,
    schoolType: update.schoolType === undefined ? school.schoolType : update.schoolType,
    sponsorshipType: update.sponsorshipType === undefined ? school.sponsorshipType : update.sponsorshipType,
    recognitionStatus: update.sponsorshipType && update.sponsorshipType !== 'private' ? null : (update.recognitionStatus === undefined ? school.recognitionStatus : update.recognitionStatus),
  };
  const result = await pool.query<SchoolRow>(`UPDATE schools SET name = $2, federal_state = $3, education_type = $4, school_type = $5, sponsorship_type = $6, recognition_status = $7, updated_at = now() WHERE id = $1 RETURNING ${schoolColumns.replaceAll('s.', '')}`,
    [school.id, next.name, next.federalState, next.educationType, next.schoolType, next.sponsorshipType, next.recognitionStatus]);
  const updated = result.rows[0];
  return { school: updated, eligibility: evaluateSchoolEligibility(updated) };
}
