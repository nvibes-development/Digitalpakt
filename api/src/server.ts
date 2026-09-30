import { buildApp } from './app.js';

const port = Number.parseInt(process.env.PORT ?? '3000', 10);
if (!Number.isSafeInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT muss eine gültige TCP-Portnummer sein.');
}

const app = buildApp();

async function start() {
  try {
    await app.listen({ host: '127.0.0.1', port });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

void start();
