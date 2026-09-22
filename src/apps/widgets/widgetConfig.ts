import ClockWidget from "./ClockWidget.tsx";
import CalendarWidget from "./CalendarWidget.tsx";

export const widgetMap: Record<string, React.ElementType> = {
    'clock': ClockWidget,
    'calendar': CalendarWidget,
    // 'telemetry': TelemetryWidget,
};
