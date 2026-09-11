import { solveBasketOptimization } from '../src/workers/optimizer.worker';

async function runTest() {
  console.log('Running Basket Optimizer Unit Tests...');

  // Test 1: Empty input
  const emptyRes = solveBasketOptimization({
    items: [],
    prices: [],
    frictionCostPerExtraStore: 20
  });
  if (emptyRes.singleStoreOptions.length !== 0 || emptyRes.bestSingleStore !== null) {
    throw new Error('Empty basket should return empty results');
  }
  console.log('✔ Test 1 passed: Empty basket handled correctly');

  // Test 2: Single-store options ranking
  const items = [
    { productId: 'p1', quantity: 2 },
    { productId: 'p2', quantity: 1 }
  ];

  const prices = [
    // Store A has both
    { productId: 'p1', storeId: 'store-a', chainId: 'albert', price: 30 },
    { productId: 'p2', storeId: 'store-a', chainId: 'albert', price: 40 },
    // Store B has both
    { productId: 'p1', storeId: 'store-b', chainId: 'lidl', price: 20 },
    { productId: 'p2', storeId: 'store-b', chainId: 'lidl', price: 60 },
    // Store C has only p1
    { productId: 'p1', storeId: 'store-c', chainId: 'billa', price: 15 },
  ];

  const res1 = solveBasketOptimization({
    items,
    prices,
    frictionCostPerExtraStore: 20
  });

  if (!res1.bestSingleStore || res1.bestSingleStore.totalCost !== 100) {
    throw new Error(`Expected best single store total to be 100, got ${res1.bestSingleStore?.totalCost}`);
  }
  console.log('✔ Test 2 passed: Single-store evaluation computed correctly');

  // Test 3: Multi-store split trip evaluation with friction cost
  // Store A: p1=50, p2=40 -> Total in A = 2*50 + 1*40 = 140
  // Store B: p1=20, p2=80 -> Total in B = 2*20 + 1*80 = 120
  // Store C: p1=15, p2=90 -> Total in C = 2*15 + 1*90 = 120
  // Best single store is B or C with 120 Kč
  // Best pair (Store C, Store A):
  // p1 from C: 2*15 = 30
  // p2 from A: 1*40 = 40
  // Item total = 70 Kč. Friction = 20 Kč. Grand total = 90 Kč.
  // Savings vs best single store (120) = 30 Kč!
  const splitPrices = [
    { productId: 'p1', storeId: 'store-a', chainId: 'albert', price: 50 },
    { productId: 'p2', storeId: 'store-a', chainId: 'albert', price: 40 },
    { productId: 'p1', storeId: 'store-b', chainId: 'lidl', price: 20 },
    { productId: 'p2', storeId: 'store-b', chainId: 'lidl', price: 80 },
    { productId: 'p1', storeId: 'store-c', chainId: 'billa', price: 15 },
    { productId: 'p2', storeId: 'store-c', chainId: 'billa', price: 90 },
  ];
  
  const res2 = solveBasketOptimization({
    items,
    prices: splitPrices,
    frictionCostPerExtraStore: 20
  });

  if (!res2.bestSingleStore || res2.bestSingleStore.totalCost !== 120) {
    throw new Error(`Expected best single store total to be 120, got ${res2.bestSingleStore?.totalCost}`);
  }

  if (!res2.bestSplitSolution) {
    throw new Error('Expected a split solution');
  }

  if (res2.bestSplitSolution.totalItemCost !== 70) {
    throw new Error(`Expected totalItemCost 70, got ${res2.bestSplitSolution.totalItemCost}`);
  }

  if (res2.bestSplitSolution.grandTotal !== 90) {
    throw new Error(`Expected grandTotal 90, got ${res2.bestSplitSolution.grandTotal}`);
  }

  if (res2.bestSplitSolution.savingsVsSingle !== 30) {
    throw new Error(`Expected savingsVsSingle 30, got ${res2.bestSplitSolution.savingsVsSingle}`);
  }

  console.log('✔ Test 3 passed: Split trip combinatorial search with friction cost verified');
  console.log('All Basket Optimizer tests passed successfully!');
}

runTest().catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});
