import type { Product, Store, PriceRecord, Leaflet } from '../db/types';

export const SEED_STORES: Store[] = [
  {
    id: 'store-tesco-narodni',
    chainId: 'tesco',
    chainName: 'Tesco',
    branchName: 'Tesco Praha Národní',
    address: 'Národní 63/26',
    city: 'Praha 1',
    postalCode: '110 00',
    region: 'Praha',
    isOnline: false,
    latitude: 50.0818,
    longitude: 14.4184
  },
  {
    id: 'store-billa-karlin',
    chainId: 'billa',
    chainName: 'BILLA',
    branchName: 'BILLA Karlínské náměstí',
    address: 'Sokolovská 49/5',
    city: 'Praha 8',
    postalCode: '186 00',
    region: 'Praha',
    isOnline: false,
    latitude: 50.0917,
    longitude: 14.4468
  },
  {
    id: 'store-albert-andel',
    chainId: 'albert',
    chainName: 'Albert',
    branchName: 'Albert Supermarket Anděl',
    address: 'Plzeňská 233/8',
    city: 'Praha 5',
    postalCode: '150 00',
    region: 'Praha',
    isOnline: false,
    latitude: 50.0715,
    longitude: 14.4028
  },
  {
    id: 'store-lidl-vinohrady',
    chainId: 'lidl',
    chainName: 'Lidl',
    branchName: 'Lidl Vinohrady',
    address: 'Italská 36/14',
    city: 'Praha 2',
    postalCode: '120 00',
    region: 'Praha',
    isOnline: false,
    latitude: 50.0792,
    longitude: 14.4374
  },
  {
    id: 'store-kaufland-liben',
    chainId: 'kaufland',
    chainName: 'Kaufland',
    branchName: 'Kaufland Praha Libeň',
    address: 'Voctářova 2401/8',
    city: 'Praha 8',
    postalCode: '180 00',
    region: 'Praha',
    isOnline: false,
    latitude: 50.1042,
    longitude: 14.4719
  },
  {
    id: 'store-rohlik-praha',
    chainId: 'rohlik',
    chainName: 'Rohlík.cz',
    branchName: 'Rohlík Praha Rozvoz',
    address: 'K Vypichu 502, Chrášťany',
    city: 'Praha',
    postalCode: '252 19',
    region: 'Praha',
    isOnline: true
  },
  {
    id: 'store-kosik-praha',
    chainId: 'kosik',
    chainName: 'Košík.cz',
    branchName: 'Košík Praha Rozvoz',
    address: 'Fabiánovská 673',
    city: 'Praha 9',
    postalCode: '190 00',
    region: 'Praha',
    isOnline: true
  },
  {
    id: 'store-tamda-sapa',
    chainId: 'tamda',
    chainName: 'Tamda Foods',
    branchName: 'Tamda Foods Praha Sapa',
    address: 'Libušská 319/126',
    city: 'Praha 4',
    postalCode: '142 00',
    region: 'Praha',
    isOnline: false,
    latitude: 50.0076,
    longitude: 14.4764
  }
];

