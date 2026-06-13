import { useState, useEffect } from 'react';

export const useTelemetry = () => {
  const [data, setData] = useState(() =>
    Array.from({ length: 20 }).map(() => ({
      cpu: Math.floor(Math.random() * 20) + 5,
      ram: Math.floor(Math.random() * 10) + 40,
    }))
  );

  useEffect(() => {
    const intId = setInterval(() => {
      setData(prev => {
        const next = [...prev.slice(1)];
        const lastRam = prev[prev.length - 1].ram;
        
        next.push({
          cpu: Math.floor(Math.random() * 35) + (Math.random() > 0.8 ? 50 : 5),
          ram: lastRam + (Math.floor(Math.random() * 5) - 2),
        });
        
        return next;
      });
    }, 1500);

    return () => clearInterval(intId);
  }, []);

  return data;
};