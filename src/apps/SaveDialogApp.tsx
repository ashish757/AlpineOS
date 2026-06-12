import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '../store/store';
import { createFile } from '../store/fileSystemSlice';
import { updateWindowArgs, closeWindow, updateWindowTitle, type WindowState } from '../store/windowSlice';

export const SaveDialogApp = ({ winInfo }: { winInfo: WindowState }) => {
  const dispatch = useDispatch();
  const callerWinId = winInfo.args?.callerWinId;
  const contentToSave = winInfo.args?.contentToSave || '';

  const folders = useSelector((state: RootState) => state.fileSystem.folders);
  
  const [currentFolderId, setCurrentFolderId] = useState('root');
  const [fileName, setFileName] = useState('Untitled.txt');

  const visibleFolders = folders.filter(f => f.parentId === currentFolderId);
  const currentFolder = folders.find(f => f.id === currentFolderId);

  const handleSave = () => {
    if (!fileName.trim()) return;

    const newFileId = crypto.randomUUID();
    const extension = fileName.split('.').pop() || 'txt';

    dispatch(createFile({
      id: newFileId,
      name: fileName,
      parentId: currentFolderId,
      extension: extension,
      content: contentToSave
    }));

    if (callerWinId) {
      dispatch(updateWindowArgs({ id: callerWinId, args: { fileId: newFileId } }));
      dispatch(updateWindowTitle({ id: callerWinId, title: fileName })); 
    }

    dispatch(closeWindow(winInfo.id));
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] text-slate-200">
      <div className="flex items-center gap-2 p-2 border-b border-white/10 bg-[#252526]">
        <button 
          onClick={() => {
            if (currentFolder?.parentId) setCurrentFolderId(currentFolder.parentId);
          }}
          disabled={!currentFolder?.parentId}
          className="px-2 py-1 text-xs bg-white/10 rounded hover:bg-white/20 disabled:opacity-50"
        >
          Up
        </button>
        <span className="text-xs font-mono">{currentFolder?.name || 'root'}</span>
      </div>


      <div className="flex-1 overflow-auto p-2 flex flex-col gap-1">
        {visibleFolders.map(folder => (
          <div 
            key={folder.id}
            onDoubleClick={() => setCurrentFolderId(folder.id)}
            className="flex items-center gap-2 p-1.5 hover:bg-blue-600/30 rounded cursor-pointer select-none"
          >
             <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
             </svg>
            <span className="text-sm">{folder.name}</span>
          </div>
        ))}
        {visibleFolders.length === 0 && (
          <div className="text-xs text-slate-500 italic p-2">Empty folder</div>
        )}
      </div>

      <div className="p-3 border-t border-white/10 bg-[#252526] flex gap-2 items-center">
        <label className="text-xs text-slate-400">Save As:</label>
        <input 
          type="text" 
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          className="flex-1 bg-[#1e1e1e] border border-white/20 rounded px-2 py-1 text-sm outline-none focus:border-blue-500"
        />
        <button 
          onClick={handleSave}
          className="px-4 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-500"
        >
          Save
        </button>
      </div>
    </div>
  );
};