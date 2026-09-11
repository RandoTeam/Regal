import type { TranslationSchema } from '../types';

export const pl: TranslationSchema = {
  app: {
    title: 'Regál',
    subtitle: 'Porównywarka cen i optymalizator koszyka w Czechach',
    region_label: 'Lokalizacja',
    all_regions: 'Całe Czechy (wszystkie sklepy)',
    select_region: 'Wybierz region / kod pocztowy',
    version: 'PL'
  },
  nav: {
    catalog: 'Katalog produktów',
    favorites: 'Ulubione',
    compare: 'Porównanie',
    basket: 'Koszyk & Kalkulator',
    leaflets: 'Gazetki promocyjne'
  },
  search: {
    placeholder: 'Szukaj produktów spożywczych, napojów...',
    filter_store: 'Wszystkie sieci',
    filter_promo: 'Tylko promocje',
    sort_by: 'Sortuj według',
    sort_price_asc: 'Najniższa cena',
    sort_unit_price: 'Cena za 1 l / 1 kg',
    sort_discount: 'Największa zniżka %',
    results_found: 'Znaleziono produktów: {count}',
    no_results: 'Nie znaleziono produktów spełniających kryteria.'
  },
  product: {
    regular_price: 'Cena regularna',
    club_price: 'Cena z kartą lojalnościową',
    unit_price: 'Cena za litr/kg',
    origin: 'Kraj pochodzenia',
    manufacturer: 'Producent',
    valid_until: 'Promocja do',
    add_to_basket: 'Dodaj do koszyka',
    added_to_basket: 'W koszyku',
    compare_btn: 'Porównaj',
    favorite_btn: 'Do ulubionych'
  },
  basket: {
    title: 'Twój koszyk zakupowy',
    items_count: '{count} produktów w koszyku',
    clear: 'Wyczyść koszyk',
    optimize_btn: 'Optymalizuj zakupy',
    optimizing: 'Obliczanie najtańszej kombinacji sklepów...',
    total: 'Łączna cena',
    cheapest_single: 'Najtaniej w 1 sklepie',
    split_recommendation: 'Inteligentny podział na 2 sklepy',
    save_amount: 'Oszczędzasz do {amount} Kč',
    travel_friction: 'Uwzględniono koszt dojazdu: {cost} Kč',
    empty_basket: 'Twój koszyk jest pusty.'
  },
  nutrition: {
    title: 'Wartości odżywcze i kalorie',
    calories: 'Energia (kcal)',
    protein: 'Białko',
    carbs: 'Węglowodany',
    fat: 'Tłuszcze',
    fiber: 'Błonnik',
    price_per_protein: 'Cena za 1 g białka',
    basket_nutrition: 'Podsumowanie makroskładników koszyka'
  },
  leaflets: {
    title: 'Aktualne gazetki promocyjne',
    active_now: 'Trwające promocje',
    valid_range: 'Ważność: {from} – {to}',
    view_leaflet: 'Zobacz gazetkę'
  }
};
