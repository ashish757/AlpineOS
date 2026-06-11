import { useDailyWallpaper } from "../hooks/useDailyWallpaper";

export default function Wallpaper() {
  const {bgUrl} = useDailyWallpaper(); 

  return (
     <div
        className="absolute inset-0 z-0 bg-cover bg-center brightness-75"
        style={{ backgroundImage: `url(${bgUrl || ''})` }}
      ></div>
  );
}