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
  const [isMaximized, setIsMaximized] = useState(false);
  
  const dragStartRef = useRef({ mouseX: 0, mouseY: 0, winX: 0, winY: 0 });


  const handleToggleMaximize = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    dispatch(focusApp(info.id)); 
    setIsMaximized(prev => !prev);
  };

  // Sync localPos when info position changes externally (or restores)
  useEffect(() => {
    if (!isDragging) {
      setLocalPos({ x: info.x, y: info.y });
    }
  }, [info.x, info.y, isDragging]);

  const handleDragStart = (e: React.MouseEvent) => {
    if (isMaximized) {
      dispatch(focusApp(info.id));
      return;
    }
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
      if (windowRef.current && isDragging && !isMaximized) {
        const deltaX = e.clientX - dragStartRef.current.mouseX;
        const deltaY = e.clientY - dragStartRef.current.mouseY;
        const rect = windowRef.current.getBoundingClientRect();
        const nextX = dragStartRef.current.winX + deltaX;
        const nextY = dragStartRef.current.winY + deltaY;

        const boundedX = Math.max(0, Math.min(window.innerWidth - rect.width, nextX));
        const boundedY = Math.max(0, Math.min(window.innerHeight - rect.height, nextY));
        setLocalPos({
          x: boundedX,
          y: boundedY,
        });
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (isDragging) {
        setIsDragging(false);
        const deltaX = e.clientX - dragStartRef.current.mouseX;
        const deltaY = e.clientY - dragStartRef.current.mouseY;
        
        // Calculate bounded coordinates for saving to Redux
        const rect = windowRef.current?.getBoundingClientRect();
        const nextX = dragStartRef.current.winX + deltaX;
        const nextY = dragStartRef.current.winY + deltaY;
        const boundedX = rect ? Math.max(0, Math.min(window.innerWidth - rect.width, nextX)) : nextX;
        const boundedY = rect ? Math.max(0, Math.min(window.innerHeight - rect.height, nextY)) : nextY;

        dispatch(moveWindow({
          id: info.id,
          x: boundedX,
          y: boundedY,
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
  }, [isDragging, isMaximized, info.id, dispatch]);

  return (
    <div
      ref={windowRef}
      onMouseDown={() => dispatch(focusApp(info.id))}
      onContextMenu={(e) => {
        // Prevent desktop context menu from showing when right-clicking inside any window
        e.stopPropagation();
        // We do not preventDefault here so that apps can implement their own context menus,
        // or browser default text-selection menus can appear in Textpad if needed.
      }}
      style={{
        left: `${localPos.x}px`,
        top: `${localPos.y}px`,
        zIndex: info.index,
      }}
      className={`absolute flex flex-col bg-slate-900/95 backdrop-blur-md border border-slate-700 shadow-2xl overflow-hidden ring-1 ring-white/10 ${
        isMaximized 
          ? "rounded-none !w-full !h-full !left-0 !top-0" 
          : "w-[600px] h-[400px] rounded-lg resize min-w-[300px] min-h-[200px]"
      }`}
    >
      <div
        onMouseDown={handleDragStart}
        onDoubleClick={handleToggleMaximize}
        className="bg-slate-800/50 px-4 py-2 flex justify-between items-center select-none cursor-pointer border-b border-slate-700/50"
      >
        <span className="text-xs tracking-widest font-bold text-slate-300 uppercase">
          {info.title}
        </span>
        <div className="flex gap-2">
          <button
            onMouseDown={(e) => e.stopPropagation()} 
            onClick={(e) => {
              e.stopPropagation(); 
              dispatch(closeWindow(info.id));
            }}
            className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 focus:outline-none flex items-center justify-center group"
            aria-label="Close"
          >
            <span className="opacity-0 group-hover:opacity-100 text-[8px] text-red-900 leading-none">x</span>
          </button>
          
          <button
            onMouseDown={(e) => e.stopPropagation()} 
            onClick={(e) => {
              e.stopPropagation();
              handleToggleMaximize(e);
            }}
            className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-400 focus:outline-none flex items-center justify-center group"
            aria-label="Maximize"
          >
            <span className="opacity-0 group-hover:opacity-100 text-[8px] text-green-900 leading-none">+</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto text-slate-100 bg-transparent flex flex-col">
        {children}
      </div>
    </div>
  );
});