export const SEED_PRODUCTS: Product[] = [
  {
    id: 'prod-coca-2l',
    ean: '5449000000286',
    name: 'Coca-Cola Original 2.0 l',
    brand: 'Coca-Cola',
    category: 'Nápoje',
    volumeLiters: 2.0,
    packagingType: 'PET',
    countryOfOrigin: 'Česká republika',
    manufacturer: 'Coca-Cola HBC Česko a Slovensko, s.r.o. (Českobrodská 1329, Praha 9 - Kyje)',
    imageUrl: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=500&auto=format&fit=crop&q=80',
    nutrition: {
      calories: 42,
      protein: 0,
      carbs: 10.6,
      fat: 0,
      fiber: 0
    }
  },
  {
    id: 'prod-coca-1-5l',
    ean: '5449000000996',
    name: 'Coca-Cola Original 1.5 l',
    brand: 'Coca-Cola',
    category: 'Nápoje',
    volumeLiters: 1.5,
    packagingType: 'PET',
    countryOfOrigin: 'Česká republika',
    manufacturer: 'Coca-Cola HBC Česko a Slovensko, s.r.o. (Praha 9 - Kyje)',
    imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&auto=format&fit=crop&q=80',
    nutrition: {
      calories: 42,
      protein: 0,
      carbs: 10.6,
      fat: 0,
      fiber: 0
    }
  },
  {
    id: 'prod-coca-0-5l',
    ean: '5449000000453',
    name: 'Coca-Cola Original 0.5 l',
    brand: 'Coca-Cola',
    category: 'Nápoje',
    volumeLiters: 0.5,
    packagingType: 'PET',
    countryOfOrigin: 'Česká republika',
    manufacturer: 'Coca-Cola HBC Česko a Slovensko, s.r.o. (Praha 9 - Kyje)',
    imageUrl: 'https://images.unsplash.com/photo-1567103472667-6898f3a79cf2?w=500&auto=format&fit=crop&q=80',
    nutrition: {
      calories: 42,
      protein: 0,
      carbs: 10.6,
      fat: 0,
      fiber: 0
    }
  },
  {
    id: 'prod-kofola-2l',
    ean: '8594008330101',
    name: 'Kofola Original 2.0 l',
    brand: 'Kofola',
    category: 'Nápoje',
    volumeLiters: 2.0,
    packagingType: 'PET',
    countryOfOrigin: 'Česká republika',
    manufacturer: 'Kofola a.s. (Za Drahou 165/1, Krnov)',
    imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&auto=format&fit=crop&q=80',
    nutrition: {
      calories: 32,
      protein: 0,
      carbs: 8.0,
      fat: 0,
      fiber: 0
    }
  },
  {
    id: 'prod-mattoni-1-5l',
    ean: '8594003010022',
    name: 'Mattoni Přírodní minerální voda jemně perlivá 1.5 l',
    brand: 'Mattoni',
    category: 'Nápoje',
    volumeLiters: 1.5,
    packagingType: 'PET',
    countryOfOrigin: 'Česká republika',
    manufacturer: 'Mattoni 1873 a.s. (Kyselka u Karlových Varů)',
    imageUrl: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=500&auto=format&fit=crop&q=80',
    nutrition: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0
    }
  },
  {
    id: 'prod-madeta-mleko-1l',
    ean: '8593803102409',
    name: 'Jihočeské mléko polotučné 1.5% 1.0 l',
    brand: 'Madeta',
    category: 'Mléčné výrobky',
    volumeLiters: 1.0,
    packagingType: 'TetraPak',
    countryOfOrigin: 'Česká republika',
    manufacturer: 'Madeta a.s. (Rudolfovská 246/83, České Budějovice)',
    imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&auto=format&fit=crop&q=80',
    nutrition: {
      calories: 47,
      protein: 3.3,
      carbs: 4.8,
      fat: 1.5,
      fiber: 0
    }
  },
  {
    id: 'prod-kureci-prsa-1kg',
    ean: '8594001248014',
    name: 'Kuřecí prsní řízky chlazené 1 kg',
    brand: 'Vodňanské kuře',
    category: 'Maso a drůbež',
    weightGrams: 1000,
    packagingType: 'Balení',
    countryOfOrigin: 'Česká republika',
    manufacturer: 'Vodňanská drůbež, a.s. (Radomilická 886, Vodňany)',
    imageUrl: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=500&auto=format&fit=crop&q=80',
    nutrition: {
      calories: 106,
      protein: 23.0,
      carbs: 0,
      fat: 1.2,
      fiber: 0
    }
  },
  {
    id: 'prod-chleb-sumava-1200g',
    ean: '8594012019917',
    name: 'Pšenično-žitný chléb Šumava 1200 g',
    brand: 'Penam',
    category: 'Pečivo',
    weightGrams: 1200,
    packagingType: 'Kus',
    countryOfOrigin: 'Česká republika',
    manufacturer: 'PENAM, a.s. (Cejl 504/38, Brno)',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=80',
    nutrition: {
      calories: 235,
      protein: 7.2,
      carbs: 48.0,
      fat: 1.1,
      fiber: 4.5
    }
  },
  {
    id: 'prod-pilsner-urquell-0-5l',
    ean: '8594404110123',
    name: 'Pilsner Urquell světlý ležák 0.5 l',
    brand: 'Pilsner Urquell',
    category: 'Pivo a alkohol',
    volumeLiters: 0.5,
    packagingType: 'Plechovka',
    countryOfOrigin: 'Česká republika',
    manufacturer: 'Plzeňský Prazdroj, a.s. (U Prazdroje 7, Plzeň)',
    imageUrl: 'https://images.unsplash.com/photo-1608270116812-d81b369527cf?w=500&auto=format&fit=crop&q=80',
    nutrition: {
      calories: 43,
      protein: 0.5,
      carbs: 3.1,
      fat: 0,
      fiber: 0
    }
  }
];

