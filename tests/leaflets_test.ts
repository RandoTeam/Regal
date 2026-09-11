import { SEED_LEAFLETS } from '../src/data/seedData';

function runLeafletsTest() {
  console.log('--- RUNNING TECHNICAL TEST: Leaflets & Flyer Catalog ---');

  if (SEED_LEAFLETS.length === 0) throw new Error('No seed leaflets');

  for (const l of SEED_LEAFLETS) {
    if (!l.title || !l.validFrom || !l.validTo) {
      throw new Error(`Invalid leaflet metadata: ${l.id}`);
    }
    const from = new Date(l.validFrom).getTime();
    const to = new Date(l.validTo).getTime();
    if (to <= from) {
      throw new Error(`Invalid validity range: ${l.validFrom} to ${l.validTo}`);
    }
    if (l.pageCount <= 0) {
      throw new Error(`Invalid page count: ${l.pageCount}`);
    }
    if (!l.viewUrl.startsWith('http')) {
      throw new Error(`Invalid view URL: ${l.viewUrl}`);
    }
  }

  console.log(`✓ Test 1: All ${SEED_LEAFLETS.length} leaflets have valid dates, page counts, and live URLs.`);

  // Test 2: Filter by chain
  const tescoOnly = SEED_LEAFLETS.filter(l => l.chainId === 'tesco');
  if (tescoOnly.length !== 1) throw new Error('Chain filtering failed');
  console.log('✓ Test 2: Leaflet chain filtering passed.');

  console.log('--- ALL LEAFLET TESTS PASSED SUCCESSFULLY! ---');
}

runLeafletsTest();
