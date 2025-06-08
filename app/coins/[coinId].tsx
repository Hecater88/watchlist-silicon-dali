import CoinChart from "@/components/CoinChart";
import FavoriteToggle from "@/components/FavoriteToggle";
import { getCoinDetail, getHistoricalData } from "@/services/api";
import { useThemeStore } from "@/store/theme";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Image,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useFetchWithInterval from "../hooks/useFetch";

const CoinDetailScreen = () => {
	const { coinId } = useLocalSearchParams<{ coinId: string }>();
	const [chartData, setChartData] = useState<{ x: Date; y: number }[]>([]);
	const { theme } = useThemeStore();

	const {
		data: coin,
		loading: loadingCoin,
		error: errorCoin,
	} = useFetchWithInterval(() => getCoinDetail(coinId));

	const {
		data: history,
		loading: loadingHistory,
		error: errorHistory,
	} = useFetchWithInterval(() => getHistoricalData(coinId));

	useEffect(() => {
		if (!history) return;
		const chart = history
			.filter(([x, y]) => Number.isFinite(x) && Number.isFinite(y))
			.map(([x, y]) => ({
				x: new Date(x),
				y: y,
			}));
		setChartData(chart);
	}, [history]);

	return (
		<SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
			<View className="flex-1">
				{loadingCoin ? (
					<ActivityIndicator size="large" color="#0000ff" />
				) : errorCoin || !coin ? (
					<Text style={{ color: "red" }}>
						{errorCoin?.message ?? "Error fetching coin details"}
					</Text>
				) : (
					<ScrollView className="px-5 py-4 space-y-8">
						<View className="bg-white dark:bg-surface-dark p-4 rounded-xl shadow border border-border-light dark:border-border-dark mb-6">
							<View className="flex-row items-center justify-between">
								<View className="flex-row items-center gap-3">
									{coin.image && (
										<Image
											source={{ uri: coin.image }}
											style={{ width: 48, height: 48, marginRight: 12 }}
											resizeMode="contain"
										/>
									)}
									<Text className="text-2xl font-bold text-text-light dark:text-text-dark">
										{coin.name}
									</Text>
									<View>
										<Text className="text-xl font-bold text-green-400">
											${coin.current_price}
										</Text>
										<Text className="text-sm text-green-500">
											{coin.price_change_percentage_24h}% (24h)
										</Text>
									</View>
								</View>
								<FavoriteToggle coinId={coinId} />
							</View>
						</View>

						<View className="bg-white dark:bg-surface-dark p-4 rounded-xl shadow border border-border-light dark:border-border-dark mb-4">
							<Text className="text-lg font-semibold mb-2 text-text-light dark:text-text-dark">
								Price Chart
							</Text>
							{loadingHistory ? (
								<ActivityIndicator size="large" color="#4f46e5" />
							) : errorHistory || chartData.length <= 0 ? (
								<Text className="text-red-600 text-center mt-6">
									{errorHistory?.message ?? "Error fetching historical"}
								</Text>
							) : (
								<CoinChart chartData={chartData} />
							)}
						</View>

						<View className="flex-row gap-4 mb-6">
							<View className="flex-1 bg-white dark:bg-surface-dark p-4 rounded-xl shadow border border-border-light dark:border-border-dark">
								<Text className="text-lg font-semibold mb-2 text-text-light dark:text-text-dark">
									Information
								</Text>
								<Text className="text-sm text-text-light dark:text-text-dark">
									<Text className="font-bold">Symbol: </Text>
									{coin.symbol.toUpperCase()}
								</Text>
								<Text className="text-sm text-text-light dark:text-text-dark">
									<Text className="font-bold">Market Cap: </Text>$
									{coin.market_cap.toLocaleString()}
								</Text>
								<Text className="text-sm text-text-light dark:text-text-dark">
									<Text className="font-bold">24h Volume: </Text>$
									{coin.total_volume.toLocaleString()}
								</Text>
							</View>
							<View className="flex-1 bg-white dark:bg-surface-dark p-4 rounded-xl shadow border border-border-light dark:border-border-dark">
								<Text className="text-lg font-semibold mb-2 text-text-light dark:text-text-dark">
									Metrics
								</Text>
								<Text className="text-sm text-text-light dark:text-text-dark">
									<Text className="font-bold">Total Supply: </Text>
									{coin.total_supply?.toLocaleString() ?? "N/A"}
								</Text>
								<Text className="text-sm text-text-light dark:text-text-dark">
									<Text className="font-bold">Circulating Supply: </Text>
									{coin.circulating_supply?.toLocaleString() ?? "N/A"}
								</Text>
								<Text className="text-sm text-text-light dark:text-text-dark">
									<Text className="font-bold">All-Time High: </Text>${coin.ath}
								</Text>
								<Text className="text-sm text-text-light dark:text-text-dark">
									<Text className="font-bold">All-Time Low: </Text>${coin.atl}
								</Text>
							</View>
						</View>

						<View className="flex-row gap-4 mb-20">
							{coin.description && (
								<View className="flex-1 bg-white dark:bg-surface-dark p-4 rounded-lg shadow border border-border-light dark:border-border-dark">
									<Text className="text-lg font-semibold mb-2 text-text-light dark:text-text-dark">
										Overview
									</Text>
									<Text className="text-sm text-text-light dark:text-text-dark">
										{coin.description}
									</Text>
								</View>
							)}
						</View>
					</ScrollView>
				)}

				<TouchableOpacity
					className="absolute bottom-2 left-5 right-5 bg-surface-light dark:bg-surface-dark py-3 rounded-lg flex-row items-center justify-center border border-border-light dark:border-border-dark"
					onPress={router.back}>
					<Ionicons
						name="arrow-back"
						size={20}
						color={theme === "dark" ? "#fff" : "#000"}
					/>
					<Text className="ml-2 font-medium text-text-light dark:text-text-dark text-base">
						Go back
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default CoinDetailScreen;