export const SEED_PRICES: PriceRecord[] = [
  // Coca-Cola 2L
  {
    id: 'p-coca2-tesco',
    productId: 'prod-coca-2l',
    storeId: 'store-tesco-narodni',
    chainId: 'tesco',
    regularPrice: 49.90,
    clubPrice: 36.90,
    pricePerUnit: 18.45,
    unitLabel: '1 l',
    isAction: true,
    actionName: 'Clubcard (−26%)',
    discountPercentage: 26,
    validFrom: '2026-09-02',
    validTo: '2026-09-08',
    productUrl: 'https://nakup.itesco.cz/groceries/cs-CZ/products/2001014881774'
  },
  {
    id: 'p-coca2-billa',
    productId: 'prod-coca-2l',
    storeId: 'store-billa-karlin',
    chainId: 'billa',
    regularPrice: 49.90,
    clubPrice: 36.90,
    pricePerUnit: 18.45,
    unitLabel: '1 l',
    isAction: true,
    actionName: 'Akce Praha',
    discountPercentage: 26,
    validFrom: '2026-09-02',
    validTo: '2026-09-08',
    productUrl: 'https://www.foodora.cz/shop/wi1x/billa-praha-podebradska'
  },
  {
    id: 'p-coca2-kaufland',
    productId: 'prod-coca-2l',
    storeId: 'store-kaufland-liben',
    chainId: 'kaufland',
    regularPrice: 49.90,
    clubPrice: 36.90,
    pricePerUnit: 18.45,
    unitLabel: '1 l',
    isAction: true,
    actionName: 'Letáková akce',
    discountPercentage: 26,
    validFrom: '2026-09-02',
    validTo: '2026-09-08',
    productUrl: 'https://www.kaufland.cz/letak.html'
  },
  {
    id: 'p-coca2-rohlik',
    productId: 'prod-coca-2l',
    storeId: 'store-rohlik-praha',
    chainId: 'rohlik',
    regularPrice: 44.90,
    pricePerUnit: 22.45,
    unitLabel: '1 l',
    isAction: false,
    productUrl: 'https://www.rohlik.cz'
  },

  // Coca-Cola 1.5L
  {
    id: 'p-coca15-albert',
    productId: 'prod-coca-1-5l',
    storeId: 'store-albert-andel',
    chainId: 'albert',
    regularPrice: 44.90,
    clubPrice: 26.90,
    pricePerUnit: 17.93,
    unitLabel: '1 l',
    isAction: true,
    actionName: 'Můj Albert (−40%)',
    discountPercentage: 40,
    validFrom: '2026-09-02',
    validTo: '2026-09-08',
    productUrl: 'https://www.albert.cz/aktualni-letak'
  },
  {
    id: 'p-coca15-rohlik',
    productId: 'prod-coca-1-5l',
    storeId: 'store-rohlik-praha',
    chainId: 'rohlik',
    regularPrice: 34.50,
    pricePerUnit: 23.00,
    unitLabel: '1 l',
    isAction: false,
    productUrl: 'https://www.rohlik.cz/1410811-coca-cola'
  },
  {
    id: 'p-coca15-tamda',
    productId: 'prod-coca-1-5l',
    storeId: 'store-tamda-sapa',
    chainId: 'tamda',
    regularPrice: 32.90,
    clubPrice: 28.50,
    pricePerUnit: 19.00,
    unitLabel: '1 l',
    isAction: true,
    actionName: 'Tamda Club',
    discountPercentage: 13,
    validFrom: '2026-09-01',
    validTo: '2026-09-08',
    productUrl: 'https://tamdaexpress.eu'
  },

  // Coca-Cola 0.5L
  {
    id: 'p-coca05-billa',
    productId: 'prod-coca-0-5l',
    storeId: 'store-billa-karlin',
    chainId: 'billa',
    regularPrice: 29.90,
    clubPrice: 23.90,
    pricePerUnit: 47.80,
    unitLabel: '1 l',
    isAction: true,
    actionName: 'Akční leták',
    discountPercentage: 20,
    validFrom: '2026-09-02',
    validTo: '2026-09-08',
    productUrl: 'https://www.kupi.cz/letak/billa-letak-tak-dobre-ze-je-radost-grilovat-3'
  },

  // Kofola 2L
  {
    id: 'p-kofola-tesco',
    productId: 'prod-kofola-2l',
    storeId: 'store-tesco-narodni',
    chainId: 'tesco',
    regularPrice: 42.90,
    clubPrice: 27.90,
    pricePerUnit: 13.95,
    unitLabel: '1 l',
    isAction: true,
    actionName: 'Clubcard',
    discountPercentage: 35,
    validFrom: '2026-09-02',
    validTo: '2026-09-08',
    productUrl: 'https://nakup.itesco.cz'
  },
  {
    id: 'p-kofola-billa',
    productId: 'prod-kofola-2l',
    storeId: 'store-billa-karlin',
    chainId: 'billa',
    regularPrice: 39.90,
    pricePerUnit: 19.95,
    unitLabel: '1 l',
    isAction: false,
    productUrl: 'https://www.billa.cz'
  },

  // Mléko 1L
  {
    id: 'p-mleko-albert',
    productId: 'prod-madeta-mleko-1l',
    storeId: 'store-albert-andel',
    chainId: 'albert',
    regularPrice: 24.90,
    clubPrice: 15.90,
    pricePerUnit: 15.90,
    unitLabel: '1 l',
    isAction: true,
    actionName: 'Můj Albert (−36%)',
    discountPercentage: 36,
    validFrom: '2026-09-02',
    validTo: '2026-09-08',
    productUrl: 'https://www.albert.cz'
  },
  {
    id: 'p-mleko-lidl',
    productId: 'prod-madeta-mleko-1l',
    storeId: 'store-lidl-vinohrady',
    chainId: 'lidl',
    regularPrice: 22.90,
    clubPrice: 16.90,
    pricePerUnit: 16.90,
    unitLabel: '1 l',
    isAction: true,
    actionName: 'Lidl Plus',
    discountPercentage: 26,
    validFrom: '2026-09-02',
    validTo: '2026-09-08',
    productUrl: 'https://www.lidl.cz'
  },

  // Kuřecí prsa 1kg
  {
    id: 'p-kure-kaufland',
    productId: 'prod-kureci-prsa-1kg',
    storeId: 'store-kaufland-liben',
    chainId: 'kaufland',
    regularPrice: 219.00,
    clubPrice: 129.90,
    pricePerUnit: 129.90,
    unitLabel: '1 kg',
    isAction: true,
    actionName: 'Trhák týdne (−40%)',
    discountPercentage: 40,
    validFrom: '2026-09-02',
    validTo: '2026-09-08',
    productUrl: 'https://www.kaufland.cz'
  },
  {
    id: 'p-kure-tesco',
    productId: 'prod-kureci-prsa-1kg',
    storeId: 'store-tesco-narodni',
    chainId: 'tesco',
    regularPrice: 199.90,
    clubPrice: 139.90,
    pricePerUnit: 139.90,
    unitLabel: '1 kg',
    isAction: true,
    actionName: 'Clubcard',
    discountPercentage: 30,
    validFrom: '2026-09-02',
    validTo: '2026-09-08',
    productUrl: 'https://nakup.itesco.cz'
  },
  {
    id: 'p-kure-rohlik',
    productId: 'prod-kureci-prsa-1kg',
    storeId: 'store-rohlik-praha',
    chainId: 'rohlik',
    regularPrice: 189.90,
    pricePerUnit: 189.90,
    unitLabel: '1 kg',
    isAction: false,
    productUrl: 'https://www.rohlik.cz'
  },

  // Chléb Šumava
  {
    id: 'p-chleb-albert',
    productId: 'prod-chleb-sumava-1200g',
    storeId: 'store-albert-andel',
    chainId: 'albert',
    regularPrice: 42.90,
    clubPrice: 32.90,
    pricePerUnit: 27.42,
    unitLabel: '1 kg',
    isAction: true,
    actionName: 'Akce',
    discountPercentage: 23,
    validFrom: '2026-09-02',
    validTo: '2026-09-08',
    productUrl: 'https://www.albert.cz'
  },
  {
    id: 'p-chleb-billa',
    productId: 'prod-chleb-sumava-1200g',
    storeId: 'store-billa-karlin',
    chainId: 'billa',
    regularPrice: 39.90,
    pricePerUnit: 33.25,
    unitLabel: '1 kg',
    isAction: false,
    productUrl: 'https://www.billa.cz'
  },

  // Pilsner Urquell 0.5L
  {
    id: 'p-plzen-albert',
    productId: 'prod-pilsner-urquell-0-5l',
    storeId: 'store-albert-andel',
    chainId: 'albert',
    regularPrice: 37.90,
    clubPrice: 24.90,
    pricePerUnit: 49.80,
    unitLabel: '1 l',
    isAction: true,
    actionName: 'Můj Albert (−34%)',
    discountPercentage: 34,
    validFrom: '2026-09-02',
    validTo: '2026-09-08',
    productUrl: 'https://www.albert.cz'
  },
  {
    id: 'p-plzen-tesco',
    productId: 'prod-pilsner-urquell-0-5l',
    storeId: 'store-tesco-narodni',
    chainId: 'tesco',
    regularPrice: 36.90,
    clubPrice: 25.90,
    pricePerUnit: 51.80,
    unitLabel: '1 l',
    isAction: true,
    actionName: 'Clubcard',
    discountPercentage: 29,
    validFrom: '2026-09-02',
    validTo: '2026-09-08',
    productUrl: 'https://nakup.itesco.cz'
  }
];

