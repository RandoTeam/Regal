import { describe, it, expect, beforeEach } from 'vitest';
import 'fake-indexeddb/auto';
import { db } from '../src/db/index';
import { productService, favoriteService, basketService } from '../src/db/services';
import type { Product, Store, PriceRecord } from '../src/db/types';

// Standalone node test runner for database
async function runDatabaseTests() {
  console.log('--- RUNNING TECHNICAL TEST: IndexedDB Schema & Services ---');
  
  // Clean DB
  await db.products.clear();
  await db.stores.clear();
  await db.prices.clear();
  await db.favorites.clear();
  await db.basket.clear();

  // Test 1: Insert product
  const testProduct: Product = {
    id: 'prod-coca-2l',
    ean: '5449000000286',
    name: 'Coca-Cola Original 2.0 l',
    brand: 'Coca-Cola',
    category: 'Nápoje',
    volumeLiters: 2.0,
    packagingType: 'PET',
    countryOfOrigin: 'Česká republika',
    manufacturer: 'Coca-Cola HBC Česko a Slovensko, s.r.o. (Praha 9 - Kyje)',
    imageUrl: 'https://images.unsplash.com/photo-1554866585-cd94860890b7',
    nutrition: {
      calories: 42,
      protein: 0,
      carbs: 10.6,
      fat: 0,
      fiber: 0
    }
  };
  await db.products.put(testProduct);
  console.log('✓ Test 1: Product insertion passed');

  // Test 2: Insert stores
  const tescoStore: Store = {
    id: 'store-tesco-narodni',
    chainId: 'tesco',
    chainName: 'Tesco',
    branchName: 'Tesco Praha Národní',
    address: 'Národní 63/26',
    city: 'Praha 1',
    postalCode: '110 00',
    region: 'Praha',
    isOnline: false
  };
  const billaStore: Store = {
    id: 'store-billa-karlin',
    chainId: 'billa',
    chainName: 'BILLA',
    branchName: 'BILLA Karlín',
    address: 'Křižíkova 34',
    city: 'Praha 8',
    postalCode: '186 00',
    region: 'Praha',
    isOnline: false
  };
  await db.stores.bulkPut([tescoStore, billaStore]);
  console.log('✓ Test 2: Store bulk insertion passed');

  // Test 3: Insert prices
  const priceTesco: PriceRecord = {
    id: 'price-tesco-coca-2l',
    productId: 'prod-coca-2l',
    storeId: 'store-tesco-narodni',
    chainId: 'tesco',
    regularPrice: 49.90,
    clubPrice: 36.90,
    pricePerUnit: 18.45,
    unitLabel: '1 l',
    isAction: true,
    actionName: 'Clubcard',
    discountPercentage: 26,
    productUrl: 'https://nakup.itesco.cz'
  };
  const priceBilla: PriceRecord = {
    id: 'price-billa-coca-2l',
    productId: 'prod-coca-2l',
    storeId: 'store-billa-karlin',
    chainId: 'billa',
    regularPrice: 49.90,
    pricePerUnit: 24.95,
    unitLabel: '1 l',
    isAction: false,
    productUrl: 'https://shop.billa.cz'
  };
  await db.prices.bulkPut([priceTesco, priceBilla]);
  console.log('✓ Test 3: Price bulk insertion passed');

  // Test 4: Product search and best price calculation
  const searchResults = await productService.search('coca');
  if (searchResults.length !== 1) throw new Error('Search failed to find product');
  if (searchResults[0].bestPrice.clubPrice !== 36.90) throw new Error('Best price sorting failed');
  console.log('✓ Test 4: Product search and best price resolved correctly (36.90 Kč vs 49.90 Kč)');

  // Test 5: Favorites service
  const isFavInitially = await favoriteService.isFavorite('prod-coca-2l');
  if (isFavInitially) throw new Error('Should not be favorite initially');
  await favoriteService.toggleFavorite('prod-coca-2l');
  const isFavAfter = await favoriteService.isFavorite('prod-coca-2l');
  if (!isFavAfter) throw new Error('Should be favorite after toggle');
  console.log('✓ Test 5: Favorites toggle service passed');

  // Test 6: Basket service
  await basketService.add('prod-coca-2l', 2);
  let basketItems = await basketService.getItems();
  if (basketItems.length !== 1 || basketItems[0].quantity !== 2) throw new Error('Basket add failed');
  await basketService.updateQuantity('prod-coca-2l', 5);
  basketItems = await basketService.getItems();
  if (basketItems[0].quantity !== 5) throw new Error('Basket update failed');
  await basketService.clear();
  basketItems = await basketService.getItems();
  if (basketItems.length !== 0) throw new Error('Basket clear failed');
  console.log('✓ Test 6: Basket CRUD service passed');

  console.log('--- ALL TECHNICAL TESTS PASSED SUCCESSFULLY! ---');
}

runDatabaseTests().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
