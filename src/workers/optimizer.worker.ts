export interface OptimizationInput {
  items: { productId: string; quantity: number }[];
  prices: { productId: string; storeId: string; chainId: string; price: number }[];
  frictionCostPerExtraStore: number; // e.g. 20 Kč
}

export interface StoreBasketSummary {
  storeId: string;
  chainId: string;
  totalCost: number;
  availableItemsCount: number;
}

export interface SplitSolution {
  storeIds: string[];
  totalItemCost: number;
  frictionCost: number;
  grandTotal: number;
  allocations: { productId: string; storeId: string; chainId: string; unitPrice: number; totalPrice: number }[];
  savingsVsSingle: number;
}

export interface OptimizationOutput {
  singleStoreOptions: StoreBasketSummary[];
  bestSingleStore: StoreBasketSummary | null;
  bestSplitSolution: SplitSolution | null;
}

// Pure combinatorial solver logic
export function solveBasketOptimization(input: OptimizationInput): OptimizationOutput {
  const { items, prices, frictionCostPerExtraStore } = input;

  if (items.length === 0 || prices.length === 0) {
    return {
      singleStoreOptions: [],
      bestSingleStore: null,
      bestSplitSolution: null
    };
  }

  // Map prices by `storeId:productId`
  const priceLookup = new Map<string, { price: number; chainId: string }>();
  const storeIdsSet = new Set<string>();

  for (const p of prices) {
    priceLookup.set(`${p.storeId}:${p.productId}`, { price: p.price, chainId: p.chainId });
    storeIdsSet.add(p.storeId);
  }

  const allStores = Array.from(storeIdsSet);

  // 1. Single store calculations
  const singleStoreOptions: StoreBasketSummary[] = [];

  for (const storeId of allStores) {
    let totalCost = 0;
    let availableCount = 0;
    let chainId = '';

    for (const item of items) {
      const match = priceLookup.get(`${storeId}:${item.productId}`);
      if (match) {
        totalCost += match.price * item.quantity;
        availableCount++;
        chainId = match.chainId;
      }
    }

    if (availableCount > 0) {
      singleStoreOptions.push({
        storeId,
        chainId,
        totalCost: Number(totalCost.toFixed(2)),
        availableItemsCount: availableCount
      });
    }
  }

  // Sort single store options by full availability first, then lowest cost
  singleStoreOptions.sort((a, b) => {
    if (a.availableItemsCount !== b.availableItemsCount) {
      return b.availableItemsCount - a.availableItemsCount;
    }
    return a.totalCost - b.totalCost;
  });

  const bestSingleStore = singleStoreOptions[0] || null;

  // 2. Multi-store split combinations (evaluating 2-store combinations)
  let bestSplitSolution: SplitSolution | null = null;

  for (let i = 0; i < allStores.length; i++) {
    for (let j = i + 1; j < allStores.length; j++) {
      const pair = [allStores[i], allStores[j]];
      let comboItemCost = 0;
      let allAvailable = true;
      const allocations: SplitSolution['allocations'] = [];

      for (const item of items) {
        let lowestPrice = Infinity;
        let chosenStore = '';
        let chosenChain = '';

        for (const storeId of pair) {
          const match = priceLookup.get(`${storeId}:${item.productId}`);
          if (match && match.price < lowestPrice) {
            lowestPrice = match.price;
            chosenStore = storeId;
            chosenChain = match.chainId;
          }
        }

        if (lowestPrice === Infinity) {
          allAvailable = false;
          break;
        }

        const totalPrice = lowestPrice * item.quantity;
        comboItemCost += totalPrice;
        allocations.push({
          productId: item.productId,
          storeId: chosenStore,
          chainId: chosenChain,
          unitPrice: lowestPrice,
          totalPrice
        });
      }

      if (!allAvailable) continue;

      const friction = frictionCostPerExtraStore; // 1 extra store
      const grandTotal = Number((comboItemCost + friction).toFixed(2));
      const savings = bestSingleStore ? Number((bestSingleStore.totalCost - grandTotal).toFixed(2)) : 0;

      if (!bestSplitSolution || grandTotal < bestSplitSolution.grandTotal) {
        bestSplitSolution = {
          storeIds: pair,
          totalItemCost: Number(comboItemCost.toFixed(2)),
          frictionCost: friction,
          grandTotal,
          allocations,
          savingsVsSingle: Math.max(0, savings)
        };
      }
    }
  }

  return {
    singleStoreOptions,
    bestSingleStore,
    bestSplitSolution
  };
}

// Web Worker message listener
if (typeof self !== 'undefined' && 'addEventListener' in self) {
  self.addEventListener('message', (e: MessageEvent<OptimizationInput>) => {
    const result = solveBasketOptimization(e.data);
    self.postMessage(result);
  });
}
