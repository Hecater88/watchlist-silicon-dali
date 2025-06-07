import React from "react";
import { View } from "react-native";
import { LineChart } from "react-native-chart-kit";

const chartConfig = {
	color: () => "#4f46e5",
	labelColor: () => "#ccc",
	propsForDots: {
		r: "2",
	},
};

const CoinChart = ({ chartData }: { chartData: { x: Date; y: number }[] }) => {
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

	return (
		<View>
			<LineChart
				data={{
					labels: [...labels, "", ""],
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
				width={chartWidth}
				height={220}
				chartConfig={chartConfig}
				bezier
				style={{ borderRadius: 16 }}
				withDots={false}
			/>
		</View>
	);
};

export default CoinChart;
