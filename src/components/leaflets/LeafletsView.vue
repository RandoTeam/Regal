<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { db } from '../../db';
import type { Leaflet, RetailChainId } from '../../db/types';
import { CZECH_RETAIL_CHAINS } from '../../data/chains';
import { useI18n } from '../../i18n';

const { t } = useI18n();

const leaflets = ref<Leaflet[]>([]);
const selectedChain = ref<RetailChainId | 'all'>('all');
const isLoading = ref(true);

async function loadLeaflets() {
  isLoading.value = true;
  leaflets.value = await db.leaflets.toArray();
  isLoading.value = false;
}

const filteredLeaflets = computed(() => {
  if (selectedChain.value === 'all') return leaflets.value;
  return leaflets.value.filter(l => l.chainId === selectedChain.value);
});

function getDaysRemaining(validTo: string): string {
  const target = new Date(validTo).getTime();
  const now = new Date('2026-09-03').getTime(); // App benchmark date
  const diffDays = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
  if (diffDays <= 0) return 'Končí dnes';
  if (diffDays === 1) return 'Zbývá 1 den';
  if (diffDays < 5) return `Zbývají ${diffDays} dny`;
  return `Zbývá ${diffDays} dní`;
}

onMounted(() => {
  loadLeaflets();
});
</script>

<template>
  <div class="space-y-4 pb-6">
    <!-- Header banner -->
    <div class="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <h2 class="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
          <span>📰</span>
          <span>{{ t.leaflets.title }}</span>
        </h2>
        <p class="text-xs text-slate-500 dark:text-slate-400">
          Prohlédněte si oficiální akční letáky všech supermarketů v ČR pro tento týden
        </p>
      </div>

      <!-- Chain filter chips -->
      <div class="flex items-center space-x-1.5 overflow-x-auto text-xs font-semibold no-scrollbar">
        <button
          @click="selectedChain = 'all'"
          type="button"
          class="px-2.5 py-1 rounded-xl transition-all cursor-pointer whitespace-nowrap"
          :class="selectedChain === 'all' ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'"
        >
          Všechny
        </button>

        <button
          v-for="chain in ['tesco', 'billa', 'albert', 'lidl']"
          :key="chain"
          @click="selectedChain = chain as RetailChainId"
          type="button"
          class="px-2.5 py-1 rounded-xl transition-all cursor-pointer whitespace-nowrap"
          :class="selectedChain === chain ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'"
        >
          {{ CZECH_RETAIL_CHAINS[chain as RetailChainId]?.name }}
        </button>
      </div>
    </div>

    <!-- Leaflets Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div
        v-for="leaflet in filteredLeaflets"
        :key="leaflet.id"
        class="group rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 shadow-xs hover:shadow-md hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-3"
      >
        <div class="space-y-3">
          <!-- Thumbnail with badge -->
          <div class="relative w-full h-44 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
            <img
              :src="leaflet.thumbnailUrl"
              :alt="leaflet.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <div class="absolute top-2 left-2 flex items-center space-x-1.5">
              <span 
                class="px-2.5 py-1 rounded-md font-bold text-[11px] shadow-sm"
                :class="[CZECH_RETAIL_CHAINS[leaflet.chainId]?.badgeBg, CZECH_RETAIL_CHAINS[leaflet.chainId]?.badgeText]"
              >
                {{ leaflet.chainName }}
              </span>
              <span class="px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur text-white text-[10px] font-bold">
                {{ leaflet.pageCount }} stran
              </span>
            </div>

            <div class="absolute bottom-2 right-2">
              <span class="px-2 py-0.5 rounded-md bg-amber-500 text-white font-bold text-[10px] shadow-sm">
                ⏳ {{ getDaysRemaining(leaflet.validTo) }}
              </span>
            </div>
          </div>

          <!-- Leaflet Info -->
          <div>
            <h3 class="font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              {{ leaflet.title }}
            </h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 pt-0.5">
              {{ t.leaflets.valid_range.replace('{from}', leaflet.validFrom).replace('{to}', leaflet.validTo) }}
            </p>
          </div>
        </div>

        <!-- Open button -->
        <a
          :href="leaflet.viewUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="w-full py-2.5 px-4 rounded-xl bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 text-white dark:text-slate-900 text-xs font-bold transition-colors text-center cursor-pointer flex items-center justify-center space-x-1.5 shadow-xs"
        >
          <span>📖</span>
          <span>{{ t.leaflets.view_leaflet }} &rarr;</span>
        </a>
      </div>
    </div>
  </div>
</template>
