<script setup lang="ts">
import { computed } from 'vue';
import type { ProductWithPrice } from '../../db/types';
import { CZECH_RETAIL_CHAINS } from '../../data/chains';
import { useI18n } from '../../i18n';

const props = defineProps<{
  products: ProductWithPrice[];
}>();

const emit = defineEmits<{
  (e: 'remove', id: string): void;
  (e: 'clear'): void;
  (e: 'add-to-basket', id: string): void;
  (e: 'go-to-catalog'): void;
}>();

const { t, formatCurrency } = useI18n();

// Find lowest price per unit
const lowestUnitPrice = computed(() => {
  if (props.products.length === 0) return 0;
  return Math.min(...props.products.map(p => p.bestPrice.pricePerUnit));
});

// Calculate price per gram of protein
function getPricePerProtein(p: ProductWithPrice): string {
  if (!p.nutrition.protein || p.nutrition.protein <= 0) return '—';
  const price = p.bestPrice.clubPrice ?? p.bestPrice.regularPrice;
  const totalGrams = p.weightGrams ?? (p.volumeLiters ? p.volumeLiters * 1000 : 100);
  const totalProtein = (p.nutrition.protein / 100) * totalGrams;
  if (totalProtein <= 0) return '—';
  const ratio = price / totalProtein;
  return `${ratio.toFixed(2)} Kč / g`;
}
</script>

