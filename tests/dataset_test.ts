import { SEED_PRODUCTS, SEED_STORES, SEED_PRICES, SEED_LEAFLETS } from '../src/data/seedData';
import { CZECH_RETAIL_CHAINS } from '../src/data/chains';

function runDatasetTests() {
  console.log('--- RUNNING TECHNICAL TEST: Dataset Integrity & Retail Chains ---');

  // Test 1: Retail Chains coverage
  const requiredChains = ['tesco', 'billa', 'albert', 'lidl', 'kaufland', 'rohlik', 'kosik', 'tamda'];
  for (const chain of requiredChains) {
    if (!CZECH_RETAIL_CHAINS[chain as keyof typeof CZECH_RETAIL_CHAINS]) {
      throw new Error(`Missing chain metadata for: ${chain}`);
    }
  }
  console.log(`✓ Test 1: All ${Object.keys(CZECH_RETAIL_CHAINS).length} Czech retail chains verified with loyalty club metadata.`);

  // Test 2: Product Integrity & Barcodes
  for (const prod of SEED_PRODUCTS) {
    if (!prod.ean || prod.ean.length !== 13) {
      throw new Error(`Invalid EAN-13 barcode for product: ${prod.name} (${prod.ean})`);
    }
    if (!prod.manufacturer || prod.manufacturer.length < 5) {
      throw new Error(`Missing or incomplete manufacturer info for: ${prod.name}`);
    }
    if (!prod.countryOfOrigin) {
      throw new Error(`Missing country of origin for: ${prod.name}`);
    }
    if (prod.nutrition.calories < 0 || prod.nutrition.protein < 0) {
      throw new Error(`Invalid nutrition data for: ${prod.name}`);
    }
  }
  console.log(`✓ Test 2: All ${SEED_PRODUCTS.length} products have valid EAN-13, manufacturers, origin, and nutrition profiles.`);

  // Test 3: Price Records Integrity
  for (const price of SEED_PRICES) {
    if (price.regularPrice <= 0) {
      throw new Error(`Invalid regular price in price record: ${price.id}`);
    }
    if (price.clubPrice !== undefined && price.clubPrice >= price.regularPrice) {
      throw new Error(`Club price must be lower than regular price: ${price.id}`);
    }
    if (price.pricePerUnit <= 0) {
      throw new Error(`Invalid price per unit in: ${price.id}`);
    }
    if (!price.productUrl || !price.productUrl.startsWith('http')) {
      throw new Error(`Missing valid product URL in: ${price.id}`);
    }
  }
  console.log(`✓ Test 3: All ${SEED_PRICES.length} price records have valid prices, unit prices, and direct lot URLs.`);

  // Test 4: Stores & Leaflets
  if (SEED_STORES.length < 5) throw new Error('Too few stores seeded');
  if (SEED_LEAFLETS.length < 3) throw new Error('Too few leaflets seeded');
  console.log(`✓ Test 4: Stores (${SEED_STORES.length}) and leaflets (${SEED_LEAFLETS.length}) verified.`);

  console.log('--- ALL DATASET TESTS PASSED SUCCESSFULLY! ---');
}

runDatasetTests();
