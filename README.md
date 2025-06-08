# MyWatchlist 📈
A simple, sleek mobile app to track your favorite cryptocurrencies in real-time.

## ⚠ Limitations
	•	Using the free tier of the CoinGecko API, which limits the number of requests per minute.
	•	The Favorites screen only stores and displays coin IDs; detailed information is not fetched to avoid exceeding API limits.
	•	If too many requests are made in a short time, CoinGecko may block requests temporarily. You’ll need to wait a few minutes to continue using the app.

## 🧩 Technologies

- **TypeScript** – Type safety
- **React Native + Expo** – App core
- **Expo Router** – Navigation and routing
- **Zustand** – State management (favorites and theme)
- **NativeWind** – Tailwind CSS for styling
- **AsyncStorage** – Local persistence
- **react-native-chart-kit** – Graph display
- **API**: [CoinGecko](https://www.coingecko.com/en/api)

---

## ✨ Key Features

### 🏠 Home

- Debounced search for cryptocurrencies.
- Dynamic list with `useFetchWithInterval` (auto-refresh every 5mins).
- Toggle to switch between light and dark themes.

### ❤️ Favorites

- Persistent favorites system using Zustand + AsyncStorage.
- Quick access to coin details.
- Ability to remove favorites directly

### 📊 Coin Detail

- Image, name, and current price.
- Favorite toggle.
- Scrollable horizontal historical chart.
- Clear layout with well-separated sections.

## 🌓 Light / Dark Theme

- Implemented with `Zustand` + NativeWind (`darkMode: 'class'`).
- Switch to toggle themes.

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
/types                  ← Type definitions
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

## 💡 Improvements If I Had More Time (Ordered by Priority)

- Offline support with local data caching, avoid repeated API calls on previously visited screens
- Add basic login with secure data storage
- Automated tests (unit + e2e)
- Implement settings screen
- Animations when adding/removing favorites and charts

## 🗓 Development Log

- 📅 **Monday, June 2, 2025** _(~1h total)_ – Meeting with Kiko (CTO) (30 min) + initial project planning and project configurations (30 min)🗂️
- 📅 **Tuesday, June 3, 2025** _(~40 min)_ – Built home screen, search, API calls, and routing 🔍
- 📅 **Wednesday, June 4, 2025** _(~30 min)_ – Development of the coin detail view with basic info and chart📈
- 📅 **Thursday, June 5, 2025** – No work - Inactive day (dental treatment) 😷
- 📅 **Friday, June 6, 2025** _(~1h)_ – Implementation of favorites screen, Zustand state management, and local persistence ❤️
- 📅 **Saturday, June 7, 2025** _(~4–5h)_ – Theme system integration (dark/light), UI refactor, visual improvements, loading states, error handling, type fixing and bug fixes 🛠️
- 📅 **Sunday, June 8, 2025** _(~1:30h)_ – Final improvements, design review, and documentation (README) 🧹
