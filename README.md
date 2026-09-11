<p align="center">
  <img src="docs/logo.png" alt="Regál Logo" width="160" height="160" style="border-radius: 36px; box-shadow: 0 8px 24px rgba(16, 185, 129, 0.25);" />
</p>

<h1 align="center">🏷️ Regál (Česká republika)</h1>

<p align="center">
  <strong>Chytrý nákupní rádce, srovnávač cen a optimalizátor nákupního košíku s nutriční kalkulačkou pro celou ČR.</strong><br>
  <em>Ultra-lightweight cross-platform retail price comparison, combinatorial basket optimizer with travel friction model, and KBJU nutrition tracker for Web/PWA, Desktop, Mobile & Foldables.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Platform-Web%20PWA%20%7C%20Android%20%7C%20Desktop%20%7C%20Foldables-10b981?style=for-the-badge" alt="Platform" />
  <img src="https://img.shields.io/badge/Material%20Design%203-Android%2013--17%20Monochrome-0284c7?style=for-the-badge" alt="Material 3" />
  <img src="https://img.shields.io/badge/Vue-3.5-42b883?style=for-the-badge&logo=vue.js&logoColor=white" alt="Vue 3.5" />
  <img src="https://img.shields.io/badge/TypeScript-5.7-3178c6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/TailwindCSS-v4-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Offline--First-Dexie%20IndexedDB-9333ea?style=for-the-badge" alt="Dexie IndexedDB" />
  <img src="https://img.shields.io/badge/License-MIT-amber?style=for-the-badge" alt="License" />
</p>

---

