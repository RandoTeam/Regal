import 'fake-indexeddb/auto';
import fs from 'fs';
import path from 'path';
import { db } from '../src/db';
import { productService, basketService } from '../src/db/services';
import { initializeDatabase } from '../src/data/seedRunner';

async function runTest() {
  console.log('--- RUNNING TECHNICAL TEST: PWA & Offline Storage ---');

  // 1. Check PWA icon files in public folder
  const publicDir = path.resolve(process.cwd(), 'public');
  const icon192 = path.join(publicDir, 'pwa-192x192.png');
  const icon512 = path.join(publicDir, 'pwa-512x512.png');
  const appleIcon = path.join(publicDir, 'apple-touch-icon.png');

  if (!fs.existsSync(icon192) || !fs.existsSync(icon512) || !fs.existsSync(appleIcon)) {
    throw new Error('Required PWA PNG icons missing in public/');
  }
  console.log('✓ Test 1: PWA icon assets verified in public/ directory');

  // 2. Check offline database initialization without network
  await initializeDatabase();
  const products = await productService.getAll();
  if (products.length < 5) {
    throw new Error(`Expected at least 5 products in offline db, got ${products.length}`);
  }
  console.log(`✓ Test 2: Local IndexedDB initialized completely offline (${products.length} products loaded)`);

  // 3. Test offline search & pricing resolution
  const searchRes = await productService.search('kofola');
  if (searchRes.length === 0) {
    throw new Error('Offline search for Kofola failed');
  }
  if (!searchRes[0].bestPrice || searchRes[0].bestPrice.pricePerUnit <= 0) {
    throw new Error('Offline price calculation failed');
  }
  console.log(`✓ Test 3: Offline search and best price calculation confirmed (${searchRes[0].name}: ${searchRes[0].bestPrice.regularPrice} Kč)`);

  // 4. Test offline basket persistence
  await basketService.clear();
  await basketService.add(products[0].id, 3);
  const basketItems = await basketService.getItems();
  if (basketItems.length !== 1 || basketItems[0].quantity !== 3) {
    throw new Error('Offline basket write failed');
  }
  console.log('✓ Test 4: Offline basket persistence verified');

  console.log('--- ALL PWA & OFFLINE TESTS PASSED SUCCESSFULLY! ---');
}

runTest().catch((err) => {
  console.error('PWA offline test failed:', err);
  process.exit(1);
});
