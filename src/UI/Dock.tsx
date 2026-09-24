import { useDispatch, useSelector } from "react-redux";
import { executeProcess } from "../store/processThunk";
import type { AppDispatch, RootState } from "../store/store";
import { useContextMenuTrigger } from "./contextMenuUtils";
import { closeWindow, focusApp, toggleMinimizeWindow } from "../store/windowSlice";
import {toggleLaunchPad} from "../store/settingsSlice.ts";

export const apps = [
    { id: "launchpad", componentId: "LAUNCHPAD_APP", name: "Launchpad", icon: "assets/icons/folder.png" },
    { id: 'settings', componentId: 'SETTINGS_APP', name: 'Settings', icon: "assets/icons/settings.png" },
    { id: 'activityManager', componentId: 'ACTIVITY_MANAGER_APP', name: 'Activity', icon: "assets/icons/activity.png" },
    { id: 'browser', componentId: 'BROWSER_APP', name: 'Browser', icon: "assets/icons/browser.png" },
    { id: 'finder', componentId: 'FINDER_APP', name: 'Finder', icon: "assets/icons/folder.png" },
    { id: 'terminal', componentId: 'TERMINAL_APP', name: 'Terminal', icon: "assets/icons/terminal.png" },
    { id: 'textpad', componentId: 'TEXTPAD_APP', name: 'Textpad', icon: "assets/icons/document.png" },
];

const Dock = () => {
    const dispatch = useDispatch<AppDispatch>();
    const windows = useSelector((state: RootState) => state.windows.active);
    const highestIndex = useSelector((state: RootState) => state.windows.highestIndex);
    const autoHideDock = useSelector((state: RootState) => state.settings.personalization.hideDock);
    const attachContextMenu = useContextMenuTrigger();



    const getAppContextMenu = (appId: string, componentId: string) => {
        const appWindows = windows.filter(w => w.componentId === componentId && w.isOpen);
        return attachContextMenu([
            { label: 'Open', action: () => dispatch(executeProcess(appId)) },
            ...(appWindows.length > 0 ? [
                { divider: true, label: '', action: () => {} },
                { label: 'Close All', action: () => {
                        appWindows.forEach(w => dispatch(closeWindow(w.id)));
                    }}
            ] : [])
        ]);
    };

    const handleAppClick = (processId: string, componentId: string) => {

        if(processId == "launchpad") {
            dispatch(toggleLaunchPad());
            return;
        }
        const appWindows = windows.filter(w => w.componentId === componentId && w.isOpen);

        if (appWindows.length === 0) {
            dispatch(executeProcess(processId));
            return;
        }


        const targetWindow = appWindows.reduce((prev, current) =>
            (prev.index > current.index) ? prev : current
        );

        if (targetWindow.isMinimized) {
            dispatch(toggleMinimizeWindow(targetWindow.id));
        } else if (targetWindow.index !== highestIndex) {
            dispatch(focusApp(targetWindow.id));
        } else {
            dispatch(toggleMinimizeWindow(targetWindow.id));
        }
    };

    return (
        <footer
            className={`absolute bottom-0 w-full flex justify-center pb-4 pt-10 z-9999 transition-transform duration-300 ease-in-out ${
                autoHideDock
                    ? "translate-y-[calc(100%-15px)] hover:translate-y-0"
                    : "translate-y-0"
            }`}
        >
            <div className="flex items-center justify-center gap-5 bg-white/10 backdrop-blur-xs py-3 px-3 rounded-lg shadow-lg">
                {apps.map(app => {
                    const isActive = windows.some(w => w.componentId === app.componentId && w.isOpen);

                    return (
                        <button
                            key={app.id}
                            onClick={() => handleAppClick(app.id, app.componentId)}
                            {...getAppContextMenu(app.id, app.componentId)}
                            className="flex flex-col items-center justify-center transform group relative"
                            title={app.name}
                        >
                            <span className="" data-tooltip-target={app.name}>
                               <img src={app.icon} alt={app.name} className="w-10 h-10 object-contain transition-transform group-active:scale-95 hover:scale-110" />
                            </span>

                            {isActive && (
                                <div className="absolute -bottom-2 w-1 h-1 bg-white/80 rounded-full shadow-[0_0_4px_rgba(255,255,255,0.8)]"></div>
                            )}

                            <div className="absolute bottom-full mb-3 px-2 py-1 gap-8 bg-black/50 backdrop-blur-xs shadow-md text-white text-xs font-medium rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-[100]">
                                {app.name}
                                <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-black/80"></div>
                            </div>
                        </button>
                    );
                })}
            </div>
        </footer>
    );
};

export default Dock;