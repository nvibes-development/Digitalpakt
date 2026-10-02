import { randomUUID } from 'node:crypto';
import { Pool, PoolClient } from 'pg';
import { z } from 'zod';
import { SafeUser } from './auth.js';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
type ReviewStatus = 'DRAFT' | 'SUBMITTED' | 'UNDER_REVIEW' | 'NEEDS_CHANGES' | 'IN_REVISION' | 'RESUBMITTED' | 'ELIGIBLE' | 'NOT_ELIGIBLE';
const worker = (user: SafeUser) => user.role === 'case_worker' || user.role === 'case_worker_admin';
const text = z.string().trim().min(1).max(4000);
export const requestChangesSchema = z.object({ message: text, areas: z.object({ school: z.boolean().optional(), measure: z.boolean().optional(), answers: z.boolean().optional(), documents: z.boolean().optional() }).optional(), internalNote: z.string().trim().max(4000).optional() }).strict();
export const approveSchema = z.object({ publicMessage: z.string().trim().max(4000).optional(), internalNote: z.string().trim().max(4000).optional() }).strict();
export const rejectSchema = z.object({ reason: text, internalNote: z.string().trim().max(4000).optional() }).strict();

export function isCaseWorker(user: SafeUser) { return worker(user); }
async function event(client: PoolClient, caseId: string, submissionId: string | null, user: SafeUser | null, type: string, data: object = {}) {
  await client.query('INSERT INTO audit_events(id,case_id,submission_id,actor_user_id,actor_role,event_type,event_data) VALUES($1,$2,$3,$4,$5,$6,$7)', [randomUUID(), caseId, submissionId, user?.id ?? null, user?.role ?? null, type, JSON.stringify(data)]);
}
async function currentSubmission(client: PoolClient, caseId: string) {
  const result = await client.query<{ id: string; status: ReviewStatus; submissionNumber: number }>('SELECT id,status,submission_number AS "submissionNumber" FROM measure_submissions WHERE measure_id=$1 ORDER BY submission_number DESC LIMIT 1 FOR UPDATE', [caseId]);
  return result.rows[0] ?? null;
}

export async function createSubmissionForMeasure(client: PoolClient, measureId: string, user: SafeUser, status: 'SUBMITTED' | 'RESUBMITTED') {
  const measure = await client.query<{ id:string; reviewReference:string|null; count:number }>('SELECT m.id,m.review_reference AS "reviewReference",(SELECT count(*)::int FROM measure_submissions WHERE measure_id=m.id) AS count FROM measures m JOIN school_memberships sm ON sm.school_id=m.school_id WHERE m.id=$1 AND sm.user_id=$2 FOR UPDATE', [measureId, user.id]);
  if (!measure.rows[0]) return null;
  const row = measure.rows[0];
  const caseNumber = row.reviewReference ?? `${randomUUID().replaceAll('-', '').slice(0, 12).toUpperCase()}_${new Date().toLocaleDateString('de-DE').replaceAll('.', '')}`;
  const snapshot = await client.query<{ school:object; applicant:object; measure:object; answers:object[]; documents:object[] }>(`
    SELECT jsonb_build_object('id',s.id,'name',s.name,'location',s.location,'federalState',s.federal_state,'educationType',s.education_type,'schoolType',s.school_type,'sponsorshipType',s.sponsorship_type,'recognitionStatus',s.recognition_status) AS school,
      jsonb_build_object('id',u.id,'firstName',u.first_name,'lastName',u.last_name,'email',u.email,'role',u.role,'phoneNumber',p.phone_number,'mobileNumber',p.mobile_number) AS applicant,
      jsonb_build_object('id',m.id,'name',m.name,'description',m.description,'affectedAreaSqm',m.affected_area_sqm,'studentCount',m.student_count,'teacherCount',m.teacher_count,'existingEquipment',m.existing_equipment,'previousDigitalisationMeasures',m.previous_digitalisation_measures,'receivedFunding',m.received_funding,'implementationStartDate',m.implementation_start_date,'implementationEndDate',m.implementation_end_date,'estimatedCostEur',m.estimated_cost_eur,'implementationStatus',m.implementation_status,'fundingArea',m.funding_area) AS measure,
      COALESCE((SELECT jsonb_agg(jsonb_build_object('questionNumber',a.question_number,'answer',a.answer) ORDER BY a.question_number) FROM measure_question_answers a WHERE a.measure_id=m.id),'[]'::jsonb) AS answers,
      COALESCE((SELECT jsonb_agg(jsonb_build_object('documentId',d.id,'filename',d.original_name,'blobPath',d.blob_name,'uploadedAt',d.uploaded_at,'fileSize',d.size_bytes,'mimeType',d.mime_type) ORDER BY d.uploaded_at) FROM measure_documents d WHERE d.measure_id=m.id),'[]'::jsonb) AS documents
    FROM measures m JOIN schools s ON s.id=m.school_id JOIN users u ON u.id=$2 LEFT JOIN user_profiles p ON p.user_id=u.id WHERE m.id=$1`, [measureId, user.id]);
  const id = randomUUID(); const data = snapshot.rows[0];
  await client.query('INSERT INTO measure_submissions(id,measure_id,submission_number,submitted_by_user_id,submitted_at,status,case_number,school_snapshot,applicant_snapshot,measure_snapshot,answers_snapshot,documents_snapshot) VALUES($1,$2,$3,$4,now(),$5,$6,$7,$8,$9,$10,$11)', [id, measureId, row.count + 1, user.id, status, caseNumber, JSON.stringify(data.school), JSON.stringify(data.applicant), JSON.stringify(data.measure), JSON.stringify(data.answers), JSON.stringify(data.documents)]);
  await client.query('UPDATE measures SET submitted_at=now(),review_reference=$1,review_status=$2,assigned_case_worker_id=NULL,assigned_at=NULL,updated_at=now() WHERE id=$3', [caseNumber, status, measureId]);
  await event(client, measureId, id, user, status === 'SUBMITTED' ? 'CASE_SUBMITTED' : 'CASE_RESUBMITTED', { submissionNumber: row.count + 1 });
  return { id, caseNumber, submissionNumber: row.count + 1 };
}

