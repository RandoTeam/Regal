<script setup lang="ts">
import { computed } from 'vue';
import { useDevicePosture } from '../../composables/useDevicePosture';

const props = withDefaults(
  defineProps<{
    forceMode?: 'auto' | 'single' | 'book' | 'tabletop';
  }>(),
  {
    forceMode: 'auto'
  }
);

const { isDualScreen, isTabletop, simulatedMode, setSimulatedMode } = useDevicePosture();

if (props.forceMode !== 'auto') {
  setSimulatedMode(props.forceMode);
}

const activeLayoutClass = computed(() => {
  if (simulatedMode.value === 'book' || isDualScreen.value) {
    return 'layout-book-mode';
  }
  if (simulatedMode.value === 'tabletop' || isTabletop.value) {
    return 'layout-tabletop-mode';
  }
  return 'layout-standard';
});
</script>

<template>
  <div class="foldable-container w-full h-full" :class="activeLayoutClass">
    <!-- Primary Master Pane (Catalog / Search / Lists) -->
    <section class="pane-primary flex-1 min-w-0 overflow-y-auto">
      <slot name="primary" />
    </section>

    <!-- Crease / Hinge Separator -->
    <div
      class="hinge-divider transition-all duration-300"
      :class="{
        'is-active': isDualScreen || isTabletop || simulatedMode !== 'auto'
      }"
    >
      <slot name="hinge">
        <div class="h-full w-full flex items-center justify-center pointer-events-none">
          <div class="hinge-accent"></div>
        </div>
      </slot>
    </div>

    <!-- Secondary Detail Pane (Basket / Comparison / Nutrition Dial) -->
    <section class="pane-secondary flex-1 min-w-0 overflow-y-auto">
      <slot name="secondary" />
    </section>
  </div>
</template>

<style scoped>
.foldable-container {
  display: flex;
  flex-direction: column;
}

@media (min-width: 1024px) {
  .foldable-container.layout-standard {
    display: grid;
    grid-template-columns: 1.15fr 1px 0.85fr;
    gap: 1.5rem;
  }

  .foldable-container.layout-standard .hinge-divider {
    background-color: var(--color-slate-200, #e2e8f0);
  }
}

/* W3C CSS Viewport Segments: Vertical Fold / Book Posture */
@media (horizontal-viewport-segments: 2) {
  .foldable-container {
    display: grid !important;
    grid-template-columns: minmax(0, 1fr) 24px minmax(0, 1fr) !important;
    grid-template-rows: 100% !important;
    height: 100% !important;
  }
  .pane-primary {
    grid-column: 1;
    overflow-y: auto;
  }
  .hinge-divider {
    grid-column: 2;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .hinge-divider .hinge-accent {
    width: 2px;
    height: 60%;
    background: rgba(16, 185, 129, 0.25);
    border-radius: 9999px;
  }
  .pane-secondary {
    grid-column: 3;
    overflow-y: auto;
  }
}

.foldable-container.layout-book-mode {
  display: grid !important;
  grid-template-columns: minmax(0, 1fr) 24px minmax(0, 1fr) !important;
  grid-template-rows: 100% !important;
  height: 100% !important;
}
.foldable-container.layout-book-mode .pane-primary {
  grid-column: 1;
  overflow-y: auto;
}
.foldable-container.layout-book-mode .hinge-divider {
  grid-column: 2;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
}
.foldable-container.layout-book-mode .hinge-divider .hinge-accent {
  width: 2px;
  height: 60%;
  background: rgba(16, 185, 129, 0.25);
  border-radius: 9999px;
}
.foldable-container.layout-book-mode .pane-secondary {
  grid-column: 3;
  overflow-y: auto;
}

/* W3C CSS Viewport Segments: Horizontal Fold / Tabletop Posture */
@media (vertical-viewport-segments: 2) {
  .foldable-container {
    display: grid !important;
    grid-template-rows: minmax(0, 1fr) 20px minmax(0, 1fr) !important;
    grid-template-columns: 100% !important;
    height: 100% !important;
  }
  .pane-primary {
    grid-row: 3;
    overflow-y: auto;
  }
  .hinge-divider {
    grid-row: 2;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .hinge-divider .hinge-accent {
    width: 60%;
    height: 2px;
    background: rgba(16, 185, 129, 0.25);
    border-radius: 9999px;
  }
  .pane-secondary {
    grid-row: 1;
    overflow-y: auto;
  }
}

.foldable-container.layout-tabletop-mode {
  display: grid !important;
  grid-template-rows: minmax(0, 1fr) 20px minmax(0, 1fr) !important;
  grid-template-columns: 100% !important;
  height: 100% !important;
}
.foldable-container.layout-tabletop-mode .pane-primary {
  grid-row: 3;
  overflow-y: auto;
}
.foldable-container.layout-tabletop-mode .hinge-divider {
  grid-row: 2;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
}
.foldable-container.layout-tabletop-mode .hinge-divider .hinge-accent {
  width: 60%;
  height: 2px;
  background: rgba(16, 185, 129, 0.25);
  border-radius: 9999px;
}
.foldable-container.layout-tabletop-mode .pane-secondary {
  grid-row: 1;
  overflow-y: auto;
}
</style>
