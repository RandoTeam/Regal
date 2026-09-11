<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { favoriteService } from '../../db/services';
import type { ProductWithPrice } from '../../db/types';
import ProductCard from '../catalog/ProductCard.vue';
import { useI18n } from '../../i18n';

const emit = defineEmits<{
  (e: 'click-detail', product: ProductWithPrice): void;
  (e: 'toggle-compare', product: ProductWithPrice): void;
  (e: 'add-to-basket', id: string): void;
  (e: 'remove-from-basket', id: string): void;
  (e: 'go-to-catalog'): void;
}>();

const { t } = useI18n();

const favorites = ref<ProductWithPrice[]>([]);
const isLoading = ref(true);

async function loadFavorites() {
  isLoading.value = true;
  favorites.value = await favoriteService.getAll();
  isLoading.value = false;
}

async function handleToggleFavorite(id: string) {
  await favoriteService.toggleFavorite(id);
  await loadFavorites();
}

onMounted(() => {
  loadFavorites();
});
</script>

<template>
  <div class="space-y-4 pb-6">
    <!-- Header banner -->
    <div class="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
      <div>
        <h2 class="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
          <span>⭐</span>
          <span>{{ t.nav.favorites }}</span>
        </h2>
        <p class="text-xs text-slate-500 dark:text-slate-400">
          Sledujte oblíbené produkty a získejte upozornění při zlevnění
        </p>
      </div>
      <span class="text-xs font-bold px-2.5 py-1 rounded-full bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400">
        {{ favorites.length }} položek
      </span>
    </div>

    <!-- Favorites Grid -->
    <div v-if="favorites.length > 0" class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
      <ProductCard
        v-for="product in favorites"
        :key="product.id"
        :product="product"
        @click-detail="emit('click-detail', $event)"
        @toggle-favorite="handleToggleFavorite"
        @toggle-compare="emit('toggle-compare', $event)"
        @add-to-basket="emit('add-to-basket', $event)"
        @remove-from-basket="emit('remove-from-basket', $event)"
      />
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-16 px-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
      <div class="text-4xl">⭐</div>
      <h3 class="font-bold text-base text-slate-800 dark:text-slate-200">Nemáte žádné oblíbené položky</h3>
      <p class="text-xs text-slate-500 max-w-sm mx-auto">
        Klikněte na ikonu srdíčka u libovolného produktu v katalogu pro sledování akcí a vývoje cen.
      </p>
      <div class="pt-2">
        <button
          @click="emit('go-to-catalog')"
          type="button"
          class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer"
        >
          Procházet katalog
        </button>
      </div>
    </div>
  </div>
</template>
