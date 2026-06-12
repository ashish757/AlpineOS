import { useDispatch } from "react-redux";
import { executeProcess } from "../store/processThunk";
import type { AppDispatch } from "../store/store";

const Dock = () => {
    const dispatch = useDispatch<AppDispatch>();

    const apps = [
        { id: 'browser', name: 'Browser', icon: '🌐' },
        { id: 'finder', name: 'Finder', icon: '📁' },
        { id: 'terminal', name: 'Terminal', icon: '💻' },
        { id: 'textpad', name: 'Textpad', icon: '📝' },
    ];

    return (
        <footer className="z-20 h-16 w-full  flex items-center justify-center gap-5 px-4 pb-2">
            {apps.map(app => (
                <button 
                    key={app.id}
                    onClick={() => dispatch(executeProcess(app.id))} 
                    className="flex flex-col items-center justify-center w-12 h-12 transform  scale-100  hover:-translate-y-1 hover:scale-105 transition-all duration-200"
                    title={app.name}
                >
                    <span className="text-5xl">{app.icon}</span>
                </button>
            ))}
        </footer>
    )
}

export default Dock;