# ROADMAP & PIPELINE: Regál (Czech Retail & Basket Optimizer)

Centrální registr fází, podfází a kroků realizace multiplatformní aplikace pro vyhledávání produktů, srovnání cen, optimalizaci nákupního košíku a sledování KBJU v České republice (Web, Desktop, Mobile, Foldable).

---

## Stav dokončení projektu

- [x] **Fáze 1: Architektonický základ, design systém a adaptivní rozvržení**
  - [x] **Podfáze 1.1:** Inicializace projektu, sestavení a základní nástroje (Vite + Vue 3.5 + TS + Tailwind CSS + Lucide Icons + PWA plugin).
  - [x] **Podfáze 1.2:** Lokalizační jádro i18n (CS, SK, PL, DE, EN, SL) s dynamickým přepínáním za běhu bez nutnosti znovunačtení stránky.
  - [x] **Podfáze 1.3:** Adaptivní rozvržení pro skládací zařízení (FoldableTwoPane, CSS Viewport Segments API, Tabletop režim, tablety, desktop).

- [x] **Fáze 2: Datové modely, lokální úložiště a katalog vyhledávání**
  - [x] **Podfáze 2.1:** IndexedDB schéma (Dexie.js) a TypeScript rozhraní (produkty, ceny, prodejny, regiony/PSČ, KBJU).
  - [x] **Podfáze 2.2:** Katalog obchodních řetězců a reprezentativní dataset českých produktů (Tesco, Billa, Albert, Lidl, Kaufland, Rohlík, Košík, Globus, Tamda, Ratio, Coop) s fotografiemi, čárovými kódy a údaji o stáčírnách/výrobcích.
  - [x] **Podfáze 2.3:** Ergonomické uživatelské rozhraní katalogu, vyhledávání, fazetové filtry (řetězce, regiony, akce) a produktové karty.

- [x] **Fáze 3: Oblíbené položky, srovnání produktů a akční letáky**
  - [x] **Podfáze 3.1:** Modul «Oblíbené» s lokálním ukládáním a sledováním cenového vývoje.
  - [x] **Podfáze 3.2:** Modul «Srovnání produktů» (side-by-side porovnání měrných cen za 1 l/kg, objemu a složení).
  - [x] **Podfáze 3.3:** Sekce «Akční letáky» s kalendářem platnosti a filtrací aktuálních slev týdne.

- [x] **Fáze 4: Inteligentní optimalizátor košíku a nutriční profil (KBJU)**
  - [x] **Podfáze 4.1:** Web Worker na pozadí pro optimalizaci košíku (hledání minimální ceny: 1 obchod vs. rozdělení do 2 obchodů s modelem dopravních nákladů).
  - [x] **Podfáze 4.2:** Nutriční kalkulačka (součet KBJU, makroživiny, výpočet ceny za 1 gram bílkoviny).
  - [x] **Podfáze 4.3:** Interaktivní rozhraní košíku s adaptací pro Tabletop režim na skládacích telefonech.

- [x] **Fáze 5: Offline režim, PWA a multiplatformní sestavení**
  - [x] **Podfáze 5.1:** Nastavení Service Workeru, offline ukládání do mezipaměti, PWA manifest a ikony.
  - [x] **Podfáze 5.2:** Konfigurace pro sestavení Capacitor (Android APK) a Tauri v2 (Desktop Windows/macOS/Linux).
  - [x] **Podfáze 5.3:** Komplexní end-to-end verifikace všech zařízení a finální schválení.

---

## Záznam změn (Changelog)

### [2026-09-11] Rebranding & Vektorová ikona Material 3
* Úspěšný přechod na oficiální českou značku **Regál** (`cz.regal.app`).
* Vytvořena čistá vektorová SVG ikona (`visací cenovka`) otočená o -14° s otvorem pro zavěšení, symbolem `%` a nápisem `CENA`.
* Vytvořeny oficiální vrstvy Android Adaptive Icon včetně `ic_launcher_monochrome.xml` pro dynamické přebarvování v Material You (Android 13–17).
* GitHub repozitář přejmenován na `RandoTeam/Regal`.

### [2026-09-11] Fáze 5. Podfáze 5.3 dokončena (PROJEKT 100% DOKONČEN)
* Vytvořen komplexní end-to-end verifikační test `tests/e2e_full_verification_test.ts` testující 9 klíčových systémů aplikace (databáze, 6 jazyků i18n, 13 řetězců, katalog, měrné ceny, oblíbené, košík a Web Worker optimalizátor, nutriční profil, akční letáky, multiplatformní konfigurace).
* Všech 11 automatizovaných testovacích sad úspěšně prošlo (`npm test`).
* Úspěšně ověřena produkční kompilace TypeScript a Vite PWA (`npm run build`).
* Všech 5 fází a 14 podfází technické specifikace plně dokončeno a verifikováno.

### [2026-09-11] Fáze 5. Podfáze 5.2 dokončena
* Připravena konfigurace Capacitor `capacitor.config.ts` (identifikátor `cz.regal.app`, zabezpečené schéma `https`, splash screen `#0f172a`).
* Vytvořen soubor `android/app/src/main/AndroidManifest.xml` s hardwarovou podporou skládacích zařízení (`android:resizeableActivity="true"`, plynulé zpracování změn orientace a ohybu bez restartu aplikace `smallestScreenSize|screenLayout|orientation`), síťovými oprávněními a deep-link schématy.
* Připravena desktopová konfigurace Tauri v2:
  - `src-tauri/tauri.conf.json`: multiplatformní nastavení oken (Windows/macOS/Linux) a striktní CSP pravidla pro bezpečný offline provoz.
  - `src-tauri/Cargo.toml`: manifest závislostí Tauri 2.0 v jazyce Rust.
  - `src-tauri/src/main.rs`: vstupní bod desktopové aplikace.
