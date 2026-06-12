
import { openFolder, navigateBack, navigateForward, selectItems } from '../store/finderSlice';
import {useDispatch, useSelector} from 'react-redux';
import { type RootState } from '../store/store';

export const FinderApp = () => {
    const dispatchAction = useDispatch();
    const fileSystemState = useSelector((state: RootState) => state.fileSystem);
    const finderState = useSelector((state: RootState) => state.finder);

    const currentFolderContents = {
    folders: fileSystemState.folders.filter(
      (folderItem) => folderItem.parentId === finderState.folderId
    ),
    files: fileSystemState.files.filter(
      (fileItem) => fileItem.parentId === finderState.folderId
    ),
  };

  const currentFolderDetails = fileSystemState.folders.find(
    (folderItem) => folderItem.id === finderState.folderId
  );

 const isBackButtonDisabled = finderState.position === 0;
  const isForwardButtonDisabled = finderState.position === finderState.history.length - 1;

  const handleItemSelection = (mouseEvent: React.MouseEvent, targetItemId: string) => {
    mouseEvent.stopPropagation();
    
    if (mouseEvent.ctrlKey || mouseEvent.metaKey) {
      const isItemAlreadySelected = finderState.selectedIds.includes(targetItemId);
      const updatedSelectionArray = isItemAlreadySelected
        ? finderState.selectedIds.filter((selectedId) => selectedId !== targetItemId)
        : [...finderState.selectedIds, targetItemId];
      
      dispatchAction(selectItems(updatedSelectionArray));
    } else {
      dispatchAction(selectItems([targetItemId]));
    }
  };
    return (
    <div 
      className="flex h-full w-full flex-col bg-slate-900 text-slate-200" 
    >
      <div className="flex items-center gap-4 border-b border-slate-700 bg-slate-800 px-4 py-2">
        <div className="flex gap-2">
          <button
            onClick={() => dispatchAction(navigateBack())}
            disabled={isBackButtonDisabled}
            className={`rounded px-3 py-1 text-sm font-medium transition-colors ${
              isBackButtonDisabled 
                ? "text-slate-600 cursor-not-allowed" 
                : "text-slate-300 hover:bg-slate-700"
            }`}
          >
            Back
          </button>
          <button
            onClick={() => dispatchAction(navigateForward())}
            disabled={isForwardButtonDisabled}
            className={`rounded px-3 py-1 text-sm font-medium transition-colors ${
              isForwardButtonDisabled 
                ? "text-slate-600 cursor-not-allowed" 
                : "text-slate-300 hover:bg-slate-700"
            }`}
          >
            Forward
          </button>
        </div>
        <div className="flex-1 text-sm font-semibold tracking-wide text-slate-300">
          {currentFolderDetails ? currentFolderDetails.name : "Unknown Location"}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-48 border-r border-slate-700 bg-slate-800/50 p-3">
          <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-500">
            Favorites
          </h3>
          <div
            onClick={(clickEvent) => {
              clickEvent.stopPropagation();
              dispatchAction(openFolder("root"));
            }}
            className={`cursor-pointer rounded px-3 py-2 text-sm transition-colors ${
              finderState.folderId === "root" 
                ? "bg-blue-600/30 text-blue-400 font-medium" 
                : "text-slate-400 hover:bg-slate-700 hover:text-slate-200"
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
                  onClick={(clickEvent) => handleItemSelection(clickEvent, folderItem.id)}
                  onDoubleClick={(clickEvent) => {
                    clickEvent.stopPropagation();
                    dispatchAction(openFolder(folderItem.id));
                  }}
                  className={`group flex cursor-pointer flex-col items-center rounded-lg p-3 transition-all ${
                    finderState.selectedIds.includes(folderItem.id) 
                      ? "bg-blue-600/40 ring-1 ring-blue-500" 
                      : "hover:bg-slate-700/50"
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
                  onClick={(clickEvent) => handleItemSelection(clickEvent, fileItem.id)}
                  className={`group flex cursor-pointer flex-col items-center rounded-lg p-3 transition-all ${
                    finderState.selectedIds.includes(fileItem.id) 
                      ? "bg-blue-600/40 ring-1 ring-blue-500" 
                      : "hover:bg-slate-700/50"
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