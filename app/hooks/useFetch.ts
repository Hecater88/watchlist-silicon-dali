import { useEffect, useRef, useState } from "react";

const useFetchWithInterval = <T>(
	fetchFunction: () => Promise<T>,
	refreshInterval?: number
) => {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	const intervalRef = useRef<number | null>(null);

	const fetchData = async () => {
		try {
			setLoading(true);
			setError(null);
			const result = await fetchFunction();
			setData(result);
		} catch (err) {
			//@ts-ignore
			setError(err instanceof Error ? err : new Error("An error ocurred"));
		} finally {
			setLoading(false);
		}
	};

	const reset = () => {
		setData(null);
		setLoading(false);
		setError(null);
	};

	useEffect(() => {
		fetchData();
		if (refreshInterval) {
			intervalRef.current = setInterval(fetchData, refreshInterval);
			return () => {
				if (intervalRef.current) clearInterval(intervalRef.current);
			};
		}
	}, [refreshInterval]);

	return { data, loading, error, refetch: fetchData, reset };
};

export default useFetchWithInterval;
