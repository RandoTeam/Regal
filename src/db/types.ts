export type RetailChainId = 
  | 'tesco'
  | 'billa'
  | 'albert'
  | 'lidl'
  | 'kaufland'
  | 'rohlik'
  | 'kosik'
  | 'globus'
  | 'tamda'
  | 'ratio'
  | 'coop'
  | 'jip'
  | 'esomarket';

export interface NutritionInfo {
  calories: number; // kcal per 100g/100ml
  protein: number;  // grams per 100g/100ml
  carbs: number;    // grams per 100g/100ml
  fat: number;      // grams per 100g/100ml
  fiber: number;    // grams per 100g/100ml
}

export interface Product {
  id: string;
  ean: string;
  name: string;
  brand: string;
  category: string;
  volumeLiters?: number;
  weightGrams?: number;
  packagingType: 'PET' | 'Plechovka' | 'Sklo' | 'TetraPak' | 'Balení' | 'Kus';
  countryOfOrigin: string;
  manufacturer: string;
  imageUrl: string;
  nutrition: NutritionInfo;
}

export interface Store {
  id: string;
  chainId: RetailChainId;
  chainName: string;
  branchName: string;
  address: string;
  city: string;
  postalCode: string; // PSČ
  region: string;     // Kraj
  isOnline: boolean;
  latitude?: number;
  longitude?: number;
}

export interface PriceRecord {
  id: string;
  productId: string;
  storeId: string;
  chainId: RetailChainId;
  regularPrice: number;
  clubPrice?: number;
  pricePerUnit: number; // Price per 1 l or 1 kg
  unitLabel: '1 l' | '1 kg' | '1 ks';
  isAction: boolean;
  actionName?: string; // 'Clubcard', 'Můj Albert', 'Lidl Plus', 'Akce leták'
  discountPercentage?: number;
  validFrom?: string;
  validTo?: string;
  productUrl: string;
}

export interface FavoriteItem {
  productId: string;
  addedAt: number;
  targetPriceAlert?: number;
}

export interface BasketItem {
  productId: string;
  quantity: number;
  addedAt: number;
}

export interface Leaflet {
  id: string;
  chainId: RetailChainId;
  chainName: string;
  title: string;
  validFrom: string;
  validTo: string;
  thumbnailUrl: string;
  pdfUrl?: string;
  viewUrl: string;
  pageCount: number;
}

export interface ProductWithPrice extends Product {
  bestPrice: PriceRecord;
  allPrices: PriceRecord[];
  isFavorite?: boolean;
  inBasketQuantity?: number;
}
