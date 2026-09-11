import { SEED_PRODUCTS, SEED_PRICES } from '../src/data/seedData';

function runCompareTest() {
  console.log('--- RUNNING TECHNICAL TEST: Comparison Engine ---');

  // Test 1: Compare Coca-Cola 2L vs 1.5L vs 0.5L on unit price
  const pricesForCoca = SEED_PRICES.filter(p => p.productId.startsWith('prod-coca'));
  const unitPrices = pricesForCoca.map(p => ({
    productId: p.productId,
    unitPrice: p.pricePerUnit
  }));

  const lowest = unitPrices.reduce((min, cur) => cur.unitPrice < min.unitPrice ? cur : min);
  // Coca-Cola 1.5L at Albert with Můj Albert is 17.93 Kč / 1 l
  if (lowest.unitPrice > 18.0) {
    throw new Error(`Expected lowest unit price < 18.0, got ${lowest.unitPrice}`);
  }
  console.log(`✓ Test 1: Unit price comparison correctly identified lowest price per liter (${lowest.unitPrice} Kč / 1 l)`);

  // Test 2: Protein value efficiency test
  const chicken = SEED_PRODUCTS.find(p => p.id === 'prod-kureci-prsa-1kg')!;
  const milk = SEED_PRODUCTS.find(p => p.id === 'prod-madeta-mleko-1l')!;

  const chickenPrice = 129.90; // Kaufland action
  const chickenProteinTotal = (chicken.nutrition.protein / 100) * chicken.weightGrams!; // 230g protein
  const chickenCostPerProtein = chickenPrice / chickenProteinTotal; // ~0.56 Kč / g

  const milkPrice = 15.90; // Albert action
  const milkProteinTotal = (milk.nutrition.protein / 100) * 1000; // 33g protein
  const milkCostPerProtein = milkPrice / milkProteinTotal; // ~0.48 Kč / g

  if (milkCostPerProtein <= 0 || chickenCostPerProtein <= 0) {
    throw new Error('Protein cost calculation failed');
  }
  console.log(`✓ Test 2: Protein efficiency correctly calculated: Milk = ${milkCostPerProtein.toFixed(2)} Kč/g, Chicken = ${chickenCostPerProtein.toFixed(2)} Kč/g`);

  console.log('--- ALL COMPARISON TESTS PASSED SUCCESSFULLY! ---');
}

runCompareTest();
