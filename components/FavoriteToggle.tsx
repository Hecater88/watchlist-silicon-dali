import { useFavoritesStore } from "@/store/favoriteStore";
import { Ionicons } from "@expo/vector-icons";
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
			<Text>
				{isFavorite(coinId) ? (
					<Ionicons name="heart-sharp" size={20} color={"red"} />
				) : (
					<Ionicons name="heart-outline" size={20} color={"black"} />
				)}
			</Text>
		</TouchableOpacity>
	);
};

export default FavoriteToggle;
