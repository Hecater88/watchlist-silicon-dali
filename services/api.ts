const API_BASE_URL = "https://api.coingecko.com/api/v3";

export const getMarketData = async () => {
	const response = await fetch(
		`${API_BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
	);
	if (!response.ok) {
		throw new Error("Failed to fetch market data");
	}
	return response.json();
};

export const searchCoins = async (query: string) => {
	const res = await fetch(
		`${API_BASE_URL}/search?query=${encodeURIComponent(query)}`
	);
	if (!res.ok) throw new Error("Error searching coins");
	const data = await res.json();
	return data.coins;
};

export const getCoinDetail = async (coinId: string) => {
	const res = await fetch(`${API_BASE_URL}/coins/${coinId}`);
	if (!res.ok) throw new Error("Error fetching coin detail");
	const data = await res.json();

	return {
		id: data.id,
		name: data.name,
		symbol: data.symbol,
		image: data.image?.large,
		description: data.description?.en,
		price: data.market_data?.current_price?.usd,
		priceChange: data.market_data?.price_change_percentage_24h,
	};
};

export const getHistoricalData = async (coinId: string) => {
	const res = await fetch(
		`${API_BASE_URL}coins/${coinId}/market_chart?vs_currency=usd&days=7`
	);

	if (!res.ok) throw new Error("Error fetching historical data");

	const data = await res.json();
	return data.prices;
};
