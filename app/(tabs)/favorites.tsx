import { useFavoritesStore } from "@/store/favoriteStore";
import { useRouter } from "expo-router";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const FavoritesScreen = () => {
	const { favorites } = useFavoritesStore();
	const router = useRouter();

	if (favorites.length === 0) {
		return (
			<View className="flex-1 justify-center items-center">
				<Text>No tienes monedas favoritas aún.</Text>
			</View>
		);
	}

	return (
		<View className="flex-1 p-4">
			<FlatList
				data={favorites}
				keyExtractor={(id) => id}
				renderItem={({ item: coinId }) => (
					<TouchableOpacity
						onPress={() => router.push(`/coins/${coinId}`)}
						style={{
							paddingVertical: 12,
							borderBottomWidth: 1,
							borderBottomColor: "#ddd",
						}}>
						<Text style={{ fontSize: 16 }}>⭐ {coinId}</Text>
					</TouchableOpacity>
				)}
			/>
		</View>
	);
};

export default FavoritesScreen;
