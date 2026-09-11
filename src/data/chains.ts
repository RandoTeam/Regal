import type { RetailChainId } from '../db/types';

export interface ChainMeta {
  id: RetailChainId;
  name: string;
  badgeBg: string;
  badgeText: string;
  accentColor: string;
  hasLoyaltyClub: boolean;
  loyaltyClubName?: string;
  website: string;
  pragueBranches: number;
}

export const CZECH_RETAIL_CHAINS: Record<RetailChainId, ChainMeta> = {
  tesco: {
    id: 'tesco',
    name: 'Tesco',
    badgeBg: 'bg-blue-50 dark:bg-blue-950/60',
    badgeText: 'text-blue-700 dark:text-blue-300',
    accentColor: '#00539f',
    hasLoyaltyClub: true,
    loyaltyClubName: 'Clubcard',
    website: 'https://nakup.itesco.cz',
    pragueBranches: 28
  },
  billa: {
    id: 'billa',
    name: 'BILLA',
    badgeBg: 'bg-yellow-50 dark:bg-yellow-950/60',
    badgeText: 'text-yellow-800 dark:text-yellow-300',
    accentColor: '#fed100',
    hasLoyaltyClub: true,
    loyaltyClubName: 'BILLA Bonus',
    website: 'https://www.billa.cz',
    pragueBranches: 73
  },
  albert: {
    id: 'albert',
    name: 'Albert',
    badgeBg: 'bg-amber-50 dark:bg-amber-950/60',
    badgeText: 'text-amber-800 dark:text-amber-300',
    accentColor: '#ffbb00',
    hasLoyaltyClub: true,
    loyaltyClubName: 'Můj Albert',
    website: 'https://www.albert.cz',
    pragueBranches: 82
  },
  lidl: {
    id: 'lidl',
    name: 'Lidl',
    badgeBg: 'bg-sky-50 dark:bg-sky-950/60',
    badgeText: 'text-sky-700 dark:text-sky-300',
    accentColor: '#0050aa',
    hasLoyaltyClub: true,
    loyaltyClubName: 'Lidl Plus',
    website: 'https://www.lidl.cz',
    pragueBranches: 77
  },
  kaufland: {
    id: 'kaufland',
    name: 'Kaufland',
    badgeBg: 'bg-red-50 dark:bg-red-950/60',
    badgeText: 'text-red-700 dark:text-red-300',
    accentColor: '#d60000',
    hasLoyaltyClub: true,
    loyaltyClubName: 'Kaufland Card',
    website: 'https://www.kaufland.cz',
    pragueBranches: 18
  },
  rohlik: {
    id: 'rohlik',
    name: 'Rohlík.cz',
    badgeBg: 'bg-emerald-50 dark:bg-emerald-950/60',
    badgeText: 'text-emerald-700 dark:text-emerald-300',
    accentColor: '#2b9348',
    hasLoyaltyClub: true,
    loyaltyClubName: 'Rohlíček / Premium',
    website: 'https://www.rohlik.cz',
    pragueBranches: 1 // Online delivery
  },
  kosik: {
    id: 'kosik',
    name: 'Košík.cz',
    badgeBg: 'bg-rose-50 dark:bg-rose-950/60',
    badgeText: 'text-rose-700 dark:text-rose-300',
    accentColor: '#e4162f',
    hasLoyaltyClub: true,
    loyaltyClubName: 'Benjamínek / Plná péče',
    website: 'https://www.kosik.cz',
    pragueBranches: 1 // Online delivery
  },
  globus: {
    id: 'globus',
    name: 'Globus',
    badgeBg: 'bg-orange-50 dark:bg-orange-950/60',
    badgeText: 'text-orange-700 dark:text-orange-300',
    accentColor: '#f39200',
    hasLoyaltyClub: true,
    loyaltyClubName: 'Globus Bonus',
    website: 'https://www.globus.cz',
    pragueBranches: 3 // Zličín, Čakovice, Štěrboholy
  },
  tamda: {
    id: 'tamda',
    name: 'Tamda Foods',
    badgeBg: 'bg-purple-50 dark:bg-purple-950/60',
    badgeText: 'text-purple-700 dark:text-purple-300',
    accentColor: '#7b2cbf',
    hasLoyaltyClub: true,
    loyaltyClubName: 'Tamda Club',
    website: 'https://tamdaexpress.eu',
    pragueBranches: 1 // Sapa Libuš
  },
  ratio: {
    id: 'ratio',
    name: 'Ratio s.r.o.',
    badgeBg: 'bg-teal-50 dark:bg-teal-950/60',
    badgeText: 'text-teal-700 dark:text-teal-300',
    accentColor: '#007f5f',
    hasLoyaltyClub: false,
    website: 'https://velkoobchod.ratio.cz',
    pragueBranches: 1 // Lipence
  },
  coop: {
    id: 'coop',
    name: 'COOP',
    badgeBg: 'bg-red-50 dark:bg-red-950/60',
    badgeText: 'text-red-800 dark:text-red-300',
    accentColor: '#e60000',
    hasLoyaltyClub: false,
    website: 'https://www.skupina.coop',
    pragueBranches: 52
  },
  jip: {
    id: 'jip',
    name: 'JIP Potraviny',
    badgeBg: 'bg-blue-50 dark:bg-blue-950/60',
    badgeText: 'text-blue-800 dark:text-blue-300',
    accentColor: '#003366',
    hasLoyaltyClub: false,
    website: 'https://jip-potraviny.cz',
    pragueBranches: 3
  },
  esomarket: {
    id: 'esomarket',
    name: 'ESO MARKET',
    badgeBg: 'bg-slate-100 dark:bg-slate-800',
    badgeText: 'text-slate-800 dark:text-slate-200',
    accentColor: '#475569',
    hasLoyaltyClub: false,
    website: 'https://www.kupi.cz/obchod/eso-market',
    pragueBranches: 36
  }
};
