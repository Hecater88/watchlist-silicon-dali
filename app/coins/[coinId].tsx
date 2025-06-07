import CoinChart from "@/components/CoinChart";
import FavoriteToggle from "@/components/FavoriteToggle";
import { getCoinDetail, getHistoricalData } from "@/services/api";
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
		<SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
			<View className="flex-1">
				{loadingCoin || !coin ? (
					<ActivityIndicator size="large" color="#0000ff" />
				) : errorCoin ? (
					<Text style={{ color: "red" }}>{errorCoin.message}</Text>
				) : (
					<ScrollView style={{ flex: 1, padding: 16 }}>
						{coin.image && (
							<Image
								source={{ uri: coin.image }}
								style={{ width: 64, height: 64, marginBottom: 12 }}
							/>
						)}
						<Text style={{ fontSize: 24, fontWeight: "bold" }}>
							{coin.name} ({coin.symbol.toUpperCase()})
						</Text>
						<FavoriteToggle coinId={coinId} />
						<Text style={{ fontSize: 20, marginTop: 8 }}>💲{coin.price}</Text>
						<Text
							style={{
								fontSize: 16,
								color: coin.priceChange >= 0 ? "green" : "red",
								marginBottom: 16,
							}}>
							{coin.priceChange?.toFixed(2)}% (24h)
						</Text>
						{loadingHistory ? (
							<ActivityIndicator size="large" color="#0000ff" />
						) : errorHistory ? (
							<Text style={{ color: "red" }}>{errorHistory.message}</Text>
						) : (
							<ScrollView horizontal>
								<CoinChart chartData={chartData} />
							</ScrollView>
						)}
						{coin.description && (
							<Text style={{ marginTop: 24, color: "#555" }}>
								{coin.description.replace(/<[^>]+>/g, "").slice(0, 300)}...
							</Text>
						)}
					</ScrollView>
				)}

				<TouchableOpacity
					className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
					onPress={router.back}>
					<Ionicons name="arrow-back" size={20} color={"#FFFFFF"} />
					<Text className=" text-white font-semibold text-base">Go back</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default CoinDetailScreen;
