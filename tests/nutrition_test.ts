import { 
  getProductNutritionMultiplier,
  calcProductNutrition,
  calcBasketNutrition,
  calcMacroPercentages,
  calcPricePerProtein,
  getProteinCostLeaderboard
} from '../src/utils/nutrition';
import type { Product } from '../src/db/types';

const cola: Product = {
  id: 'cola-2l',
  ean: '5449000000996',
  name: 'Coca-Cola Original 2 l',
  brand: 'Coca-Cola',
  category: 'Nápoje',
  volumeLiters: 2.0,
  packagingType: 'PET',
  countryOfOrigin: 'Česká republika',
  manufacturer: 'Coca-Cola HBC Česko a Slovensko, s.r.o., Praha 9 - Kyje',
  imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400',
  nutrition: {
    calories: 42,
    protein: 0,
    carbs: 10.6,
    fat: 0,
    fiber: 0
  }
};

const milk: Product = {
  id: 'madeta-mleko-1l',
  ean: '8593803112345',
  name: 'Madeta Jihočeské mléko plnotučné 3.5% 1 l',
  brand: 'Madeta',
  category: 'Mléčné výrobky',
  volumeLiters: 1.0,
  packagingType: 'TetraPak',
  countryOfOrigin: 'Česká republika',
  manufacturer: 'Madeta a.s., České Budějovice',
  imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400',
  nutrition: {
    calories: 64,
    protein: 3.3,
    carbs: 4.8,
    fat: 3.5,
    fiber: 0
  }
};

const chicken: Product = {
  id: 'vodnanske-kure',
  ean: '8594005551234',
  name: 'Vodňanské kuře chlazené bez drobů cca 1.2 kg',
  brand: 'Vodňanská drůbež',
  category: 'Maso a uzeniny',
  weightGrams: 1200,
  packagingType: 'Balení',
  countryOfOrigin: 'Česká republika',
  manufacturer: 'Vodňanská drůbež, a.s., Vodňany',
  imageUrl: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400',
  nutrition: {
    calories: 145,
    protein: 19.0,
    carbs: 0.5,
    fat: 7.5,
    fiber: 0
  }
};

async function runTest() {
  console.log('--- RUNNING TECHNICAL TEST: Nutrition & Macro Engine ---');

  // Test 1: Multiplier
  const multCola = getProductNutritionMultiplier(cola);
  const multChicken = getProductNutritionMultiplier(chicken);
  if (multCola !== 20) throw new Error(`Cola multiplier should be 20, got ${multCola}`);
  if (multChicken !== 12) throw new Error(`Chicken multiplier should be 12, got ${multChicken}`);
  console.log('✓ Test 1: Product size multipliers correctly resolved (2L -> 20x, 1.2kg -> 12x)');

  // Test 2: Single item nutrition
  const colaNut = calcProductNutrition(cola, 1);
  if (colaNut.calories !== 840) throw new Error(`Cola calories should be 840, got ${colaNut.calories}`);
  if (colaNut.carbs !== 212) throw new Error(`Cola carbs should be 212g, got ${colaNut.carbs}`);

  const chickenNut = calcProductNutrition(chicken, 1);
  if (chickenNut.protein !== 228) throw new Error(`Chicken protein should be 228g, got ${chickenNut.protein}`);
  console.log('✓ Test 2: Product nutrition scaled accurately to whole package');

  // Test 3: Basket aggregate
  const basket = [
    { product: chicken, quantity: 1 },
    { product: milk, quantity: 2 }
  ];
  const basketNut = calcBasketNutrition(basket);
  // Milk: protein = 3.3 * 10 * 2 = 66g. Total = 228 + 66 = 294g
  if (basketNut.protein !== 294) {
    throw new Error(`Basket protein should be 294g, got ${basketNut.protein}`);
  }
  console.log('✓ Test 3: Aggregated basket nutrition totals verified');

  // Test 4: Macro percentages
  const macros = calcMacroPercentages(basketNut);
  const sumPercent = macros.proteinPercent + macros.carbsPercent + macros.fatPercent;
  if (Math.abs(sumPercent - 100) > 2) {
    throw new Error(`Macro percentages should sum to ~100%, got ${sumPercent}%`);
  }
  console.log(`✓ Test 4: Macro energy distribution calculated: P: ${macros.proteinPercent}%, C: ${macros.carbsPercent}%, F: ${macros.fatPercent}%`);

  // Test 5: Cost per gram of protein
  const milkCostPerProtein = calcPricePerProtein(16.90, milk); // 16.90 / 33 = 0.51
  const chickenCostPerProtein = calcPricePerProtein(129.90, chicken); // 129.90 / 228 = 0.57
  if (milkCostPerProtein !== 0.51) throw new Error(`Milk cost per protein should be 0.51, got ${milkCostPerProtein}`);
  if (chickenCostPerProtein !== 0.57) throw new Error(`Chicken cost per protein should be 0.57, got ${chickenCostPerProtein}`);

  const leaderboard = getProteinCostLeaderboard([
    { product: chicken, bestPrice: 129.90 },
    { product: milk, bestPrice: 16.90 }
  ]);
  if (leaderboard[0].productId !== 'madeta-mleko-1l') {
    throw new Error('Milk should be ranked first in protein cost leaderboard');
  }
  console.log('✓ Test 5: Cost per 1g protein & efficiency leaderboard verified');

  console.log('--- ALL NUTRITION TESTS PASSED SUCCESSFULLY! ---');
}

runTest().catch((err) => {
  console.error('Nutrition test failed:', err);
  process.exit(1);
});
