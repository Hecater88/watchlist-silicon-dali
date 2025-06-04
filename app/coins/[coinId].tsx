import { getCoinDetail, getHistoricalData } from "@/services/api";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text } from "react-native";
import { VictoryAxis, VictoryChart, VictoryLine, VictoryTheme } from "victory";
import useFetchWithInterval from "../hooks/useFetch";

const CoinDetailScreen = () => {
	const { coinId } = useLocalSearchParams<{ coinId: string }>();
	const {
		data: coin,
		loading: loadingCoin,
		error: errorCoin,
	} = useFetchWithInterval(() => getCoinDetail(coinId), undefined);
	const [chartData, setChartData] = useState<{ x: Date; y: number }[]>([]);

	useEffect(() => {
		if (!coinId) return;

		getHistoricalData(coinId)
			.then((history) => {
				const chart = history.map(([x, y]: [number, number]) => ({
					x: new Date(x),
					y,
				}));
				setChartData(chart);
			})
			.catch((err) => console.error("Error fetching historical data", err));
	}, [coinId]);

	if (loadingCoin || !coin) return <ActivityIndicator size="large" />;
	if (errorCoin)
		return <Text style={{ color: "red" }}>{errorCoin.message}</Text>;
	return (
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
			<Text style={{ fontSize: 20, marginTop: 8 }}>💲{coin.price}</Text>
			<Text
				style={{
					fontSize: 16,
					color: coin.priceChange >= 0 ? "green" : "red",
					marginBottom: 16,
				}}>
				{coin.priceChange?.toFixed(2)}% (24h)
			</Text>

			<VictoryChart theme={VictoryTheme.material} scale={{ x: "time" }}>
				<VictoryAxis
					tickFormat={(t: Date) => `${t.getDate()}/${t.getMonth() + 1}`}
				/>
				<VictoryAxis dependentAxis tickFormat={(t) => `$${t}`} />
				<VictoryLine
					data={chartData}
					style={{ data: { stroke: "#4f46e5", strokeWidth: 2 } }}
				/>
			</VictoryChart>

			{coin.description && (
				<Text style={{ marginTop: 24, color: "#555" }}>
					{coin.description.replace(/<[^>]+>/g, "").slice(0, 300)}...
				</Text>
			)}
		</ScrollView>
	);
};

export default CoinDetailScreen;
