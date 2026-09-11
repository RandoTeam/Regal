import Dexie, { type Table } from 'dexie';
import type { Product, Store, PriceRecord, FavoriteItem, BasketItem, Leaflet } from './types';

export class RegalDB extends Dexie {
  products!: Table<Product, string>;
  stores!: Table<Store, string>;
  prices!: Table<PriceRecord, string>;
  favorites!: Table<FavoriteItem, string>;
  basket!: Table<BasketItem, string>;
  leaflets!: Table<Leaflet, string>;

  constructor() {
    super('RegalDB');
    this.version(1).stores({
      products: 'id, ean, name, brand, category',
      stores: 'id, chainId, city, postalCode, region, isOnline',
      prices: 'id, productId, storeId, chainId, isAction, regularPrice, clubPrice, pricePerUnit',
      favorites: 'productId, addedAt',
      basket: 'productId, quantity',
      leaflets: 'id, chainId, validTo'
    });
  }
}

export type KupiRadarDB = RegalDB;
export const db = new RegalDB();