export async function listInbox(user: SafeUser, query: { status?: string; sort?: string; q?: string; page?: string; pageSize?: string }) {
  const page = Math.max(1, Number(query.page) || 1); const pageSize = Math.min(100, Math.max(1, Number(query.pageSize) || 25));
  const statuses = query.status === 'new' ? ['SUBMITTED'] : query.status === 'resubmitted' ? ['RESUBMITTED'] : ['SUBMITTED', 'RESUBMITTED'];
  const q = query.q?.trim() ? `%${query.q.trim()}%` : null;
  const order = query.sort === 'submitted_desc' ? 'ms.submitted_at DESC' : query.sort === 'school' ? "ms.school_snapshot->>'name' ASC, ms.submitted_at ASC" : query.sort === 'status' ? 'ms.status ASC, ms.submitted_at ASC' : 'ms.submitted_at ASC';
  const params = [statuses, q, pageSize, (page - 1) * pageSize];
  const where = "ms.status = ANY($1::text[]) AND ($2::text IS NULL OR ms.case_number ILIKE $2 OR ms.school_snapshot->>'name' ILIKE $2 OR ms.measure_snapshot->>'name' ILIKE $2)";
  const [items, count] = await Promise.all([pool.query(`SELECT m.id AS "caseId",ms.case_number AS "caseNumber",ms.school_snapshot->>'name' AS "schoolName",ms.measure_snapshot->>'name' AS "measureTitle",ms.measure_snapshot->>'fundingArea' AS "fundingArea",ms.submitted_at AS "submittedAt",ms.status,ms.submission_number AS "submissionNumber" FROM measure_submissions ms JOIN measures m ON m.id=ms.measure_id WHERE ${where} ORDER BY ${order} LIMIT $3 OFFSET $4`, params), pool.query<{total:number}>(`SELECT count(*)::int AS total FROM measure_submissions ms WHERE ${where}`, [statuses, q])]);
  return { items: items.rows, total: count.rows[0].total, page, pageSize };
}

