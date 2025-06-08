import { useThemeStore } from "@/store/theme";
import React from "react";
import { ScrollView, useWindowDimensions, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

const CoinChart = ({ chartData }: { chartData: { x: Date; y: number }[] }) => {
	const { width: screenWidth } = useWindowDimensions();
	const { theme } = useThemeStore();

	const labels = chartData.map((point, index) =>
		index % 24 === 0
			? new Date(point.x).toLocaleDateString("es-ES", {
					day: "2-digit",
					month: "2-digit",
			  })
			: ""
	);
	const data = chartData.map((point) => point.y);
	const max = Math.max(...data);
	const min = Math.min(...data);
	const chartWidth = (data.length + 3) * 5;

	const chartConfig = {
		backgroundGradientFrom: theme === "dark" ? "#0f0d23" : "#ffffff",
		backgroundGradientTo: theme === "dark" ? "#151312" : "#f4f4f5",
		decimalPlaces: 2,
		color: (opacity = 1) => `rgba(79, 70, 229, ${opacity})`,
		labelColor: (opacity = 1) =>
			theme === "dark"
				? `rgba(255, 255, 255, ${opacity})`
				: `rgba(0, 0, 0, ${opacity})`,
		propsForDots: {
			r: "1",
			strokeWidth: "1",
			stroke: theme === "dark" ? "#4f46e5" : "#4f46e5",
		},
	};
	return (
		<View className="overflow-hidden rounded-lg">
			<ScrollView horizontal showsHorizontalScrollIndicator={false}>
				<LineChart
					data={{
						labels: [...labels, "", "", "", "", "", "", "", "", "", ""],
						datasets: [
							{ data: data },
							{
								data: new Array(data.length).fill(max),
								color: () => "#4ADE80",
								strokeWidth: 1,
								withDots: false,
							},
							{
								data: new Array(data.length).fill(min),
								color: () => "#F87171",
								strokeWidth: 1,
								withDots: false,
							},
						],
					}}
					width={Math.max(chartWidth, screenWidth - 32)}
					height={220}
					chartConfig={chartConfig}
					bezier
					style={{
						borderRadius: 16,
						marginLeft: 16,
					}}
					withDots={false}
				/>
			</ScrollView>
		</View>
	);
};

export default CoinChart;
