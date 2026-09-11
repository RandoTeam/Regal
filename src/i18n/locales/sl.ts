import type { TranslationSchema } from '../types';

export const sl: TranslationSchema = {
  app: {
    title: 'KupiRadar',
    subtitle: 'Primerjalnik cen in pametni optimizator nakupovalne košarice za Češko',
    region_label: 'Lokacija',
    all_regions: 'Vsa Češka (vse trgovine)',
    select_region: 'Izberite regijo / poštno številko',
    version: 'SL'
  },
  nav: {
    catalog: 'Katalog izdelkov',
    favorites: 'Priljubljeno',
    compare: 'Primerjava',
    basket: 'Košarica & Kalkulator',
    leaflets: 'Katalogi in akcije'
  },
  search: {
    placeholder: 'Iskanje živil, pijač, drogerije...',
    filter_store: 'Vse verige',
    filter_promo: 'Samo akcijske ponudbe',
    sort_by: 'Razvrsti po',
    sort_price_asc: 'Najnižja cena',
    sort_unit_price: 'Cena za 1 l / 1 kg',
    sort_discount: 'Največji popust %',
    results_found: 'Najdenih izdelkov: {count}',
    no_results: 'Ni najdenih izdelkov po izbranih filtrih.'
  },
  product: {
    regular_price: 'Redna cena',
    club_price: 'Cena s klubsko kartico',
    unit_price: 'Cena na liter/kg',
    origin: 'Država porekla',
    manufacturer: 'Proizvajalec',
    valid_until: 'Akcija velja do',
    add_to_basket: 'Dodaj v košarico',
    added_to_basket: 'V košarici',
    compare_btn: 'Primerjaj',
    favorite_btn: 'Med priljubljene'
  },
  basket: {
    title: 'Vaša nakupovalna košarica',
    items_count: '{count} izdelkov v košarici',
    clear: 'Izprazni košarico',
    optimize_btn: 'Optimiziraj nakup',
    optimizing: 'Iskanje najugodnejše kombinacije trgovin...',
    total: 'Skupna cena',
    cheapest_single: 'Najceneje v 1 trgovini',
    split_recommendation: 'Pametna razdelitev med 2 trgovini',
    save_amount: 'Prihranite do {amount} Kč',
    travel_friction: 'Všteti potni stroški: {cost} Kč',
    empty_basket: 'Vaša košarica je trenutno prazna.'
  },
  nutrition: {
    title: 'Hranilne vrednosti in kalorije',
    calories: 'Energija (kcal)',
    protein: 'Beljakovine',
    carbs: 'Ogljikovi hidrati',
    fat: 'Maščobe',
    fiber: 'Vlaknine',
    price_per_protein: 'Cena na 1 g beljakovin',
    basket_nutrition: 'Skupne hranilne vrednosti celotnega nakupa'
  },
  leaflets: {
    title: 'Aktualni akcijski letaki',
    active_now: 'Veljavne akcije',
    valid_range: 'Veljavnost: {from} – {to}',
    view_leaflet: 'Odpri letak'
  }
};
