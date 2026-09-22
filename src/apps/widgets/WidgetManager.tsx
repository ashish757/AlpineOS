import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store';
import { updateWidgetPosition } from '../../store/settingsSlice';
import type { Widget } from '../../store/settingsSlice';
import ClockWidget from './ClockWidget';

const widgetMap: Record<string, React.ElementType> = {
    'clock': ClockWidget,
    // 'calendar': CalendarWidget,
    // 'telemetry': TelemetryWidget,
};

const DraggableWidget = ({ widget, children }: { widget: Widget, children: React.ReactNode }) => {
    const dispatch = useDispatch();
    const [isDragging, setIsDragging] = useState(false);
    const [localPos, setLocalPos] = useState({ x: widget.x, y: widget.y });
    const dragStartRef = useRef({ mouseX: 0, mouseY: 0, startX: 0, startY: 0 });

    useEffect(() => {
        if (!isDragging) setLocalPos({ x: widget.x, y: widget.y });
    }, [widget.x, widget.y, isDragging]);

    const handleMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsDragging(true);
        dragStartRef.current = {
            mouseX: e.clientX,
            mouseY: e.clientY,
            startX: localPos.x,
            startY: localPos.y,
        };
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging) {
                const dx = e.clientX - dragStartRef.current.mouseX;
                const dy = e.clientY - dragStartRef.current.mouseY;
                setLocalPos({
                    x: dragStartRef.current.startX + dx,
                    y: dragStartRef.current.startY + dy,
                });
            }
        };

        const handleMouseUp = () => {
            if (isDragging) {
                setIsDragging(false);
                dispatch(updateWidgetPosition({ id: widget.id, x: localPos.x, y: localPos.y }));
            }
        };

        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, localPos.x, localPos.y, widget.id, dispatch]);

    return (
        <div
            onMouseDown={handleMouseDown}
            className={`absolute pointer-events-auto ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            style={{ left: `${localPos.x}px`, top: `${localPos.y}px` }}
        >
            <div className="pointer-events-none select-none">
                {children}
            </div>
        </div>
    );
};

export const WidgetManager = () => {
    const activeWidgets = useSelector((state: RootState) => state.settings.widgets.active);

    return (
        <div className="absolute inset-0 pointer-events-none z-[5]">
            {activeWidgets.length > 0 && activeWidgets.map((widget) => {
                const WidgetComponent = widgetMap[widget.type];
                if (!WidgetComponent) return null;

                return (
                    <DraggableWidget key={widget.id} widget={widget}>
                        <WidgetComponent />
                    </DraggableWidget>
                );
            })}
        </div>
    );
};