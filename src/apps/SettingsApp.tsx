import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeWindow, type WindowState } from '../store/windowSlice';
import { removeProcess } from "../store/processSlice";
import Widgets from "./MiniApps/Widgets.tsx";
import { Personalization } from "./MiniApps/Personalization.tsx";
import type { RootState } from '../store/store';
import { setBrightness } from '../store/settingsSlice';

export const SettingsApp = ({ winInfo }: { winInfo: WindowState }) => {
    const initialTab = winInfo.args?.defaultTab || 'general';
    const [activeTab, setActiveTab] = useState(initialTab);
    const dispatch = useDispatch();

    const brightness = useSelector((state: RootState) => state.settings.personalization.brightness) ?? 100;

    const tabs = [
        { id: 'general', label: 'General' },
        { id: 'personalization', label: 'Personalization' },
        { id: 'widgets', label: 'Widgets' }
    ];

    useEffect(() => {
        if (winInfo.args?.defaultTab) {
            setActiveTab(winInfo.args.defaultTab);
        }
    }, [winInfo.args?.defaultTab]);

    useEffect(() => {
        if (winInfo.closingSignal === "SIGTERM") {
            dispatch(removeProcess(winInfo.processId));
            dispatch(closeWindow(winInfo.id));
        }
    }, [winInfo.closingSignal, winInfo.processId, winInfo.id, dispatch]);

    return (
        <div className="flex h-full w-full bg-[#1e1e1e] text-slate-200">
            <div className="w-48 border-r border-white/5 bg-[#252526] p-2 flex flex-col gap-1">
                <div className="px-3 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Settings
                </div>
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors text-left outline-none ${
                            activeTab === tab.id
                                ? 'bg-blue-600 text-white shadow-sm'
                                : 'text-slate-300 hover:bg-white/10'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="flex-1 p-8 overflow-y-auto bg-[#1e1e1e]">
                {activeTab === 'general' && (
                    <div className="animate-fade-in flex flex-col gap-6">
                        <h2 className="text-2xl font-semibold">General Settings</h2>

                        <div className="p-4 bg-white/5 rounded-lg border border-white/10 flex flex-col gap-4">
                            <div>
                                <h3 className="font-medium text-slate-200">Display Brightness</h3>
                                <p className="text-xs text-slate-400 mt-1">Adjust the overall brightness of the system display.</p>
                            </div>

                            <div className="flex items-center gap-4 bg-black/20 p-3 rounded-lg border border-white/5">
                                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" className="text-slate-400">
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
                                <input
                                    type="range"
                                    min="20"
                                    max="100"
                                    value={brightness}
                                    onChange={(e) => dispatch(setBrightness(Number(e.target.value)))}
                                    className="flex-1 accent-blue-500 h-1.5 bg-slate-600 rounded-lg appearance-none cursor-pointer"
                                />
                                <span className="text-xs font-mono text-slate-300 w-8 text-right">{brightness}%</span>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === 'personalization' && <Personalization/>}
                {activeTab === 'widgets' && <Widgets/>}
            </div>
        </div>
    );
};