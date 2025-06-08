import { useFavoritesStore } from "@/store/favoriteStore";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const FavoritesScreen = () => {
	const { favorites, removeFavorite } = useFavoritesStore();
	const router = useRouter();

	return (
		<SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark px-4 pt-4">
			{favorites.length === 0 ? (
				<View className="flex-1 justify-center items-center">
					<Text className="text-text-light dark:text-text-dark text-base">
						You don't have any favorite coins yet.
					</Text>
				</View>
			) : (
				<FlatList
					data={favorites}
					keyExtractor={(id) => id}
					numColumns={2}
					columnWrapperStyle={{ gap: 12 }}
					contentContainerStyle={{ gap: 12 }}
					renderItem={({ item: coinId }) => (
						<TouchableOpacity
							onPress={() => router.push(`/coins/${coinId}`)}
							activeOpacity={0.8}
							className="flex-1 bg-surface-light dark:bg-surface-dark p-4 rounded-lg shadow-sm border border-border-light dark:border-border-dark h-24 justify-center">
							<View className="flex-row justify-between items-center">
								<Text className="text-text-light dark:text-text-dark text-base font-medium">
									{coinId}
								</Text>
								<TouchableOpacity onPress={() => removeFavorite(coinId)}>
									<Ionicons name="trash-outline" size={18} color="#EF4444" />
								</TouchableOpacity>
							</View>
						</TouchableOpacity>
					)}
				/>
			)}
		</SafeAreaView>
	);
};

export default FavoritesScreen;
