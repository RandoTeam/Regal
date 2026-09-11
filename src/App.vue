<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from './i18n';
import LanguageSelector from './components/LanguageSelector.vue';

const { t, formatCurrency } = useI18n();

const activeTab = ref<'catalog' | 'favorites' | 'compare' | 'basket' | 'leaflets'>('catalog');
const currentRegion = ref('Praha (všechny obchody)');
const samplePrice = ref(36.90);
</script>

<template>
  <div class="min-h-full flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
    <!-- Main Header -->
    <header class="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur sticky top-0 z-30 px-4 py-3 flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-lg shadow-sm shadow-emerald-500/20">
          K
        </div>
        <div>
          <h1 class="text-base font-bold tracking-tight">
            {{ t.app.title }}
            <span class="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-semibold ml-1.5">
              {{ t.app.version }}
            </span>
          </h1>
          <p class="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
            {{ t.app.subtitle }}
          </p>
        </div>
      </div>

      <div class="flex items-center space-x-2.5">
        <div class="text-xs text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl font-medium border border-slate-200 dark:border-slate-700 hidden md:flex items-center space-x-1.5">
          <span class="text-slate-400">{{ t.app.region_label }}:</span>
          <span>{{ currentRegion }}</span>
        </div>

        <!-- Language Selector -->
        <LanguageSelector />
      </div>
    </header>

    <!-- Navigation Tabs -->
    <nav class="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 overflow-x-auto">
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
          <span>{{ t.nav.compare }}</span>
        </button>

        <button
          @click="activeTab = 'basket'"
          class="px-3.5 py-2 rounded-xl transition-colors cursor-pointer flex items-center space-x-1.5 whitespace-nowrap"
          :class="activeTab === 'basket' ? 'bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'"
        >
          <span>🛒</span>
          <span>{{ t.nav.basket }}</span>
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

    <!-- Main Content Area -->
    <main class="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 space-y-6">
      <!-- Search & i18n showcase banner -->
      <div class="rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 text-white p-6 md:p-8 shadow-sm relative overflow-hidden">
        <div class="relative z-10 max-w-2xl space-y-3">
          <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur text-xs font-semibold">
            <span>🇨🇿</span>
            <span>Česká Republika • i18n v1.2</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {{ t.app.subtitle }}
          </h2>
          <p class="text-emerald-50 text-sm leading-relaxed">
            {{ t.search.placeholder }}
          </p>

          <!-- Search Input Preview -->
          <div class="pt-2">
            <div class="flex items-center bg-white dark:bg-slate-900 rounded-2xl p-1.5 shadow-md max-w-lg border border-white/20">
              <span class="pl-3 text-slate-400">🔍</span>
              <input
                type="text"
                :placeholder="t.search.placeholder"
                class="w-full bg-transparent px-3 py-2 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
              />
              <button class="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer transition-colors">
                {{ t.search.sort_by }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Demonstration Grid showing i18n across all sections -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Card 1: Sample Product & Currency -->
        <div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div class="flex items-center justify-between text-xs text-slate-500">
            <span class="font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Tesco / Billa</span>
            <span>{{ t.product.valid_until }}: 8.9.2026</span>
          </div>
          <h3 class="font-bold text-base">Coca-Cola Original 2.0 l</h3>
          <div class="flex items-baseline space-x-2">
            <span class="text-2xl font-black text-slate-900 dark:text-white">{{ formatCurrency(samplePrice) }}</span>
            <span class="text-xs line-through text-slate-400">{{ formatCurrency(49.90) }}</span>
            <span class="text-xs px-2 py-0.5 rounded-md bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-400 font-bold">-26%</span>
          </div>
          <div class="text-xs text-slate-500 dark:text-slate-400 space-y-1 pt-1 border-t border-slate-100 dark:border-slate-800">
            <div><strong>{{ t.product.origin }}:</strong> Česká republika (Praha 9 – Kyje)</div>
            <div><strong>{{ t.product.club_price }}:</strong> {{ formatCurrency(samplePrice) }} (Clubcard)</div>
          </div>
          <button class="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer">
            + {{ t.product.add_to_basket }}
          </button>
        </div>

        <!-- Card 2: Basket & Optimizer Demo -->
        <div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div class="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider">
            <span>🛒</span>
            <span>{{ t.basket.title }}</span>
          </div>
          <h3 class="font-bold text-base">{{ t.basket.split_recommendation }}</h3>
          <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {{ t.basket.save_amount.replace('{amount}', '84') }}
          </p>
          <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs space-y-1.5">
            <div class="flex justify-between font-semibold">
              <span>{{ t.basket.cheapest_single }}:</span>
              <span>{{ formatCurrency(412) }}</span>
            </div>
            <div class="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
              <span>Smart Split (Tesco + Lidl):</span>
              <span>{{ formatCurrency(328) }}</span>
            </div>
          </div>
          <button class="w-full py-2.5 px-4 rounded-xl bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 text-white dark:text-slate-900 text-xs font-bold transition-colors cursor-pointer">
            {{ t.basket.optimize_btn }}
          </button>
        </div>

        <!-- Card 3: Nutrition & KBJU Demo -->
        <div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div class="flex items-center space-x-2 text-cyan-600 dark:text-cyan-400 font-bold text-xs uppercase tracking-wider">
            <span>🥗</span>
            <span>{{ t.nutrition.title }}</span>
          </div>
          <h3 class="font-bold text-base">{{ t.nutrition.basket_nutrition }}</h3>
          <div class="grid grid-cols-2 gap-2 text-center text-xs">
            <div class="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60">
              <div class="text-slate-400 text-[10px]">{{ t.nutrition.calories }}</div>
              <div class="font-bold text-slate-900 dark:text-white text-sm">840 kcal</div>
            </div>
            <div class="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60">
              <div class="text-slate-400 text-[10px]">{{ t.nutrition.protein }}</div>
              <div class="font-bold text-emerald-600 dark:text-emerald-400 text-sm">56 g</div>
            </div>
            <div class="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60">
              <div class="text-slate-400 text-[10px]">{{ t.nutrition.carbs }}</div>
              <div class="font-bold text-slate-900 dark:text-white text-sm">92 g</div>
            </div>
            <div class="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60">
              <div class="text-slate-400 text-[10px]">{{ t.nutrition.fat }}</div>
              <div class="font-bold text-slate-900 dark:text-white text-sm">24 g</div>
            </div>
          </div>
          <div class="text-[11px] text-slate-500 dark:text-slate-400 text-center pt-1 border-t border-slate-100 dark:border-slate-800">
            {{ t.nutrition.price_per_protein }}: <strong>0.82 Kč / g</strong>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
