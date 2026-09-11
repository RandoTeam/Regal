import { db } from '../db';
import { SEED_STORES, SEED_PRODUCTS, SEED_PRICES, SEED_LEAFLETS } from './seedData';

export async function initializeDatabase(): Promise<void> {
  const productCount = await db.products.count();
  if (productCount > 0) return; // Already initialized

  console.log('[Regál] Seeding initial Czech retail dataset into IndexedDB...');
  await db.transaction('rw', [db.stores, db.products, db.prices, db.leaflets], async () => {
    await db.stores.bulkPut(SEED_STORES);
    await db.products.bulkPut(SEED_PRODUCTS);
    await db.prices.bulkPut(SEED_PRICES);
    await db.leaflets.bulkPut(SEED_LEAFLETS);
  });
  console.log('[Regál] Seeding complete.');
}
