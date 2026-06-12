import React, { useState, useRef, useEffect, memo } from "react";
import { useDispatch } from "react-redux";
import { closeWindow, focusApp } from "../store/windowSlice"; 
import type { WindowState } from "../store/windowSlice";

interface WindowProps {
  info: WindowState;
}

export const Window = memo(({info}: WindowProps) => {
  const dispatch = useDispatch();
  const windowRef = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState({ x: 150, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleDragStart = (e: React.MouseEvent) => {
    dispatch(focusApp(info.id));
    setIsDragging(true);
    
    if (windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  return (
    <div
      ref={windowRef}
      onMouseDown={() => dispatch(focusApp(info.id))}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: info.index,
      }}
      className="absolute w-[600px] h-[400px] flex flex-col bg-slate-900/95 backdrop-blur-md border border-slate-700 rounded-lg shadow-2xl overflow-hidden ring-1 ring-white/10"
    >
      <div
        onMouseDown={handleDragStart}
        className="bg-slate-800/50 px-4 py-2 flex justify-between items-center select-none cursor-move border-b border-slate-700/50"
      >
        <span className="text-xs tracking-widest font-bold text-slate-300 uppercase">
          {info.title}
        </span>
        <div className="flex gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation(); 
              dispatch(closeWindow(info.id));
            }}
            className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 focus:outline-none"
            aria-label="Close"
          />
        </div>
      </div>

      <div className="flex-1 p-4 overflow-auto text-slate-100 bg-transparent">
        {React.createElement(info.component)}
      </div>
    </div>
  );
});