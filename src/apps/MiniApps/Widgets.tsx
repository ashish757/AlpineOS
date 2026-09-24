import { widgetMap } from '../widgets/widgetConfig';
import {useSelector} from "react-redux";
import type { RootState } from '../../store/store';
import { addWidget, removeWidget } from '../../store/settingsSlice';
import {useDispatch} from "react-redux";


const Widgets = () => {

    const activeWidgets = useSelector((state: RootState) => state.settings.widgets.active);

    const dispatch = useDispatch();

    const availableWidgets = [
        { id: 'clock', name: 'Analog Clock' },
        { id: 'calendar', name: 'Calendar' }
    ];

    const handleToggleWidget = (type: 'clock' | 'calendar' | 'telemetry') => {
        const existingWidget = activeWidgets.find(w => w.type === type);
        // eslint-disable-next-line react-hooks/purity
        const date = Date.now();
        if (existingWidget) {
            dispatch(removeWidget(existingWidget.id));
        } else {
            dispatch(addWidget({
                id: `widget-${type}-${date}`,
                type,
                x: 60,
                y: 60
            }));
        }
    };

    return (
        <div className="animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6">Desktop Widgets</h2>
            <div className="grid grid-cols-2 gap-4">

                {availableWidgets.map((w) => {
                    const WidgetComponent = widgetMap[w.id];
                    const isActive = activeWidgets.some(active => active.type === w.id);

                    return (
                        <div
                            key={w.id}
                            onClick={() => handleToggleWidget(w.id as "clock" | "calendar" | "telemetry")}
                            className={`rounded-lg border flex flex-col cursor-pointer transition-colors overflow-hidden ${
                                isActive
                                    ? 'bg-blue-600/10 border-blue-500/50'
                                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                            }`}
                        >
                            <div
                                className="h-32 flex items-center justify-center bg-black/20 relative pointer-events-none">
                                <div className="scale-[0.6] origin-center">
                                    {WidgetComponent && <WidgetComponent/>}
                                </div>
                            </div>
                            <div className="p-3 flex justify-between items-center bg-black/40">
                                <span className="text-sm font-medium">{w.name}</span>
                                {isActive ? (<span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">Applied</span>) : (<span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Apply</span>)}
                            </div>
                        </div>
                    );
                })
                }

                </div>
            </div>
    )

}


export default Widgets;