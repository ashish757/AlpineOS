import {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import {closeWindow, type WindowState} from '../store/windowSlice';

import {removeProcess} from "../store/processSlice";
import Widgets from "./MiniApps/Widgets.tsx";
import {Personalization} from "./MiniApps/Personalization.tsx";

export const SettingsApp = ({ winInfo }: { winInfo: WindowState }) => {
    const initialTab = winInfo.args?.defaultTab || 'general';
    const [activeTab, setActiveTab] = useState(initialTab);
    const dispatch = useDispatch();


    const tabs = [
        { id: 'general', label: 'General', icon: '' },
        { id: 'personalization', label: 'Personalization', icon: '' },
        { id: 'widgets', label: 'Widgets', icon: '' }
    ];

    useEffect(() => {
        if (winInfo.args?.defaultTab) {
            setActiveTab(winInfo.args.defaultTab);
        }
    }, [winInfo.args?.defaultTab]);



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
                        className={`flex items-center gap-3 rounded-md px-1 py-1 text-sm transition-colors text-left outline-none ${
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
                {activeTab === 'personalization' && <Personalization/>}
                {activeTab === 'widgets' && <Widgets/>}
            </div>


        </div>
    );
};