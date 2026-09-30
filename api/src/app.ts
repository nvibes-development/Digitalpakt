import cookie from '@fastify/cookie';
import rateLimit from '@fastify/rate-limit';
import Fastify, { FastifyInstance } from 'fastify';
import { currentUser, login, loginSchema, register, registerSchema, revoke } from './auth.js';

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
  app.setNotFoundHandler((request, reply) => reply.code(404).send({ error: { code: 'NOT_FOUND', message: 'Die angeforderte API-Ressource wurde nicht gefunden.', requestId: request.id } }));
  app.setErrorHandler((error, request, reply) => { request.log.error({ err: error }, 'Unbehandelter API-Fehler'); reply.code(500).send({ error: { code: 'INTERNAL_SERVER_ERROR', message: 'Ein interner Fehler ist aufgetreten.', requestId: request.id } }); });
  return app;
}
