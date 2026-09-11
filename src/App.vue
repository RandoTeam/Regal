<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useI18n } from './i18n';
import LanguageSelector from './components/LanguageSelector.vue';
import FoldableTwoPane from './components/foldable/FoldableTwoPane.vue';
import ProductCard from './components/catalog/ProductCard.vue';
import ProductFilterBar from './components/catalog/ProductFilterBar.vue';
import ProductDetailModal from './components/catalog/ProductDetailModal.vue';
import FavoritesView from './components/favorites/FavoritesView.vue';
import CompareView from './components/compare/CompareView.vue';
import LeafletsView from './components/leaflets/LeafletsView.vue';
import BasketView from './components/basket/BasketView.vue';
import { useDevicePosture } from './composables/useDevicePosture';
import { initializeDatabase } from './data/seedRunner';
import { productService, favoriteService, basketService } from './db/services';
import type { ProductWithPrice, RetailChainId } from './db/types';

const { t, formatCurrency } = useI18n();
const { posture, simulatedMode, setSimulatedMode } = useDevicePosture();

const activeTab = ref<'catalog' | 'favorites' | 'compare' | 'basket' | 'leaflets'>('catalog');
const currentRegion = ref('Praha (všechny obchody)');
const searchQuery = ref('');
const selectedChain = ref<RetailChainId | 'all'>('all');
const promoOnly = ref(false);
const sortBy = ref<'price-asc' | 'unit-price' | 'discount'>('price-asc');

const products = ref<ProductWithPrice[]>([]);
const selectedProduct = ref<ProductWithPrice | null>(null);
const comparedProducts = ref<ProductWithPrice[]>([]);
const basketItemsCount = ref(0);
const isLoading = ref(true);

async function loadData() {
  isLoading.value = true;
  await initializeDatabase();
  await refreshProducts();
  const items = await basketService.getItems();
  basketItemsCount.value = items.reduce((acc, item) => acc + item.quantity, 0);
  isLoading.value = false;
}

async function refreshProducts() {
  const list = await productService.search(searchQuery.value, selectedChain.value, promoOnly.value);

  // Sorting
  list.sort((a, b) => {
    const priceA = a.bestPrice.clubPrice ?? a.bestPrice.regularPrice;
    const priceB = b.bestPrice.clubPrice ?? b.bestPrice.regularPrice;

    if (sortBy.value === 'price-asc') {
      return priceA - priceB;
    }
    if (sortBy.value === 'unit-price') {
      return a.bestPrice.pricePerUnit - b.bestPrice.pricePerUnit;
    }
    if (sortBy.value === 'discount') {
      const discA = a.bestPrice.discountPercentage ?? 0;
      const discB = b.bestPrice.discountPercentage ?? 0;
      return discB - discA;
    }
    return 0;
  });

  products.value = list;
}

// Basket calculations
const basketTotal = computed(() => {
  return products.value
    .filter(p => p.inBasketQuantity && p.inBasketQuantity > 0)
    .reduce((sum, p) => {
      const price = p.bestPrice.clubPrice ?? p.bestPrice.regularPrice;
      return sum + price * (p.inBasketQuantity || 0);
    }, 0);
});

// Nutrition calculations for basket
const basketNutrition = computed(() => {
  let cals = 0;
  let protein = 0;
  let carbs = 0;
  let fat = 0;
  let fiber = 0;

  for (const p of products.value) {
    if (p.inBasketQuantity && p.inBasketQuantity > 0) {
      const factor = (p.volumeLiters ? p.volumeLiters * 10 : (p.weightGrams ? p.weightGrams / 100 : 1)) * p.inBasketQuantity;
      cals += p.nutrition.calories * factor;
      protein += p.nutrition.protein * factor;
      carbs += p.nutrition.carbs * factor;
      fat += p.nutrition.fat * factor;
      fiber += p.nutrition.fiber * factor;
    }
  }

  return {
    calories: Math.round(cals),
    protein: Math.round(protein),
    carbs: Math.round(carbs),
    fat: Math.round(fat),
    fiber: Math.round(fiber)
  };
});

async function handleToggleFavorite(id: string) {
  await favoriteService.toggleFavorite(id);
  await refreshProducts();
}

