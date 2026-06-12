import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '../store/store';
import { createFolder, createFile } from '../store/fileSystemSlice';

export const FinderApp = ({ windowId }: { windowId?: string }) => {
  const dispatchAction = useDispatch();
  const fileSystemState = useSelector((state: RootState) => state.fileSystem);

  const [history, setHistory] = useState<string[]>(['root']);
  const [position, setPosition] = useState(0);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  const folderId = history[position];

  const currentFolderContents = {
    folders: fileSystemState.folders.filter((f) => f.parentId === folderId),
    files: fileSystemState.files.filter((f) => f.parentId === folderId),
  };

  const currentFolderDetails = fileSystemState.folders.find((f) => f.id === folderId);

  const isBackButtonDisabled = position === 0;
  const isForwardButtonDisabled = position === history.length - 1;

  const navigateBack = () => {
    if (position > 0) {
      setPosition(p => p - 1);
      setSelectedIds([]);
    }
  };

  const navigateForward = () => {
    if (position < history.length - 1) {
      setPosition(p => p + 1);
      setSelectedIds([]);
    }
  };

  const openFolder = (id: string) => {
    setHistory(prev => {
      const newHistory = prev.slice(0, position + 1);
      newHistory.push(id);
      return newHistory;
    });
    setPosition(p => p + 1);
    setSelectedIds([]);
  };

  const handleItemSelection = (mouseEvent: React.MouseEvent, targetItemId: string) => {
    mouseEvent.stopPropagation();
    if (mouseEvent.ctrlKey || mouseEvent.metaKey) {
      setSelectedIds(prev => prev.includes(targetItemId) 
        ? prev.filter(id => id !== targetItemId) 
        : [...prev, targetItemId]
      );
    } else {
      setSelectedIds([targetItemId]);
    }
  };

  const handleNewFolder = () => {
    const name = prompt('Enter folder name:', 'New Folder');
    if (name) {
      dispatchAction(createFolder({
        id: crypto.randomUUID(),
        name,
        parentId: folderId,
      }));
    }
  };

  const handleNewFile = () => {
    const name = prompt('Enter file name:', 'New File.txt');
    if (name) {
      dispatchAction(createFile({
        id: crypto.randomUUID(),
        name,
        parentId: folderId,
        extension: name.split('.').pop() || '',
        content: '',
      }));
    }
  };

  return (
    <div className="flex h-full w-full flex-col bg-slate-900 text-slate-200" onClick={() => setSelectedIds([])}>
      <div className="flex items-center gap-4 border-b border-slate-700 bg-slate-800 px-4 py-2">
        <div className="flex gap-2">
          <button
            onClick={navigateBack}
            disabled={isBackButtonDisabled}
            className={`rounded px-3 py-1 text-sm font-medium transition-colors ${
              isBackButtonDisabled ? "text-slate-600 cursor-not-allowed" : "text-slate-300 hover:bg-slate-700"
            }`}
          >
            Back
          </button>
          <button
            onClick={navigateForward}
            disabled={isForwardButtonDisabled}
            className={`rounded px-3 py-1 text-sm font-medium transition-colors ${
              isForwardButtonDisabled ? "text-slate-600 cursor-not-allowed" : "text-slate-300 hover:bg-slate-700"
            }`}
          >
            Forward
          </button>
        </div>
        <div className="flex-1 text-sm font-semibold tracking-wide text-slate-300">
          {currentFolderDetails ? currentFolderDetails.name : "Unknown Location"}
        </div>
        <div className="flex gap-2">
           <button onClick={handleNewFolder} className="rounded px-3 py-1 text-sm font-medium transition-colors text-blue-400 hover:bg-slate-700">
             + Folder
           </button>
           <button onClick={handleNewFile} className="rounded px-3 py-1 text-sm font-medium transition-colors text-green-400 hover:bg-slate-700">
             + File
           </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-48 border-r border-slate-700 bg-slate-800/50 p-3">
          <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-500">
            Favorites
          </h3>
          <div
            onClick={(e) => { e.stopPropagation(); openFolder("root"); }}
            className={`cursor-pointer rounded px-3 py-2 text-sm transition-colors ${
              folderId === "root" ? "bg-blue-600/30 text-blue-400 font-medium" : "text-slate-400 hover:bg-slate-700 hover:text-slate-200"
            }`}
          >
            Root Directory
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4">
          {currentFolderContents.folders.length === 0 && currentFolderContents.files.length === 0 ? (
            <div className="flex h-full items-center justify-center text-sm text-slate-500">
              This folder is empty.
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8">
              {currentFolderContents.folders.map((folderItem) => (
                <div
                  key={folderItem.id}
                  onClick={(e) => handleItemSelection(e, folderItem.id)}
                  onDoubleClick={(e) => { e.stopPropagation(); openFolder(folderItem.id); }}
                  className={`group flex cursor-pointer flex-col items-center rounded-lg p-3 transition-all ${
                    selectedIds.includes(folderItem.id) ? "bg-blue-600/40 ring-1 ring-blue-500" : "hover:bg-slate-700/50"
                  }`}
                >
                  <div className="mb-2 text-blue-400 drop-shadow-md">
                    <svg className="h-12 w-12" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                    </svg>
                  </div>
                  <span className="w-full truncate text-center text-xs font-medium text-slate-300">
                    {folderItem.name}
                  </span>
                </div>
              ))}

              {currentFolderContents.files.map((fileItem) => (
                <div
                  key={fileItem.id}
                  onClick={(e) => handleItemSelection(e, fileItem.id)}
                  className={`group flex cursor-pointer flex-col items-center rounded-lg p-3 transition-all ${
                    selectedIds.includes(fileItem.id) ? "bg-blue-600/40 ring-1 ring-blue-500" : "hover:bg-slate-700/50"
                  }`}
                >
                  <div className="mb-2 text-slate-400 drop-shadow-md transition-colors group-hover:text-slate-300">
                    <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="w-full truncate text-center text-xs font-medium text-slate-300">
                    {fileItem.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};