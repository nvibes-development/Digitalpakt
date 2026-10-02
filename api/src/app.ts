import { randomUUID } from 'node:crypto';
import cookie from '@fastify/cookie';
import multipart from '@fastify/multipart';
import rateLimit from '@fastify/rate-limit';
import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { currentUser, login, loginSchema, register, registerSchema, revoke } from './auth.js';
import { getCurrentSchool, schoolUpdateSchema, startSchoolCheck, updateCurrentSchool } from './schools.js';
import { createMeasure, getLatestMeasure, getMeasure, listMeasures, measureUpdateSchema, submitMeasure, updateMeasure } from './measures.js';
import { deleteDocument, getDocument, listDocuments, uploadDocument } from './documents.js';
import { changePassword, deleteAccount, deleteAccountSchema, passwordSchema, profile, profileSchema, updateProfile } from './account.js';
import { getAnswers, questionSchema, saveAnswers } from './questions.js';
import { approveSchema, assignCase, caseDocument, decide, getCase, isCaseWorker, listCases, listInbox, rejectSchema, reportData, reportStatus, requestChangesSchema } from './review.js';
import { createReportPdf, reportFilename } from './report.js';

const cookieName = 'klarfoerdern_session';
const cookieOptions = { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax' as const, path: '/', maxAge: 60 * 60 * 24 * 7 };

export function buildApp(): FastifyInstance {
  const app = Fastify({ logger: { level: process.env.NODE_ENV === 'production' ? 'info' : 'warn', redact: ['req.headers.cookie', 'req.headers.authorization', 'req.body.password', 'req.body.confirmPassword'] } });
  app.register(cookie);
  app.register(multipart, { limits: { fileSize: 10 * 1024 * 1024, files: 1 } });
  app.register(rateLimit, { global: false, max: 10, timeWindow: '15 minutes' });
  app.get('/api/health', async () => ({ status: 'ok' }));

  app.addHook('onRequest', async (request, reply) => {
    if (!['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method)) return;
    const origin = request.headers.origin;
    const expected = process.env.APP_ORIGIN;
    if (expected && origin && origin !== expected) return reply.code(403).send({ error: { code: 'CSRF_REJECTED', message: 'Ungültige Anfrageherkunft.' } });
  });

  app.post('/api/auth/register', { config: { rateLimit: { max: 5, timeWindow: '15 minutes' } } }, async (request, reply) => {
    const parsed = registerSchema.safeParse(request.body);
    if (!parsed.success) return reply.code(400).send({ error: { code: 'INVALID_INPUT', message: 'Bitte prüfen Sie Ihre Eingaben.' } });
    try {
      const session = await register(parsed.data);
      reply.setCookie(cookieName, session.token, cookieOptions);
      return reply.code(201).send({ user: session.user });
    } catch (error) {
      if (error instanceof Error && error.message === 'EMAIL_EXISTS') return reply.code(409).send({ error: { code: 'EMAIL_EXISTS', message: 'Für diese E-Mail-Adresse existiert bereits ein Konto.' } });
      throw error;
    }
  });

  app.post('/api/auth/login', { config: { rateLimit: { max: 10, timeWindow: '15 minutes' } } }, async (request, reply) => {
    const parsed = loginSchema.safeParse(request.body);
    if (!parsed.success) return reply.code(400).send({ error: { code: 'INVALID_INPUT', message: 'Anmeldung nicht möglich. Bitte prüfen Sie Ihre Eingaben.' } });
    try {
      const session = await login(parsed.data);
      reply.setCookie(cookieName, session.token, cookieOptions);
      return { user: session.user };
    } catch (error) {
      if (error instanceof Error && error.message === 'INVALID_CREDENTIALS') return reply.code(401).send({ error: { code: 'INVALID_CREDENTIALS', message: 'E-Mail oder Passwort ist nicht korrekt.' } });
      throw error;
    }
  });

  app.post('/api/auth/logout', async (request, reply) => { await revoke(request.cookies[cookieName]); reply.clearCookie(cookieName, { path: '/' }); return reply.code(204).send(); });
  app.get('/api/auth/me', async (request, reply) => { const user = await currentUser(request.cookies[cookieName]); return user ? { user } : reply.code(401).send({ error: { code: 'UNAUTHENTICATED', message: 'Keine aktive Sitzung vorhanden.' } }); });

  async function requireUser(request: FastifyRequest, reply: FastifyReply) {
    const user = await currentUser(request.cookies[cookieName]);
    if (!user) {
      reply.code(401).send({ error: { code: 'UNAUTHENTICATED', message: 'Bitte melden Sie sich an.' } });
      return null;
    }
    return user;
  }
  async function requireCaseWorker(request: FastifyRequest, reply: FastifyReply) {
    const user = await requireUser(request, reply);
    if (!user) return null;
    if (!isCaseWorker(user)) { reply.code(403).send({ error: { code: 'REVIEW_ACCESS_DENIED', message: 'Dieser Bereich ist nur für autorisierte Sachbearbeiter zugänglich.' } }); return null; }
    return user;
  }
  async function requireSchoolAdmin(request: FastifyRequest, reply: FastifyReply) {
    const user = await requireUser(request, reply);
    if (!user) return null;
    if (user.role !== 'school_admin') { reply.code(403).send({ error: { code: 'SCHOOL_ACCESS_DENIED', message: 'Dieser Bereich ist nur für Schuladministratoren zugänglich.' } }); return null; }
    return user;
  }

  app.get('/api/account/profile', async (request, reply) => { const user=await requireUser(request,reply); if(!user)return; return {profile:await profile(user)}; });
  app.patch('/api/account/profile', async (request, reply) => { const user=await requireUser(request,reply); if(!user)return; const parsed=profileSchema.safeParse(request.body); if(!parsed.success)return reply.code(400).send({error:{code:'INVALID_PROFILE',message:'Bitte prüfen Sie Ihre Profildaten.',fields:parsed.error.flatten().fieldErrors}}); try{return {profile:await updateProfile(user,parsed.data)}}catch(error){if(error instanceof Error&&error.message==='EMAIL_EXISTS')return reply.code(409).send({error:{code:'EMAIL_EXISTS',message:'Diese E-Mail-Adresse wird bereits verwendet.'}});throw error} });
  app.post('/api/account/password', async (request, reply) => { const user=await requireUser(request,reply); if(!user)return; const parsed=passwordSchema.safeParse(request.body); if(!parsed.success)return reply.code(400).send({error:{code:'INVALID_PASSWORD',message:'Das neue Passwort muss mindestens 12 Zeichen lang sein.'}}); try{await changePassword(user,parsed.data);return reply.code(204).send()}catch(error){if(error instanceof Error&&error.message==='INVALID_CREDENTIALS')return reply.code(401).send({error:{code:'INVALID_CREDENTIALS',message:'Das aktuelle Passwort ist nicht korrekt.'}});throw error} });
  app.delete('/api/account', async (request, reply) => { const user=await requireUser(request,reply); if(!user)return; const parsed=deleteAccountSchema.safeParse(request.body); if(!parsed.success)return reply.code(400).send({error:{code:'DELETE_CONFIRMATION_REQUIRED',message:'Bitte bestätigen Sie die Kontolöschung.'}}); try{await deleteAccount(user);reply.clearCookie(cookieName,{path:'/'});return reply.code(204).send()}catch(error){if(error instanceof Error&&error.message==='ACCOUNT_HAS_SHARED_SCHOOLS')return reply.code(409).send({error:{code:'ACCOUNT_HAS_SHARED_SCHOOLS',message:'Dieses Konto kann nicht automatisch gelöscht werden, weil es gemeinsame Schuldaten gibt.'}});throw error} });
  app.get('/api/schools/current', async (request, reply) => {
    const user = await requireUser(request, reply); if (!user) return;
    const current = await getCurrentSchool(user);
    return current ? current : reply.code(404).send({ error: { code: 'SCHOOL_NOT_STARTED', message: 'Es wurde noch kein Förderfähigkeitscheck gestartet.' } });
  });
  app.post('/api/schools/current/checks', async (request, reply) => {
    const user = await requireSchoolAdmin(request, reply); if (!user) return;
    return reply.code(201).send(await startSchoolCheck(user));
  });
  app.patch('/api/schools/current', async (request, reply) => {
    const user = await requireSchoolAdmin(request, reply); if (!user) return;
    const parsed = schoolUpdateSchema.safeParse(request.body);
    if (!parsed.success) return reply.code(400).send({ error: { code: 'INVALID_SCHOOL_DATA', message: 'Bitte prüfen Sie die Schuldaten.', fields: parsed.error.flatten().fieldErrors } });
    const current = await updateCurrentSchool(user, parsed.data);
    return current ? current : reply.code(404).send({ error: { code: 'SCHOOL_NOT_STARTED', message: 'Starten Sie zuerst einen Förderfähigkeitscheck.' } });
  });
  app.get('/api/measures/current', async (request, reply) => {
    const user = await requireUser(request, reply); if (!user) return;
    const measure = await getLatestMeasure(user);
    return measure ? { measure } : reply.code(404).send({ error: { code: 'MEASURE_NOT_STARTED', message: 'Es wurde noch keine Maßnahme angelegt.' } });
  });
  app.get('/api/measures', async (request, reply) => {
    const user = await requireUser(request, reply); if (!user) return;
    const measures = await listMeasures(user);
    return measures ? { measures } : reply.code(404).send({ error: { code: 'SCHOOL_NOT_STARTED', message: 'Erfassen Sie zuerst die Schuldaten.' } });
  });
  app.post('/api/measures', async (request, reply) => {
    const user = await requireSchoolAdmin(request, reply); if (!user) return;
    const parsed = measureUpdateSchema.safeParse(request.body);
    if (!parsed.success || !parsed.data.name) return reply.code(400).send({ error: { code: 'INVALID_MEASURE_DATA', message: 'Bitte geben Sie eine Bezeichnung für die Maßnahme an.', fields: parsed.success ? { name: ['Erforderlich'] } : parsed.error.flatten().fieldErrors } });
    const measure = await createMeasure(user, parsed.data);
    return measure ? reply.code(201).send({ measure }) : reply.code(404).send({ error: { code: 'SCHOOL_NOT_STARTED', message: 'Erfassen Sie zuerst die Schuldaten.' } });
  });
  app.get('/api/measures/:measureId', async (request, reply) => {
    const user = await requireUser(request, reply); if (!user) return;
    const { measureId } = request.params as { measureId: string };
    const measure = await getMeasure(user, measureId);
    return measure ? { measure } : reply.code(404).send({ error: { code: 'MEASURE_NOT_FOUND', message: 'Die Maßnahme wurde nicht gefunden.' } });
  });
  app.patch('/api/measures/:measureId', async (request, reply) => {
    const user = await requireSchoolAdmin(request, reply); if (!user) return;
    const parsed = measureUpdateSchema.safeParse(request.body);
    if (!parsed.success) return reply.code(400).send({ error: { code: 'INVALID_MEASURE_DATA', message: 'Bitte prüfen Sie die Angaben zur Maßnahme.', fields: parsed.error.flatten().fieldErrors } });
    const { measureId } = request.params as { measureId: string };
    const measure = await updateMeasure(user, measureId, parsed.data);
    return measure ? { measure } : reply.code(404).send({ error: { code: 'MEASURE_NOT_FOUND', message: 'Die Maßnahme wurde nicht gefunden.' } });
  });
  app.post('/api/measures/:measureId/submit-review', async (request, reply) => { const user=await requireSchoolAdmin(request,reply);if(!user)return;try{const measure=await submitMeasure(user,(request.params as {measureId:string}).measureId);return measure?{measure}:reply.code(404).send({error:{code:'MEASURE_NOT_FOUND',message:'Die Maßnahme wurde nicht gefunden.'}})}catch(error){if(error instanceof Error&&error.message==='MEASURE_NOT_READY')return reply.code(400).send({error:{code:'MEASURE_NOT_READY',message:'Bitte beantworten Sie alle Fragen und laden Sie mindestens ein Dokument hoch.'}});throw error} });
  app.get('/api/measures/:measureId/questions', async (request, reply) => { const user=await requireUser(request,reply);if(!user)return;const answers=await getAnswers(user,(request.params as {measureId:string}).measureId);return answers?{answers}:reply.code(404).send({error:{code:'MEASURE_NOT_FOUND',message:'Die Maßnahme wurde nicht gefunden.'}}); });
  app.put('/api/measures/:measureId/questions', async (request, reply) => { const user=await requireSchoolAdmin(request,reply);if(!user)return;const parsed=questionSchema.safeParse(request.body);if(!parsed.success)return reply.code(400).send({error:{code:'ALL_ANSWERS_REQUIRED',message:'Bitte beantworten Sie alle Fragen.'}});let saved;try{saved=await saveAnswers(user,(request.params as {measureId:string}).measureId,parsed.data.answers)}catch(error){if(error instanceof Error&&error.message==='MEASURE_SUBMITTED')return reply.code(409).send({error:{code:'MEASURE_SUBMITTED',message:'Diese Maßnahme wurde zur Überprüfung gesendet und kann nicht mehr geändert werden.'}});throw error}return saved?reply.code(204).send():reply.code(404).send({error:{code:'MEASURE_NOT_FOUND',message:'Die Maßnahme wurde nicht gefunden.'}}); });
  app.get('/api/measures/:measureId/documents', async (request, reply) => { const user=await requireUser(request,reply); if(!user)return; const documents=await listDocuments(user,(request.params as {measureId:string}).measureId); return documents?{documents}:reply.code(404).send({error:{code:'MEASURE_NOT_FOUND',message:'Die Maßnahme wurde nicht gefunden.'}}); });
  app.post('/api/measures/:measureId/documents', async (request, reply) => { const user=await requireSchoolAdmin(request,reply); if(!user)return; try { const file=await request.file(); if(!file)return reply.code(400).send({error:{code:'INVALID_DOCUMENT',message:'Bitte wählen Sie ein Dokument aus.'}}); const document=await uploadDocument(user,(request.params as {measureId:string}).measureId,file); return document?reply.code(201).send({document}):reply.code(404).send({error:{code:'MEASURE_NOT_FOUND',message:'Die Maßnahme wurde nicht gefunden.'}}); } catch { return reply.code(400).send({error:{code:'INVALID_DOCUMENT',message:'Erlaubt sind PDF-, Word- und Excel-Dateien bis 10 MB.'}}); } });
  app.get('/api/documents/:documentId/download', async (request, reply) => { const user=await requireUser(request,reply); if(!user)return; const document=await getDocument(user,(request.params as {documentId:string}).documentId); if(!document)return reply.code(404).send({error:{code:'DOCUMENT_NOT_FOUND',message:'Dokument nicht gefunden.'}}); const { BlobServiceClient }=await import('@azure/storage-blob'); const { DefaultAzureCredential }=await import('@azure/identity'); const service=new BlobServiceClient(process.env.AZURE_STORAGE_ACCOUNT_URL!,new DefaultAzureCredential()); const response=await service.getContainerClient('digitalpakt').getBlobClient(document.blob_name).download(); reply.header('Content-Type',document.mime_type).header('Content-Disposition',`attachment; filename="${document.original_name.replaceAll('"','')}"`); return reply.send(response.readableStreamBody); });
  app.delete('/api/documents/:documentId', async (request, reply) => { const user=await requireSchoolAdmin(request,reply); if(!user)return; const document=await deleteDocument(user,(request.params as {documentId:string}).documentId); return document?reply.code(204).send():reply.code(404).send({error:{code:'DOCUMENT_NOT_FOUND',message:'Dokument nicht gefunden.'}}); });
  app.get('/api/review/inbox', async (request, reply) => { const user=await requireCaseWorker(request,reply);if(!user)return; return listInbox(user,request.query as Record<string,string>); });
  app.get('/api/review/cases', async (request, reply) => { const user=await requireCaseWorker(request,reply);if(!user)return; const view=(request.query as {view?:string}).view; const statuses=view==='active'?['UNDER_REVIEW']:view==='requests'?['NEEDS_CHANGES']:view==='completed'?['ELIGIBLE','NOT_ELIGIBLE']:['SUBMITTED','RESUBMITTED']; return {items:await listCases(user,statuses as any)}; });
  app.get('/api/review/cases/:caseId/report.pdf', async (request, reply) => { const user=await requireCaseWorker(request,reply);if(!user)return; const caseId=(request.params as {caseId:string}).caseId; const report=await reportData(caseId); if(!report){const current=await reportStatus(caseId);return current?reply.code(409).send({error:{code:'CASE_NOT_COMPLETED',message:'Ein Prüfbericht steht erst nach Abschluss des Vorgangs zur Verfügung.'}}):reply.code(404).send({error:{code:'CASE_NOT_FOUND',message:'Der Vorgang wurde nicht gefunden.'}});} if(report.status!=='ELIGIBLE'&&report.status!=='NOT_ELIGIBLE')return reply.code(409).send({error:{code:'CASE_NOT_COMPLETED',message:'Ein Prüfbericht steht erst nach Abschluss des Vorgangs zur Verfügung.'}}); const pdf=await createReportPdf(report); reply.header('Content-Type','application/pdf').header('Content-Disposition',`attachment; filename="${reportFilename(report.caseNumber,report.measure.name)}"`).header('Cache-Control','private, no-store'); return reply.send(pdf); });
  app.get('/api/review/cases/:caseId', async (request, reply) => { const user=await requireCaseWorker(request,reply);if(!user)return; const result=await getCase(user,(request.params as {caseId:string}).caseId); return result?{case:result}:reply.code(404).send({error:{code:'CASE_NOT_FOUND',message:'Der Vorgang wurde nicht gefunden.'}}); });
  app.post('/api/review/cases/:caseId/assign', async (request, reply) => { const user=await requireCaseWorker(request,reply);if(!user)return; const result=await assignCase(user,(request.params as {caseId:string}).caseId); return result.ok?reply.code(204).send():reply.code(409).send({error:{code:'CASE_ALREADY_ASSIGNED',message:`Dieser Vorgang wird bereits von ${result.owner??'einem anderen Sachbearbeiter'} bearbeitet.`}}); });
  app.get('/api/review/documents/:documentId/download', async (request, reply) => { const user=await requireCaseWorker(request,reply);if(!user)return; const document=await caseDocument(user,(request.params as {documentId:string}).documentId);if(!document)return reply.code(404).send({error:{code:'DOCUMENT_NOT_FOUND',message:'Dokument nicht gefunden.'}});const {BlobServiceClient}=await import('@azure/storage-blob');const {DefaultAzureCredential}=await import('@azure/identity');const service=new BlobServiceClient(process.env.AZURE_STORAGE_ACCOUNT_URL!,new DefaultAzureCredential());const response=await service.getContainerClient('digitalpakt').getBlobClient(document.blobName).download();await (async()=>{const {Pool}=await import('pg');const auditPool=new Pool({connectionString:process.env.DATABASE_URL});try{await auditPool.query('INSERT INTO audit_events(id,case_id,submission_id,actor_user_id,actor_role,event_type,event_data) VALUES($1,$2,$3,$4,$5,$6,$7)',[randomUUID(),document.caseId,document.submissionId,user.id,user.role,'DOCUMENT_DOWNLOADED',JSON.stringify({documentId:document.id})]);}finally{await auditPool.end();}})().catch(()=>undefined);reply.header('Content-Type',document.mimeType).header('Content-Disposition',`attachment; filename="${document.originalName.replaceAll('"','')}"`);return reply.send(response.readableStreamBody); });
  app.post('/api/review/cases/:caseId/request-changes', async (request, reply) => { const user=await requireCaseWorker(request,reply);if(!user)return; const parsed=requestChangesSchema.safeParse(request.body);if(!parsed.success)return reply.code(400).send({error:{code:'REQUEST_MESSAGE_REQUIRED',message:'Bitte beschreiben Sie, was ergänzt oder geändert werden muss.'}}); return await decide(user,(request.params as {caseId:string}).caseId,'NEEDS_CHANGES',parsed.data)?reply.code(204).send():reply.code(409).send({error:{code:'CASE_NOT_UNDER_REVIEW',message:'Der Vorgang ist nicht Ihnen zur Bearbeitung zugewiesen.'}}); });
  app.post('/api/review/cases/:caseId/approve', async (request, reply) => { const user=await requireCaseWorker(request,reply);if(!user)return; const parsed=approveSchema.safeParse(request.body??{});if(!parsed.success)return reply.code(400).send({error:{code:'INVALID_INPUT',message:'Bitte prüfen Sie Ihre Eingaben.'}}); return await decide(user,(request.params as {caseId:string}).caseId,'ELIGIBLE',parsed.data)?reply.code(204).send():reply.code(409).send({error:{code:'CASE_NOT_UNDER_REVIEW',message:'Der Vorgang ist nicht Ihnen zur Bearbeitung zugewiesen.'}}); });
  app.post('/api/review/cases/:caseId/reject', async (request, reply) => { const user=await requireCaseWorker(request,reply);if(!user)return; const parsed=rejectSchema.safeParse(request.body);if(!parsed.success)return reply.code(400).send({error:{code:'REASON_REQUIRED',message:'Bitte erfassen Sie eine Begründung.'}}); return await decide(user,(request.params as {caseId:string}).caseId,'NOT_ELIGIBLE',parsed.data)?reply.code(204).send():reply.code(409).send({error:{code:'CASE_NOT_UNDER_REVIEW',message:'Der Vorgang ist nicht Ihnen zur Bearbeitung zugewiesen.'}}); });
  app.setNotFoundHandler((request, reply) => reply.code(404).send({ error: { code: 'NOT_FOUND', message: 'Die angeforderte API-Ressource wurde nicht gefunden.', requestId: request.id } }));
  app.setErrorHandler((error, request, reply) => { request.log.error({ err: error }, 'Unbehandelter API-Fehler'); reply.code(500).send({ error: { code: 'INTERNAL_SERVER_ERROR', message: 'Ein interner Fehler ist aufgetreten.', requestId: request.id } }); });
  return app;
}
