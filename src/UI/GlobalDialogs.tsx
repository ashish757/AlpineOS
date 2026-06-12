import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { RenameDialog } from './RenameDialog';
import { ConfirmDialog } from './ConfirmDialog';
import { rename, deleteFile, deleteFolder } from '../store/fileSystemSlice';

interface GlobalDialogContextType {
  showRenameDialog: (id: string, name: string, type: 'file' | 'folder') => void;
  showDeleteDialog: (id: string, name: string, type: 'file' | 'folder') => void;
}

const GlobalDialogContext = createContext<GlobalDialogContextType | undefined>(undefined);

export const useGlobalDialogs = () => {
  const context = useContext(GlobalDialogContext);
  if (!context) throw new Error("useGlobalDialogs must be used within GlobalDialogsProvider");
  return context;
};

export const GlobalDialogsProvider = ({ children }: { children: ReactNode }) => {
  const dispatchAction = useDispatch();

  const [actionItem, setActionItem] = useState<{ id: string, name: string, type: 'file' | 'folder' } | null>(null);
  const [showRename, setShowRename] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const showRenameDialog = (id: string, name: string, type: 'file' | 'folder') => {
    setActionItem({ id, name, type });
    setShowRename(true);
  };

  const showDeleteDialog = (id: string, name: string, type: 'file' | 'folder') => {
    setActionItem({ id, name, type });
    setShowDelete(true);
  };

  const handleRenameConfirm = (newName: string) => {
    if (actionItem && newName.trim()) {
      dispatchAction(rename({ id: actionItem.id, newName: newName.trim() }));
    }
    setShowRename(false);
    setActionItem(null);
  };

  const handleDeleteConfirm = () => {
    if (actionItem) {
      if (actionItem.type === 'file') {
        dispatchAction(deleteFile({ id: actionItem.id } as any));
      } else {
        dispatchAction(deleteFolder({ id: actionItem.id } as any));
      }
    }
    setShowDelete(false);
    setActionItem(null);
  };

  return (
    <GlobalDialogContext.Provider value={{ showRenameDialog, showDeleteDialog }}>
      {children}
      {actionItem && (
        <RenameDialog 
          isOpen={showRename} 
          initialName={actionItem.name} 
          onConfirm={handleRenameConfirm} 
          onCancel={() => { setShowRename(false); setActionItem(null); }} 
        />
      )}
      {actionItem && (
        <ConfirmDialog 
          isOpen={showDelete} 
          title="Delete Item"
          message={`Are you sure you want to delete "${actionItem.name}"? This action cannot be undone.`}
          onConfirm={handleDeleteConfirm} 
          onCancel={() => { setShowDelete(false); setActionItem(null); }} 
        />
      )}
    </GlobalDialogContext.Provider>
  );
};
