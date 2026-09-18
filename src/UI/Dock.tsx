import { useDispatch, useSelector } from "react-redux";
import { executeProcess } from "../store/processThunk";
import type { AppDispatch, RootState } from "../store/store";
import { useContextMenuTrigger } from "./contextMenuUtils";
import { closeWindow } from "../store/windowSlice";
import FolderIcon from "../assets/icons/folder.png";
import DocumentIcon from "../assets/icons/document.png";
import TerminalIcon from "../assets/icons/terminal.png";
import WWW from "../assets/icons/browser.png";
import ActivityIcon from "../assets/icons/activity.png";

const Dock = () => {
    const dispatch = useDispatch<AppDispatch>();
    const windows = useSelector((state: RootState) => state.windows.active);
    const attachContextMenu = useContextMenuTrigger();

    const apps = [
        { id: 'activityManager', name: 'Activity', icon: ActivityIcon },
        { id: 'browser', name: 'Browser', icon: WWW },
        { id: 'finder', name: 'Finder', icon: FolderIcon },
        { id: 'terminal', name: 'Terminal', icon: TerminalIcon },
        { id: 'textpad', name: 'Textpad', icon: DocumentIcon },
    ];

    const getAppContextMenu = (appId: string) => {
        const appWindows = windows.filter(w => w.componentId === appId);
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

    return (
        <footer className="w-full relative flex justify-center pb-4">
            <div className="flex items-center justify-center gap-5 bg-white/10 backdrop-blur-xs py-3 px-3  rounded-lg ">
            {apps.map(app => (
                <button 
                    key={app.id}
                    onClick={() => dispatch(executeProcess(app.id))} 
                    {...getAppContextMenu(app.id)}
                    className="flex flex-col items-center justify-center transform group"
                    title={app.name}
                >
                    <span className="" data-tooltip-target={app.name}>
                       <img src={app.icon} alt={app.name} className="w-10 h-10 object-contain" />
                    </span>

                    <div className="absolute bottom-full mb-2 px-2 py-1 gap-8 bg-black/50 backdrop-blur-xs shadow-md text-white text-xs font-medium rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-[100]">
                        {app.name}
                        <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-black/80"></div>
                    </div>

                </button>
            ))}
            </div>
        </footer>
    )
}

export default Dock;