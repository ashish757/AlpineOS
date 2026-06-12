import {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import { useFileHandler } from '../hooks/useFileHandler';
import { executeProcess } from '../store/processThunk';

export const DesktopIcons = () => {
    const {files, folders} = useSelector((state: RootState) => state.fileSystem);
    const dispatch = useDispatch<AppDispatch>();
    const {openFile} = useFileHandler();

    const [selectedIds, setSelectedIds] = useState<string[]>([]);

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

    return (
        <div className="absolute top-16 right-4 z-10 flex flex-col gap-4">
            {
                folders.map(folder => folder.parentId === "desk" && (
                    <button onClick={(e) => handleSelect(e, folder.id)} key={folder.id}  onDoubleClick={(e) => handleFolderDoubleClick(e, folder.id)}
                    className={`flex w-20 cursor-pointer flex-col items-center gap-1 rounded p-2 transition-colors ${
            selectedIds.includes(folder.id) ? 'bg-blue-500/40 border border-blue-400/50' : 'hover:bg-white/10 border border-transparent'
          }`}>
                        <span className="text-3xl">📁</span>
                        <span className="text-xs  text-gray-300">{folder.name}</span>
                    </button>
                ))
            }
            {
                files.map(file => file.parentId === "desk" && (
                    <button onClick={(e) => handleSelect(e, file.id)} onDoubleClick={() => openFile(file.id)} key={file.id} className={`flex w-20 cursor-pointer flex-col items-center gap-1 rounded p-2 transition-colors ${
            selectedIds.includes(file.id) ? 'bg-blue-500/40 border border-blue-400/50' : 'hover:bg-white/10 border border-transparent'
          }`}>
                        <span className="text-3xl">📄</span>
                        <span className="text-xs  text-gray-300">{file.name}</span>
                    </button>
                ))
            }
        </div>
    )
}