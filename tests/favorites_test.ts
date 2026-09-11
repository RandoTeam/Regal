import 'fake-indexeddb/auto';
import { db } from '../src/db';
import { favoriteService, productService } from '../src/db/services';
import { SEED_PRODUCTS, SEED_PRICES } from '../src/data/seedData';

async function runFavoritesTest() {
  console.log('--- RUNNING TECHNICAL TEST: Favorites Service ---');

  await db.products.bulkPut(SEED_PRODUCTS);
  await db.prices.bulkPut(SEED_PRICES);
  await db.favorites.clear();

  // Test 1: Initially empty
  let favs = await favoriteService.getAll();
  if (favs.length !== 0) throw new Error('Favorites should be empty initially');
  console.log('✓ Test 1: Favorites empty check passed');

  // Test 2: Add to favorites
  const added = await favoriteService.toggleFavorite('prod-coca-2l');
  if (!added) throw new Error('Toggle should return true for adding');
  let isFav = await favoriteService.isFavorite('prod-coca-2l');
  if (!isFav) throw new Error('isFavorite should be true');

  favs = await favoriteService.getAll();
  if (favs.length !== 1 || favs[0].id !== 'prod-coca-2l') throw new Error('getAll failed to return favorite');
  console.log('✓ Test 2: Favorite addition and retrieval passed');

  // Test 3: Remove from favorites
  const removed = await favoriteService.toggleFavorite('prod-coca-2l');
  if (removed) throw new Error('Toggle should return false for removal');
  isFav = await favoriteService.isFavorite('prod-coca-2l');
  if (isFav) throw new Error('isFavorite should be false after removal');

  console.log('✓ Test 3: Favorite removal passed');
  console.log('--- ALL FAVORITES TESTS PASSED SUCCESSFULLY! ---');
}

runFavoritesTest().catch(err => {
  console.error('Favorites test failed:', err);
  process.exit(1);
});
