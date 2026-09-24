import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { toggleLaunchPad } from '../store/settingsSlice';
import { executeProcess } from '../store/processThunk';
import {apps} from './Dock'
import type { RootState, AppDispatch } from '../store/store';

const Launchpad = () => {
    const dispatch = useDispatch<AppDispatch>();
    const isOpen = useSelector((state: RootState) => state.settings.personalization.isLaunchpadOpen);

    const handleLaunch = (processId: string) => {
        dispatch(executeProcess(processId));
        dispatch(toggleLaunchPad());
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="fixed inset-0 z-[999999] bg-black/60 backdrop-blur-2xl flex flex-col items-center pt-24"
                    onClick={() => dispatch(toggleLaunchPad())}
                >
                    <div className="w-96 mb-12" onClick={e => e.stopPropagation()}>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full bg-white/10 border border-white/20 rounded-full px-6 py-2 text-white text-center outline-none focus:bg-white/20 transition-colors backdrop-blur-md"
                        />
                    </div>

                    <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-x-8 gap-y-12 max-w-6xl w-full px-8" onClick={e => e.stopPropagation()}>
                        {apps.map((app) => (
                            <button
                                key={app.id}
                                onClick={() => handleLaunch(app.id)}
                                className="flex flex-col items-center justify-center gap-3 group focus:outline-none"
                            >
                                <img
                                    src={app.icon}
                                    alt={app.name}
                                    className="w-20 h-20 object-contain drop-shadow-2xl transition-transform duration-200 group-hover:scale-110 group-active:scale-95"
                                />
                                <span className="text-white text-sm font-medium tracking-wide drop-shadow-md">
                                    {app.name}
                                </span>
                            </button>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Launchpad;