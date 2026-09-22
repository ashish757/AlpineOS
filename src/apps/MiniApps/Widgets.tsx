import ClockWidget from "../widgets/ClockWidget.tsx";


const Widgets = () => {
    return (
        <div className="animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6">Desktop Widgets</h2>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-2">
                <div className="p-4 rounded-md flex flex-col items-center gap-2">
                    <span className="text-sm">Analog Clock</span>
                    <ClockWidget />
                </div>
                <div className="p-4 rounded-md flex flex-col items-center gap-2">
                    <span className="text-sm">Analog Clock</span>
                    <ClockWidget />
                </div>
                <div className="p-4 bg-white/5 rounded-lg border border-white/10 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-white/10 transition-colors">
                    <span className="text-3xl">📅</span>
                    <span className="text-sm font-medium">Calendar</span>
                </div>
                <div className="p-4 bg-white/5 rounded-lg border border-white/10 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-white/10 transition-colors">
                    <span className="text-3xl">📊</span>
                    <span className="text-sm font-medium">System Telemetry</span>
                </div>
            </div>
        </div>
    )
}


export default Widgets;