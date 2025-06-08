import { useThemeStore } from "@/store/theme";
import { Stack } from "expo-router";
import { useColorScheme } from "nativewind";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import "./globals.css";

export default function RootLayout() {
	const { theme } = useThemeStore();
	const { setColorScheme } = useColorScheme();

	useEffect(() => {
		setColorScheme(theme);
	}, [theme]);
	return (
		<>
			<StatusBar hidden={true} />
			<Stack>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				<Stack.Screen name="coins/[coinId]" options={{ headerShown: false }} />
			</Stack>
		</>
	);
}
