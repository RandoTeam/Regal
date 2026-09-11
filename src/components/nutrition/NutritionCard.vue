<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Product } from '../../db/types';
import { 
  calcBasketNutrition, 
  calcMacroPercentages, 
  getProteinCostLeaderboard,
  NUTRITION_GOALS,
  type NutritionGoal
} from '../../utils/nutrition';
import { useI18n } from '../../i18n';

interface BasketItemWithProduct {
  product: Product;
  quantity: number;
  bestPrice: number;
}

const props = defineProps<{
  items: BasketItemWithProduct[];
}>();

const { t } = useI18n();

const selectedGoalId = ref<'standard' | 'fitness' | 'keto'>('standard');

const currentGoal = computed<NutritionGoal>(() => {
  return NUTRITION_GOALS.find(g => g.id === selectedGoalId.value) || NUTRITION_GOALS[0];
});

const totals = computed(() => {
  return calcBasketNutrition(props.items);
});

const macros = computed(() => {
  return calcMacroPercentages(totals.value);
});

const leaderboard = computed(() => {
  return getProteinCostLeaderboard(props.items);
});

function getProgress(value: number, target: number): number {
  if (target <= 0) return 0;
  return Math.min(100, Math.round((value / target) * 100));
}
</script>

<template>
  <div class="bg-white dark:bg-neutral-800 rounded-2xl p-5 shadow-sm border border-neutral-100 dark:border-neutral-700 transition-colors">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-2">
        <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
        <h3 class="font-bold text-neutral-800 dark:text-neutral-100 text-base">
          {{ t.nutrition.title }}
        </h3>
      </div>

      <div v-if="items.length > 0" class="text-right">
        <span class="text-xl font-extrabold text-neutral-900 dark:text-neutral-50 tracking-tight">
          {{ totals.calories }}
        </span>
        <span class="text-xs font-semibold text-neutral-500 dark:text-neutral-400 ml-1">kcal</span>
        <div class="text-[10px] text-neutral-400 dark:text-neutral-500">
          {{ totals.energyKj }} kJ
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="items.length === 0" class="py-8 text-center text-neutral-400 dark:text-neutral-500 text-xs">
      <div class="text-2xl mb-1">🥗</div>
      Vložte položky do košíku pro výpočet kalorií a nutričního profilu.
    </div>

    <div v-else class="space-y-4">
      <!-- Goal Selection Tabs -->
      <div class="flex items-center justify-between bg-neutral-100 dark:bg-neutral-900/60 p-1 rounded-xl text-xs">
        <button
          v-for="goal in NUTRITION_GOALS"
          :key="goal.id"
          @click="selectedGoalId = goal.id"
          class="flex-1 py-1.5 px-2 rounded-lg font-medium transition-all text-center"
          :class="selectedGoalId === goal.id 
            ? 'bg-white dark:bg-neutral-800 text-emerald-600 dark:text-emerald-400 shadow-xs font-bold' 
            : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'"
        >
          {{ goal.name.split(' ')[0] }}
        </button>
      </div>

      <!-- Macro Distribution Bar -->
      <div>
        <div class="flex items-center justify-between text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 mb-1.5">
          <span>Poměr energie (kcal)</span>
          <div class="flex items-center gap-3">
            <span class="text-blue-500 flex items-center gap-1">
              <span class="w-2 h-2 rounded-full bg-blue-500"></span> {{ macros.proteinPercent }}% Bílkoviny
            </span>
            <span class="text-amber-500 flex items-center gap-1">
              <span class="w-2 h-2 rounded-full bg-amber-500"></span> {{ macros.carbsPercent }}% Sacharidy
            </span>
            <span class="text-rose-500 flex items-center gap-1">
              <span class="w-2 h-2 rounded-full bg-rose-500"></span> {{ macros.fatPercent }}% Tuky
            </span>
          </div>
        </div>
        <div class="h-2.5 w-full bg-neutral-100 dark:bg-neutral-700/60 rounded-full overflow-hidden flex">
          <div :style="{ width: `${macros.proteinPercent}%` }" class="bg-blue-500 transition-all duration-300"></div>
          <div :style="{ width: `${macros.carbsPercent}%` }" class="bg-amber-500 transition-all duration-300"></div>
          <div :style="{ width: `${macros.fatPercent}%` }" class="bg-rose-500 transition-all duration-300"></div>
        </div>
      </div>

      <!-- Detailed Macro Progress Bars -->
      <div class="grid grid-cols-2 gap-2.5 pt-1">
        <!-- Protein -->
        <div class="bg-neutral-50 dark:bg-neutral-900/40 p-2.5 rounded-xl border border-neutral-100 dark:border-neutral-750">
          <div class="flex items-center justify-between text-xs mb-1">
            <span class="font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1">
              🍗 {{ t.nutrition.protein }}
            </span>
            <span class="font-bold text-neutral-800 dark:text-neutral-200">
              {{ totals.protein }} <span class="text-[10px] text-neutral-400 font-normal">/ {{ currentGoal.protein }}g</span>
            </span>
          </div>
          <div class="h-1.5 w-full bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
            <div 
              class="h-full bg-blue-500 rounded-full transition-all duration-300"
              :style="{ width: `${getProgress(totals.protein, currentGoal.protein)}%` }"
            ></div>
          </div>
        </div>

        <!-- Carbs -->
        <div class="bg-neutral-50 dark:bg-neutral-900/40 p-2.5 rounded-xl border border-neutral-100 dark:border-neutral-750">
          <div class="flex items-center justify-between text-xs mb-1">
            <span class="font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1">
              🌾 {{ t.nutrition.carbs }}
            </span>
            <span class="font-bold text-neutral-800 dark:text-neutral-200">
              {{ totals.carbs }} <span class="text-[10px] text-neutral-400 font-normal">/ {{ currentGoal.carbs }}g</span>
            </span>
          </div>
          <div class="h-1.5 w-full bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
            <div 
              class="h-full bg-amber-500 rounded-full transition-all duration-300"
              :style="{ width: `${getProgress(totals.carbs, currentGoal.carbs)}%` }"
            ></div>
          </div>
        </div>

        <!-- Fat -->
        <div class="bg-neutral-50 dark:bg-neutral-900/40 p-2.5 rounded-xl border border-neutral-100 dark:border-neutral-750">
          <div class="flex items-center justify-between text-xs mb-1">
            <span class="font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1">
              🥑 {{ t.nutrition.fat }}
            </span>
            <span class="font-bold text-neutral-800 dark:text-neutral-200">
              {{ totals.fat }} <span class="text-[10px] text-neutral-400 font-normal">/ {{ currentGoal.fat }}g</span>
            </span>
          </div>
          <div class="h-1.5 w-full bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
            <div 
              class="h-full bg-rose-500 rounded-full transition-all duration-300"
              :style="{ width: `${getProgress(totals.fat, currentGoal.fat)}%` }"
            ></div>
          </div>
        </div>

        <!-- Fiber -->
        <div class="bg-neutral-50 dark:bg-neutral-900/40 p-2.5 rounded-xl border border-neutral-100 dark:border-neutral-750">
          <div class="flex items-center justify-between text-xs mb-1">
            <span class="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              🥦 {{ t.nutrition.fiber }}
            </span>
            <span class="font-bold text-neutral-800 dark:text-neutral-200">
              {{ totals.fiber }} <span class="text-[10px] text-neutral-400 font-normal">/ {{ currentGoal.fiber }}g</span>
            </span>
          </div>
          <div class="h-1.5 w-full bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
            <div 
              class="h-full bg-emerald-500 rounded-full transition-all duration-300"
              :style="{ width: `${getProgress(totals.fiber, currentGoal.fiber)}%` }"
            ></div>
          </div>
        </div>
      </div>

      <!-- Protein Cost Leaderboard (Best Bang for Your Buck) -->
      <div v-if="leaderboard.length > 0" class="pt-2 border-t border-neutral-100 dark:border-neutral-700">
        <div class="flex items-center justify-between text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
          <span>🏆 {{ t.nutrition.price_per_protein }}</span>
          <span class="text-[10px] text-neutral-400 font-normal">Nejvýhodnější zdroj</span>
        </div>

        <div class="space-y-1.5">
          <div 
            v-for="(item, idx) in leaderboard.slice(0, 3)"
            :key="item.productId"
            class="flex items-center justify-between p-2 rounded-xl bg-neutral-50 dark:bg-neutral-900/30 text-xs"
          >
            <div class="flex items-center gap-2 min-w-0">
              <span 
                class="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black"
                :class="idx === 0 ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300' : 'bg-neutral-200 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300'"
              >
                {{ idx + 1 }}
              </span>
              <span class="truncate font-medium text-neutral-800 dark:text-neutral-200 text-[11px]">
                {{ item.productName }}
              </span>
            </div>

            <div class="flex items-center gap-2 shrink-0 ml-2">
              <span class="text-[10px] text-neutral-400">
                {{ item.totalProteinGrams }}g b.
              </span>
              <span 
                class="font-bold px-1.5 py-0.5 rounded text-[11px]"
                :class="idx === 0 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300' : 'text-neutral-700 dark:text-neutral-300'"
              >
                {{ item.costPerGramProtein }} Kč/g
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
