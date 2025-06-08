import { Appearance } from "react-native";
import { create } from "zustand";

type Theme = "light" | "dark";

interface ThemeStore {
	theme: Theme;
	toggleTheme: () => void;
	setTheme: (value: Theme) => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
	theme: Appearance.getColorScheme() || "light",
	toggleTheme: () =>
		set((state) => {
			const next = state.theme === "light" ? "dark" : "light";
			return { theme: next };
		}),
	setTheme: (value) => set({ theme: value }),
}));
