import { useDispatch } from "react-redux";
import { executeProcess } from "../store/processThunk";
import type { AppDispatch } from "../store/store";

const Dock = () => {
    const dispatch = useDispatch<AppDispatch>();

    const apps = [
        { id: 'finder', name: 'Finder', icon: '📁' },
        { id: 'terminal', name: 'Terminal', icon: '💻' },
        { id: 'textpad', name: 'Textpad', icon: '📝' },
    ];

    return (
        <footer className="z-20 h-16 w-full  flex items-center justify-center gap-4 px-4 pb-2">
            {apps.map(app => (
                <button 
                    key={app.id}
                    onClick={() => dispatch(executeProcess(app.id))} 
                    className="flex flex-col items-center justify-center w-12 h-12 bg-white/10 rounded-xl hover:bg-white/10 hover:-translate-y-1 transition-all duration-200 border border-white/10 hover:border-white/20 shadow-lg"
                    title={app.name}
                >
                    <span className="text-2xl drop-shadow-md">{app.icon}</span>
                </button>
            ))}
        </footer>
    )
}

export default Dock;