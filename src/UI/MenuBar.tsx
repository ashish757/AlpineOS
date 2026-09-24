import  { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBrightness } from '../store/settingsSlice';
import type { RootState } from '../store/store';

const dummyNetworks = [
  { id: '1', name: 'Alpine_5G', strength: 4, secured: true, connected: true },
  { id: '2', name: 'Guest_Network', strength: 3, secured: false, connected: false },
  { id: '3', name: 'CoffeeShop_Free', strength: 2, secured: false, connected: false },
  { id: '4', name: 'NETGEAR-09', strength: 1, secured: true, connected: false },
];

const MenuBar = () => {
  const [time, setTime] = useState(new Date());
  const [activeDropdown, setActiveDropdown] = useState<'wifi' | 'display' | 'calendar' | null>(null);
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const trayRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  const brightness = useSelector((state: RootState) => state.settings.personalization.brightness) ?? 100;

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (trayRef.current && !trayRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    if (activeDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeDropdown]);

  const toggleDropdown = (menu: 'wifi' | 'display' | 'calendar') => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  return (
      <div className="w-full h-7 bg-slate-900/60 backdrop-blur-md text-slate-200 text-[13px] flex items-center justify-between px-4 z-99 border-b border-black/20 select-none">

        <div className="flex gap-4 font-semibold tracking-wide">
          <span className="cursor-default">AlpineOS</span>
        </div>

        {/* Right Side Tray */}
        <div className="flex items-center gap-1 relative" ref={trayRef}>

          {/* Wi-Fi Icon */}
          <button
              onClick={() => toggleDropdown('wifi')}
              className={`p-1.5 rounded transition-colors ${activeDropdown === 'wifi' ? 'bg-white/20' : 'hover:bg-white/10'}`}
          >
            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12.55a11 11 0 0 1 14.08 0" />
              <path d="M1.42 9a16 16 0 0 1 21.16 0" />
              <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
              <line x1="12" y1="20" x2="12.01" y2="20" />
            </svg>
          </button>

          <button
              onClick={() => toggleDropdown('display')}
              className={`p-1.5 rounded transition-colors ${activeDropdown === 'display' ? 'bg-white/20' : 'hover:bg-white/10'}`}
          >
            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          </button>

          <button
              onClick={() => toggleDropdown('calendar')}
              className={`px-2 py-0.5 ml-1 rounded transition-colors ${activeDropdown === 'calendar' ? 'bg-white/20' : 'hover:bg-white/10'}`}
          >
            {time.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })} &nbsp;
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </button>

          {activeDropdown === 'wifi' && (
              <div className="absolute top-full mt-2 right-0 w-64 bg-slate-800/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl p-3 flex flex-col text-slate-200 origin-top-right animate-fade-in">
                <div className="flex justify-between items-center mb-3 px-1">
                  <span className="font-semibold text-sm">Wi-Fi</span>
                  <button
                      onClick={() => setWifiEnabled(!wifiEnabled)}
                      className={`w-8 h-4 rounded-full transition-colors relative flex items-center px-0.5 ${wifiEnabled ? 'bg-blue-500' : 'bg-slate-600'}`}
                  >
                    <div className={`w-3 h-3 rounded-full bg-white transition-transform ${wifiEnabled ? 'translate-x-4' : 'translate-x-0'}`} />
                  </button>
                </div>

                {wifiEnabled ? (
                    <div className="flex flex-col gap-1">
                      {dummyNetworks.map(net => (
                          <div key={net.id} className="flex items-center justify-between p-2 rounded hover:bg-white/10 cursor-pointer transition-colors group">
                            <div className="flex items-center gap-2">
                              {/* Connected Checkmark */}
                              <div className="w-4 flex justify-center">
                                {net.connected && (
                                    <svg className="text-blue-400" viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="3" fill="none"><polyline points="20 6 9 17 4 12" /></svg>
                                )}
                              </div>
                              <span className={`text-sm ${net.connected ? 'text-blue-400 font-medium' : ''}`}>{net.name}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-400 group-hover:text-slate-200">
                              {net.secured && (
                                  <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2.5" fill="none"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                              )}
                              <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none"><path d="M5 12.55a11 11 0 0 1 14.08 0" /><path d="M1.42 9a16 16 0 0 1 21.16 0" /><path d="M8.53 16.11a6 6 0 0 1 6.95 0" /><line x1="12" y1="20" x2="12.01" y2="20" /></svg>
                            </div>
                          </div>
                      ))}
                    </div>
                ) : (
                    <div className="py-4 text-center text-xs text-slate-400">Wi-Fi is turned off.</div>
                )}
              </div>
          )}

          {activeDropdown === 'display' && (
              <div className="absolute top-full mt-2 right-0 w-64 bg-slate-800/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl p-4 flex flex-col gap-2 text-slate-200 origin-top-right animate-fade-in">
                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1">Display</span>
                <div className="flex items-center gap-3 bg-black/20 p-2 rounded-lg border border-white/5">
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" className="text-slate-400"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
                  <input
                      type="range"
                      min="20" max="100"
                      value={brightness}
                      onChange={(e) => dispatch(setBrightness(Number(e.target.value)))}
                      className="flex-1 accent-blue-500 h-1.5 bg-slate-600 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
          )}

          {activeDropdown === 'calendar' && (
              <div className="absolute top-full mt-2 right-0 w-64 bg-slate-800/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl p-6 flex flex-col items-center justify-center text-slate-200 origin-top-right animate-fade-in">
                <div className="text-red-400 text-sm font-bold uppercase tracking-widest mb-1">
                  {time.toLocaleDateString([], { month: 'long' })}
                </div>
                <div className="text-6xl font-light tracking-tight leading-none mb-2">
                  {time.getDate()}
                </div>
                <div className="text-sm text-slate-400 font-medium">
                  {time.toLocaleDateString([], { weekday: 'long' })}
                </div>
              </div>
          )}

        </div>
      </div>
  );
};

export default MenuBar;