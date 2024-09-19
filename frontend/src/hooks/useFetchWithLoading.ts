import { useState, useEffect, useRef } from 'react';

export const useFetchWithLoading = (fetchFunction: () => Promise<void>, minDuration: number = 2000) => {
  const [loading, setLoading] = useState(true);
  const fetchStartTime = useRef<number | null>(null);



  useEffect(() => {
    const fetchData = async () => {
      try {
        fetchStartTime.current = Date.now(); 
        await fetchFunction(); 
  
        const fetchDuration = Date.now() - (fetchStartTime.current || Date.now());
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
    
    fetchData(); // Always fetch the data
  }, [fetchFunction, minDuration]);
  

  return loading;
};
