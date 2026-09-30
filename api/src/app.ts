import cookie from '@fastify/cookie';
import rateLimit from '@fastify/rate-limit';
import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { currentUser, login, loginSchema, register, registerSchema, revoke } from './auth.js';
import { getCurrentSchool, schoolUpdateSchema, startSchoolCheck, updateCurrentSchool } from './schools.js';

const cookieName = 'klarfoerdern_session';
const cookieOptions = { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax' as const, path: '/', maxAge: 60 * 60 * 24 * 7 };

export function buildApp(): FastifyInstance {
  const app = Fastify({ logger: { level: process.env.NODE_ENV === 'production' ? 'info' : 'warn', redact: ['req.headers.cookie', 'req.headers.authorization', 'req.body.password', 'req.body.confirmPassword'] } });
  app.register(cookie);
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

  app.get('/api/schools/current', async (request, reply) => {
    const user = await requireUser(request, reply); if (!user) return;
    const current = await getCurrentSchool(user);
    return current ? current : reply.code(404).send({ error: { code: 'SCHOOL_NOT_STARTED', message: 'Es wurde noch kein Förderfähigkeitscheck gestartet.' } });
  });
  app.post('/api/schools/current/checks', async (request, reply) => {
    const user = await requireUser(request, reply); if (!user) return;
    return reply.code(201).send(await startSchoolCheck(user));
  });
  app.patch('/api/schools/current', async (request, reply) => {
    const user = await requireUser(request, reply); if (!user) return;
    const parsed = schoolUpdateSchema.safeParse(request.body);
    if (!parsed.success) return reply.code(400).send({ error: { code: 'INVALID_SCHOOL_DATA', message: 'Bitte prüfen Sie die Schuldaten.', fields: parsed.error.flatten().fieldErrors } });
    const current = await updateCurrentSchool(user, parsed.data);
    return current ? current : reply.code(404).send({ error: { code: 'SCHOOL_NOT_STARTED', message: 'Starten Sie zuerst einen Förderfähigkeitscheck.' } });
  });
  app.setNotFoundHandler((request, reply) => reply.code(404).send({ error: { code: 'NOT_FOUND', message: 'Die angeforderte API-Ressource wurde nicht gefunden.', requestId: request.id } }));
  app.setErrorHandler((error, request, reply) => { request.log.error({ err: error }, 'Unbehandelter API-Fehler'); reply.code(500).send({ error: { code: 'INTERNAL_SERVER_ERROR', message: 'Ein interner Fehler ist aufgetreten.', requestId: request.id } }); });
  return app;
}
