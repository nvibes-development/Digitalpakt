import { randomUUID } from 'node:crypto';
import { Pool } from 'pg';
import { z } from 'zod';
import { SafeUser } from './auth.js';
import { createSubmissionForMeasure } from './review.js';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const optionalText = z.string().trim().min(1).max(4_000).nullable().optional();
const optionalNonNegative = z.number().finite().min(0).nullable().optional();

export const measureUpdateSchema = z.object({
  name: z.string().trim().min(1).max(200).nullable().optional(),
  description: optionalText,
  affectedAreaSqm: optionalNonNegative,
  studentCount: z.number().int().min(0).nullable().optional(),
  teacherCount: z.number().int().min(0).nullable().optional(),
  existingEquipment: optionalText,
  previousDigitalisationMeasures: optionalText,
  receivedFunding: optionalText,
  implementationStartDate: z.iso.date().nullable().optional(),
  implementationEndDate: z.iso.date().nullable().optional(),
  estimatedCostEur: optionalNonNegative,
  implementationStatus: z.enum(['planned', 'started', 'completed']).nullable().optional(),
  fundingArea: z.enum(['infrastructure_network_wlan', 'digital_devices', 'educational_software_platforms']).nullable().optional(),
}).strict().superRefine((value, context) => {
  if (value.implementationStartDate && value.implementationEndDate && value.implementationEndDate < value.implementationStartDate) {
    context.addIssue({ code: 'custom', path: ['implementationEndDate'], message: 'Das Ende der Umsetzung darf nicht vor dem Beginn liegen.' });
  }
});

export type Measure = { id: string; schoolId: string; name: string | null; description: string | null; affectedAreaSqm: number | null; studentCount: number | null; teacherCount: number | null; existingEquipment: string | null; previousDigitalisationMeasures: string | null; receivedFunding: string | null; implementationStartDate: string | null; implementationEndDate: string | null; estimatedCostEur: number | null; implementationStatus: 'planned' | 'started' | 'completed' | null; fundingArea: 'infrastructure_network_wlan' | 'digital_devices' | 'educational_software_platforms' | null; submittedAt: string | null; reviewReference: string | null; reviewStatus: string; publicMessage: string | null; updatedAt: string };

type MeasureRow = Measure;
const columns = `m.id, m.school_id AS "schoolId", m.name, m.description, m.affected_area_sqm::float8 AS "affectedAreaSqm", m.student_count AS "studentCount", m.teacher_count AS "teacherCount", m.existing_equipment AS "existingEquipment", m.previous_digitalisation_measures AS "previousDigitalisationMeasures", m.received_funding AS "receivedFunding", m.implementation_start_date::text AS "implementationStartDate", m.implementation_end_date::text AS "implementationEndDate", m.estimated_cost_eur::float8 AS "estimatedCostEur", m.implementation_status AS "implementationStatus", m.funding_area AS "fundingArea", m.submitted_at::text AS "submittedAt", m.review_reference AS "reviewReference", m.review_status AS "reviewStatus", m.updated_at::text AS "updatedAt"`;

async function currentSchoolId(user: SafeUser) {
  const result = await pool.query<{ schoolId: string }>('SELECT school_id AS "schoolId" FROM school_memberships WHERE user_id = $1 ORDER BY created_at ASC LIMIT 1', [user.id]);
  return result.rows[0]?.schoolId ?? null;
}

export async function getLatestMeasure(user: SafeUser) {
  const schoolId = await currentSchoolId(user);
  if (!schoolId) return null;
  const result = await pool.query<MeasureRow>(`SELECT ${columns} FROM measures m WHERE m.school_id = $1 ORDER BY m.created_at DESC LIMIT 1`, [schoolId]);
  return result.rows[0] ?? null;
}

export async function listMeasures(user: SafeUser) {
  const schoolId = await currentSchoolId(user);
  if (!schoolId) return null;
  const result = await pool.query<MeasureRow>(`SELECT ${columns} FROM measures m WHERE m.school_id = $1 ORDER BY m.updated_at DESC`, [schoolId]);
  return result.rows;
}

export async function createMeasure(user: SafeUser, input: z.infer<typeof measureUpdateSchema>) {
  const schoolId = await currentSchoolId(user);
  if (!schoolId) return null;
  const result = await pool.query<MeasureRow>(`INSERT INTO measures (id, school_id, created_by) VALUES ($1, $2, $3) RETURNING ${columns.replaceAll('m.', '')}`,[randomUUID(), schoolId, user.id]);
  return updateMeasure(user, result.rows[0].id, input);
}

export async function getMeasure(user: SafeUser, measureId: string) {
  const result = await pool.query<MeasureRow>(`SELECT ${columns} FROM measures m JOIN school_memberships sm ON sm.school_id = m.school_id WHERE m.id = $1 AND sm.user_id = $2`, [measureId, user.id]);
  return result.rows[0] ?? null;
}

export async function updateMeasure(user: SafeUser, measureId: string, update: z.infer<typeof measureUpdateSchema>) {
  const current = await getMeasure(user, measureId);
  if (!current) return null;
  if (current.submittedAt && current.reviewStatus !== 'NEEDS_CHANGES') throw new Error('MEASURE_SUBMITTED');
  const next = Object.fromEntries(Object.entries(update).filter(([, value]) => value !== undefined));
  if (!Object.keys(next).length) return current;
  const map: Record<string, string> = { name: 'name', description: 'description', affectedAreaSqm: 'affected_area_sqm', studentCount: 'student_count', teacherCount: 'teacher_count', existingEquipment: 'existing_equipment', previousDigitalisationMeasures: 'previous_digitalisation_measures', receivedFunding: 'received_funding', implementationStartDate: 'implementation_start_date', implementationEndDate: 'implementation_end_date', estimatedCostEur: 'estimated_cost_eur', implementationStatus: 'implementation_status', fundingArea: 'funding_area' };
  const fields = Object.keys(next);
  const assignments = fields.map((field, index) => `${map[field]} = $${index + 2}`).join(', ');
  const result = await pool.query<MeasureRow>(`UPDATE measures m SET ${assignments}, updated_at = now() WHERE m.id = $1 AND EXISTS (SELECT 1 FROM school_memberships sm WHERE sm.school_id = m.school_id AND sm.user_id = $${fields.length + 2}) RETURNING ${columns.replaceAll('m.', '')}`,
    [measureId, ...fields.map((field) => next[field]), user.id]);
  return result.rows[0] ?? null;
}

export async function submitMeasure(user: SafeUser, measureId: string) {
  const measure = await getMeasure(user, measureId);
  if (!measure) return null;
  if (measure.submittedAt && measure.reviewStatus !== 'NEEDS_CHANGES') return measure;
  const readiness = await pool.query<{ ready: boolean }>('SELECT (SELECT count(*) FROM measure_question_answers WHERE measure_id=$1)=9 AND EXISTS(SELECT 1 FROM measure_documents WHERE measure_id=$1) AS ready', [measureId]);
  if (!readiness.rows[0].ready) throw new Error('MEASURE_NOT_READY');
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const submission = await createSubmissionForMeasure(client, measureId, user, measure.reviewStatus === 'NEEDS_CHANGES' ? 'RESUBMITTED' : 'SUBMITTED');
    if (!submission) { await client.query('ROLLBACK'); return null; }
    await client.query('COMMIT');
  } catch (error) { await client.query('ROLLBACK'); throw error; } finally { client.release(); }
  return getMeasure(user, measureId);
}
