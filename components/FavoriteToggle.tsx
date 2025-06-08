import { useFavoritesStore } from "@/store/favoriteStore";
import { useThemeStore } from "@/store/theme";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

type Props = {
	coinId: string;
};

const FavoriteToggle = ({ coinId }: Props) => {
	const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();
	const { theme } = useThemeStore();

	const favorited = isFavorite(coinId);
	const toggle = () => {
		favorited ? removeFavorite(coinId) : addFavorite(coinId);
	};
	const activeColor = favorited
		? theme === "dark"
			? "#F87171"
			: "#DC2626"
		: theme === "dark"
		? "#94A3B8"
		: "#64748B";

	return (
		<TouchableOpacity onPress={toggle} activeOpacity={0.7}>
			<Ionicons
				name={favorited ? "heart-sharp" : "heart-outline"}
				size={28}
				color={activeColor}
			/>
		</TouchableOpacity>
	);
};

export default FavoriteToggle;