export const SEED_LEAFLETS: Leaflet[] = [
  {
    id: 'leaflet-tesco-supermarket',
    chainId: 'tesco',
    chainName: 'Tesco Supermarket',
    title: 'Tesco Velký týdenní leták Praha',
    validFrom: '2026-09-02',
    validTo: '2026-09-08',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=80',
    viewUrl: 'https://nakup.itesco.cz/groceries/cs-CZ/promotions',
    pageCount: 24
  },
  {
    id: 'leaflet-billa-grilovani',
    chainId: 'billa',
    chainName: 'BILLA',
    title: 'BILLA Akční leták: Radost z nákupu',
    validFrom: '2026-09-02',
    validTo: '2026-09-08',
    thumbnailUrl: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=500&auto=format&fit=crop&q=80',
    viewUrl: 'https://www.billa.cz/akce-a-slevy/letaky',
    pageCount: 18
  },
  {
    id: 'leaflet-albert-hypermarket',
    chainId: 'albert',
    chainName: 'Albert Hypermarket',
    title: 'Albert Hypermarket Praha & ČR',
    validFrom: '2026-09-02',
    validTo: '2026-09-08',
    thumbnailUrl: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=500&auto=format&fit=crop&q=80',
    viewUrl: 'https://www.albert.cz/aktualni-letak',
    pageCount: 32
  },
  {
    id: 'leaflet-lidl-super-tyden',
    chainId: 'lidl',
    chainName: 'Lidl',
    title: 'Lidl Akce od čtvrtka',
    validFrom: '2026-09-03',
    validTo: '2026-09-06',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=500&auto=format&fit=crop&q=80',
    viewUrl: 'https://www.lidl.cz/c/akcni-letak/s10007873',
    pageCount: 28
  }
];
