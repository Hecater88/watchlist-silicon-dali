import {
	CoinDetail,
	CoinMarket,
	HistoricalDataPoint,
	SearchCoin,
} from "@/types/api";

const API_BASE_URL = "https://api.coingecko.com/api/v3";

export const getMarketData = async (): Promise<CoinMarket[]> => {
	const response = await fetch(
		`${API_BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
	);
	if (!response.ok) {
		throw new Error("Failed to fetch market data");
	}
	return response.json();
};

export const searchCoins = async (query: string): Promise<SearchCoin[]> => {
	const res = await fetch(
		`${API_BASE_URL}/search?query=${encodeURIComponent(query)}`
	);
	if (!res.ok) throw new Error("Error searching coins");
	const data = await res.json();
	return data.coins;
};

export const getCoinDetail = async (coinId: string): Promise<CoinDetail> => {
	const res = await fetch(`${API_BASE_URL}/coins/${coinId}`);
	if (!res.ok) throw new Error("Error fetching coin detail");
	const data = await res.json();

	return {
		id: data.id,
		name: data.name,
		symbol: data.symbol,
		image: data.image?.large,
		description: data.description?.en,
		current_price: data.market_data?.current_price?.usd,
		price_change_percentage_24h: data.market_data?.price_change_percentage_24h,
		market_cap: data.market_data?.market_cap?.usd,
		total_volume: data.market_data?.total_volume?.usd,
		total_supply: data.market_data?.total_supply,
		circulating_supply: data.market_data?.circulating_supply,
		ath: data.market_data?.ath?.usd,
		atl: data.market_data?.atl?.usd,
	};
};

export const getHistoricalData = async (
	coinId: string
): Promise<HistoricalDataPoint[]> => {
	const res = await fetch(
		`${API_BASE_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=7`
	);

	if (!res.ok) throw new Error("Error fetching historical data");

	const data = await res.json();
	return data.prices;
};
