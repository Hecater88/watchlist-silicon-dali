export interface CoinMarket {
	id: string;
	symbol: string;
	name: string;
	image: string;
	current_price: number;
	market_cap: number;
	market_cap_rank: number;
	total_volume: number;
	price_change_percentage_24h: number;
}

export interface SearchCoin {
	id: string;
	name: string;
	api_symbol: string;
	symbol: string;
	thumb: string;
	large: string;
}

export interface CoinDetail {
	id: string;
	name: string;
	symbol: string;
	image: string;
	description: string;
	current_price: number;
	price_change_percentage_24h: number;
	market_cap: number;
	total_volume: number;
	total_supply: number;
	circulating_supply: number;
	ath: number;
	atl: number;
}

export type HistoricalDataPoint = [number, number];