function handleToggleCompare(product: ProductWithPrice) {
  const idx = comparedProducts.value.findIndex(p => p.id === product.id);
  if (idx !== -1) {
    comparedProducts.value.splice(idx, 1);
  } else {
    if (comparedProducts.value.length >= 4) {
      comparedProducts.value.shift();
    }
    comparedProducts.value.push(product);
  }
}

async function handleAddToBasket(id: string) {
  await basketService.add(id, 1);
  await refreshProducts();
  const items = await basketService.getItems();
  basketItemsCount.value = items.reduce((acc, item) => acc + item.quantity, 0);
}

async function handleRemoveFromBasket(id: string) {
  const p = products.value.find(item => item.id === id);
  if (p && p.inBasketQuantity) {
    await basketService.updateQuantity(id, p.inBasketQuantity - 1);
    await refreshProducts();
    const items = await basketService.getItems();
    basketItemsCount.value = items.reduce((acc, item) => acc + item.quantity, 0);
  }
}

onMounted(() => {
  loadData();
});
</script>

<template>
  <div class="min-h-full flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-emerald-500 selection:text-white font-sans">
    <!-- Main Top Bar -->
    <header class="border-b border-slate-200 dark:border-slate-800 bg-white/85 dark:bg-slate-900/85 backdrop-blur sticky top-0 z-40 px-4 py-3 flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-black text-lg shadow-sm shadow-emerald-500/20">
          K
        </div>
        <div>
          <h1 class="text-base font-bold tracking-tight flex items-center">
            {{ t.app.title }}
            <span class="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold ml-1.5 uppercase">
              {{ t.app.version }}
            </span>
          </h1>
          <p class="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
            {{ t.app.subtitle }}
          </p>
        </div>
      </div>

      <div class="flex items-center space-x-2">
        <!-- Foldable Posture Controls (Interactive Preview) -->
        <div class="hidden sm:flex items-center space-x-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200 dark:border-slate-700/60 text-[11px] font-semibold">
          <button
            @click="setSimulatedMode('auto')"
            class="px-2 py-1 rounded-lg transition-colors cursor-pointer"
            :class="simulatedMode === 'auto' ? 'bg-white dark:bg-slate-900 shadow-xs text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-500'"
            title="Auto-detect hardware fold"
          >
            Auto
          </button>
          <button
            @click="setSimulatedMode('book')"
            class="px-2 py-1 rounded-lg transition-colors cursor-pointer flex items-center space-x-1"
            :class="simulatedMode === 'book' ? 'bg-white dark:bg-slate-900 shadow-xs text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-500'"
            title="Foldable Dual-Screen (Book mode)"
          >
            <span>📖</span>
            <span>Fold</span>
          </button>
          <span class="text-[10px] text-slate-400 font-mono px-1 hidden md:inline">[{{ posture }}]</span>
          <button
            @click="setSimulatedMode('tabletop')"
            class="px-2 py-1 rounded-lg transition-colors cursor-pointer flex items-center space-x-1"
            :class="simulatedMode === 'tabletop' ? 'bg-white dark:bg-slate-900 shadow-xs text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-500'"
            title="Tabletop Mode (Clamshell 90 deg)"
          >
            <span>📐</span>
            <span>Tabletop</span>
          </button>
        </div>

        <!-- Region selector -->
        <div class="text-xs text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl font-medium border border-slate-200 dark:border-slate-700 hidden lg:flex items-center space-x-1.5">
          <span class="text-slate-400">{{ t.app.region_label }}:</span>
          <span>{{ currentRegion }}</span>
        </div>

        <!-- Language Switcher -->
        <LanguageSelector />
      </div>
    </header>

    <!-- Navigation Bar -->
    <nav class="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 overflow-x-auto shrink-0">
      <div class="max-w-7xl mx-auto flex space-x-1 py-1.5 text-xs font-semibold">
        <button
          @click="activeTab = 'catalog'"
          class="px-3.5 py-2 rounded-xl transition-colors cursor-pointer flex items-center space-x-1.5 whitespace-nowrap"
          :class="activeTab === 'catalog' ? 'bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'"
        >
          <span>📦</span>
          <span>{{ t.nav.catalog }}</span>
        </button>

        <button
          @click="activeTab = 'favorites'"
          class="px-3.5 py-2 rounded-xl transition-colors cursor-pointer flex items-center space-x-1.5 whitespace-nowrap"
          :class="activeTab === 'favorites' ? 'bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'"
        >
          <span>⭐</span>
          <span>{{ t.nav.favorites }}</span>
        </button>

        <button
          @click="activeTab = 'compare'"
          class="px-3.5 py-2 rounded-xl transition-colors cursor-pointer flex items-center space-x-1.5 whitespace-nowrap"
          :class="activeTab === 'compare' ? 'bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'"
        >
          <span>⚖️</span>
          <span>{{ t.nav.compare }} ({{ comparedProducts.length }})</span>
        </button>

        <button
          @click="activeTab = 'basket'"
          class="px-3.5 py-2 rounded-xl transition-colors cursor-pointer flex items-center space-x-1.5 whitespace-nowrap"
          :class="activeTab === 'basket' ? 'bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'"
        >
          <span>🛒</span>
          <span>{{ t.nav.basket }} ({{ basketItemsCount }})</span>
        </button>

        <button
          @click="activeTab = 'leaflets'"
          class="px-3.5 py-2 rounded-xl transition-colors cursor-pointer flex items-center space-x-1.5 whitespace-nowrap"
          :class="activeTab === 'leaflets' ? 'bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'"
        >
          <span>📰</span>
          <span>{{ t.nav.leaflets }}</span>
        </button>
      </div>
    </nav>

    <!-- Main Workspace -->
    <main class="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 min-h-0 overflow-y-auto">
      <!-- 1. Catalog View (with Foldable Two Pane) -->
      <FoldableTwoPane v-if="activeTab === 'catalog'" class="flex-1 min-h-0">
        <!-- PRIMARY PANE: Catalog, Search, Grid -->
        <template #primary>
          <div class="space-y-4 pr-0 lg:pr-2 pb-6">
            <ProductFilterBar
              v-model:searchQuery="searchQuery"
              v-model:selectedChain="selectedChain"
              v-model:promoOnly="promoOnly"
              v-model:sortBy="sortBy"
              @update:searchQuery="refreshProducts"
              @update:selectedChain="refreshProducts"
              @update:promoOnly="refreshProducts"
              @update:sortBy="refreshProducts"
            />

            <!-- Result Count & Status -->
            <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1 font-medium">
              <span>{{ t.search.results_found.replace('{count}', products.length.toString()) }}</span>
              <span v-if="selectedChain !== 'all'" class="font-semibold text-emerald-600 dark:text-emerald-400">
                Řetězec: {{ selectedChain.toUpperCase() }}
              </span>
            </div>

            <!-- Products Grid -->
            <div v-if="products.length > 0" class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <ProductCard
                v-for="product in products"
                :key="product.id"
                :product="product"
                :is-compared="comparedProducts.some(p => p.id === product.id)"
                @click-detail="selectedProduct = $event"
                @toggle-favorite="handleToggleFavorite"
                @toggle-compare="handleToggleCompare"
                @add-to-basket="handleAddToBasket"
                @remove-from-basket="handleRemoveFromBasket"
              />
            </div>

            <div v-else class="text-center py-12 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <div class="text-3xl">🔎</div>
              <h3 class="font-bold text-sm text-slate-700 dark:text-slate-300">{{ t.search.no_results }}</h3>
            </div>
          </div>
        </template>

        <!-- SECONDARY PANE: Optimizer Glance & Quick Basket -->
        <template #secondary>
          <div class="space-y-4 pl-0 lg:pl-2 pb-6">
            <div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider">
                  <span>🛒</span>
                  <span>{{ t.basket.title }}</span>
                </div>
                <span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {{ t.basket.items_count.replace('{count}', basketItemsCount.toString()) }}
                </span>
              </div>

              <!-- Total price -->
              <div class="flex items-baseline justify-between pt-1">
                <span class="text-xs font-bold text-slate-500">{{ t.basket.total }}:</span>
                <span class="text-2xl font-black text-slate-900 dark:text-white">{{ formatCurrency(basketTotal) }}</span>
              </div>

              <!-- Quick action to go to basket -->
              <button
                @click="activeTab = 'basket'"
                class="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-transform active:scale-98 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Otevřít chytrý košík a optimalizátor</span>
                <span>→</span>
              </button>

              <!-- Nutrition Profile Section -->
              <div class="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <div class="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span>🥗 {{ t.nutrition.basket_nutrition }}</span>
                  <span class="text-emerald-600 font-mono text-xs font-bold">{{ basketNutrition.calories }} kcal</span>
                </div>
                <div class="grid grid-cols-4 gap-1.5 text-center text-[10px]">
                  <div class="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800">
                    <span class="text-slate-400 block">{{ t.nutrition.protein }}</span>
                    <strong class="text-emerald-600 dark:text-emerald-400 text-xs">{{ basketNutrition.protein }}g</strong>
                  </div>
                  <div class="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800">
                    <span class="text-slate-400 block">{{ t.nutrition.carbs }}</span>
                    <strong class="text-slate-900 dark:text-white text-xs">{{ basketNutrition.carbs }}g</strong>
                  </div>
                  <div class="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800">
                    <span class="text-slate-400 block">{{ t.nutrition.fat }}</span>
                    <strong class="text-slate-900 dark:text-white text-xs">{{ basketNutrition.fat }}g</strong>
                  </div>
                  <div class="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800">
                    <span class="text-slate-400 block">{{ t.nutrition.fiber }}</span>
                    <strong class="text-slate-900 dark:text-white text-xs">{{ basketNutrition.fiber }}g</strong>
                  </div>
                </div>
              </div>
            </div>

            <!-- Compared Items Glance -->
            <div v-if="comparedProducts.length > 0" class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2.5">
              <div class="flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400">
                <span>⚖️ {{ t.nav.compare }} ({{ comparedProducts.length }})</span>
                <button @click="comparedProducts = []" class="text-slate-400 hover:text-rose-500 cursor-pointer">Smazat</button>
              </div>
              <div class="space-y-1.5 text-xs">
                <div v-for="cp in comparedProducts" :key="cp.id" class="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/80">
                  <span class="truncate max-w-[170px] font-medium">{{ cp.name }}</span>
                  <span class="font-bold text-slate-900 dark:text-white">
                    {{ formatCurrency(cp.bestPrice.clubPrice ?? cp.bestPrice.regularPrice) }}
                  </span>
                </div>
              </div>
              <button 
                @click="activeTab = 'compare'"
                class="w-full text-center text-xs text-blue-600 dark:text-blue-400 font-semibold py-1 hover:underline cursor-pointer"
              >
                Otevřít detailní srovnání →
              </button>
            </div>
          </div>
        </template>
      </FoldableTwoPane>

      <!-- 2. Favorites View -->
      <FavoritesView
        v-else-if="activeTab === 'favorites'"
        @click-detail="selectedProduct = $event"
        @toggle-compare="handleToggleCompare"
        @add-to-basket="handleAddToBasket"
        @remove-from-basket="handleRemoveFromBasket"
        @go-to-catalog="activeTab = 'catalog'"
      />

      <!-- 3. Compare View -->
      <CompareView
        v-else-if="activeTab === 'compare'"
        :products="comparedProducts"
        @remove="handleToggleCompare(comparedProducts.find(p => p.id === $event)!)"
        @clear="comparedProducts = []"
        @add-to-basket="handleAddToBasket"
        @go-to-catalog="activeTab = 'catalog'"
      />

      <!-- 4. Basket View -->
      <BasketView
        v-else-if="activeTab === 'basket'"
        @browse-catalog="activeTab = 'catalog'"
        @basket-updated="loadData"
      />

      <!-- 5. Leaflets View -->
      <LeafletsView
        v-else-if="activeTab === 'leaflets'"
      />
    </main>

    <!-- Product Detail Modal -->
    <ProductDetailModal
      :product="selectedProduct"
      @close="selectedProduct = null"
      @add-to-basket="handleAddToBasket"
    />
  </div>
</template>
