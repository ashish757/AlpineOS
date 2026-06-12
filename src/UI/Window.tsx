import React, { useState, useRef, useEffect, memo } from "react";
import { useDispatch } from "react-redux";
import { closeWindow, focusApp, moveWindow } from "../store/windowSlice"; 
import type { WindowState } from "../store/windowSlice";

interface WindowProps {
  info: WindowState;
  children: React.ReactNode;
}

export const Window = memo(({info, children}: WindowProps) => {
  const dispatch = useDispatch();
  const windowRef = useRef<HTMLDivElement>(null);

  const [localPos, setLocalPos] = useState({ x: info.x, y: info.y });
  const [isDragging, setIsDragging] = useState(false);
  
  const dragStartRef = useRef({ mouseX: 0, mouseY: 0, winX: 0, winY: 0 });

  useEffect(() => {
    if (!isDragging) {
      setLocalPos({ x: info.x, y: info.y });
    }
  }, [info.x, info.y, isDragging]);

  const handleDragStart = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    dispatch(focusApp(info.id));
    setIsDragging(true);
    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      winX: localPos.x,
      winY: localPos.y,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - dragStartRef.current.mouseX;
        const deltaY = e.clientY - dragStartRef.current.mouseY;
        setLocalPos({
          x: dragStartRef.current.winX + deltaX,
          y: dragStartRef.current.winY + deltaY,
        });
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (isDragging) {
        setIsDragging(false);
        const deltaX = e.clientX - dragStartRef.current.mouseX;
        const deltaY = e.clientY - dragStartRef.current.mouseY;
        dispatch(moveWindow({
          id: info.id,
          x: dragStartRef.current.winX + deltaX,
          y: dragStartRef.current.winY + deltaY,
        }));
      }
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
  }, [isDragging, info.id, dispatch]);

  return (
    <div
      ref={windowRef}
      onMouseDown={() => dispatch(focusApp(info.id))}
      style={{
        left: `${localPos.x}px`,
        top: `${localPos.y}px`,
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
            onMouseDown={(e) => e.stopPropagation()} 
            onClick={(e) => {
              e.stopPropagation(); 
              dispatch(closeWindow(info.id));
            }}
            className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 focus:outline-none"
            aria-label="Close"
          />
        </div>
      </div>

      <div className="flex-1 p-4 overflow-auto text-slate-100 bg-transparent flex flex-col">
        {children}
      </div>
    </div>
  );
});