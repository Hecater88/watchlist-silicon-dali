import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

type FavoriteStore = {
	favorites: string[];
	loadFavorites: () => Promise<void>;
	addFavorite: (coinId: string) => void;
	removeFavorite: (coinId: string) => void;
	isFavorite: (coinId: string) => boolean;
};

const FAVORITES_KEY = "FAVORITES";

export const useFavoritesStore = create<FavoriteStore>((set, get) => ({
	favorites: [],

	loadFavorites: async () => {
		const json = await AsyncStorage.getItem(FAVORITES_KEY);
		if (json) {
			const parsed = JSON.parse(json);
			set({ favorites: parsed });
		}
	},

	addFavorite: async (coinId) => {
		const current = get().favorites;
		if (!current.includes(coinId)) {
			const updated = [...current, coinId];
			set({ favorites: updated });
			await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
		}
	},

	removeFavorite: async (coinId) => {
		const updated = get().favorites.filter((id) => id !== coinId);
		set({ favorites: updated });
		await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
	},

	isFavorite: (coinId) => get().favorites.includes(coinId),
}));
