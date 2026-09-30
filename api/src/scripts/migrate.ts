import { runMigrations } from '../db/migrate.js';

runMigrations()
  .then(() => {
    process.stdout.write('Datenbankmigrationen abgeschlossen.\n');
  })
  .catch((error: unknown) => {
    process.stderr.write('Datenbankmigration fehlgeschlagen.\n');
    if (error instanceof Error) {
      process.stderr.write(`${error.message}\n`);
    }
    process.exitCode = 1;
  });
