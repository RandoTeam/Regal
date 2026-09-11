import type { TranslationSchema } from '../types';

export const cs: TranslationSchema = {
  app: {
    title: 'KupiRadar',
    subtitle: 'Srovnávač cen a optimalizátor nákupního košíku pro ČR',
    region_label: 'Lokalita',
    all_regions: 'Celá ČR (všechny obchody)',
    select_region: 'Vyberte region / PSČ',
    version: 'CZ'
  },
  nav: {
    catalog: 'Katalog zboží',
    favorites: 'Oblíbené',
    compare: 'Srovnání',
    basket: 'Košík & Kalkulátor',
    leaflets: 'Akční letáky'
  },
  search: {
    placeholder: 'Hledejte potraviny, nápoje, drogerii...',
    filter_store: 'Všechny řetězce',
    filter_promo: 'Pouze akční nabídky',
    sort_by: 'Řadit podle',
    sort_price_asc: 'Nejlevnější cena',
    sort_unit_price: 'Cena za 1 l / 1 kg',
    sort_discount: 'Nejvyšší sleva %',
    results_found: 'Nalezeno položek: {count}',
    no_results: 'Nebyly nalezeny žádné produkty odpovídající filtru.'
  },
  product: {
    regular_price: 'Běžná cena',
    club_price: 'Cena s klubovou kartou',
    unit_price: 'Přepočet na litr/kg',
    origin: 'Země původu',
    manufacturer: 'Výrobce',
    valid_until: 'Akce platí do',
    add_to_basket: 'Přidat do košíku',
    added_to_basket: 'V košíku',
    compare_btn: 'Porovnat',
    favorite_btn: 'Do oblíbených'
  },
  basket: {
    title: 'Váš nákupní košík',
    items_count: '{count} položek v košíku',
    clear: 'Vysypat košík',
    optimize_btn: 'Optimalizovat nákup',
    optimizing: 'Hledám nejvýhodnější kombinaci obchodů...',
    total: 'Celková cena',
    cheapest_single: 'Nejlevnější nákup v 1 obchodě',
    split_recommendation: 'Chytré rozdělení mezi 2 obchody',
    save_amount: 'Ušetříte až {amount} Kč',
    travel_friction: 'Započteny náklady na přejezd: {cost} Kč',
    empty_basket: 'Váš nákupní košík je zatím prázdný.'
  },
  nutrition: {
    title: 'Nutriční profil a kalorie',
    calories: 'Energie (kcal)',
    protein: 'Bílkoviny',
    carbs: 'Sacharidy',
    fat: 'Tuky',
    fiber: 'Vláknina',
    price_per_protein: 'Cena za 1 g bílkoviny',
    basket_nutrition: 'Nutriční součet celého nákupu'
  },
  leaflets: {
    title: 'Aktuální akční letáky',
    active_now: 'Právě platné akce',
    valid_range: 'Platnost: {from} – {to}',
    view_leaflet: 'Otevřít leták'
  }
};
