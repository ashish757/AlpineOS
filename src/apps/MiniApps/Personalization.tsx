import { useDispatch, useSelector } from 'react-redux';
import { setWallpaper } from '../../store/settingsSlice.ts';
import type { RootState } from '../../store/store.ts';
import { toggleDockVisibility } from "../../store/settingsSlice.ts";

export const Personalization = () => {
  const dispatch = useDispatch();
  const currentWallpaper = useSelector((state: RootState) => state.settings.personalization.currentWallpaper);
  const localWallpapers = useSelector((state: RootState) => state.settings.personalization.localWallpapers);
    const autoHideDock = useSelector((state: RootState) => state.settings.personalization.hideDock);

  const applyWallpaper = (id: string) => {
    console.log(`New wallpaper with id: ${id}`);
    console.log(`current wallpaper with id: ${currentWallpaper.id}`);

    dispatch(setWallpaper({type: 'local', id }));
  };


return (
    <div className="flex flex-col h-full bg-[#1e1e1e] text-slate-200 p-6 gap-8 overflow-y-auto animate-fade-in">
        <h2 className="text-2xl font-semibold mb-6">Personalization</h2>

        <div className="p-4 bg-white/5 rounded-lg border border-white/10 flex items-center justify-between">
            <div>
                <h3 className="font-medium text-slate-200">Auto-hide the Dock</h3>
                <p className="text-xs text-slate-400 mt-1">Hide the dock when not in use to maximize screen real estate.</p>
            </div>
            <button
                onClick={() => dispatch(toggleDockVisibility())}
                className={`w-12 min-w-12 h-6 rounded-full transition-colors relative flex items-center px-1 ${autoHideDock ? 'bg-blue-500' : 'bg-slate-600'}`}
            >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${autoHideDock ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
        </div>

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