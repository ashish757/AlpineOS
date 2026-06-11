import { useState, useEffect } from "react";

export const useDailyWallpaper = () => {
  const [bgUrl, setBg] = useState<string | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isErr, setErr] = useState<boolean>(false);

  const reqUrl = `https://api.nasa.gov/planetary/apod?api_key=${import.meta.env.VITE_NASA_API_KEY}`;

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

  return { bgUrl, isLoading, isErr };
};