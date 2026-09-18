import { useEffect, useState, useRef } from 'react';
import { type WindowState, closeWindow, updateWindowTitle } from '../store/windowSlice';
import { removeProcess } from '../store/processSlice';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import { updateFileContent } from '../store/fileSystemSlice';
import { executeProcess } from '../store/processThunk';

export const TextpadApp = ({ winInfo }: { winInfo: WindowState }) => {
  const fileId = winInfo.args?.fileId;
  const dispatch = useDispatch<AppDispatch>();

  const fileData = useSelector((state: RootState) =>
      state.fileSystem.files.find(file => file.id === fileId)
  );

  const [content, setContent] = useState(fileData?.content || '');
  const [isModified, setIsModified] = useState(false);

  // 1. Store mutable state in refs to bypass stale closures in the IPC listener
  const contentRef = useRef(content);
  const isModifiedRef = useRef(isModified);
  const isProcessingSignalRef = useRef(false);

  useEffect(() => {
    contentRef.current = content;
    isModifiedRef.current = isModified;
  }, [content, isModified]);

  // 2. Depend on primitive values (fileData?.name) rather than objects to prevent re-renders
  useEffect(() => {
    if (winInfo.id) {
      const baseTitle = fileData?.name || 'txt';
      const newTitle = isModified ? `${baseTitle} (unsaved)` : baseTitle;
      dispatch(updateWindowTitle({ id: winInfo.id, title: newTitle }));
    }
  }, [isModified, fileData?.name, winInfo.id, dispatch]);

  const handleSave = () => {
    const currentContent = contentRef.current;
    if (fileId) {
      dispatch(updateFileContent({ id: fileId, content: currentContent }));
      setIsModified(false);
    } else {
      dispatch(executeProcess('saveDialog', { callerWinId: winInfo.id, contentToSave: currentContent }));
    }
  };

  // 3. The IPC Listener: Strictly bound to the closingSignal with a safeguard
  useEffect(() => {
    if (winInfo.closingSignal === "SIGTERM" && !isProcessingSignalRef.current) {
      isProcessingSignalRef.current = true; // Lock to prevent loops

      if (isModifiedRef.current) {
        handleSave();
      }
        dispatch(closeWindow(winInfo.id));
        dispatch(removeProcess(winInfo.processId));

    }
    if (!winInfo.closingSignal) {
      isProcessingSignalRef.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winInfo.closingSignal]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      handleSave();
    }
  };

  return (
      <div className="flex flex-col h-full bg-white text-black">
      <textarea
          onKeyDown={handleKeyDown}
          className="flex-1 text-xl w-full p-2 resize-none outline-none"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            setIsModified(true);
          }}
      />
      </div>
  );
};

export default TextpadApp;