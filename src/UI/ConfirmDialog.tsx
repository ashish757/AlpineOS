import React, { useEffect, useRef } from 'react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ isOpen, title, message, onConfirm, onCancel }) => {
  const cancelBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        cancelBtnRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="bg-[#252526] border border-white/10 rounded-lg shadow-2xl p-4 w-80 flex flex-col gap-3" onClick={e => e.stopPropagation()}>
          <h3 className="text-slate-200 font-semibold text-sm">{title}</h3>
          <p className="text-slate-400 text-xs leading-relaxed">{message}</p>
          <div className="flex justify-end gap-2 mt-2">
            <button
              ref={cancelBtnRef}
              onClick={onCancel}
              className="px-3 py-1.5 rounded text-xs font-medium bg-[#3a3a3c] hover:bg-[#4a4a4c] text-white transition-colors focus:ring-2 focus:ring-blue-500 outline-none"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-3 py-1.5 rounded text-xs font-medium bg-red-600 hover:bg-red-500 text-white transition-colors shadow-sm focus:ring-2 focus:ring-red-400 outline-none"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
