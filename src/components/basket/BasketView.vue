<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useI18n } from '../../i18n';
import { basketService } from '../../db/services';
import { db } from '../../db';
import type { ProductWithPrice } from '../../db/types';
import { useBasketOptimizer } from '../../composables/useBasketOptimizer';
import NutritionCard from '../nutrition/NutritionCard.vue';

const emit = defineEmits<{
  (e: 'browse-catalog'): void;
  (e: 'basket-updated'): void;
}>();

const { t, formatCurrency } = useI18n();
const { isOptimizing, result: optimizationResult, optimize } = useBasketOptimizer();

interface BasketEntry {
  product: ProductWithPrice;
  quantity: number;
}

const items = ref<BasketEntry[]>([]);
const isLoading = ref(true);
const frictionCost = ref(20); // 20 Kč default friction

async function loadBasket() {
  isLoading.value = true;
  items.value = await basketService.getItems();
  isLoading.value = false;
  
  if (items.value.length > 0) {
    runOptimization();
  }
}

async function updateQty(productId: string, newQty: number) {
  await basketService.updateQuantity(productId, newQty);
  await loadBasket();
  emit('basket-updated');
}

async function removeItem(productId: string) {
  await basketService.updateQuantity(productId, 0);
  await loadBasket();
  emit('basket-updated');
}

async function clearAll() {
  if (confirm('Opravdu chcete vymazat celý nákupní košík?')) {
    await basketService.clear();
    await loadBasket();
    emit('basket-updated');
  }
}

async function runOptimization() {
  if (items.value.length === 0) return;

  // Gather prices for all items in basket from db
  const productIds = items.value.map(i => i.product.id);
  const allPrices = await db.prices.where('productId').anyOf(productIds).toArray();

  const pricesInput = allPrices.map(p => ({
    productId: p.productId,
    storeId: p.storeId,
    chainId: p.chainId,
    price: p.clubPrice ?? p.regularPrice
  }));

  const itemsInput = items.value.map(i => ({
    productId: i.product.id,
    quantity: i.quantity
  }));

  await optimize({
    items: itemsInput,
    prices: pricesInput,
    frictionCostPerExtraStore: frictionCost.value
  });
}

const totalCost = computed(() => {
  return items.value.reduce((sum, item) => {
    const unitPrice = item.product.bestPrice.clubPrice ?? item.product.bestPrice.regularPrice;
    return sum + unitPrice * item.quantity;
  }, 0);
});

const nutritionItems = computed(() => {
  return items.value.map(item => ({
    product: item.product,
    quantity: item.quantity,
    bestPrice: item.product.bestPrice.clubPrice ?? item.product.bestPrice.regularPrice
  }));
});

onMounted(() => {
  loadBasket();
});
</script>

