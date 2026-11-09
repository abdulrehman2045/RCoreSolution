import app from './app.js';
import { connectDatabase } from './config/db.js';
import { env } from './config/env.js';

async function start() {
  await connectDatabase();
  app.listen(env.port, () => {
    console.log(`API running on http://localhost:${env.port}/api`);
  });
}

start().catch((error) => {
  console.error('Could not start the server:', error.message);
  process.exit(1);
});
