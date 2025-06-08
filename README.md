# MyWatchlist 📈

Cryptocurrency tracking app built with **React Native**, **Expo Router**, **TypeScript**, **Zustand**, and **Tailwind CSS (NativeWind)**. It provides detailed and up-to-date information about coins, as well as the ability to manage your favorites.

## ⚠ Limitations

- Due to **CoinGecko API call limitations**, detailed information is not fetched for each coin in the Favorites screen.
- Only the coin ID is stored, so names are displayed directly from local storage.

## 🧩 Technologies

- **React Native + Expo**
- **Expo Router**
- **TypeScript**
- **Zustand** (favorites and theme management)
- **NativeWind** (Tailwind CSS for React Native)
- **react-native-chart-kit** (charts)
- **AsyncStorage**
- **API**: [CoinGecko](https://www.coingecko.com/en/api)

---

## ✨ Key Features

### 🏠 Home

- Debounced search for cryptocurrencies.
- Dynamic list with `useFetchWithInterval` (auto-refresh every 5mins).
- Toggle to switch between light and dark themes.

### ❤️ Favorites

- Persistent favorites system using Zustand + AsyncStorage.
- Grid display (2 columns).
- Quick access to coin details.

### 📊 Coin Detail

- Image, name, and current price.
- Favorite toggle.
- Scrollable historical chart.
- Clear layout with well-separated sections.

## 🌓 Light / Dark Theme

- Implemented with `Zustand` + NativeWind (`darkMode: 'class'`).
- Switch to toggle themes.
- Full design adapts to current mode.

---

## 🧠 Architecture

```
/app
  /(tabs)
    index.tsx           ← Home
    favorites.tsx       ← Favorites
  /coins/[coinId].tsx   ← Detail
/components             ← Reusable: Chart, Favorite toggle
/hooks                  ← Debounce and auto-fetch
/store                  ← Zustand (favorites and theme)
/services               ← API calls
```

---

## 🛠 Installation

```bash
git clone https://github.com/your_user/mywatchlist.git
cd mywatchlist
npm install
npx expo start
```

---

## 💡 Improvements If I Had More Time

- Offline support with local data cache,to avoid making repeated API calls when returning to an already visited screens
- Add basic login with secure data storage
- Automated tests (unit + e2e)
- Implement settings screen
- Animations when adding/removing favorites and charts

## 🗓 Development Log

- 📅 **Monday, June 2, 2025** _(~1h total)_ – Meeting with Kiko (CTO) (30 min). Afternoon: project planning, functionality definition, and initial organization (30 min).
- 📅 **Tuesday, June 3, 2025** _(~40 min)_ – Implementation of the main view with coin listing, search, API calls, and routing.
- 📅 **Wednesday, June 4, 2025** _(~30 min)_ – Development of the coin detail view with basic info and chart.
- 📅 **Thursday, June 5, 2025** – Inactive day (dental treatment).
- 📅 **Friday, June 6, 2025** _(~1h)_ – Implementation of favorites screen, Zustand state management, and local persistence.
- 📅 **Saturday, June 7, 2025** _(~4–5h)_ – Theme system integration (dark/light), UI refactor, visual improvements, loading states, error handling, type fixing and bug fixes.
- 📅 **Sunday, June 8, 2025** _(~1:30h)_ – Final improvements, design review, and documentation (README).
