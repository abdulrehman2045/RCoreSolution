import { readFile } from 'node:fs/promises';
import { connectDatabase, disconnectDatabase } from '../config/db.js';
import { env } from '../config/env.js';
import { Product } from '../models/Product.js';
import { Service } from '../models/Service.js';
import { getSettings } from '../models/Setting.js';
import { User } from '../models/User.js';

const readJson = async (fileName) =>
  JSON.parse(await readFile(new URL(`./${fileName}`, import.meta.url), 'utf8'));

/** Inserts items that do not exist yet. Existing items are never overwritten. */
async function seedCatalog(Model, label, items) {
  let created = 0;

  for (const [order, item] of items.entries()) {
    const exists = await Model.exists({ slug: item.slug });
    if (exists) continue;

    await Model.create({ ...item, order });
    created += 1;
  }

  console.log(`${label}: ${created} added, ${items.length - created} already existed`);
}

async function seedAdmin() {
  const { name, email, password } = env.admin;
  if (!email || !password) {
    console.log('Admin: skipped (set ADMIN_EMAIL and ADMIN_PASSWORD in .env)');
    return;
  }

  const exists = await User.exists({ email: email.toLowerCase() });
  if (exists) {
    console.log(`Admin: ${email} already exists`);
    return;
  }

  await User.create({ name, email, password, role: 'admin' });
  console.log(`Admin: created ${email}`);
}

async function seed() {
  await connectDatabase();

  await seedCatalog(Service, 'Services', await readJson('services.json'));
  await seedCatalog(Product, 'Products', await readJson('products.json'));
  await getSettings();
  console.log('Settings: ready');
  await seedAdmin();

  await disconnectDatabase();
}

seed().catch((error) => {
  console.error('Seeding failed:', error.message);
  process.exit(1);
});
