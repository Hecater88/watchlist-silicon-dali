import useFetchWithInterval from "@/app/hooks/useFetch";
import { getMarketData, searchCoins } from "@/services/api";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
	ActivityIndicator,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import useDebounce from "../hooks/useDebounce";

export default function Index() {
	const router = useRouter();
	const [query, setQuery] = useState("");
	const [searchResults, setSearchResults] = useState<any[]>([]);

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
		<View className="flex-1" style={{ padding: 20 }}>
			<TextInput
				placeholder="Buscar criptomoneda..."
				value={query}
				onChangeText={setQuery}
				style={{
					backgroundColor: "#f0f0f0",
					padding: 12,
					borderRadius: 8,
					marginBottom: 16,
				}}
			/>
			<ScrollView style={{ paddingBottom: 16 }}>
				{coinsLoading ? (
					<ActivityIndicator
						size="large"
						color="#0000ff"
						className="mt-10 self-center"
					/>
				) : coinsError ? (
					<Text style={{ color: "red" }}>
						Error al cargar las monedas: {coinsError.message}
					</Text>
				) : (
					coinsToRender?.map((coin) => (
						<TouchableOpacity
							key={coin.id}
							onPress={() => router.push(`/coins/${coin.id}`)}>
							<View className="mb-4 p-4 bg-white rounded-lg shadow">
								<Text>{coin.name}</Text>
								<Text>{coin.symbol.toUpperCase()}</Text>
								<Text>{coin.current_price}</Text>
							</View>
						</TouchableOpacity>
					))
				)}
			</ScrollView>
		</View>
	);
}
