import { useFavoritesStore } from "@/store/favoriteStore";
import { Text, TouchableOpacity } from "react-native";

type Props = {
	coinId: string;
};

const FavoriteToggle = ({ coinId }: Props) => {
	const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();

	const toggle = () => {
		isFavorite(coinId) ? removeFavorite(coinId) : addFavorite(coinId);
	};

	return (
		<TouchableOpacity onPress={toggle}>
			<Text>{isFavorite(coinId) ? "⭐" : "☆"}</Text>
		</TouchableOpacity>
	);
};

export default FavoriteToggle;
