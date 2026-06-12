import React, { useState } from 'react';
import { Wifi, Bluetooth, Airplay, Sun, Volume2, Play, SkipBack, SkipForward, Pause } from 'lucide-react';

interface ControlCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ControlCenter: React.FC<ControlCenterProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [display, setDisplay] = useState(80);
  const [volume, setVolume] = useState(50);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute top-9 right-2 w-72 bg-slate-900/80 backdrop-blur-2xl border border-slate-700/50 rounded-2xl p-3 z-50 shadow-2xl flex flex-col gap-3">
        
        <div className="grid grid-cols-2 gap-2 text-slate-200">
          <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-3 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="bg-blue-500 rounded-full p-1.5"><Wifi size={14} className="text-white" /></div>
              <div className="flex flex-col"><span className="text-xs font-semibold leading-tight">Wi-Fi</span><span className="text-[10px] text-slate-400">Home Network</span></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-blue-500 rounded-full p-1.5"><Bluetooth size={14} className="text-white" /></div>
              <div className="flex flex-col"><span className="text-xs font-semibold leading-tight">Bluetooth</span><span className="text-[10px] text-slate-400">On</span></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-blue-500 rounded-full p-1.5"><Airplay size={14} className="text-white" /></div>
              <div className="flex flex-col"><span className="text-xs font-semibold leading-tight">AirDrop</span><span className="text-[10px] text-slate-400">Everyone</span></div>
            </div>
          </div>
          
          <div className="grid grid-rows-2 gap-2">
             <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl flex items-center justify-center p-3 gap-2 flex-col cursor-pointer hover:bg-slate-700/60 transition-colors">
               <div className="w-full flex items-center justify-between"><span className="text-xs font-semibold">Focus</span></div>
               <span className="text-[10px] text-slate-400 w-full text-left">Do Not Disturb</span>
             </div>
             <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl flex items-center justify-center cursor-pointer hover:bg-slate-700/60 transition-colors">
               <span className="text-xs font-semibold">Stage Manager</span>
             </div>
          </div>
        </div>

        <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-3 flex flex-col gap-3 text-slate-200">
           <div className="flex items-center gap-3">
              <Sun size={16} className="text-slate-400" />
              <input type="range" min="0" max="100" value={display} onChange={e => setDisplay(Number(e.target.value))} className="w-full h-1.5 bg-slate-600 rounded-lg appearance-none cursor-pointer" />
           </div>
           <div className="flex items-center gap-3">
              <Volume2 size={16} className="text-slate-400" />
              <input type="range" min="0" max="100" value={volume} onChange={e => setVolume(Number(e.target.value))} className="w-full h-1.5 bg-slate-600 rounded-lg appearance-none cursor-pointer" />
           </div>
        </div>

        <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-3 flex items-center justify-between text-slate-200">
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center text-[10px] text-slate-400 font-semibold shadow-inner">
               Art
             </div>
             <div className="flex flex-col">
               <span className="text-xs font-semibold truncate w-24 leading-tight">Alpine Beats</span>
               <span className="text-[10px] text-slate-400">Stardust Radio</span>
             </div>
           </div>
           <div className="flex items-center gap-1 text-slate-300">
             <button className="p-1 hover:bg-slate-700 rounded transition-colors"><SkipBack size={16} fill="currentColor" /></button>
             <button onClick={() => setIsPlaying(!isPlaying)} className="p-1 hover:bg-slate-700 rounded transition-colors">
               {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
             </button>
             <button className="p-1 hover:bg-slate-700 rounded transition-colors"><SkipForward size={16} fill="currentColor" /></button>
           </div>
        </div>
      </div>
    </>
  );
};
