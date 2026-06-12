import React, { useState, useEffect, useRef } from 'react';

interface RenameDialogProps {
  isOpen: boolean;
  initialName: string;
  onConfirm: (newName: string) => void;
  onCancel: () => void;
}

export const RenameDialog: React.FC<RenameDialogProps> = ({ isOpen, initialName, onConfirm, onCancel }) => {
  const [name, setName] = useState(initialName);
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);

  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setName(initialName);
    }
  }

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      const timeoutId = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          const dotIndex = initialName.lastIndexOf('.');
          if (dotIndex > 0) {
            inputRef.current.setSelectionRange(0, dotIndex);
          } else {
            inputRef.current.select();
          }
        }
      }, 50);
      
      return () => clearTimeout(timeoutId);
    }
  }, [isOpen, initialName]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onMouseDown={onCancel}
    >
      <div 
        className="bg-[#252526] border border-white/10 rounded-lg shadow-2xl p-4 w-72 flex flex-col gap-3" 
        onMouseDown={e => e.stopPropagation()}
      >
        <h3 className="text-slate-200 font-semibold text-sm">Rename</h3>
        <input
          ref={inputRef}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onConfirm(name);
            if (e.key === 'Escape') onCancel();
          }}
          className="w-full bg-[#1e1e1e] border border-blue-500/50 rounded px-2 py-1 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
        />
        <div className="flex justify-end gap-2 mt-1">
          <button
            onClick={onCancel}
            className="px-3 py-1 rounded text-xs font-medium text-slate-300 hover:bg-white/10 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(name)}
            className="px-3 py-1 rounded text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white transition-colors shadow-sm"
          >
            Rename
          </button>
        </div>
      </div>
    </div>
  );
};