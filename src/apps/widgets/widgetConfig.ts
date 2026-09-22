import ClockWidget from "./ClockWidget.tsx";

export const widgetMap: Record<string, React.ElementType> = {
    'clock': ClockWidget,
    // 'calendar': CalendarWidget,
    // 'telemetry': TelemetryWidget,
};
