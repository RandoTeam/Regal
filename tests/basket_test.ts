import 'fake-indexeddb/auto';
import { db } from '../src/db';
import { basketService } from '../src/db/services';
import { initializeDatabase } from '../src/data/seedRunner';

async function runTest() {
  console.log('--- RUNNING TECHNICAL TEST: Basket Service & Workflows ---');

  // 1. Seed database
  await initializeDatabase();

  // 2. Clear basket initially
  await basketService.clear();
  const initialItems = await basketService.getItems();
  if (initialItems.length !== 0) throw new Error('Initial basket should be empty');
  console.log('✓ Test 1: Basket initialization and clear confirmed');

  // 3. Add items to basket
  await basketService.add('prod-coca-2l', 2);
  await basketService.add('prod-madeta-mleko-1l', 3);
  let items = await basketService.getItems();
  if (items.length !== 2) throw new Error(`Expected 2 items in basket, got ${items.length}`);

  const colaItem = items.find(i => i.product.id === 'prod-coca-2l');
  const milkItem = items.find(i => i.product.id === 'prod-madeta-mleko-1l');
  if (colaItem?.quantity !== 2) throw new Error(`Cola quantity should be 2, got ${colaItem?.quantity}`);
  if (milkItem?.quantity !== 3) throw new Error(`Milk quantity should be 3, got ${milkItem?.quantity}`);
  console.log('✓ Test 2: Added items with quantities resolved properly');

  // 4. Update quantity
  await basketService.updateQuantity('prod-coca-2l', 5);
  items = await basketService.getItems();
  const updatedCola = items.find(i => i.product.id === 'prod-coca-2l');
  if (updatedCola?.quantity !== 5) throw new Error(`Updated cola quantity should be 5, got ${updatedCola?.quantity}`);
  console.log('✓ Test 3: Quantity increment / update verified');

  // 5. Remove item by setting quantity to 0
  await basketService.updateQuantity('prod-madeta-mleko-1l', 0);
  items = await basketService.getItems();
  if (items.length !== 1 || items[0].product.id !== 'prod-coca-2l') {
    throw new Error('Milk should have been removed from basket');
  }
  console.log('✓ Test 4: Removing item via quantity = 0 verified');

  // 6. Clear basket
  await basketService.clear();
  items = await basketService.getItems();
  if (items.length !== 0) throw new Error('Basket should be empty after clear');
  console.log('✓ Test 5: Full basket clear verified');

  console.log('--- ALL BASKET TESTS PASSED SUCCESSFULLY! ---');
}

runTest().catch((err) => {
  console.error('Basket test failed:', err);
  process.exit(1);
});
