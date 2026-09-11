import { ref } from 'vue';
import type { OptimizationInput, OptimizationOutput } from '../workers/optimizer.worker';
import { solveBasketOptimization } from '../workers/optimizer.worker';

export function useBasketOptimizer() {
  const isOptimizing = ref(false);
  const result = ref<OptimizationOutput | null>(null);

  async function optimize(input: OptimizationInput): Promise<OptimizationOutput> {
    isOptimizing.value = true;

    try {
      // If Web Worker is supported, can dispatch off-thread, or fallback synchronously
      if (typeof window !== 'undefined' && window.Worker) {
        const worker = new Worker(new URL('../workers/optimizer.worker.ts', import.meta.url), {
          type: 'module'
        });

        const output = await new Promise<OptimizationOutput>((resolve) => {
          worker.onmessage = (e) => {
            resolve(e.data);
            worker.terminate();
          };
          worker.postMessage(input);
        });

        result.value = output;
        return output;
      } else {
        const output = solveBasketOptimization(input);
        result.value = output;
        return output;
      }
    } finally {
      isOptimizing.value = false;
    }
  }

  return {
    isOptimizing,
    result,
    optimize
  };
}
