import { useState, useEffect, useRef, useCallback } from 'react';

export const useFetchWithLoading = <T>(
  fetchFunction: () => Promise<T>,
  minDuration: number = 2000
): { loading: boolean; error: Error | null; data: T | null } => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);
  const fetchStartTime = useRef<number | null>(null);

  useEffect(() => {
    let isMounted = true; // Prevent state updates after unmount

    const fetchData = async () => {
      fetchStartTime.current = Date.now(); // Start timer
      setLoading(true); // Ensure loading is true at the start
      try {
        const result = await fetchFunction(); // Perform the async fetch operation
        if (isMounted) {
          setData(result); // Set fetched data
        }

        // Calculate duration and ensure minDuration is respected
        const fetchDuration = Date.now() - (fetchStartTime.current || Date.now());
        const remainingDuration = Math.max(minDuration - fetchDuration, 0);

        setTimeout(() => {
          if (isMounted) {
            setLoading(false);
          }
        }, remainingDuration);
      } catch (err) {
        if (isMounted) {
          // Check if error is an instance of Error or use a fallback
          setError(err instanceof Error ? err : new Error(String(err)));
          setLoading(false);
        }
      }
    };

    fetchData(); // Trigger the fetch on mount

    return () => {
      isMounted = false; // Cleanup on unmount
    };
  }, [fetchFunction, minDuration]);

  return { loading, error, data }; // Return loading, error, and fetched data
};