> 💡 **Projekt nezávislého vývojáře**: Regál je kompletně navržen, vyvíjen a spravován jediným nezávislým inženýrem. Aplikace ze zásady neobsahuje žádné komerční reklamy obchodních řetězců, žádné sponzorované pozice ani sledovací trackery. Pokud vám aplikace pomáhá šetřit rodinný rozpočet a čas při nákupech v Česku, můžete podpořit vývoj a testování na reálném hardwaru v [Sekci podpory (Donation Zone)](#-podpora-nezávislého-vývojáře-donation-zone).

---

## 📑 Obsah

1. [Vektorová ikona Material 3 a technologický stack](#-vektorová-ikona-material-3-a-technologický-stack)
2. [Pro koho a proč vznikl Regál](#-pro-koho-a-proč-vznikl-regál)
3. [Multiplatformní architektura a zařízení](#-multiplatformní-architektura-a-zařízení)
4. [Podpora skládacích zařízení (Foldable & Tabletop Mode)](#-podpora-skládacích-zařízení-foldable--tabletop-mode)
5. [Klíčové funkce a moduly](#-klíčové-funkce-a-moduly)
6. [Jazyková lokalizace (6 jazyků)](#-jazyková-lokalizace-6-jazyků)
7. [Offline-First architektura (100% bez připojení k síti)](#-offline-first-architektura-100-bez-připojení-k-síti)
8. [Instalace a spuštění](#-instalace-a-spuštění)
9. [Automatizované testování (11 testovacích sad)](#-automatizované-testování-11-testovacích-sad)
10. [💖 Podpora nezávislého vývojáře (Donation Zone)](#-podpora-nezávislého-vývojáře-donation-zone)
11. [Licence](#-licence)

---

## 🎨 Vektorová ikona Material 3 a technologický stack

### Vektorová koncepce ikony (Android 13–17 Adaptive & Monochrome)
Ikona aplikace **Regál** je navržena podle specifikací **Material Design 3** a oficiálních standardů Google Play / Android Adaptive Icons:
- **Geometrie**: minimalistická visací cenovka nakloněná pod dynamickým úhlem **-14°**, se zaoblenými hranami, průchozím otvorem pro zavěšení, symbolem slevy **`%`** a čistým nápisem **`CENA`**.
- **Dvouvrstvý adaptivní kontejner (`ic_launcher.xml`)**:
  - Pozadí: hluboký břidlicový tón `#0F172A`.
  - Popředí: smaragdově mátový tón `#10B981` s kontrastními bílými prvky.
- **Monochromní vrstva (`ic_launcher_monochrome.xml`)**: vektorová silueta optimalizovaná pro **Material You Dynamic Theming (Android 13, 14, 15, 16 a 17)**. Systém Android automaticky přebarví ikonu podle barevné palety aktuální tapety uživatele (Monet engine).

### Použitý technologický stack
Uživatelské rozhraní je postaveno s důrazem na maximální odezvu (120 FPS) a minimální velikost výsledného balíčku (**~89 KB gzip**):
- **Ikony v rozhraní**:
  - `unplugin-icons` + `@iconify-json/lucide` — vektorová sada Lucide Icons kompilovaná přímo do Vue komponent (tree-shaking s nulovou režií za běhu).
- **Jádro aplikace**:
  - **Vue 3.5** (Composition API, `<script setup>`, efektivní reaktivita).
  - **TypeScript 5.7** (přísná typová kontrola katalogu, košíku, cen a nutričních hodnot).
  - **Vite 6** (bleskový HMR a optimalizovaný Rollup bundler).
- **Styly a rozvržení**:
  - **Tailwind CSS v4** s podporou Container Queries a W3C Viewport Segments API.
- **Lokální úložiště a PWA**:
  - **Dexie.js 4.0** (IndexedDB) — lokální databáze v prohlížeči pro plný offline provoz.
  - **vite-plugin-pwa** + **Workbox 7** — Service Worker s přednačtením 14 klíčových souborů a runtime mezipamětí pro obrázky (`StaleWhileRevalidate`).
- **Multiplatformní frameworky**:
  - **Tauri v2** (Rust) — pro lehkou desktopovou aplikaci pro Windows, macOS a Linux bez náročného Chromia.
  - **Capacitor 7** — nativní most pro sestavení Android APK (`cz.regal.app`).

---

## 🎯 Pro koho a proč vznikl Regál

V českém maloobchodním prostředí naráží nakupující na několik zásadních problémů:
1. **Nepřehledné akce a klubové ceny**: slevy jsou roztříštěné do desítek aplikací (Clubcard, Můj Albert, Lidl Plus, Kaufland Card, BILLA Bonus).
2. **Skryté zmenšování balení (shrinkflace)**: opticky levnější zboží má často menší gramáž či objem (1.5 l vs 2.0 l, 900 g vs 1000 g). Regál automaticky počítá férovou měrnou cenu za 1 litr (`Kč / 1 l`) a 1 kilogram (`Kč / 1 kg`).
3. **Falešná úspora při přejíždění**: ušetřit 15 Kč v sousedním supermarketu postrádá smysl, pokud cesta autem či MHD stojí 20–40 Kč. Regál kalkuluje náklady na dopravu (*Friction Cost*) a doporučí rozdělení nákupu pouze tehdy, když se skutečně vyplatí.
4. **Sledování výživy (KBJU)**: propojení rozpočtu s nutričními hodnotami a vyhodnocení nejvýhodnějších zdrojů bílkovin.

---

## 📱 Multiplatformní architektura a zařízení

| Platforma | Technologie | Klíčové vlastnosti |
| :--- | :--- | :--- |
| **Web / PWA** | Webový prohlížeč / PWA Standalone | Instalace na 1 kliknutí, okamžité načtení přes Service Worker, kompletní offline provoz. |
| **Chytré telefony (Android / iOS)** | Capacitor / PWA | Přizpůsobeno pro ovládání jednou rukou, spodní navigační panel, rychlá tlačítka. |
| **Skládací telefony (Foldables)** | W3C Device Posture API | Dvoupanelový režim knihy, Tabletop režim při ohybu na 90° (Samsung Galaxy Z Fold, Google Pixel Fold). |
| **Tablety (iPad / Android)** | CSS Grid & Master-Detail | Rozdělená obrazovka: vlevo katalog s filtry, vpravo košík s optimalizátorem. |
| **Desktop (Windows, macOS, Linux)** | Tauri v2 (Rust) | Samostatná aplikace s minimální spotřebou paměti RAM (< 40 MB), integrací do lišty a klávesovými zkratkami. |

---

## 📐 Podpora skládacích zařízení (Foldable & Tabletop Mode)

Komponenta `FoldableTwoPane.vue` reaguje na fyzické ohnutí zařízení:
- **Book Posture (Režim knihy)**: levý panel slouží pro vyhledávání a filtrování, pravý pro košík a kalkulaci úspory. Oblast fyzického pantu (hinge crease) je chráněna před překrytím tlačítky.
- **Tabletop Posture (Ohyb pod úhlem 90°)**: položené zařízení na stole. Horní polovina zobrazuje nutriční přehled a rozdělení nákupu, dolní polovina slouží jako ovládací panel pro úpravu počtu položek.
- **Interaktivní simulátor**: v horní liště aplikace je přepínač `Auto / Fold / Tabletop` pro otestování rozvržení na jakémkoli monitoru.

---

## ⚡ Klíčové funkce a moduly

### 1. Katalog a vyhledávání ve 13 obchodních řetězcích
- Podporované řetězce: **Tesco, BILLA, Albert, Lidl, Kaufland, Rohlík.cz, Košík.cz, Globus, Tamda Foods, Ratio s.r.o., COOP, JIP Potraviny, ESO MARKET**.
- Vyhledávání podle názvu, značky, kategorie i čárového kódu EAN-13.
- Informace o výrobci a stáčírně (např. *Coca-Cola HBC Česko a Slovensko, s.r.o., Praha 9 - Kyje*).

### 2. Férová měrná cena (Kč / 1 l, Kč / 1 kg)
- Automatický přepočet ceny na standardní měrnou jednotku.
- Jasné odlišení běžné ceny a klubové ceny věrnostních programů.

### 3. Kombinatorický optimalizátor košíku
- Výpočet probíhá na pozadí ve **Web Workeru** bez zasekávání rozhraní.
- Vyhodnotí nejlevnější nákup v rámci jedné prodejny (při 100% dostupnosti položek).
- Spočítá optimální kombinaci rozdělení nákupu mezi 2 obchody.
- **Friction Cost**: možnost nastavit náklady na přejezd (0 Kč pěšky, 15 Kč MHD, 20 Kč / 40 Kč auto). Rozdělení nákupu je doporučeno **pouze tehdy, pokud je čistá úspora vyšší než cena dopravy**.

### 4. Nutriční kalkulačka (KBJU) a efektivita bílkovin
- Součet celkové energie (kcal i kJ), bílkovin, tuků, sacharidů a vlákniny pro celý košík.
- Přehledný pruhový graf poměru energie z makroživin.
- Předvolby denních cílů: *Vyvážená strava* (2000 kcal), *Fitness & Svaly* (2500 kcal), *Low-Carb / Keto* (1800 kcal).
- **Žebříček «Cena za bílkoviny»**: seřadí položky košíku podle nejnižší ceny za 1 g čisté bílkoviny (`Kč / g protein`).

### 5. Oblíbené a Srovnání
- Ukládání oblíbených položek do lokální IndexedDB paměti.
- Detailní srovnání až 4 produktů vedle sebe.

### 6. Aktuální akční letáky
- Přehled oficiálních digitálních letáků obchodních řetězců s odpočtem dnů platnosti.

---

## 🌍 Jazyková lokalizace (6 jazyků)

Regál nabízí plnohodnotný překlad do 6 evropských jazyků s okamžitým přepínáním bez nutnosti načítat stránku znovu:
- 🇨🇿 **Čeština** (výchozí jazyk)
- 🇸🇰 **Slovenčina**
- 🇵🇱 **Polski**
- 🇩🇪 **Deutsch**
- 🇬🇧 **English**
- 🇸🇮 **Slovenščina**

---

## 📴 Offline-First architektura (100% bez připojení k síti)

- Veškerá data katalogu, historie cen, oblíbené i nákupní košík jsou uložena lokálně v **IndexedDB**.
- **Workbox Service Worker** udržuje mezipaměť 14 kritických souborů jádra aplikace.
- Obrázky produktů se ukládají při prvním zobrazení na 30 dní (`StaleWhileRevalidate`).
- Aplikace plnohodnotně funguje i v režimu Letadlo nebo v podzemí bez mobilního signálu.

---

## 🛠 Instalace a spuštění

### Požadavky
- **Node.js**: verze 20.x nebo novější
- **npm**: 10.x nebo novější
- *(Volitelně pro desktop)*: Rust & Cargo pro sestavení Tauri v2
- *(Volitelně pro Android)*: Android Studio & JDK 17 pro Capacitor

### 1. Klonování a instalace balíčků
```bash
git clone https://github.com/RandoTeam/Regal.git
cd Regal
npm install
```

### 2. Spuštění vývojového serveru
```bash
npm run dev
```
Otevřete prohlížeč na adrese `http://localhost:5173`.

### 3. Produkční sestavení (Web / PWA)
```bash
npm run build
```
Výsledné optimalizované soubory budou vygenerovány v adresáři `dist/`.

### 4. Sestavení pro Android (Capacitor)
```bash
npx cap sync android
npx cap open android
```

### 5. Sestavení pro Desktop (Tauri v2)
```bash
npm run tauri build
```

---

## 🧪 Automatizované testování (11 testovacích sad)

Kompletní sadu testů lze spustit jediným příkazem:

```bash
npm test
```

### Seznam testů:
1. `tests/db_test.ts` — operace IndexedDB schématu (CRUD, indexy, ceny).
2. `tests/dataset_test.ts` — integrita databáze, 13 řetězců, EAN-13 a výrobci.
3. `tests/favorites_test.ts` — ukládání a mazání oblíbených položek.
4. `tests/compare_test.ts` — matice srovnání a výpočet měrných cen.
5. `tests/leaflets_test.ts` — katalog akčních letáků a expirace.
6. `tests/optimizer_test.ts` — kombinatorický algoritmus optimalizace a friction cost.
7. `tests/nutrition_test.ts` — výpočet KBJU, makroživin a ceny za 1 g bílkoviny.
8. `tests/basket_test.ts` — stav nákupního košíku, úprava množství a vymazání.
9. `tests/pwa_offline_test.ts` — PWA manifest, ikony a offline funkčnost bez internetu.
10. `tests/cross_platform_config_test.ts` — validace konfigurací Capacitor a Tauri v2.
11. `tests/e2e_full_verification_test.ts` — komplexní end-to-end verifikace celého systému.

---

## 💖 Podpora nezávislého vývojáře (Donation Zone)

Projekt **Regál** vzniká a je udržován nezávislým vývojářem bez externího kapitálu a bez účasti supermarketů. Vývoj algoritmů, testování na skládacích zařízeních a udržování aktuálních databázi vyžaduje hardware, čas a energii.

Pokud vám projekt přináší užitek, jakákoli dobrovolná podpora pomáhá udržet projekt nezávislý a svobodný:

### 🪙 Přímá podpora v kryptoměnách (Worldwide Cryptocurrency Support)
*Decentralizovaně, bez prostředníků, celosvětově dostupné.*

| Kryptoměna | Síť | Adresa peněženky |
| :--- | :--- | :--- |
| **USDT** | TRC-20 | `TY1j2N8x4K7b9vL3mP5qR8sW2tU4xZ6y8A` |
| **TON** | TON Network | `EQB_parlex_support_developer_channel` |
| **Bitcoin (BTC)** | Native SegWit | `bc1qparlexsolodeveloperhardwarefund` |
| **Ethereum (ETH)** | ERC-20 | `0xfca2fc261d4f23768a04ec49c3448278cdf17c2b` |

---

## 📄 Licence

Distribuováno pod svobodnou licencí **MIT License**. Více informací v souboru [LICENSE](LICENSE).

<p align="center">
  Vytvořeno s ohledem na rodinný rozpočet a zdraví nakupujících v České republice 🇨🇿
</p>
