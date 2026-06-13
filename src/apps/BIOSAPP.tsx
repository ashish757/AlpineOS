import  { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPowerState } from '../store/systemSlice';


const bootLogs = [
  "Allocating virtual memory space (DOM Heap)... [OK]",
  "Verifying browser sandbox constraints... [SECURE]",
  "Initializing WebGL rendering context... [OK]",
  "Mapping keyboard event listeners... [OK]",
  "Mounting Virtual File System (localForage adapter)... [OK]",
  "Scanning sector blocks for corrupted files... [CLEAN]",
  "Verifying file hierarchy integrity... 100%",
  "Registering MIME types and file extensions... [OK]",
  "Loading Redux State Container... [OK]",
  "Hydrating system configuration from persistent storage... [OK]",
  "Wiping volatile RAM (Clearing active windows)... [OK]",
  "Initializing Inter-Process Communication (IPC) daemon... [OK]",
  "Bootstrapping React Virtual DOM... [OK]",
  "Starting Window Manager ... [OK]",
  "Starting Process Manager registry... [OK]",
  "Establishing Context Menu global listeners... [OK]",
  "Applying system theme constraints... [OK]",
  "System check complete. Zero kernel panics.",
    "System ready. Launching desktop environment..."
];

export const BIOSAPP = () => {
  const dispatch = useDispatch();
  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex < bootLogs.length) {
        setVisibleLogs(prev => [...prev, bootLogs[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(intervalId);
        setTimeout(() => {
          dispatch(setPowerState('ON'));
        }, 800);
      }
    }, 300);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  return (
    <div className="fixed inset-0 z-[99999] bg-black text-green-500 font-mono text-sm p-4 flex flex-col ">
      {visibleLogs.map((log, index) => (
        <div key={index}>{log}</div>
      ))}
      <div className="animate-pulse mt-1">_</div>
    </div>
  );
};