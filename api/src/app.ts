import cookie from '@fastify/cookie';
import Fastify, { FastifyInstance } from 'fastify';

export function buildApp(): FastifyInstance {
  const app = Fastify({
    logger: {
      level: process.env.NODE_ENV === 'production' ? 'info' : 'warn',
      redact: ['req.headers.cookie', 'req.headers.authorization'],
    },
  });

  app.register(cookie);

  app.get('/api/health', async () => ({ status: 'ok' }));

  // The route establishes the cookie-based session contract before auth is
  // implemented. It intentionally never creates a session in Phase 1.
  app.get('/api/auth/me', async (_request, reply) =>
    reply.code(401).send({
      error: {
        code: 'UNAUTHENTICATED',
        message: 'Keine aktive Sitzung vorhanden.',
      },
    }),
  );

  app.setNotFoundHandler((request, reply) =>
    reply.code(404).send({
      error: {
        code: 'NOT_FOUND',
        message: 'Die angeforderte API-Ressource wurde nicht gefunden.',
        requestId: request.id,
      },
    }),
  );

  app.setErrorHandler((error, request, reply) => {
    request.log.error({ err: error }, 'Unbehandelter API-Fehler');
    reply.code(500).send({
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Ein interner Fehler ist aufgetreten.',
        requestId: request.id,
      },
    });
  });

  return app;
}
