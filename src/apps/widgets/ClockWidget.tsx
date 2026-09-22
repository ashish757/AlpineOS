import { useEffect, useState } from 'react';

const ClockWidget = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-white shadow-2xl select-none cursor-default w-64 h-32">
            <div className="text-4xl font-light tracking-wider">
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="text-xs text-slate-400 mt-2 font-medium uppercase tracking-widest">
                {time.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}
            </div>
        </div>
    );
};

export default ClockWidget;