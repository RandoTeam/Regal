<script setup lang="ts">
import type { ProductWithPrice } from '../../db/types';
import { CZECH_RETAIL_CHAINS } from '../../data/chains';
import { useI18n } from '../../i18n';

const props = defineProps<{
  product: ProductWithPrice;
  isCompared?: boolean;
}>();

const emit = defineEmits<{
  (e: 'click-detail', product: ProductWithPrice): void;
  (e: 'toggle-favorite', id: string): void;
  (e: 'toggle-compare', product: ProductWithPrice): void;
  (e: 'add-to-basket', id: string): void;
  (e: 'remove-from-basket', id: string): void;
}>();

const { t, formatCurrency } = useI18n();

const chain = CZECH_RETAIL_CHAINS[props.product.bestPrice.chainId] || {
  name: props.product.bestPrice.chainId,
  badgeBg: 'bg-slate-100 dark:bg-slate-800',
  badgeText: 'text-slate-800 dark:text-slate-200'
};
</script>

<template>
  <div 
    class="group relative flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-4 transition-all duration-200 hover:shadow-md hover:border-emerald-500/40"
  >
    <!-- Top Bar: Chain & Actions -->
    <div class="flex items-center justify-between mb-2 text-xs">
      <span 
        class="inline-flex items-center px-2.5 py-0.5 rounded-md font-bold text-[11px]"
        :class="[chain.badgeBg, chain.badgeText]"
      >
        {{ chain.name }}
      </span>

      <div class="flex items-center space-x-1">
        <!-- Compare Button -->
        <button
          @click.stop="emit('toggle-compare', product)"
          type="button"
          class="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors cursor-pointer"
          :class="{ 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40': isCompared }"
          :title="t.product.compare_btn"
        >
          ⚖️
        </button>

        <!-- Favorite Button -->
        <button
          @click.stop="emit('toggle-favorite', product.id)"
          type="button"
          class="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
          :class="{ 'text-rose-500 bg-rose-50 dark:bg-rose-950/40': product.isFavorite }"
          :title="t.product.favorite_btn"
        >
          <span v-if="product.isFavorite">❤️</span>
          <span v-else>🤍</span>
        </button>
      </div>
    </div>

    <!-- Product Image & Basic Info (Click opens details) -->
    <div @click="emit('click-detail', product)" class="cursor-pointer space-y-2.5">
      <div class="relative w-full h-36 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
        <img
          :src="product.imageUrl"
          :alt="product.name"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div v-if="product.bestPrice.isAction" class="absolute top-2 left-2">
          <span class="px-2 py-0.5 rounded-md bg-rose-600 text-white font-black text-[10px] shadow-sm tracking-wider uppercase">
            {{ product.bestPrice.discountPercentage ? `−${product.bestPrice.discountPercentage}%` : 'AKCE' }}
          </span>
        </div>
      </div>

      <div class="space-y-1">
        <div class="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          {{ product.brand }} • {{ product.category }}
        </div>
        <h3 class="font-bold text-sm text-slate-900 dark:text-slate-100 leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
          {{ product.name }}
        </h3>
        <div class="text-[11px] text-slate-500 dark:text-slate-400 truncate">
          🇨🇿 {{ product.countryOfOrigin }}
        </div>
      </div>
    </div>

    <!-- Pricing Section -->
    <div class="pt-3 mt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
      <div class="flex items-baseline justify-between">
        <div>
          <!-- Club price if present -->
          <template v-if="product.bestPrice.clubPrice">
            <div class="flex items-baseline space-x-1.5">
              <span class="text-xl font-black text-emerald-600 dark:text-emerald-400">
                {{ formatCurrency(product.bestPrice.clubPrice) }}
              </span>
              <span class="text-xs line-through text-slate-400">
                {{ formatCurrency(product.bestPrice.regularPrice) }}
              </span>
            </div>
            <div class="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 flex items-center space-x-1">
              <span>💳</span>
              <span>{{ product.bestPrice.actionName || t.product.club_price }}</span>
            </div>
          </template>

          <!-- Standard regular price -->
          <template v-else>
            <span class="text-xl font-black text-slate-900 dark:text-white">
              {{ formatCurrency(product.bestPrice.regularPrice) }}
            </span>
          </template>
        </div>

        <!-- Unit price -->
        <div class="text-right">
          <span class="text-xs font-bold text-slate-700 dark:text-slate-300">
            {{ formatCurrency(product.bestPrice.pricePerUnit) }}
          </span>
          <span class="text-[10px] text-slate-400 block">/ {{ product.bestPrice.unitLabel }}</span>
        </div>
      </div>

      <!-- Direct store lot link -->
      <a
        :href="product.bestPrice.productUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="block text-[11px] text-emerald-600 dark:text-emerald-400 hover:underline font-medium truncate"
      >
        🔗 Otevřít nabídku v {{ chain.name }} &rarr;
      </a>

      <!-- Add to Basket / Stepper -->
      <div class="pt-1">
        <div v-if="product.inBasketQuantity && product.inBasketQuantity > 0" class="flex items-center justify-between bg-emerald-50 dark:bg-emerald-950/40 rounded-xl p-1 border border-emerald-200 dark:border-emerald-800">
          <button
            @click="emit('remove-from-basket', product.id)"
            class="w-7 h-7 flex items-center justify-center rounded-lg bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-100 cursor-pointer text-xs"
          >
            −
          </button>
          <span class="text-xs font-bold text-emerald-800 dark:text-emerald-300">
            {{ product.inBasketQuantity }} v košíku
          </span>
          <button
            @click="emit('add-to-basket', product.id)"
            class="w-7 h-7 flex items-center justify-center rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-700 cursor-pointer text-xs"
          >
            +
          </button>
        </div>

        <button
          v-else
          @click="emit('add-to-basket', product.id)"
          type="button"
          class="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer flex items-center justify-center space-x-1 shadow-xs"
        >
          <span>+</span>
          <span>{{ t.product.add_to_basket }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
