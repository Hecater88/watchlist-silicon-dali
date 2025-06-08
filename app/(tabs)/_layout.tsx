import { useThemeStore } from "@/store/theme";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
	focused: boolean;
	iconName: keyof typeof Ionicons.glyphMap;
	title: string;
};
const TabIcon = ({ focused, iconName, title }: Props) => {
	const { theme } = useThemeStore();
	const activeColor = theme === "dark" ? "#ffffff" : "#000000";

	return (
		<View className="flex flex-row gap-2 items-center justify-center min-w-[70px]">
			<Ionicons name={iconName} size={20} color={activeColor} />
			{focused && (
				<Text className="text-text-light dark:text-text-dark text-xs font-medium">
					{title}
				</Text>
			)}
		</View>
	);
};
const _layout = () => {
	const { theme } = useThemeStore();
	const isDark = theme === "dark";
	return (
		<SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
			<Tabs
				screenOptions={{
					tabBarShowLabel: false,
					tabBarItemStyle: {
						paddingVertical: 10,
						alignItems: "center",
						justifyContent: "center",
						width: "auto",
					},
					tabBarStyle: {
						backgroundColor: isDark ? "#0F0D23" : "#ffffff",
						borderRadius: 30,
						marginHorizontal: 20,
						marginBottom: 24,
						height: 30,
						position: "absolute",
						shadowColor: isDark ? "#ffffff22" : "#00000033",
						borderColor: isDark ? "#3f3f46" : "#e5e7eb",
						borderWidth: 1,
						elevation: 12,
						shadowOffset: { width: 0, height: 6 },
						shadowOpacity: 0.25,
					},
				}}>
				<Tabs.Screen
					name="index"
					options={{
						title: "Home",
						headerShown: false,
						tabBarIcon: ({ focused }) => (
							<TabIcon focused={focused} iconName="home-outline" title="Home" />
						),
					}}
				/>
				<Tabs.Screen
					name="favorites"
					options={{
						title: "Favorites",
						headerShown: false,
						tabBarIcon: ({ focused }) => (
							<TabIcon
								focused={focused}
								iconName="heart-outline"
								title="Favorites"
							/>
						),
					}}
				/>
			</Tabs>
		</SafeAreaView>
	);
};

export default _layout;
