import type { TranslationSchema } from '../types';

export const en: TranslationSchema = {
  app: {
    title: 'KupiRadar',
    subtitle: 'Czech Retail Price Comparison & Smart Basket Optimizer',
    region_label: 'Location',
    all_regions: 'All Czech Republic (all stores)',
    select_region: 'Select region / Postal Code',
    version: 'EN'
  },
  nav: {
    catalog: 'Product Catalog',
    favorites: 'Favorites',
    compare: 'Comparison',
    basket: 'Basket & Calculator',
    leaflets: 'Weekly Leaflets'
  },
  search: {
    placeholder: 'Search groceries, drinks, household items...',
    filter_store: 'All Supermarkets',
    filter_promo: 'Promotions only',
    sort_by: 'Sort by',
    sort_price_asc: 'Lowest price',
    sort_unit_price: 'Price per 1 l / 1 kg',
    sort_discount: 'Highest discount %',
    results_found: 'Items found: {count}',
    no_results: 'No products found matching your filter criteria.'
  },
  product: {
    regular_price: 'Regular price',
    club_price: 'Loyalty card price',
    unit_price: 'Price per liter/kg',
    origin: 'Country of origin',
    manufacturer: 'Manufacturer / Bottler',
    valid_until: 'Promotion valid until',
    add_to_basket: 'Add to basket',
    added_to_basket: 'In basket',
    compare_btn: 'Compare',
    favorite_btn: 'Add to favorites'
  },
  basket: {
    title: 'Your Shopping Basket',
    items_count: '{count} items in basket',
    clear: 'Clear basket',
    optimize_btn: 'Optimize shopping',
    optimizing: 'Calculating the most cost-effective stores...',
    total: 'Total price',
    cheapest_single: 'Cheapest in 1 single store',
    split_recommendation: 'Smart split between 2 nearby stores',
    save_amount: 'You save up to {amount} Kč',
    travel_friction: 'Travel friction cost factored: {cost} Kč',
    empty_basket: 'Your basket is currently empty.'
  },
  nutrition: {
    title: 'Nutritional Profile & Calories',
    calories: 'Energy (kcal)',
    protein: 'Protein',
    carbs: 'Carbohydrates',
    fat: 'Fats',
    fiber: 'Fiber',
    price_per_protein: 'Cost per 1g protein',
    basket_nutrition: 'Total basket macronutrient yield'
  },
  leaflets: {
    title: 'Active Weekly Leaflets',
    active_now: 'Current store flyers',
    valid_range: 'Valid: {from} – {to}',
    view_leaflet: 'Open flyer'
  }
};
