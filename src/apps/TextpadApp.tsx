import { useEffect, useState } from 'react';
import { type WindowState, updateWindowTitle } from '../store/windowSlice';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/store';
import { updateFileContent } from '../store/fileSystemSlice';

export const TextpadApp = ({winInfo} : {winInfo: WindowState}) => {
  const fileId = winInfo.args?.fileId;
  const dispatch = useDispatch();

  const fileData = useSelector((state: RootState) => state.fileSystem.files.find(file => file.id === fileId));

  const [content, setContent] = useState(fileData?.content || '');
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    if (winInfo.id) {
      const baseTitle = fileData ? fileData.name : 'txt';
      const newTitle = isModified ? `${baseTitle} (unsaved)` : baseTitle;
      dispatch(updateWindowTitle({id: winInfo.id, title: newTitle}));
    }
  }, [isModified, fileData, winInfo.id, dispatch]);

  const handleSave = () => {
    if(fileId) {
      dispatch(updateFileContent({id: fileId, content}));
      setIsModified(false);
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      handleSave();
    }
  }

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