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
	return (
		<View className="flex flex-row gap-2 items-center justify-center">
			<Ionicons
				name={iconName}
				size={20}
				color={focused ? "#FFFFFF" : "#A8B5DB"}
			/>
			{focused && (
				<Text className="text-white text-xs font-medium">{title}</Text>
			)}
		</View>
	);
};
const _layout = () => {
	return (
		<SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
			<Tabs
				screenOptions={{
					tabBarShowLabel: false,
					tabBarItemStyle: {
						width: "auto",
						height: "auto",
						justifyContent: "center",
						alignItems: "center",
					},
					tabBarStyle: {
						backgroundColor: "#0F0D23",
						borderRadius: 50,
						marginHorizontal: 20,
						marginBottom: 36,
						height: 40,
						position: "absolute",
						overflow: "hidden",
						borderWidth: 1,
						borderColor: "#0F0D23",
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
