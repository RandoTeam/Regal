import type { TranslationSchema } from '../types';

export const sk: TranslationSchema = {
  app: {
    title: 'Regál',
    subtitle: 'Porovnávač cien a optimalizátor nákupného košíka pre ČR',
    region_label: 'Lokalita',
    all_regions: 'Celá ČR (všetky obchody)',
    select_region: 'Vyberte región / PSČ',
    version: 'SK'
  },
  nav: {
    catalog: 'Katalóg tovaru',
    favorites: 'Obľúbené',
    compare: 'Porovnanie',
    basket: 'Košík & Kalkulačka',
    leaflets: 'Akčné letáky'
  },
  search: {
    placeholder: 'Hľadajte potraviny, nápoje, drogériu...',
    filter_store: 'Všetky reťazce',
    filter_promo: 'Iba akčné ponuky',
    sort_by: 'Zoradiť podľa',
    sort_price_asc: 'Najlacnejšia cena',
    sort_unit_price: 'Cena za 1 l / 1 kg',
    sort_discount: 'Najvyššia zľava %',
    results_found: 'Nájdených položiek: {count}',
    no_results: 'Neboli nájdené žiadne produkty zodpovedajúce filtru.'
  },
  product: {
    regular_price: 'Bežná cena',
    club_price: 'Cena s klubovou kartou',
    unit_price: 'Prepočet na liter/kg',
    origin: 'Krajina pôvodu',
    manufacturer: 'Výrobca',
    valid_until: 'Akcia platí do',
    add_to_basket: 'Pridať do košíka',
    added_to_basket: 'V košíku',
    compare_btn: 'Porovnať',
    favorite_btn: 'Do obľúbených'
  },
  basket: {
    title: 'Váš nákupný košík',
    items_count: '{count} položiek v košíku',
    clear: 'Vysypať košík',
    optimize_btn: 'Optimalizovať nákup',
    optimizing: 'Hľadám najvýhodnejšiu kombináciu obchodov...',
    total: 'Celková cena',
    cheapest_single: 'Najlacnejší nákup v 1 obchode',
    split_recommendation: 'Inteligentné rozdelenie medzi 2 obchody',
    save_amount: 'Ušetríte až {amount} Kč',
    travel_friction: 'Započítané náklady na cestu: {cost} Kč',
    empty_basket: 'Váš nákupný košík je zatiaľ prázdny.'
  },
  nutrition: {
    title: 'Nutričný profil a kalórie',
    calories: 'Energia (kcal)',
    protein: 'Bielkoviny',
    carbs: 'Sacharidy',
    fat: 'Tuky',
    fiber: 'Vláknina',
    price_per_protein: 'Cena za 1 g bielkoviny',
    basket_nutrition: 'Nutričný súčet celého nákupu'
  },
  leaflets: {
    title: 'Aktuálne akčné letáky',
    active_now: 'Práve platné akcie',
    valid_range: 'Platnosť: {from} – {to}',
    view_leaflet: 'Otvoriť leták'
  }
};
