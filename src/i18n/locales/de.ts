import type { TranslationSchema } from '../types';

export const de: TranslationSchema = {
  app: {
    title: 'Regál',
    subtitle: 'Preisvergleich und Warenkorb-Optimierer für Tschechien',
    region_label: 'Standort',
    all_regions: 'Ganz Tschechien (alle Geschäfte)',
    select_region: 'Region / PLZ wählen',
    version: 'DE'
  },
  nav: {
    catalog: 'Produktkatalog',
    favorites: 'Favoriten',
    compare: 'Vergleich',
    basket: 'Warenkorb & Rechner',
    leaflets: 'Prospekte & Aktionen'
  },
  search: {
    placeholder: 'Lebensmittel, Getränke, Drogerie suchen...',
    filter_store: 'Alle Ketten',
    filter_promo: 'Nur Angebote',
    sort_by: 'Sortieren nach',
    sort_price_asc: 'Günstigster Preis',
    sort_unit_price: 'Preis pro 1 l / 1 kg',
    sort_discount: 'Höchster Rabatt %',
    results_found: 'Gefundene Artikel: {count}',
    no_results: 'Keine Produkte gefunden, die den Kriterien entsprechen.'
  },
  product: {
    regular_price: 'Regulärer Preis',
    club_price: 'Preis mit Kundenkarte',
    unit_price: 'Preis pro Liter/kg',
    origin: 'Herkunftsland',
    manufacturer: 'Hersteller',
    valid_until: 'Aktion gültig bis',
    add_to_basket: 'In den Warenkorb',
    added_to_basket: 'Im Warenkorb',
    compare_btn: 'Vergleichen',
    favorite_btn: 'Merken'
  },
  basket: {
    title: 'Ihr Warenkorb',
    items_count: '{count} Artikel im Warenkorb',
    clear: 'Warenkorb leeren',
    optimize_btn: 'Einkauf optimieren',
    optimizing: 'Günstigste Geschäftskombination wird berechnet...',
    total: 'Gesamtpreis',
    cheapest_single: 'Günstigster Einkauf in 1 Geschäft',
    split_recommendation: 'Intelligente Aufteilung auf 2 Geschäfte',
    save_amount: 'Sparen Sie bis zu {amount} Kč',
    travel_friction: 'Fahrtkosten berücksichtigt: {cost} Kč',
    empty_basket: 'Ihr Warenkorb ist noch leer.'
  },
  nutrition: {
    title: 'Nährwerte & Kalorien',
    calories: 'Energie (kcal)',
    protein: 'Eiweiß',
    carbs: 'Kohlenhydrate',
    fat: 'Fett',
    fiber: 'Ballaststoffe',
    price_per_protein: 'Kosten pro 1 g Eiweiß',
    basket_nutrition: 'Gesamtnährwerte des Einkaufs'
  },
  leaflets: {
    title: 'Aktuelle Prospekte',
    active_now: 'Aktive Angebote',
    valid_range: 'Gültig: {from} – {to}',
    view_leaflet: 'Prospekt ansehen'
  }
};
