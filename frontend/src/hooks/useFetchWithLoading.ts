import { useState, useEffect, useRef } from 'react';

export const useFetchWithLoading = (fetchFunction: () => Promise<void>, minDuration: number = 2000) => {
  const [loading, setLoading] = useState(true);
  const fetchStartTime = useRef<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        fetchStartTime.current = Date.now(); // Set fetch start time
        await fetchFunction(); // Call the passed fetch function

        const fetchDuration = Date.now() - (fetchStartTime.current || Date.now());
        // Wait for minDuration if necessary
        if (fetchDuration < minDuration) {
          setTimeout(() => setLoading(false), minDuration - fetchDuration);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching data', error);
        setLoading(false);
      }
    };

    if (import.meta.env.VITE_NODE_ENV !== 'prod') {
      fetchData();
    } else {
      // Simulate loading delay in development
      setTimeout(() => {
        setLoading(false);
      }, 1000); // 1 second delay for demo
    }
  }, [fetchFunction, minDuration]);

  return loading;
};
