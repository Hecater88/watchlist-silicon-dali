import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Text, View } from "react-native";

type Props = {
	focused: boolean;
	iconName: keyof typeof Ionicons.glyphMap; // ✅ Tipado correcto
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
		<Tabs
			screenOptions={{
				tabBarShowLabel: false,
				tabBarItemStyle: {
					width: "100%",
					height: "100%",
					justifyContent: "center",
					alignItems: "center",
				},
				tabBarStyle: {
					backgroundColor: "#0F0D23",
					borderRadius: 50,
					marginHorizontal: 20,
					marginBottom: 36,
					height: 52,
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

					tabBarIcon: ({ focused }) => (
						<TabIcon
							focused={focused}
							iconName="bookmark-outline"
							title="Saved"
						/>
					),
				}}
			/>
		</Tabs>
	);
};

export default _layout;
