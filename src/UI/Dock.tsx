import { useDispatch } from "react-redux";
import { executeProcess } from "../store/processThunk";
import type { AppDispatch } from "../store/store";

const Dock = () => {
    const dispatch = useDispatch<AppDispatch>();

    const openFinder = () => {
        dispatch(executeProcess('finder'));
    };


    return (
        <footer className="z-20 h-12 w-full backdrop-blur-md bg-slate-900/60 border-t border-slate-700/50 flex items-center px-4">
            <button onClick={openFinder} className="flex flex-col items-center text-xs text-slate-300 hover:text-slate-100 transition-colors">
                Finder
            </button>
        </footer>
    )

}


export default Dock;