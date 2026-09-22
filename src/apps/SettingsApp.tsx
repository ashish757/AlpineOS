import {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {closeWindow, type WindowState} from '../store/windowSlice';
import type { RootState } from '../store/store';
import { addWidget, removeWidget } from '../store/settingsSlice';
import {removeProcess} from "../store/processSlice.ts";

export const SettingsApp = ({ winInfo }: { winInfo: WindowState }) => {
    const initialTab = winInfo.args?.defaultTab || 'general';
    const [activeTab, setActiveTab] = useState(initialTab);
    const dispatch= useDispatch();

    const activeWidgets = useSelector((state: RootState) => state.settings.widgets.active);

    const tabs = [
        { id: 'general', label: 'General', icon: '️' },
        { id: 'personalization', label: 'Personalization', icon: '' },
        { id: 'widgets', label: 'Widgets', icon: '' }
    ];

    const handleToggleWidget = (type: 'clock' | 'calendar' | 'telemetry') => {
        const existingWidget = activeWidgets.find(w => w.type === type);
        if (existingWidget) {
            dispatch(removeWidget(existingWidget.id));
        } else {
            dispatch(addWidget({
                id: `widget-${type}-${Date.now()}`,
                type,
                x: 60,
                y: 60
            }));
        }
    };

    useEffect(() => {
        if(winInfo.closingSignal === "SIGTERM") {
            dispatch(removeProcess(winInfo.processId))
            dispatch(closeWindow(winInfo.id))
        }
    });


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
                        <span className="text-base">{tab.icon}</span>
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="flex-1 p-8 overflow-y-auto bg-[#1e1e1e]">
                {activeTab === 'general' && (
                    <div className="animate-fade-in">
                        <h2 className="text-2xl font-semibold mb-6">General Settings</h2>
                        <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-sm text-slate-400">
                            System configuration and preferences will go here.
                        </div>
                    </div>
                )}

                {activeTab === 'personalization' && (
                    <div className="animate-fade-in">
                        <h2 className="text-2xl font-semibold mb-6">Personalization</h2>
                        <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-sm text-slate-400">
                            Wallpaper, theme, and accent color controls will migrate here.
                        </div>
                    </div>
                )}

                {activeTab === 'widgets' && (
                    <div className="animate-fade-in">
                        <h2 className="text-2xl font-semibold mb-6">Desktop Widgets</h2>
                        <div className="grid grid-cols-2 gap-4">

                            <div
                                onClick={() => handleToggleWidget('clock')}
                                className={`p-4 rounded-lg border flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors ${
                                    activeWidgets.some(w => w.type === 'clock')
                                        ? 'bg-blue-600/20 border-blue-500/50 text-blue-200'
                                        : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-300'
                                }`}
                            >
                                <span className="text-3xl">🕒</span>
                                <span className="text-sm font-medium">Analog Clock</span>
                                {activeWidgets.some(w => w.type === 'clock') && (
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">Active</span>
                                )}
                            </div>

                            <div
                                onClick={() => handleToggleWidget('calendar')}
                                className={`p-4 rounded-lg border flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors ${
                                    activeWidgets.some(w => w.type === 'calendar')
                                        ? 'bg-blue-600/20 border-blue-500/50 text-blue-200'
                                        : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-300'
                                }`}
                            >
                                <span className="text-3xl">📅</span>
                                <span className="text-sm font-medium">Calendar</span>
                                {activeWidgets.some(w => w.type === 'calendar') && (
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">Active</span>
                                )}
                            </div>

                            <div
                                onClick={() => handleToggleWidget('telemetry')}
                                className={`p-4 rounded-lg border flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors ${
                                    activeWidgets.some(w => w.type === 'telemetry')
                                        ? 'bg-blue-600/20 border-blue-500/50 text-blue-200'
                                        : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-300'
                                }`}
                            >
                                <span className="text-3xl">📊</span>
                                <span className="text-sm font-medium">System Telemetry</span>
                                {activeWidgets.some(w => w.type === 'telemetry') && (
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">Active</span>
                                )}
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};