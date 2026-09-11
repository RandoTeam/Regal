import { db } from './index';
import type { Product, Store, ProductWithPrice, RetailChainId } from './types';

export const storeService = {
  async getAll(): Promise<Store[]> {
    return await db.stores.toArray();
  },

  async getByRegion(region: string): Promise<Store[]> {
    return await db.stores.where('region').equals(region).toArray();
  },

  async getByChain(chainId: RetailChainId): Promise<Store[]> {
    return await db.stores.where('chainId').equals(chainId).toArray();
  }
};

export const productService = {
  async getAll(): Promise<Product[]> {
    return await db.products.toArray();
  },

  async getById(id: string): Promise<Product | undefined> {
    return await db.products.get(id);
  },

  async getProductWithPrices(productId: string): Promise<ProductWithPrice | null> {
    const product = await db.products.get(productId);
    if (!product) return null;

    const allPrices = await db.prices.where('productId').equals(productId).toArray();
    if (allPrices.length === 0) return null;

    // Find best price (club price if available, else regular)
    const sorted = [...allPrices].sort((a, b) => {
      const priceA = a.clubPrice ?? a.regularPrice;
      const priceB = b.clubPrice ?? b.regularPrice;
      return priceA - priceB;
    });

    const isFav = await favoriteService.isFavorite(productId);
    const basketItem = await db.basket.get(productId);

    return {
      ...product,
      bestPrice: sorted[0],
      allPrices: sorted,
      isFavorite: isFav,
      inBasketQuantity: basketItem?.quantity || 0
    };
  },

  async search(query: string, chainId?: RetailChainId | 'all', promoOnly = false): Promise<ProductWithPrice[]> {
    const normalizedQuery = query.toLowerCase().trim();
    let products = await db.products.toArray();

    if (normalizedQuery) {
      products = products.filter(p => 
        p.name.toLowerCase().includes(normalizedQuery) ||
        p.brand.toLowerCase().includes(normalizedQuery) ||
        p.category.toLowerCase().includes(normalizedQuery) ||
        p.ean.includes(normalizedQuery)
      );
    }

    const results: ProductWithPrice[] = [];

    for (const p of products) {
      let prices = await db.prices.where('productId').equals(p.id).toArray();
      
      if (chainId && chainId !== 'all') {
        prices = prices.filter(pr => pr.chainId === chainId);
      }

      if (promoOnly) {
        prices = prices.filter(pr => pr.isAction);
      }

      if (prices.length > 0) {
        prices.sort((a, b) => {
          const priceA = a.clubPrice ?? a.regularPrice;
          const priceB = b.clubPrice ?? b.regularPrice;
          return priceA - priceB;
        });

        const isFav = await favoriteService.isFavorite(p.id);
        const basketItem = await db.basket.get(p.id);

        results.push({
          ...p,
          bestPrice: prices[0],
          allPrices: prices,
          isFavorite: isFav,
          inBasketQuantity: basketItem?.quantity || 0
        });
      }
    }

    return results;
  }
};

export const favoriteService = {
  async getAll(): Promise<ProductWithPrice[]> {
    const favs = await db.favorites.toArray();
    const results: ProductWithPrice[] = [];
    for (const f of favs) {
      const p = await productService.getProductWithPrices(f.productId);
      if (p) results.push(p);
    }
    return results;
  },

  async isFavorite(productId: string): Promise<boolean> {
    const count = await db.favorites.where('productId').equals(productId).count();
    return count > 0;
  },

  async toggleFavorite(productId: string): Promise<boolean> {
    const existing = await db.favorites.get(productId);
    if (existing) {
      await db.favorites.delete(productId);
      return false;
    } else {
      await db.favorites.put({
        productId,
        addedAt: Date.now()
      });
      return true;
    }
  }
};

export const basketService = {
  async getItems(): Promise<{ product: ProductWithPrice; quantity: number }[]> {
    const basketRecords = await db.basket.toArray();
    const items: { product: ProductWithPrice; quantity: number }[] = [];

    for (const b of basketRecords) {
      const p = await productService.getProductWithPrices(b.productId);
      if (p) {
        items.push({
          product: p,
          quantity: b.quantity
        });
      }
    }
    return items;
  },

  async add(productId: string, quantity = 1): Promise<void> {
    const item = await db.basket.get(productId);
    if (item) {
      await db.basket.update(productId, { quantity: item.quantity + quantity });
    } else {
      await db.basket.put({ productId, quantity, addedAt: Date.now() });
    }
  },

  async updateQuantity(productId: string, quantity: number): Promise<void> {
    if (quantity <= 0) {
      await db.basket.delete(productId);
    } else {
      await db.basket.update(productId, { quantity });
    }
  },

  async clear(): Promise<void> {
    await db.basket.clear();
  }
};