* Napsán technický test `tests/cross_platform_config_test.ts`.

### [2026-09-11] Fáze 5. Podfáze 5.1 dokončena
* Nastaven plnohodnotný Service Worker přes Workbox (`vite-plugin-pwa`):
  - Precache mezipaměť pro 14 klíčových souborů (HTML, JS, CSS, WebManifest, Web Worker).
  - Runtime mezipaměť externích obrázků (Unsplash, CDN) se strategií `StaleWhileRevalidate`, limitem 100 položek a expirací 30 dní.
  - Runtime mezipaměť webových fontů se strategií `CacheFirst` (1 rok).
  - Pravidlo `navigateFallback: '/index.html'` pro 100% offline provoz SPA aplikace.
* Vygenerovány PWA ikony (`pwa-192x192.png`, `pwa-512x512.png`, `apple-touch-icon.png`) v adresáři `public/`.
* Doplněn WebManifest: česká lokalizace (`lang: 'cs'`), kategorie (`shopping`, `finance`, `lifestyle`), rychlé zkratky (`Katalog`, `Košík`, `Letáky`).
* Vytvořen composable `useOnlineStatus.ts` a stavový offline indikátor v horní liště.
* Napsán test `tests/pwa_offline_test.ts`.

### [2026-09-11] Fáze 4. Podfáze 4.3 dokončena
* Vytvořena ergonomická komponenta nákupního košíku `BasketView.vue` s podporou adaptivního dvoupanelového rozhraní pro desktop a skládací telefony v Tabletop režimu (ohyb 90°).
* Implementována úprava množství, rychlé smazání položky, vymazání celého košíku s potvrzením a rychlý přechod do katalogu.
* Integrován výpočet kombinatorického optimalizátoru na pozadí:
  - Výběr optimální prodejny pro nákup všeho na jednom místě.
  - Výpočet rozdělení nákupu do 2 prodejen s volitelnými náklady na dopravu (0 Kč pěšky, 15 Kč MHD, 20 Kč/40 Kč auto).
  - Zobrazení přehledu, co přesně kde koupit a jaká je čistá finanční úspora.
* Integrována nutriční karta `NutritionCard.vue` zobrazující celkovou energii, bílkoviny, sacharidy, tuky, vlákninu a žebříček výhodnosti bílkovin.
* Všechny pohledy aplikace propojeny v `App.vue` (Katalog, Oblíbené, Srovnání, Košík, Letáky).
* Napsán test `tests/basket_test.ts`.

### [2026-09-11] Fáze 4. Podfáze 4.2 dokončena
* Vytvořen nutriční modul `src/utils/nutrition.ts` s přesným přepočtem hodnot ze 100 g / 100 ml na reálnou velikost balení a počet kusů v košíku.
* Výpočet celkové energie v kcal a kJ, bílkovin, sacharidů, tuků a vlákniny.
* Výpočet procentuálního zastoupení makroživin (4/4/9 kcal na gram).
* Výpočet ceny za 1 g čisté bílkoviny (`calcPricePerProtein`) a sestavení žebříčku nejvýhodnějších zdrojů bílkovin (`getProteinCostLeaderboard`).
* Předvolby výživových cílů (Vyvážená strava 2000 kcal, Fitness & Svaly 2500 kcal, Low-Carb / Keto 1800 kcal).
* Komponenta `NutritionCard.vue` s barevnými ukazateli a rozdělením makroživin.
* Napsán test `tests/nutrition_test.ts`.

### [2026-09-11] Fáze 4. Podfáze 4.1 dokončena
* Vyvinut vícevláknový Web Worker `optimizer.worker.ts` s čistým kombinatorickým algoritmem.
* Hodnocení nákupu v jedné prodejně na základě kompletní dostupnosti a nejnižší ceny.
* Vyhodnocení rozdělení nákupu do 2 prodejen s ohledem na náklady na přesun (`frictionCostPerExtraStore`).
* Reaktivní composable `useBasketOptimizer.ts` s fallbackem na synchronní výpočet.
* Napsán test `tests/optimizer_test.ts`.

### [2026-09-11] Fáze 3 dokončena
* Vytvořen modul «Oblíbené» (`FavoritesView.vue`) s lokálním ukládáním do IndexedDB.
* Vytvořen modul «Srovnání produktů» (`CompareView.vue`) pro porovnání až 4 produktů vedle sebe.
* Vytvořen katalog akčních letáků (`LeafletsView.vue`) s odpočtem platnosti slev.
* Napsány testy `tests/favorites_test.ts`, `tests/compare_test.ts` a `tests/leaflets_test.ts`.

### [2026-09-11] Fáze 2 dokončena
* Vytvořeno schéma lokální databáze IndexedDB (`Dexie.js`) pro produkty, ceny, obchody a košík.
* Připraven katalog 13 českých obchodních řetězců a dataset produktů s EAN-13 kódy a údaji o výrobcích.
* Implementováno vyhledávání, filtry a produktové karty s přepočtem měrných cen za 1 litr a 1 kilogram.
* Napsány testy `tests/db_test.ts` a `tests/dataset_test.ts`.

### [2026-09-11] Fáze 1 dokončena
* Inicializace projektu Vite 6 + Vue 3.5 + TypeScript + Tailwind CSS v4 + Lucide Icons.
* Lokalizační jádro s 6 jazyky: Čeština (CS), Slovenčina (SK), Polski (PL), Deutsch (DE), English (EN), Slovenščina (SL).
* Komponenta `FoldableTwoPane.vue` s podporou W3C Device Posture API a zobrazení pro skládací telefony a tablety.
