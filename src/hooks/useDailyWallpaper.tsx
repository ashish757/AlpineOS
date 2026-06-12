import { useState, useEffect } from "react";

export const useDailyWallpaper = () => {
  const [bgUrl, setBg] = useState<string | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isErr, setErr] = useState<boolean>(false);
  const apiKey = import.meta.env.VITE_NASA_API_KEY;

  
  
  const reqUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

  useEffect(() => {
    const getBg = async () => {
      const currDate = new Date().toDateString();
      const saveDate = localStorage.getItem("cacheDate");
      const saveBG = localStorage.getItem("cacheBG");

      if (saveDate === currDate && saveBG) {
        setBg(saveBG);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(reqUrl);
        const data = await res.json();
        const newBg = data.hdurl;

        localStorage.setItem("cacheDate", currDate);
        localStorage.setItem("cacheBG", newBg);

        setBg(newBg);
        setErr(false);
      } catch (err) {
        setErr(true);
        if (saveBG) setBg(saveBG);
      } finally {
        setLoading(false);
      }
    };

    getBg();
  }, [reqUrl]);

  if (!apiKey) {
    console.error("NASA API key is not set");
    return { bgUrl: './assets/default-wallpaper.jpg', isLoading: false, isErr: false };
  }
  return { bgUrl, isLoading, isErr };
};