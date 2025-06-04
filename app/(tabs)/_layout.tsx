import { Tabs } from "expo-router";

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
				}}
			/>

			<Tabs.Screen
				name="favorites"
				options={{
					title: "Favorites",
					headerShown: false,
				}}
			/>
		</Tabs>
	);
};

export default _layout;
