import  { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { Wifi, BatteryMedium, SlidersHorizontal, Search } from 'lucide-react';
import { useClock } from '../hooks/useClock';
import { ControlCenter } from './ControlCenter';

export default function MenuBar() {
  const { formattedTime, formattedDate } = useClock();
  const [showControlCenter, setShowControlCenter] = useState(false);
  const windows = useSelector((state: RootState) => state.windows.active);

  const activeWindow = [...windows]
    .filter(w => w.isOpen)
    .sort((a, b) => b.index - a.index)[0];
  
  const activeAppName = activeWindow ? activeWindow.title : 'Finder';

  return (
    <header className="relative z-50 text-slate-200 w-full backdrop-blur-md bg-slate-900/60 border-b border-slate-700/50 flex justify-between items-center px-4 h-8 select-none text-xs font-medium">
      
      <div className="flex items-center gap-4">
        <div className="font-bold cursor-default hover:bg-white/10 px-2 py-1 rounded transition-colors">{activeAppName}</div>
        <div className="cursor-default hover:bg-white/10 px-2 py-1 rounded transition-colors hidden sm:block">File</div>
        <div className="cursor-default hover:bg-white/10 px-2 py-1 rounded transition-colors hidden sm:block">Edit</div>
        <div className="cursor-default hover:bg-white/10 px-2 py-1 rounded transition-colors hidden sm:block">View</div>
        <div className="cursor-default hover:bg-white/10 px-2 py-1 rounded transition-colors hidden sm:block">Help</div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-3 px-2 py-1 rounded hover:bg-white/10 cursor-default transition-colors">
          <Wifi size={14} />
          <Search size={14} />
          <BatteryMedium size={16} />
        </div>
        
        <div 
          onClick={() => setShowControlCenter(!showControlCenter)}
          className={`p-1.5 rounded cursor-pointer transition-colors ${showControlCenter ? 'bg-white/20' : 'hover:bg-white/10'}`}
        >
          <SlidersHorizontal size={14} />
        </div>
        
        <div className="flex items-center gap-2 px-2 py-1 rounded hover:bg-white/10 cursor-default transition-colors">
          <span>{formattedDate}</span>
          <span>{formattedTime}</span>
        </div>
      </div>

      <ControlCenter isOpen={showControlCenter} onClose={() => setShowControlCenter(false)} />

    </header>
  );
}