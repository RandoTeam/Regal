import { ref, onMounted, onUnmounted } from 'vue';

export type DevicePostureType = 'continuous' | 'folded' | 'tabletop' | 'book';

export function useDevicePosture() {
  const isDualScreen = ref(false);
  const isTabletop = ref(false);
  const posture = ref<DevicePostureType>('continuous');
  const simulatedMode = ref<'auto' | 'single' | 'book' | 'tabletop'>('auto');

  let mediaQueryHorizontal: MediaQueryList | null = null;
  let mediaQueryVertical: MediaQueryList | null = null;

  function updateQueries() {
    if (typeof window === 'undefined') return;

    if (simulatedMode.value !== 'auto') {
      if (simulatedMode.value === 'book') {
        isDualScreen.value = true;
        isTabletop.value = false;
        posture.value = 'book';
      } else if (simulatedMode.value === 'tabletop') {
        isDualScreen.value = false;
        isTabletop.value = true;
        posture.value = 'tabletop';
      } else {
        isDualScreen.value = false;
        isTabletop.value = false;
        posture.value = 'continuous';
      }
      return;
    }

    if (mediaQueryHorizontal) {
      isDualScreen.value = mediaQueryHorizontal.matches;
    }
    if (mediaQueryVertical) {
      isTabletop.value = mediaQueryVertical.matches;
    }

    if (isDualScreen.value) {
      posture.value = 'book';
    } else if (isTabletop.value) {
      posture.value = 'tabletop';
    } else {
      posture.value = 'continuous';
    }
  }

  function setSimulatedMode(mode: 'auto' | 'single' | 'book' | 'tabletop') {
    simulatedMode.value = mode;
    updateQueries();
  }

  onMounted(() => {
    if (typeof window !== 'undefined' && 'matchMedia' in window) {
      mediaQueryHorizontal = window.matchMedia('(horizontal-viewport-segments: 2)');
      mediaQueryVertical = window.matchMedia('(vertical-viewport-segments: 2)');

      mediaQueryHorizontal.addEventListener?.('change', updateQueries);
      mediaQueryVertical.addEventListener?.('change', updateQueries);
      updateQueries();
    }
  });

  onUnmounted(() => {
    if (mediaQueryHorizontal) {
      mediaQueryHorizontal.removeEventListener?.('change', updateQueries);
    }
    if (mediaQueryVertical) {
      mediaQueryVertical.removeEventListener?.('change', updateQueries);
    }
  });

  return {
    isDualScreen,
    isTabletop,
    posture,
    simulatedMode,
    setSimulatedMode
  };
}
