import type { RootState } from "../store/store";
import { useSelector } from "react-redux";

export default function Wallpaper() {
  
  const wallpaper = useSelector((state: RootState) => state.personalization.currentWallpaper);


  return (
     <div
        className="absolute inset-0 z-0 bg-cover bg-center brightness-75"
        style={{ backgroundImage: `url(${wallpaper.url || ''})` }}
      ></div>
  );
}