import { useEffect, useState } from "react";

const useFetchWithInterval = <T>(fetchFunction: () => Promise<T>) => {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

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
		const interval = setInterval(fetchData, 5000);
		return () => clearInterval(interval);
	}, []);

	return { data, loading, error, refetch: fetchData, reset };
};

export default useFetchWithInterval;