<template>
  <div class="space-y-4 pb-6">
    <!-- Header banner -->
    <div class="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
      <div>
        <h2 class="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
          <span>⚖️</span>
          <span>{{ t.nav.compare }}</span>
        </h2>
        <p class="text-xs text-slate-500 dark:text-slate-400">
          Porovnání cen, přepočtu na litr/kg, výrobců a nutričních hodnot
        </p>
      </div>

      <button
        v-if="products.length > 0"
        @click="emit('clear')"
        class="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
      >
        Vymazat srovnání
      </button>
    </div>

    <!-- Comparison Matrix Table -->
    <div v-if="products.length > 0" class="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs overflow-x-auto">
      <table class="w-full text-xs text-left border-collapse min-w-[550px]">
        <thead>
          <tr class="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40">
            <th class="p-3.5 w-36 font-bold text-slate-400 uppercase tracking-wider text-[10px]">Vlastnost</th>
            <th 
              v-for="product in products" 
              :key="product.id"
              class="p-3.5 min-w-[180px] max-w-[220px]"
            >
              <div class="flex items-center justify-between">
                <span class="font-bold text-[11px] px-2 py-0.5 rounded-md" :class="[CZECH_RETAIL_CHAINS[product.bestPrice.chainId]?.badgeBg, CZECH_RETAIL_CHAINS[product.bestPrice.chainId]?.badgeText]">
                  {{ CZECH_RETAIL_CHAINS[product.bestPrice.chainId]?.name }}
                </span>
                <button
                  @click="emit('remove', product.id)"
                  class="text-slate-400 hover:text-rose-500 font-bold p-1 cursor-pointer"
                  title="Odebrat ze srovnání"
                >
                  ✕
                </button>
              </div>
            </th>
          </tr>
        </thead>

        <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
          <!-- Photo & Title -->
          <tr>
            <td class="p-3 font-semibold text-slate-500">Produkt</td>
            <td v-for="p in products" :key="p.id" class="p-3 space-y-2">
              <img :src="p.imageUrl" :alt="p.name" class="w-16 h-16 rounded-xl object-cover bg-slate-100" />
              <div class="font-bold text-slate-900 dark:text-white leading-snug">{{ p.name }}</div>
            </td>
          </tr>

          <!-- Best Price -->
          <tr class="bg-emerald-50/30 dark:bg-emerald-950/20">
            <td class="p-3 font-semibold text-slate-500">Nejlepší cena</td>
            <td v-for="p in products" :key="p.id" class="p-3">
              <div class="text-base font-black text-emerald-600 dark:text-emerald-400">
                {{ formatCurrency(p.bestPrice.clubPrice ?? p.bestPrice.regularPrice) }}
              </div>
              <div v-if="p.bestPrice.clubPrice" class="text-[10px] text-slate-400 line-through">
                {{ formatCurrency(p.bestPrice.regularPrice) }}
              </div>
            </td>
          </tr>

          <!-- Price Per Unit (Key comparison metric) -->
          <tr>
            <td class="p-3 font-semibold text-slate-500">Cena za jednotku</td>
            <td v-for="p in products" :key="p.id" class="p-3">
              <div 
                class="font-bold inline-flex items-center space-x-1"
                :class="p.bestPrice.pricePerUnit === lowestUnitPrice ? 'text-emerald-600 dark:text-emerald-400 font-black' : 'text-slate-700 dark:text-slate-300'"
              >
                <span>{{ formatCurrency(p.bestPrice.pricePerUnit) }} / {{ p.bestPrice.unitLabel }}</span>
                <span v-if="p.bestPrice.pricePerUnit === lowestUnitPrice" class="text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950 px-1.5 py-0.5 rounded-full font-bold">
                  Nejvýhodnější
                </span>
              </div>
            </td>
          </tr>

          <!-- Manufacturer & Origin -->
          <tr>
            <td class="p-3 font-semibold text-slate-500">Původ & Výrobce</td>
            <td v-for="p in products" :key="p.id" class="p-3 space-y-1 text-slate-600 dark:text-slate-400">
              <div>🇨🇿 <strong>{{ p.countryOfOrigin }}</strong></div>
              <div class="text-[11px] leading-tight">{{ p.manufacturer }}</div>
            </td>
          </tr>

          <!-- Nutrition: Calories -->
          <tr>
            <td class="p-3 font-semibold text-slate-500">Kalorie (100g/ml)</td>
            <td v-for="p in products" :key="p.id" class="p-3 font-mono font-bold">
              {{ p.nutrition.calories }} kcal
            </td>
          </tr>

          <!-- Nutrition: Protein & Protein Value -->
          <tr>
            <td class="p-3 font-semibold text-slate-500">Bílkoviny & Cena/g</td>
            <td v-for="p in products" :key="p.id" class="p-3 space-y-0.5">
              <div class="font-bold text-emerald-600">{{ p.nutrition.protein }} g</div>
              <div class="text-[10px] text-slate-400">Cena za g: <strong>{{ getPricePerProtein(p) }}</strong></div>
            </td>
          </tr>

          <!-- Nutrition: Carbs / Fat -->
          <tr>
            <td class="p-3 font-semibold text-slate-500">Sacharidy / Tuky</td>
            <td v-for="p in products" :key="p.id" class="p-3 text-slate-600 dark:text-slate-400">
              {{ p.nutrition.carbs }}g / {{ p.nutrition.fat }}g
            </td>
          </tr>

          <!-- Action Row -->
          <tr>
            <td class="p-3 font-semibold text-slate-500">Akce</td>
            <td v-for="p in products" :key="p.id" class="p-3 space-y-2">
              <button
                @click="emit('add-to-basket', p.id)"
                class="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                + {{ t.product.add_to_basket }}
              </button>
              <a
                :href="p.bestPrice.productUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="block text-center text-[11px] text-slate-500 hover:text-emerald-600 underline"
              >
                Otevřít v obchodě &rarr;
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-16 px-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
      <div class="text-4xl">⚖️</div>
      <h3 class="font-bold text-base text-slate-800 dark:text-slate-200">Zatím jste nepřidali žádné produkty k porovnání</h3>
      <p class="text-xs text-slate-500 max-w-sm mx-auto">
        V katalogu klikněte na ikonu vah (⚖️) u až 4 různých produktů a porovnejte jejich cenu za litr, výrobce a nutriční hodnoty.
      </p>
      <div class="pt-2">
        <button
          @click="emit('go-to-catalog')"
          type="button"
          class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer"
        >
          Přejít do katalogu
        </button>
      </div>
    </div>
  </div>
</template>
