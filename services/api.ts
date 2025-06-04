export const getMarketData = async () => {
	const response = await fetch(
		"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
	);
	console.log("response", response);
	if (!response.ok) {
		throw new Error("Failed to fetch market data");
	}
	return response.json();
};

export const searchCoins = async (query: string) => {
	const res = await fetch(
		`https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(query)}`
	);
	if (!res.ok) throw new Error("Error searching coins");
	const data = await res.json();
	return data.coins;
};