export async function listCases(user: SafeUser, status: ReviewStatus[]) {
  const result = await pool.query(`SELECT m.id AS "caseId",ms.case_number AS "caseNumber",ms.school_snapshot->>'name' AS "schoolName",ms.measure_snapshot->>'name' AS "measureTitle",ms.status,ms.submitted_at AS "submittedAt" FROM measures m JOIN LATERAL (SELECT * FROM measure_submissions WHERE measure_id=m.id ORDER BY submission_number DESC LIMIT 1) ms ON true WHERE m.review_status=ANY($1::text[]) ${status.includes('UNDER_REVIEW') ? 'AND m.assigned_case_worker_id=$2' : ''} ORDER BY ms.submitted_at ASC`, status.includes('UNDER_REVIEW') ? [status, user.id] : [status]);
  return result.rows;
}

export async function getCase(user: SafeUser, caseId: string) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const claimed = await client.query<{ submissionId: string }>(`UPDATE measures m SET assigned_case_worker_id=$1,assigned_at=now(),review_status='UNDER_REVIEW',updated_at=now() WHERE m.id=$2 AND m.assigned_case_worker_id IS NULL AND m.review_status IN ('SUBMITTED','RESUBMITTED') RETURNING (SELECT id FROM measure_submissions WHERE measure_id=m.id ORDER BY submission_number DESC LIMIT 1) AS "submissionId"`, [user.id, caseId]);
    if (claimed.rows[0]) {
      await client.query("UPDATE measure_submissions SET status='UNDER_REVIEW' WHERE id=$1", [claimed.rows[0].submissionId]);
      await event(client, caseId, claimed.rows[0].submissionId, user, 'CASE_ASSIGNED', { source: 'case_opened' });
    }
    const result = await client.query(`SELECT m.id AS "caseId",m.review_status AS status,m.assigned_at AS "assignedAt",ms.id AS "submissionId",ms.case_number AS "caseNumber",ms.submission_number AS "submissionNumber",ms.submitted_at AS "submittedAt",ms.school_snapshot AS school,ms.applicant_snapshot AS applicant,ms.measure_snapshot AS measure,ms.answers_snapshot AS answers,ms.documents_snapshot AS documents,jsonb_build_object('id',w.id,'firstName',w.first_name,'lastName',w.last_name,'email',w.email) AS assignment FROM measures m JOIN LATERAL (SELECT * FROM measure_submissions WHERE measure_id=m.id ORDER BY submission_number DESC LIMIT 1) ms ON true LEFT JOIN users w ON w.id=m.assigned_case_worker_id WHERE m.id=$1`, [caseId]);
    if (!result.rows[0]) { await client.query('ROLLBACK'); return null; }
    const item = result.rows[0];
    await event(client, caseId, item.submissionId, user, 'CASE_OPENED');
    const history = await client.query('SELECT event_type AS "eventType",event_data AS "eventData",created_at AS "createdAt",actor_role AS "actorRole" FROM audit_events WHERE case_id=$1 ORDER BY created_at ASC', [caseId]);
    const decision = await client.query('SELECT decision,public_reason AS "publicReason",internal_note AS "internalNote",created_at AS "createdAt" FROM case_decisions WHERE submission_id=$1 ORDER BY created_at DESC LIMIT 1', [item.submissionId]);
    await client.query('COMMIT');
    return { ...item, decision: decision.rows[0] ?? null, history: history.rows };
  } catch (error) { await client.query('ROLLBACK'); throw error; } finally { client.release(); }
}

export async function assignCase(user: SafeUser, caseId: string) {
  const client = await pool.connect(); try { await client.query('BEGIN'); const update = await client.query<{submissionId:string}>('UPDATE measures m SET assigned_case_worker_id=$1,assigned_at=now(),review_status=\'UNDER_REVIEW\',updated_at=now() WHERE m.id=$2 AND m.assigned_case_worker_id IS NULL AND m.review_status IN (\'SUBMITTED\',\'RESUBMITTED\') RETURNING (SELECT id FROM measure_submissions WHERE measure_id=m.id ORDER BY submission_number DESC LIMIT 1) AS "submissionId"', [user.id, caseId]); if (!update.rows[0]) { const owner=await client.query<{name:string|null}>('SELECT concat_ws(\' \',u.first_name,u.last_name) AS name FROM measures m LEFT JOIN users u ON u.id=m.assigned_case_worker_id WHERE m.id=$1',[caseId]); await client.query('ROLLBACK'); return { ok:false as const, owner: owner.rows[0]?.name ?? null }; } await client.query('UPDATE measure_submissions SET status=\'UNDER_REVIEW\' WHERE id=$1',[update.rows[0].submissionId]); await event(client,caseId,update.rows[0].submissionId,user,'CASE_ASSIGNED'); await client.query('COMMIT'); return {ok:true as const}; } catch (error) { await client.query('ROLLBACK'); throw error; } finally { client.release(); } }
