<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from './i18n';
import LanguageSelector from './components/LanguageSelector.vue';
import FoldableTwoPane from './components/foldable/FoldableTwoPane.vue';
import { useDevicePosture } from './composables/useDevicePosture';

const { t, formatCurrency } = useI18n();
const { posture, simulatedMode, setSimulatedMode } = useDevicePosture();

const activeTab = ref<'catalog' | 'favorites' | 'compare' | 'basket' | 'leaflets'>('catalog');
const currentRegion = ref('Praha (všechny obchody)');
const samplePrice = ref(36.90);
const searchQuery = ref('');
</script>

<template>
  <div class="min-h-full flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-emerald-500 selection:text-white">
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
            :class="simulatedMode === 'auto' ? 'bg-white dark:bg-slate-900 shadow-xs text-emerald-600 dark:text-emerald-400' : 'text-slate-500'"
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

        <!-- Region indicator -->
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

    <!-- Main Content Wrapped in FoldableTwoPane -->
    <main class="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 min-h-0 overflow-hidden flex flex-col">
      <FoldableTwoPane class="flex-1 min-h-0">
        <!-- PRIMARY PANE: Search, Categories, Master Product Stream -->
        <template #primary>
          <div class="space-y-4 pr-0 lg:pr-2">
            <!-- Search & Filters -->
            <div class="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
              <div class="flex items-center bg-slate-50 dark:bg-slate-800/80 rounded-xl px-3 py-2 border border-slate-200 dark:border-slate-700/60 focus-within:border-emerald-500 transition-colors">
                <span class="text-slate-400 mr-2">🔍</span>
                <input
                  v-model="searchQuery"
                  type="text"
                  :placeholder="t.search.placeholder"
                  class="w-full bg-transparent text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
                />
              </div>

              <!-- Quick Chain Filters -->
              <div class="flex items-center space-x-1.5 overflow-x-auto text-[11px] font-semibold pt-1">
                <span class="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 cursor-pointer">Vše</span>
                <span class="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 cursor-pointer">Tesco</span>
                <span class="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 cursor-pointer">Billa</span>
                <span class="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 cursor-pointer">Albert</span>
                <span class="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 cursor-pointer">Lidl</span>
                <span class="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 cursor-pointer">Rohlík</span>
              </div>
            </div>

            <!-- Representative Product Feed -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <!-- Item 1: Coca Cola 2.0L -->
              <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2.5 flex flex-col justify-between">
                <div class="space-y-1.5">
                  <div class="flex items-center justify-between text-[11px]">
                    <span class="font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md">Tesco • Clubcard</span>
                    <span class="text-slate-400">{{ t.product.valid_until }}: 8.9.</span>
                  </div>
                  <h3 class="font-bold text-sm leading-tight text-slate-900 dark:text-white">Coca-Cola Original 2.0 l</h3>
                  <p class="text-[11px] text-slate-500">{{ t.product.origin }}: Česká republika (Praha 9 - Kyje)</p>
                </div>
                <div class="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-baseline justify-between">
                  <div>
                    <span class="text-lg font-black text-slate-900 dark:text-white">{{ formatCurrency(samplePrice) }}</span>
                    <span class="text-xs line-through text-slate-400 ml-1.5">{{ formatCurrency(49.90) }}</span>
                  </div>
                  <span class="text-[11px] font-bold text-emerald-600">18.45 Kč / 1 l</span>
                </div>
                <button class="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer flex items-center justify-center space-x-1">
                  <span>+</span>
                  <span>{{ t.product.add_to_basket }}</span>
                </button>
              </div>

              <!-- Item 2: Albert 1.5L -->
              <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2.5 flex flex-col justify-between">
                <div class="space-y-1.5">
                  <div class="flex items-center justify-between text-[11px]">
                    <span class="font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 rounded-md">Albert • Můj Albert</span>
                    <span class="text-slate-400">{{ t.product.valid_until }}: 8.9.</span>
                  </div>
                  <h3 class="font-bold text-sm leading-tight text-slate-900 dark:text-white">Coca-Cola Original 1.5 l</h3>
                  <p class="text-[11px] text-slate-500">{{ t.product.origin }}: Česká republika</p>
                </div>
                <div class="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-baseline justify-between">
                  <div>
                    <span class="text-lg font-black text-slate-900 dark:text-white">{{ formatCurrency(26.90) }}</span>
                    <span class="text-xs line-through text-slate-400 ml-1.5">{{ formatCurrency(44.90) }}</span>
                  </div>
                  <span class="text-[11px] font-bold text-blue-600">17.93 Kč / 1 l</span>
                </div>
                <button class="w-full py-2 px-3 rounded-xl bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 text-white dark:text-slate-900 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center space-x-1">
                  <span>+</span>
                  <span>{{ t.product.add_to_basket }}</span>
                </button>
              </div>
            </div>
          </div>
        </template>

        <!-- SECONDARY PANE: Optimizer, Live Split Calculations, KBJU dials -->
        <template #secondary>
          <div class="space-y-4 pl-0 lg:pl-2">
            <!-- Secondary Banner / Mode Info -->
            <div class="p-4 rounded-2xl bg-slate-900 text-white shadow-xs space-y-3 border border-slate-800">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                  <span>📱</span>
                  <span>Foldable Posture: {{ posture }}</span>
                </div>
                <span class="text-[10px] px-2 py-0.5 rounded-md bg-white/10 font-mono">W3C Viewport API</span>
              </div>
              <p class="text-xs text-slate-300 leading-relaxed">
                На раскладных смартфонах (Galaxy Z Fold, Pixel Fold) вторичная панель занимает правое крыло экрана, защищая аппаратный сгиб от попадания элементов управления.
              </p>
            </div>

            <!-- Basket Optimizer Card -->
            <div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3.5">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider">
                  <span>🛒</span>
                  <span>{{ t.basket.title }}</span>
                </div>
                <span class="text-xs text-slate-400 font-medium">3 položky</span>
              </div>

              <div class="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 text-xs space-y-2">
                <div class="flex items-center justify-between font-bold text-emerald-900 dark:text-emerald-300">
                  <span>{{ t.basket.split_recommendation }}</span>
                  <span class="px-2 py-0.5 bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100 rounded-md text-[10px]">{{ t.basket.save_amount.replace('{amount}', '84') }}</span>
                </div>
                <div class="text-[11px] text-emerald-700 dark:text-emerald-400">
                  Tesco (Praha Národní) + Billa (Karlín) • {{ t.basket.travel_friction.replace('{cost}', '15') }}
                </div>
              </div>

              <!-- Nutrition Dial Glance -->
              <div class="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <div class="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span>🥗 {{ t.nutrition.title }}</span>
                  <span class="text-emerald-600 font-mono text-[11px]">840 kcal</span>
                </div>
                <div class="grid grid-cols-4 gap-1.5 text-center text-[10px]">
                  <div class="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800">
                    <span class="text-slate-400 block">Bílkoviny</span>
                    <strong class="text-emerald-600 dark:text-emerald-400 text-xs">56g</strong>
                  </div>
                  <div class="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800">
                    <span class="text-slate-400 block">Sacharidy</span>
                    <strong class="text-slate-900 dark:text-white text-xs">92g</strong>
                  </div>
                  <div class="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800">
                    <span class="text-slate-400 block">Tuky</span>
                    <strong class="text-slate-900 dark:text-white text-xs">24g</strong>
                  </div>
                  <div class="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800">
                    <span class="text-slate-400 block">Vláknina</span>
                    <strong class="text-slate-900 dark:text-white text-xs">12g</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </FoldableTwoPane>
    </main>
  </div>
</template>
