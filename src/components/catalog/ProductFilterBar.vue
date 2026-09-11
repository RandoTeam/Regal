<script setup lang="ts">
import { ref, watch } from 'vue';
import type { RetailChainId } from '../../db/types';
import { CZECH_RETAIL_CHAINS } from '../../data/chains';
import { useI18n } from '../../i18n';

const props = defineProps<{
  selectedChain: RetailChainId | 'all';
  promoOnly: boolean;
  sortBy: 'price-asc' | 'unit-price' | 'discount';
  searchQuery: string;
}>();

const emit = defineEmits<{
  (e: 'update:selectedChain', chain: RetailChainId | 'all'): void;
  (e: 'update:promoOnly', promoOnly: boolean): void;
  (e: 'update:sortBy', sortBy: 'price-asc' | 'unit-price' | 'discount'): void;
  (e: 'update:searchQuery', query: string): void;
}>();

const { t } = useI18n();

const localSearch = ref(props.searchQuery);

watch(() => props.searchQuery, (newVal) => {
  localSearch.value = newVal;
});

function handleSearchInput(e: Event) {
  const val = (e.target as HTMLInputElement).value;
  localSearch.value = val;
  emit('update:searchQuery', val);
}

function clearSearch() {
  localSearch.value = '';
  emit('update:searchQuery', '');
}
</script>

<template>
  <div class="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3.5 sm:p-4 shadow-xs space-y-3">
    <!-- Main Search Input -->
    <div class="flex items-center bg-slate-50 dark:bg-slate-800/80 rounded-xl px-3.5 py-2.5 border border-slate-200 dark:border-slate-700/60 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
      <span class="text-slate-400 mr-2.5 text-sm">🔍</span>
      <input
        :value="localSearch"
        @input="handleSearchInput"
        type="text"
        :placeholder="t.search.placeholder"
        class="w-full bg-transparent text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
      />
      <button
        v-if="localSearch"
        @click="clearSearch"
        type="button"
        class="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
      >
        ✕
      </button>
    </div>

    <!-- Chain Filter Chips -->
    <div class="flex items-center space-x-1.5 overflow-x-auto pb-1 text-xs font-semibold no-scrollbar">
      <button
        @click="emit('update:selectedChain', 'all')"
        type="button"
        class="px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap"
        :class="selectedChain === 'all' ? 'bg-emerald-600 text-white shadow-xs font-bold' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'"
      >
        {{ t.search.filter_store }}
      </button>

      <button
        v-for="chain in Object.values(CZECH_RETAIL_CHAINS)"
        :key="chain.id"
        @click="emit('update:selectedChain', chain.id)"
        type="button"
        class="px-2.5 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center space-x-1"
        :class="selectedChain === chain.id ? 'bg-emerald-600 text-white shadow-xs font-bold' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'"
      >
        <span>{{ chain.name }}</span>
      </button>
    </div>

    <!-- Secondary Controls: Promo Filter & Sorting -->
    <div class="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs border-t border-slate-100 dark:border-slate-800/80">
      <!-- Promo Only Toggle -->
      <label class="flex items-center space-x-2 cursor-pointer select-none font-semibold text-slate-700 dark:text-slate-300">
        <input
          type="checkbox"
          :checked="promoOnly"
          @change="emit('update:promoOnly', ($event.target as HTMLInputElement).checked)"
          class="w-4 h-4 rounded-md text-emerald-600 focus:ring-emerald-500 border-slate-300 dark:border-slate-700"
        />
        <span>🔥 {{ t.search.filter_promo }}</span>
      </label>

      <!-- Sort Selector -->
      <div class="flex items-center space-x-1.5">
        <span class="text-slate-400 font-medium hidden sm:inline">{{ t.search.sort_by }}:</span>
        <select
          :value="sortBy"
          @change="emit('update:sortBy', ($event.target as HTMLSelectElement).value as any)"
          class="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 font-semibold cursor-pointer text-xs"
        >
          <option value="price-asc">{{ t.search.sort_price_asc }}</option>
          <option value="unit-price">{{ t.search.sort_unit_price }}</option>
          <option value="discount">{{ t.search.sort_discount }}</option>
        </select>
      </div>
    </div>
  </div>
</template>