<template>
  <div class="space-y-5 max-w-5xl mx-auto pb-12">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-neutral-800 p-4 rounded-2xl border border-neutral-100 dark:border-neutral-700 shadow-xs">
      <div>
        <h2 class="text-xl font-black text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
          <span>🛒</span>
          <span>{{ t.basket.title }}</span>
          <span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
            {{ items.length }} položek
          </span>
        </h2>
        <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
          Kombinatorický kalkulátor nákupu napříč řetězci v ČR
        </p>
      </div>

      <div v-if="items.length > 0" class="flex items-center gap-2">
        <button
          @click="clearAll"
          class="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 px-3 py-2 rounded-xl transition-colors cursor-pointer"
        >
          {{ t.basket.clear }}
        </button>
        <button
          @click="runOptimization"
          :disabled="isOptimizing"
          class="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
        >
          <span :class="{ 'animate-spin': isOptimizing }">⚡</span>
          <span>{{ isOptimizing ? t.basket.optimizing : t.basket.optimize_btn }}</span>
        </button>
      </div>
    </div>

    <!-- Empty State -->
    <div 
      v-if="items.length === 0 && !isLoading" 
      class="text-center py-16 px-6 bg-white dark:bg-neutral-800 rounded-3xl border border-neutral-100 dark:border-neutral-700 shadow-xs space-y-4"
    >
      <div class="text-5xl">🧺</div>
      <h3 class="text-lg font-bold text-neutral-800 dark:text-neutral-200">
        {{ t.basket.empty_basket }}
      </h3>
      <p class="text-xs text-neutral-500 dark:text-neutral-400 max-w-md mx-auto">
        Přidejte si produkty z katalogu, porovnejte jejich ceny a nechte náš algoritmus najít nejlevnější kombinaci prodejen.
      </p>
      <button
        @click="emit('browse-catalog')"
        class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm transition-transform active:scale-95 cursor-pointer"
      >
        Procházet akční nabídky
      </button>
    </div>

    <!-- Basket Content: Adaptive Dual-Pane for Foldables / Desktop -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-5">
      <!-- Left Column / Bottom Pane on Tabletop: Items List -->
      <div class="lg:col-span-7 space-y-3">
        <div class="bg-white dark:bg-neutral-800 rounded-2xl p-4 border border-neutral-100 dark:border-neutral-700 shadow-xs">
          <div class="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-750 mb-3 text-xs font-bold text-neutral-600 dark:text-neutral-300">
            <span>Seznam položek</span>
            <span>Mezisoučet: {{ formatCurrency(totalCost) }}</span>
          </div>

          <div class="divide-y divide-neutral-100 dark:divide-neutral-750">
            <div 
              v-for="item in items" 
              :key="item.product.id"
              class="py-3 flex items-center justify-between gap-3"
            >
              <!-- Product Info -->
              <div class="flex items-center gap-3 min-w-0">
                <img 
                  :src="item.product.imageUrl" 
                  :alt="item.product.name"
                  class="w-12 h-12 rounded-xl object-cover border border-neutral-100 dark:border-neutral-700 shrink-0 bg-neutral-50 dark:bg-neutral-900"
                />
                <div class="min-w-0">
                  <h4 class="font-bold text-xs text-neutral-900 dark:text-neutral-100 truncate">
                    {{ item.product.name }}
                  </h4>
                  <div class="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 flex items-center gap-2">
                    <span class="font-semibold text-emerald-600 dark:text-emerald-400">
                      {{ formatCurrency(item.product.bestPrice.clubPrice ?? item.product.bestPrice.regularPrice) }}
                    </span>
                    <span class="text-[10px] text-neutral-400">
                      ({{ item.product.bestPrice.chainId.toUpperCase() }})
                    </span>
                  </div>
                </div>
              </div>

              <!-- Quantity Controls & Actions -->
              <div class="flex items-center gap-3 shrink-0">
                <div class="flex items-center bg-neutral-100 dark:bg-neutral-900 rounded-xl p-0.5 border border-neutral-200/60 dark:border-neutral-700">
                  <button
                    @click="updateQty(item.product.id, item.quantity - 1)"
                    class="w-7 h-7 flex items-center justify-center font-bold text-neutral-600 dark:text-neutral-300 hover:bg-white dark:hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span class="w-7 text-center font-bold text-xs text-neutral-800 dark:text-neutral-200">
                    {{ item.quantity }}
                  </span>
                  <button
                    @click="updateQty(item.product.id, item.quantity + 1)"
                    class="w-7 h-7 flex items-center justify-center font-bold text-neutral-600 dark:text-neutral-300 hover:bg-white dark:hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <div class="text-right min-w-[65px]">
                  <span class="font-black text-xs text-neutral-900 dark:text-neutral-100">
                    {{ formatCurrency((item.product.bestPrice.clubPrice ?? item.product.bestPrice.regularPrice) * item.quantity) }}
                  </span>
                </div>

                <button
                  @click="removeItem(item.product.id)"
                  class="text-neutral-400 hover:text-rose-500 p-1 rounded-lg transition-colors cursor-pointer"
                  title="Odstranit"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column / Top Pane on Tabletop: Optimizer & Nutrition -->
      <div class="lg:col-span-5 space-y-4">
        <!-- Optimizer Recommendation Card -->
        <div class="bg-white dark:bg-neutral-800 rounded-2xl p-4 border border-neutral-100 dark:border-neutral-700 shadow-xs space-y-3.5">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="text-base">🧭</span>
              <h3 class="font-bold text-sm text-neutral-800 dark:text-neutral-100">
                Chytrý rádce nákupu
              </h3>
            </div>
            
            <!-- Friction cost selector -->
            <div class="flex items-center gap-1 text-[11px] text-neutral-500">
              <span>Cesta:</span>
              <select 
                v-model.number="frictionCost"
                @change="runOptimization"
                class="bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg px-1.5 py-0.5 text-xs font-bold text-neutral-700 dark:text-neutral-300"
              >
                <option :value="0">0 Kč (pěšky)</option>
                <option :value="15">15 Kč (MHD)</option>
                <option :value="20">20 Kč (auto krátké)</option>
                <option :value="40">40 Kč (auto delší)</option>
              </select>
            </div>
          </div>

          <!-- Optimization Output -->
          <div v-if="optimizationResult" class="space-y-3">
            <!-- 1. Split trip recommendation (if savings > 0) -->
            <div 
              v-if="optimizationResult.bestSplitSolution && optimizationResult.bestSplitSolution.savingsVsSingle > 0"
              class="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-2"
            >
              <div class="flex items-center justify-between">
                <span class="font-bold text-xs text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
                  <span>💡</span>
                  <span>{{ t.basket.split_recommendation }}</span>
                </span>
                <span class="px-2 py-0.5 bg-emerald-600 text-white rounded-md text-[11px] font-black">
                  {{ t.basket.save_amount.replace('{amount}', optimizationResult.bestSplitSolution.savingsVsSingle.toString()) }}
                </span>
              </div>

              <p class="text-[11px] text-emerald-700 dark:text-emerald-300 leading-relaxed">
                Rozdělením nákupu do 2 prodejen zaplatíte celkem <strong>{{ formatCurrency(optimizationResult.bestSplitSolution.grandTotal) }}</strong>
                (včetně {{ frictionCost }} Kč na dopravu).
              </p>

              <!-- Stores Involved -->
              <div class="pt-1.5 border-t border-emerald-200/60 dark:border-emerald-800/60 space-y-1.5 text-xs">
                <div 
                  v-for="storeId in optimizationResult.bestSplitSolution.storeIds" 
                  :key="storeId"
                  class="flex items-center justify-between text-[11px] text-emerald-800 dark:text-emerald-200 font-medium"
                >
                  <span class="flex items-center gap-1.5">
                    <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <strong class="uppercase">{{ storeId.split('-')[0] }}</strong>
                    <span class="text-[10px] text-neutral-500">
                      ({{ optimizationResult.bestSplitSolution.allocations.filter(a => a.storeId === storeId).length }} pol.)
                    </span>
                  </span>
                  <span class="font-bold">
                    {{ formatCurrency(optimizationResult.bestSplitSolution.allocations.filter(a => a.storeId === storeId).reduce((s, a) => s + a.totalPrice, 0)) }}
                  </span>
                </div>
              </div>
            </div>

            <!-- 2. Single store best option -->
            <div 
              v-if="optimizationResult.bestSingleStore"
              class="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-700 space-y-1.5"
            >
              <div class="flex items-center justify-between text-xs">
                <span class="font-semibold text-neutral-700 dark:text-neutral-300">
                  {{ t.basket.cheapest_single }}:
                </span>
                <span class="font-extrabold text-neutral-900 dark:text-white">
                  {{ formatCurrency(optimizationResult.bestSingleStore.totalCost) }}
                </span>
              </div>
              <div class="flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400">
                <span class="uppercase font-bold text-neutral-600 dark:text-neutral-300">
                  🏪 {{ optimizationResult.bestSingleStore.chainId }}
                </span>
                <span class="text-[10px]">
                  Dostupnost: {{ optimizationResult.bestSingleStore.availableItemsCount }} / {{ items.length }} položek
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Integrated Nutrition Profile -->
        <NutritionCard :items="nutritionItems" />
      </div>
    </div>
  </div>
</template>
