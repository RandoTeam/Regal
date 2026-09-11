<script setup lang="ts">
import type { ProductWithPrice } from '../../db/types';
import { CZECH_RETAIL_CHAINS } from '../../data/chains';
import { useI18n } from '../../i18n';

defineProps<{
  product: ProductWithPrice | null;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'add-to-basket', id: string): void;
}>();

const { t, formatCurrency } = useI18n();
</script>

<template>
  <div v-if="product" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
    <div 
      @click.stop
      class="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-5 sm:p-7 space-y-5"
    >
      <!-- Close button -->
      <button
        @click="emit('close')"
        type="button"
        class="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center justify-center cursor-pointer transition-colors"
      >
        ✕
      </button>

      <!-- Top Header & Image -->
      <div class="flex flex-col sm:flex-row gap-5 items-start">
        <img
          :src="product.imageUrl"
          :alt="product.name"
          class="w-full sm:w-44 h-44 rounded-2xl object-cover bg-slate-100 dark:bg-slate-800 shrink-0"
        />
        <div class="space-y-2 flex-1">
          <div class="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            {{ product.brand }} • {{ product.category }}
          </div>
          <h2 class="text-xl font-extrabold text-slate-900 dark:text-white leading-tight">
            {{ product.name }}
          </h2>
          <div class="text-xs text-slate-500 space-y-1">
            <div><strong>EAN-13:</strong> {{ product.ean }}</div>
            <div><strong>{{ t.product.origin }}:</strong> {{ product.countryOfOrigin }}</div>
            <div><strong>{{ t.product.manufacturer }}:</strong> {{ product.manufacturer }}</div>
          </div>
        </div>
      </div>

      <!-- Competing Stores Comparison Table -->
      <div class="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
        <h3 class="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center space-x-1.5">
          <span>🏪</span>
          <span>Ceny ve všech řetězcích (Praha & ČR)</span>
        </h3>

        <div class="divide-y divide-slate-100 dark:divide-slate-800 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden text-xs">
          <div
            v-for="price in product.allPrices"
            :key="price.id"
            class="p-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
          >
            <div class="flex items-center space-x-2.5">
              <span 
                class="px-2 py-0.5 rounded-md font-bold text-[10px]"
                :class="[CZECH_RETAIL_CHAINS[price.chainId]?.badgeBg, CZECH_RETAIL_CHAINS[price.chainId]?.badgeText]"
              >
                {{ CZECH_RETAIL_CHAINS[price.chainId]?.name || price.chainId }}
              </span>
              <span v-if="price.actionName" class="text-emerald-600 dark:text-emerald-400 font-semibold text-[11px]">
                {{ price.actionName }}
              </span>
            </div>

            <div class="flex items-center space-x-3 text-right">
              <div>
                <div class="font-black text-sm text-slate-900 dark:text-white">
                  {{ formatCurrency(price.clubPrice ?? price.regularPrice) }}
                </div>
                <div v-if="price.clubPrice" class="text-[10px] line-through text-slate-400">
                  {{ formatCurrency(price.regularPrice) }}
                </div>
              </div>

              <a
                :href="price.productUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                title="Přejít do obchodu"
              >
                🔗
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Nutrition Breakdown -->
      <div class="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
        <h3 class="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center space-x-1.5">
          <span>🥗</span>
          <span>{{ t.nutrition.title }} (na 100g / 100ml)</span>
        </h3>

        <div class="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
          <div class="p-2 rounded-xl bg-slate-50 dark:bg-slate-800">
            <span class="text-slate-400 text-[10px] block">{{ t.nutrition.calories }}</span>
            <strong class="text-slate-900 dark:text-white">{{ product.nutrition.calories }} kcal</strong>
          </div>
          <div class="p-2 rounded-xl bg-slate-50 dark:bg-slate-800">
            <span class="text-slate-400 text-[10px] block">{{ t.nutrition.protein }}</span>
            <strong class="text-emerald-600 dark:text-emerald-400">{{ product.nutrition.protein }} g</strong>
          </div>
          <div class="p-2 rounded-xl bg-slate-50 dark:bg-slate-800">
            <span class="text-slate-400 text-[10px] block">{{ t.nutrition.carbs }}</span>
            <strong class="text-slate-900 dark:text-white">{{ product.nutrition.carbs }} g</strong>
          </div>
          <div class="p-2 rounded-xl bg-slate-50 dark:bg-slate-800">
            <span class="text-slate-400 text-[10px] block">{{ t.nutrition.fat }}</span>
            <strong class="text-slate-900 dark:text-white">{{ product.nutrition.fat }} g</strong>
          </div>
          <div class="p-2 rounded-xl bg-slate-50 dark:bg-slate-800">
            <span class="text-slate-400 text-[10px] block">{{ t.nutrition.fiber }}</span>
            <strong class="text-slate-900 dark:text-white">{{ product.nutrition.fiber }} g</strong>
          </div>
        </div>
      </div>

      <!-- Action Button -->
      <div class="pt-3">
        <button
          @click="emit('add-to-basket', product.id); emit('close')"
          type="button"
          class="w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-colors cursor-pointer shadow-md shadow-emerald-500/20 flex items-center justify-center space-x-2"
        >
          <span>🛒</span>
          <span>{{ t.product.add_to_basket }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
