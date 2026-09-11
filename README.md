# KupiRadar (Czech Retail & Basket Optimizer) 🇨🇿🛒

Кросс-платформенное, ультра-легковесное приложение для умного поиска товаров по всем супермаркетам Чехии, регионального мониторинга цен (включая Прагу), оптимизации продуктовой корзины и учета питательной ценности (КБЖУ).

Поддерживает единый код для **Web / PWA, Desktop (Windows / macOS / Linux), Tablets, Mobile и Foldable устройств** (Galaxy Z Fold, Pixel Fold, Tabletop mode).

---

## 🌟 Ключевые возможности

1. **Кросс-магазинный поиск по Чехии**:
   - Поддержка сетей: Tesco, Billa, Albert, Lidl, Kaufland, Rohlík.cz, Košík.cz, Globus, Tamda Foods, Ratio, COOP, JIP, ESO Market.
   - Фильтрация по регионам и почтовым индексам (PSČ).
   - Разделение обычных цен (*běžná cena*) и цен по картам лояльности (*Clubcard, Můj Albert, Lidl Plus, Billa Bonus*).
2. **Сравнение товаров (Side-by-Side)**:
   - Сравнение цен за единицу (Kč/литр, Kč/кг).
   - Сравнение стран производства, производителей и официальных боттлеров.
3. **Умный оптимизатор корзины (Basket Optimizer)**:
   - Фоновый расчет лучшей цены на покупку списка: где дешевле купить все продукты (в одном магазине или разделить покупку на два с учетом транспортных издержек).
4. **Нутрициологический калькулятор (КБЖУ)**:
   - Подсчет калорий, белков, жиров, углеводов и клетчатки на порцию и на всю корзину.
   - Расчет стоимости 1 грамма белка (*Price / Protein ratio*).
5. **Адаптивность для Foldable устройств**:
   - Поддержка стандарта **CSS Viewport Segments API**: раскладывание в книгу (Dual-Pane) без перекрытия аппаратного сгиба.
   - Режим **Tabletop / Flex mode** (полураскрытый экран под углом 90°).
6. **Мультиязычность (i18n)**:
   - Чешский (CS, основной), Словацкий (SK), Польский (PL), Немецкий (DE), Английский (EN), Словенский (SL).

---

## 🚀 Технологический стек

* **Frontend**: Vue 3.5 (Composition API / <script setup>), TypeScript, Vite
* **Styling**: Tailwind CSS v4, CSS Viewport Segments API
* **Icons**: unplugin-icons + Lucide Icons
* **Data & Storage**: Dexie.js (IndexedDB, offline-first)
* **Computation**: Web Worker для комбинаторного оптимизатора
* **PWA**: vite-plugin-pwa (Workbox offline cache)
* **Cross-platform wrappers**: Capacitor (Android APK), Tauri v2 (Desktop)

---

## 📋 План разработки

Подробный статус выполнения и этапы зафиксированы в [ROADMAP.md](./ROADMAP.md).
