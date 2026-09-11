import type { Product } from '../db/types';

export interface NutritionTotals {
  calories: number; // kcal
  energyKj: number; // kJ (approx kcal * 4.184)
  protein: number;  // g
  carbs: number;    // g
  fat: number;      // g
  fiber: number;    // g
}

export interface MacroPercentages {
  proteinPercent: number; // % of total kcal
  carbsPercent: number;   // % of total kcal
  fatPercent: number;     // % of total kcal
}

export interface ProteinEfficiencyItem {
  productId: string;
  productName: string;
  imageUrl: string;
  totalProteinGrams: number;
  bestPrice: number;
  costPerGramProtein: number; // Kč / g
}

export interface NutritionGoal {
  id: 'standard' | 'fitness' | 'keto';
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

export const NUTRITION_GOALS: NutritionGoal[] = [
  {
    id: 'standard',
    name: 'Vyvážená strava (2000 kcal)',
    calories: 2000,
    protein: 75,
    carbs: 250,
    fat: 65,
    fiber: 28,
  },
  {
    id: 'fitness',
    name: 'Fitness & Svaly (2500 kcal)',
    calories: 2500,
    protein: 160,
    carbs: 270,
    fat: 70,
    fiber: 35,
  },
  {
    id: 'keto',
    name: 'Low-Carb / Keto (1800 kcal)',
    calories: 1800,
    protein: 110,
    carbs: 30,
    fat: 130,
    fiber: 25,
  },
];

/**
 * Calculates the multiplier to convert 100g / 100ml nutrition values to full product size
 */
export function getProductNutritionMultiplier(product: Product): number {
  if (product.volumeLiters && product.volumeLiters > 0) {
    // 1 L = 1000 ml = 10 * 100 ml
    return product.volumeLiters * 10;
  }
  if (product.weightGrams && product.weightGrams > 0) {
    // e.g. 500g = 5 * 100g
    return product.weightGrams / 100;
  }
  return 1;
}

/**
 * Calculates the nutrition totals for a single product with quantity
 */
export function calcProductNutrition(product: Product, quantity: number = 1): NutritionTotals {
  const mult = getProductNutritionMultiplier(product) * quantity;
  const cal = Math.round(product.nutrition.calories * mult);
  return {
    calories: cal,
    energyKj: Math.round(cal * 4.184),
    protein: Number((product.nutrition.protein * mult).toFixed(1)),
    carbs: Number((product.nutrition.carbs * mult).toFixed(1)),
    fat: Number((product.nutrition.fat * mult).toFixed(1)),
    fiber: Number((product.nutrition.fiber * mult).toFixed(1)),
  };
}

/**
 * Calculates the aggregated nutrition totals for all items in a basket
 */
export function calcBasketNutrition(items: { product: Product; quantity: number }[]): NutritionTotals {
  let calories = 0;
  let protein = 0;
  let carbs = 0;
  let fat = 0;
  let fiber = 0;

  for (const item of items) {
    const itemNut = calcProductNutrition(item.product, item.quantity);
    calories += itemNut.calories;
    protein += itemNut.protein;
    carbs += itemNut.carbs;
    fat += itemNut.fat;
    fiber += itemNut.fiber;
  }

  return {
    calories: Math.round(calories),
    energyKj: Math.round(calories * 4.184),
    protein: Number(protein.toFixed(1)),
    carbs: Number(carbs.toFixed(1)),
    fat: Number(fat.toFixed(1)),
    fiber: Number(fiber.toFixed(1)),
  };
}

/**
 * Calculates caloric distribution between Protein (4 kcal/g), Carbs (4 kcal/g), Fat (9 kcal/g)
 */
export function calcMacroPercentages(totals: NutritionTotals): MacroPercentages {
  const proteinKcal = totals.protein * 4;
  const carbsKcal = totals.carbs * 4;
  const fatKcal = totals.fat * 9;
  const totalMacroKcal = proteinKcal + carbsKcal + fatKcal;

  if (totalMacroKcal === 0) {
    return { proteinPercent: 0, carbsPercent: 0, fatPercent: 0 };
  }

  return {
    proteinPercent: Math.round((proteinKcal / totalMacroKcal) * 100),
    carbsPercent: Math.round((carbsKcal / totalMacroKcal) * 100),
    fatPercent: Math.round((fatKcal / totalMacroKcal) * 100),
  };
}

/**
 * Calculates price per 1g of protein for a single unit of product
 */
export function calcPricePerProtein(price: number, product: Product): number | null {
  const mult = getProductNutritionMultiplier(product);
  const totalProteinGrams = product.nutrition.protein * mult;
  if (totalProteinGrams <= 0) return null;
  return Number((price / totalProteinGrams).toFixed(2));
}

/**
 * Compiles a sorted leaderboard of basket items by protein cost-efficiency (cheapest protein first)
 */
export function getProteinCostLeaderboard(
  items: { product: Product; bestPrice: number }[]
): ProteinEfficiencyItem[] {
  const results: ProteinEfficiencyItem[] = [];

  for (const item of items) {
    const mult = getProductNutritionMultiplier(item.product);
    const totalProteinGrams = Number((item.product.nutrition.protein * mult).toFixed(1));
    if (totalProteinGrams > 0) {
      const costPerGram = Number((item.bestPrice / totalProteinGrams).toFixed(2));
      results.push({
        productId: item.product.id,
        productName: item.product.name,
        imageUrl: item.product.imageUrl,
        totalProteinGrams,
        bestPrice: item.bestPrice,
        costPerGramProtein: costPerGram,
      });
    }
  }

  return results.sort((a, b) => a.costPerGramProtein - b.costPerGramProtein);
}
