import { useDispatch, useSelector } from 'react-redux';
import { setWallpaper } from '../store/personalizationSlice';
import type { RootState } from '../store/store';

export const PersonalizationApp = () => {
  const dispatch = useDispatch();
  const currentWallpaper = useSelector((state: RootState) => state.personalization.currentWallpaper);
  const localWallpapers = useSelector((state: RootState) => state.personalization.localWallpapers);


  const applyWallpaper = (id: string) => {
    console.log(`New wallpaper with id: ${id}`);
    console.log(`current wallpaper with id: ${currentWallpaper.id}`);

    dispatch(setWallpaper({type: 'local', id }));
  };
return (
    <div className="flex flex-col h-full bg-[#1e1e1e] text-slate-200 p-6 gap-8 overflow-y-auto">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-2">
        {localWallpapers.map(w => (
          <div 
            key={w.id}
            className="relative w-full h-40 rounded-lg border border-slate-700 shadow-inner p-1 overflow-hidden"
            style={{ contain: 'content' }}
          >
            <img 
              src={w.url} 
              alt={w.id}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover -z-10"
            />
            {currentWallpaper.id !== w.id && (
              <button
                onClick={() => applyWallpaper(w.id)}
                className="cursor-pointer relative z-10 px-3 py-1 bg-slate-600/50 hover:bg-slate-600 border border-slate-500 text-white rounded text-sm transition-colors shadow-md"
              >
                Apply
              </button>
            )}
          </div>
        ))}  
      </div>
    </div>
  );
};