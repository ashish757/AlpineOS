const CalendarWidget = () => {
    const date = new Date();
    const dayName = date.toLocaleDateString([], { weekday: 'long' });
    const month = date.toLocaleDateString([], { month: 'short' });
    const day = date.getDate();

    return (
        <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-4 w-40 h-40 flex flex-col items-center justify-center text-white shadow-2xl select-none cursor-default">
            <div className="text-red-400 text-sm font-bold uppercase tracking-widest mb-1">
                {month}
            </div>
            <div className="text-6xl font-light tracking-tight leading-none mb-2">
                {day}
            </div>
            <div className="text-xs text-slate-400 font-medium">
                {dayName}
            </div>
        </div>
    );
};

export default CalendarWidget;