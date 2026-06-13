import {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import { useFileHandler } from '../hooks/useFileHandler';
import { executeProcess } from '../store/processThunk';
import { useContextMenuTrigger } from './contextMenuUtils';
import { useGlobalDialogs } from './GlobalDialogs';

export const DesktopIcons = () => {
    const {files, folders} = useSelector((state: RootState) => state.fileSystem);
    const dispatch = useDispatch<AppDispatch>();
    const {openFile} = useFileHandler();

    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    
    const attachContextMenu = useContextMenuTrigger();
    const { showRenameDialog, showDeleteDialog } = useGlobalDialogs();

  const handleSelect = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); 
    if (e.ctrlKey || e.metaKey) {
      setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    } else {
      setSelectedIds([id]);
    }
  };


  const handleFolderDoubleClick = (e: React.MouseEvent, folderId: string) => {
    e.stopPropagation();
    dispatch(executeProcess('finder', { startFolderId: folderId }));
  };

  const getItemContextMenu = (id: string, name: string, type: 'file' | 'folder') => attachContextMenu([
    { label: 'Rename', action: () => showRenameDialog(id, name, type) },
    { label: 'Delete', action: () => showDeleteDialog(id, name, type) }
  ]);

    return (
        <div className="absolute top-16 right-4 z-0 flex flex-col gap-4">
            {
                folders.map(folder => folder.parentId === "desk" && (
                    <button 
                      key={folder.id} 
                      onClick={(e) => handleSelect(e, folder.id)} 
                      onDoubleClick={(e) => handleFolderDoubleClick(e, folder.id)}
                      {...getItemContextMenu(folder.id, folder.name, 'folder')}
                      className={`flex w-20 cursor-pointer flex-col items-center gap-1 rounded p-2 transition-colors ${
              selectedIds.includes(folder.id) ? 'bg-blue-500/40 border border-blue-400/50' : 'hover:bg-white/10 border border-transparent'
            }`}>
                        <span className="text-3xl">📁</span>
                        <span className="text-xs text-gray-300 drop-shadow-md">{folder.name}</span>
                    </button>
                ))
            }
            {
                files.map(file => file.parentId === "desk" && (
                    <button 
                      key={file.id} 
                      onClick={(e) => handleSelect(e, file.id)} 
                      onDoubleClick={() => openFile(file.id)} 
                      {...getItemContextMenu(file.id, file.name, 'file')}
                      className={`flex w-20 cursor-pointer flex-col items-center gap-1 rounded p-2 transition-colors ${
              selectedIds.includes(file.id) ? 'bg-blue-500/40 border border-blue-400/50' : 'hover:bg-white/10 border border-transparent'
            }`}>
                        <span className="text-3xl drop-shadow-md">📄</span>
                        <span className="text-xs text-gray-300 drop-shadow-md">{file.name}</span>
                    </button>
                ))
            }
        </div>
    )
}