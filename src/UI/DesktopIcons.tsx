
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

export const DesktopIcons = () => {
    const {files, folders} = useSelector((state: RootState) => state.fileSystem);
    return (
        <div className="absolute top-16 right-4 z-10 flex flex-col gap-4">
            {
                folders.map(folder => folder.parentId === "desk" && (
                    <button key={folder.id} className="flex flex-col items-center gap-1">
                        <span className="text-3xl">📁</span>
                        <span className="text-xs  text-gray-300">{folder.name}</span>
                    </button>
                ))
            }
            {
                files.map(file => file.parentId === "desk" && (
                    <button key={file.id} className="flex flex-col items-center gap-1">
                        <span className="text-3xl">📄</span>
                        <span className="text-xs  text-gray-300">{file.name}</span>
                    </button>
                ))
            }
        </div>
    )
}