async function assignedReview(client: PoolClient, user: SafeUser, caseId: string) { const row=await client.query<{submissionId:string}>('SELECT (SELECT id FROM measure_submissions WHERE measure_id=m.id ORDER BY submission_number DESC LIMIT 1) AS "submissionId" FROM measures m WHERE m.id=$1 AND m.assigned_case_worker_id=$2 AND m.review_status=\'UNDER_REVIEW\' FOR UPDATE',[caseId,user.id]); return row.rows[0] ?? null; }
export async function decide(user: SafeUser, caseId: string, kind: 'ELIGIBLE'|'NEEDS_CHANGES'|'NOT_ELIGIBLE', input: z.infer<typeof approveSchema>|z.infer<typeof requestChangesSchema>|z.infer<typeof rejectSchema>) { const client=await pool.connect(); try { await client.query('BEGIN'); const current=await assignedReview(client,user,caseId); if(!current){await client.query('ROLLBACK');return false;} const publicReason=kind==='NOT_ELIGIBLE'?(input as z.infer<typeof rejectSchema>).reason:kind==='NEEDS_CHANGES'?(input as z.infer<typeof requestChangesSchema>).message:(input as z.infer<typeof approveSchema>).publicMessage||null; const internalNote=(input as {internalNote?:string}).internalNote||null; await client.query('INSERT INTO case_decisions(id,submission_id,case_worker_user_id,decision,public_reason,internal_note) VALUES($1,$2,$3,$4,$5,$6)',[randomUUID(),current.submissionId,user.id,kind,publicReason,internalNote]); if(kind==='NEEDS_CHANGES'){const areas=(input as z.infer<typeof requestChangesSchema>).areas??{};await client.query('INSERT INTO case_requests(id,submission_id,case_worker_user_id,message,requires_school_data,requires_measure_data,requires_answers,requires_documents) VALUES($1,$2,$3,$4,$5,$6,$7,$8)',[randomUUID(),current.submissionId,user.id,publicReason,!!areas.school,!!areas.measure,!!areas.answers,!!areas.documents]); await client.query('UPDATE measures SET review_status=\'NEEDS_CHANGES\',assigned_case_worker_id=NULL,assigned_at=NULL,updated_at=now() WHERE id=$1',[caseId]); await client.query('UPDATE measure_submissions SET status=\'NEEDS_CHANGES\' WHERE id=$1',[current.submissionId]); await event(client,caseId,current.submissionId,user,'REQUEST_CREATED'); } else { await client.query('UPDATE measures SET review_status=$1,updated_at=now() WHERE id=$2',[kind,caseId]);await client.query('UPDATE measure_submissions SET status=$1 WHERE id=$2',[kind,current.submissionId]);await event(client,caseId,current.submissionId,user,kind==='ELIGIBLE'?'DECISION_ELIGIBLE':'DECISION_NOT_ELIGIBLE'); } await client.query('COMMIT');return true; }catch(error){await client.query('ROLLBACK');throw error;}finally{client.release();} }

export async function caseDocument(user: SafeUser, documentId: string) { const result=await pool.query<{id:string;originalName:string;blobName:string;mimeType:string;caseId:string;submissionId:string}>(`SELECT (item->>'documentId')::uuid AS id,item->>'filename' AS "originalName",item->>'blobPath' AS "blobName",item->>'mimeType' AS "mimeType",ms.measure_id AS "caseId",ms.id AS "submissionId" FROM measure_submissions ms CROSS JOIN LATERAL jsonb_array_elements(ms.documents_snapshot) item WHERE item->>'documentId'=$1 LIMIT 1`,[documentId]); return result.rows[0]??null; }
