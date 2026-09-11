<script setup lang="ts">
import { ref } from 'vue'

const version = ref('1.0.0')
const currentRegion = ref('Praha (všechny obchody)')
</script>

<template>
  <div class="min-h-full flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
    <header class="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur sticky top-0 z-30 px-4 py-3 flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-lg shadow-sm shadow-emerald-500/20">
          K
        </div>
        <div>
          <h1 class="text-base font-bold tracking-tight">KupiRadar <span class="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-semibold ml-1.5">CZ v{{ version }}</span></h1>
          <p class="text-xs text-slate-500 dark:text-slate-400">Srovnávač cen & optimalizátor nákupu ČR</p>
        </div>
      </div>
      <div class="text-xs text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg font-medium border border-slate-200 dark:border-slate-700">
        {{ currentRegion }}
      </div>
    </header>

    <main class="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 flex flex-col items-center justify-center text-center">
      <div class="max-w-md w-full p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div class="inline-flex p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 text-3xl">
          🇨🇿
        </div>
        <h2 class="text-xl font-bold tracking-tight">KupiRadar Framework Ready</h2>
        <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Базовый каркас проекта успешно инициализирован: Vite 6 + Vue 3.5 + TypeScript + Tailwind v4 + Lucide Icons + PWA.
        </p>
        <div class="pt-2 text-xs text-slate-400 border-t border-slate-100 dark:border-slate-800 flex justify-between">
          <span>Подфаза 1.1: Сборка</span>
          <span class="text-emerald-600 dark:text-emerald-400 font-medium">Готово к работе</span>
        </div>
      </div>
    </main>
  </div>
</template>
