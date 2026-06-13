import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/store';
import { removeProcess, type Process } from '../store/processSlice';

import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';
import { useTelemetry } from '../hooks/useTelemetry';

import { closeWindow } from '../store/windowSlice';

export const ActivityManagerApp = () => {
  const dispatch = useDispatch();
  const perfData = useTelemetry();
  
  const activeWindows = useSelector((state: RootState) => state.windows.active);
  const activeProcesses = useSelector((state: RootState) => state.processes.active);

  const killProcess = (pid: string) => {
    dispatch(removeProcess(pid));
    const wid = activeWindows.find(w => w.processId === pid)?.id;
    dispatch(closeWindow(wid || ""));
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] text-slate-300 font-mono text-xs">
      <div className="flex h-32 border-b border-slate-700/50">
        <div className="flex-1 p-2 border-r border-slate-700/50 flex flex-col">
          <span className="text-blue-400 mb-1">CPU Usage</span>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={perfData}>
                <YAxis domain={[0, 100]} hide />
                <Line type="monotone" dataKey="ram" stroke="#c084fc" strokeWidth={2} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="flex-1 p-2 flex flex-col">
          <span className="text-purple-400 mb-1">Memory Allocation</span>
          <div className="flex-1">
         <ResponsiveContainer width="100%" height="100%">
              <LineChart data={perfData}>
                <YAxis domain={[0, 100]} hide />
                <Line type="monotone" dataKey="cpu" stroke="#60a5fa" strokeWidth={2} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-[#252526] shadow-md">
            <tr>
              <th className="p-2 font-semibold">PID</th>
              <th className="p-2 font-semibold">Process Name</th>
              <th className="p-2 font-semibold">Status</th>
              <th className="p-2 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {activeProcesses.map((process: Process) => (
              <tr key={process.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                <td className="p-2 text-slate-500">{process.id.substring(0, 8)}</td>
                <td className="p-2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  {process.title}
                </td>
                <td className="p-2">Running</td>
                <td className="p-2 text-right">
                  <button 
                    onClick={() => killProcess(process.id)}
                    className="px-2 py-1 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                  >
                    End Task
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-2 bg-[#007acc] text-white flex justify-between">
        <span>Processes: {activeProcesses.length}</span>
        <span>Threads: {activeWindows.length * 2 + 14}</span>
      </div>
    </div>
  );
};