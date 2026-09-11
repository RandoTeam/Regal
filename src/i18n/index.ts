import { ref, computed } from 'vue';
import type { SupportedLocale, LocaleInfo, TranslationSchema } from './types';
import { cs } from './locales/cs';
import { sk } from './locales/sk';
import { pl } from './locales/pl';
import { de } from './locales/de';
import { en } from './locales/en';
import { sl } from './locales/sl';

export const SUPPORTED_LOCALES: LocaleInfo[] = [
  { code: 'cs', name: 'Čeština', flag: '🇨🇿' },
  { code: 'sk', name: 'Slovenčina', flag: '🇸🇰' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'sl', name: 'Slovenščina', flag: '🇸🇮' }
];

const dictionaries: Record<SupportedLocale, TranslationSchema> = {
  cs,
  sk,
  pl,
  de,
  en,
  sl
};

function detectDefaultLocale(): SupportedLocale {
  if (typeof window === 'undefined') return 'cs';
  const saved = (localStorage.getItem('regal_locale') || localStorage.getItem('kupiradar_locale')) as SupportedLocale;
  if (saved && saved in dictionaries) return saved;

  const browserLang = navigator.language.slice(0, 2).toLowerCase() as SupportedLocale;
  if (browserLang in dictionaries) return browserLang;

  return 'cs';
}

const currentLocale = ref<SupportedLocale>(detectDefaultLocale());

export function useI18n() {
  const locale = computed(() => currentLocale.value);
  const t = computed(() => dictionaries[currentLocale.value] || dictionaries.cs);

  function setLocale(newLocale: SupportedLocale) {
    if (newLocale in dictionaries) {
      currentLocale.value = newLocale;
      if (typeof window !== 'undefined') {
        localStorage.setItem('regal_locale', newLocale);
        document.documentElement.lang = newLocale;
      }
    }
  }

  function formatCurrency(amount: number): string {
    return new Intl.NumberFormat(currentLocale.value === 'cs' ? 'cs-CZ' : 'en-US', {
      style: 'currency',
      currency: 'CZK',
      maximumFractionDigits: 2
    }).format(amount).replace('CZK', 'Kč');
  }

  return {
    locale,
    t,
    setLocale,
    formatCurrency,
    locales: SUPPORTED_LOCALES
  };
}
