import { useDispatch, useSelector } from "react-redux";
import { executeProcess } from "../store/processThunk";
import type { AppDispatch, RootState } from "../store/store";
import { useContextMenuTrigger } from "./contextMenuUtils";
import { closeWindow } from "../store/windowSlice";

const Dock = () => {
    const dispatch = useDispatch<AppDispatch>();
    const windows = useSelector((state: RootState) => state.windows.active);
    const attachContextMenu = useContextMenuTrigger();

    const apps = [
        { id: 'browser', name: 'Browser', icon: '🌐' },
        { id: 'finder', name: 'Finder', icon: '📁' },
        { id: 'terminal', name: 'Terminal', icon: '💻' },
        { id: 'textpad', name: 'Textpad', icon: '📝' },
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
        <footer className="z-20 h-16 w-full  flex items-center justify-center gap-5 px-4 pb-2">
            {apps.map(app => (
                <button 
                    key={app.id}
                    onClick={() => dispatch(executeProcess(app.id))} 
                    {...getAppContextMenu(app.id)}
                    className="flex flex-col items-center justify-center w-12 h-12 transform  scale-100  hover:-translate-y-1 hover:scale-105 transition-all duration-200"
                    title={app.name}
                >
                    <span className="text-5xl drop-shadow-lg">{app.icon}</span>
                </button>
            ))}
        </footer>
    )
}

export default Dock;