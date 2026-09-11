export type SupportedLocale = 'cs' | 'sk' | 'pl' | 'de' | 'en' | 'sl';

export interface LocaleInfo {
  code: SupportedLocale;
  name: string;
  flag: string;
}

export interface TranslationSchema {
  app: {
    title: string;
    subtitle: string;
    region_label: string;
    all_regions: string;
    select_region: string;
    version: string;
  };
  nav: {
    catalog: string;
    favorites: string;
    compare: string;
    basket: string;
    leaflets: string;
  };
  search: {
    placeholder: string;
    filter_store: string;
    filter_promo: string;
    sort_by: string;
    sort_price_asc: string;
    sort_unit_price: string;
    sort_discount: string;
    results_found: string;
    no_results: string;
  };
  product: {
    regular_price: string;
    club_price: string;
    unit_price: string;
    origin: string;
    manufacturer: string;
    valid_until: string;
    add_to_basket: string;
    added_to_basket: string;
    compare_btn: string;
    favorite_btn: string;
  };
  basket: {
    title: string;
    items_count: string;
    clear: string;
    optimize_btn: string;
    optimizing: string;
    total: string;
    cheapest_single: string;
    split_recommendation: string;
    save_amount: string;
    travel_friction: string;
    empty_basket: string;
  };
  nutrition: {
    title: string;
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
    fiber: string;
    price_per_protein: string;
    basket_nutrition: string;
  };
  leaflets: {
    title: string;
    active_now: string;
    valid_range: string;
    view_leaflet: string;
  };
}
