import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPowerState } from '../store/systemSlice';

const bootLogs = [
  "Initializing Alpine OS Web Kernel v1.0.0...",
  "Verifying Host Environment: [Blink / V8 Engine]... [OK]",
  "Querying available DOM Heap space... [OK]",
  "Requesting persistent storage quota... [GRANTED]",
  "Establishing Web Workers thread pool... [OK]",
  "Allocating ArrayBuffer for fast memory access... 256MB",
  "Initializing WebGL rendering context... [OK]",
  "Compiling WebAssembly subroutines... [OK]",
  "Mapping hardware keyboard event listeners... [OK]",
  "Mapping pointer and touch event listeners... [OK]",
  "Checking screen resolution constraints... [OK]",
  "Setting up virtual display buffer... [OK]",
  "Enabling high-performance GPU rendering... [OK]",
  "Verifying browser sandbox security policies... [SECURE]",
  "Initializing cryptography subsystem (SubtleCrypto)... [OK]",
  "Connecting to IndexedDB backend... [OK]",
  "Mounting localForage adapter for FS persistence... [OK]",
  "Checking virtual file system integrity... [OK]",
  "Verifying superblock header... [OK]",
  "Scanning inodes for corruption... [CLEAN]",
  "Rebuilding directory tree from persistent state... [OK]",
  "Mounting root partition ('/')... [OK]",
  "Mounting user space partition ('/home/user')... [OK]",
  "Mounting system binaries ('/bin')... [OK]",
  "Mounting configuration files ('/etc')... [OK]",
  "Mounting temporary storage ('/tmp')... [OK]",
  "Registering MIME types and file extensions... [OK]",
  "Registering execution handler for '.txt' -> Textpad... [OK]",
  "Registering execution handler for '.img' -> ImagePreview... [OK]",
  "Registering execution handler for '.app' -> Executable... [OK]",
  "Indexing desktop shortcut paths... [OK]",
  "Verifying read/write file permissions... [OK]",
  "Loading Redux State Container... [OK]",
  "Hydrating state slices from localForage... [OK]",
  "Hydrating 'systemSlice'... [OK]",
  "Hydrating 'fileSystemSlice'... [OK]",
  "Hydrating 'windowSlice'... [OK]",
  "Wiping volatile RAM (Clearing active windows)... [OK]",
  "Resetting Z-index arbiter... [OK]",
  "Initializing Inter-Process Communication (IPC) daemon... [OK]",
  "Starting IPC message broker... [OK]",
  "Establishing pub/sub channels for application events... [OK]",
  "Starting System Clock daemon... [OK]",
  "Bootstrapping React Virtual DOM... [OK]",
  "Rendering OS Context Providers... [OK]",
  "Starting Context Menu global listener... [OK]",
  "Starting Window Manager (WM)... [OK]",
  "Initializing window drag-and-drop collision engine... [OK]",
  "Initializing window resize handles... [OK]",
  "Starting Taskbar service... [OK]",
  "Starting Dynamic Menu Bar service... [OK]",
  "Starting Desktop Icon Grid engine... [OK]",
  "Starting Process Manager registry... [OK]",
  "Scanning registered applications... [OK]",
  "Pre-loading Finder UI assets... [OK]",
  "Pre-loading Textpad UI assets... [OK]",
  "Pre-loading Terminal UI assets... [OK]",
  "Pre-loading System Settings UI assets... [OK]",
  "Applying system theme constraints (Dark Mode)... [OK]",
  "Applying desktop wallpaper configuration... [OK]",
  "Initializing Network Manager... [OK]",
  "Pinging external API gateways... [OK]",
  "Establishing WebSocket listeners... [SKIPPED]",
  "Checking for OS updates... [UP TO DATE]",
  "Loading user preferences... [OK]",
  "Applying custom cursor geometries... [OK]",
  "Initializing audio subsystem (Web Audio API)... [OK]",
  "Loading system notification sounds... [OK]",
  "Starting Notification Center daemon... [OK]",
  "Starting global clipboard listener... [OK]",
  "Verifying native drag-and-drop API capabilities... [OK]",
  "Mounting file upload dropzone overlay... [OK]",
  "Starting Garbage Collector watchdogs... [OK]",
  "Purging orphaned file handles... [OK]",
  "Optimizing Redux state tree... [OK]",
  "Checking battery status API... [AC POWER]",
  "Checking network connection status... [ONLINE]",
  "Synchronizing system time via NTP... [OK]",
  "Locking kernel modules... [OK]",
  "Securing user space boundaries... [OK]",
  "Starting background sync service... [OK]",
  "Executing startup scripts... [OK]",
  "Reading '/etc/rc.local'... [OK]",
  "Mounting external volumes... [NONE DETECTED]",
  "Clearing temporary caches... [OK]",
  "Preparing desktop environment... [OK]",
  "Rendering wallpaper layer... [OK]",
  "Rendering desktop icons layer... [OK]",
  "Rendering taskbar layer... [OK]",
  "Rendering dynamic menu bar layer... [OK]",
  "Attaching mouse down global interceptors... [OK]",
  "Attaching key down global interceptors... [OK]",
  "Validating final DOM structure... [OK]",
  "Enabling user input... [OK]",
  "Finalizing boot sequence... [OK]",
  "Alpine OS v1.0.0 successfully loaded.",
  "System check complete. Zero kernel panics.",
  "Welcome to Alpine OS."
];

export const BootupApp = () => {
  const dispatch = useDispatch();
  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(bottomRef.current) {
      bottomRef.current.scrollTop = bottomRef.current.scrollHeight;
    }
  }, [visibleLogs]);

  useEffect(() => {
    let currentIdx = 0;
    let timerId: ReturnType<typeof setTimeout>;

    const showNextLog = () => {
      if (currentIdx < bootLogs.length) {
        currentIdx++;
        setVisibleLogs(bootLogs.slice(0, currentIdx));

        const wait = Math.floor(Math.random() * 70) + 50;
        const isHeavy = Math.random() < 0.1;

        timerId = setTimeout(showNextLog, isHeavy ? 0 : wait);
      } else {
        const audio = new Audio('/startup.mp3');
        audio.volume = 0.8;
        audio.play().catch(() => {});

        timerId = setTimeout(() => {
          dispatch(setPowerState('ON'));
        }, 150);
      }
    };

    timerId = setTimeout(showNextLog, 400);

    return () => clearTimeout(timerId);
  }, [dispatch]);

  return (
    <div ref={bottomRef} className="no-scrollbar scrollbar-hidden fixed inset-0 z-[99999] bg-black text-green-500 font-mono text-sm p-4 flex flex-col overflow-y-auto">
      {visibleLogs.map((log, index) => (
        <div key={index}>{log}</div>
      ))}
      <div className="animate-pulse mt-1">
        _
      </div>
    </div>
  );
};