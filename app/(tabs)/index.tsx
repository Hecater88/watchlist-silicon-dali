import useFetchWithInterval from "@/app/hooks/useFetch";
import { getMarketData, searchCoins } from "@/services/api";
import { useThemeStore } from "@/store/theme";
import { CoinDetail } from "@/types/api";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
	ActivityIndicator,
	ScrollView,
	Switch,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useDebounce from "../hooks/useDebounce";

export default function Index() {
	const router = useRouter();
	const [query, setQuery] = useState("");
	const [searchResults, setSearchResults] = useState<any[]>([]);
	const { theme, toggleTheme } = useThemeStore();

	const {
		data: coins,
		loading: coinsLoading,
		error: coinsError,
	} = useFetchWithInterval(() => getMarketData(), 50000);

	const debauncedSearch = useDebounce(query, 600);

	useEffect(() => {
		if (debauncedSearch.trim() === "") {
			setSearchResults([]);
			return;
		}
		handleSearch(debauncedSearch);
	}, [debauncedSearch]);

	const handleSearch = async (value: string) => {
		const data = await searchCoins(value);
		setSearchResults(data);
	};

	const coinsToRender = query ? searchResults : coins;

	return (
		<SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
			<View className="flex-1">
				<View className="px-5 pt-5">
					<View className="bg-white dark:bg-surface-dark rounded-2xl shadow-md px-5 py-2 border border-border-light dark:border-border-dark">
						<View className="flex-row justify-between items-center">
							<Text className="text-lg font-semibold text-black dark:text-white">
								WatchList
							</Text>
							<View className="flex-row items-center gap-2">
								<Text className=" text-black dark:text-white">{theme}</Text>
								<Switch
									value={theme === "dark"}
									onValueChange={toggleTheme}
									thumbColor={theme === "dark" ? "#fff" : "#000"}
								/>
							</View>
						</View>
						<TextInput
							placeholder="Search coin..."
							className="bg-surface-light dark:bg-surface-dark rounded-xl px-4 py-2 mb-4 text-base text-text-light dark:text-text-dark"
							placeholderTextColor={theme === "dark" ? "#999" : "#666"}
							value={query}
							onChangeText={setQuery}
						/>
					</View>
					<ScrollView
						contentContainerStyle={{
							paddingHorizontal: 16,
							marginBottom: 100,
							paddingTop: 10,
						}}>
						{coinsLoading ? (
							<ActivityIndicator
								size="large"
								color="#4f46e5"
								className="mt-10 self-center"
							/>
						) : coinsError || coinsToRender?.length <= 0 ? (
							<View className="flex-1 justify-center items-center">
								<Text className="text-red-600 text-center mt-6">
									{coinsError.message}
								</Text>
							</View>
						) : (
							coinsToRender?.map((coin: CoinDetail) => (
								<TouchableOpacity
									key={coin.id}
									activeOpacity={0.8}
									onPress={() => router.push(`/coins/${coin.id}`)}
									className="mb-4">
									<View className="bg-white p-4 rounded-xl shadow-sm flex-row justify-between items-center dark:bg-surface-dark border border-border-light dark:border-border-dark">
										<View>
											<Text className="text-lg font-semibold text-text-light dark:text-text-dark">
												{coin.name}
											</Text>
											<Text className="text-sm text-text-light dark:text-text-dark">
												{coin.symbol.toUpperCase()}
											</Text>
										</View>
										<Text className="text-sm text-text-light dark:text-text-dark">
											{coin.current_price}
										</Text>
									</View>
								</TouchableOpacity>
							))
						)}
					</ScrollView>
				</View>
			</View>
		</SafeAreaView>
	);
}
