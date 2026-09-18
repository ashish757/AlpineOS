import React, { useEffect, useRef } from 'react';

export interface DialogButton {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'danger' | 'default';
  isDefaultFocus?: boolean;
}

interface SystemDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  buttons: DialogButton[];
}

export const SaveDialog: React.FC<SystemDialogProps> = ({ isOpen, title, message, buttons }) => {
  const defaultBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        defaultBtnRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const getButtonStyles = (variant?: string) => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-600 hover:bg-blue-500 text-white focus:ring-blue-400';
      case 'danger':
        return 'bg-red-600 hover:bg-red-500 text-white focus:ring-red-400';
      default:
        return 'bg-[#3a3a3c] hover:bg-[#4a4a4c] text-white focus:ring-blue-500';
    }
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div 
        className="bg-[#252526] border border-white/10 rounded-lg shadow-2xl p-4 w-80 flex flex-col gap-3" 
        onClick={e => e.stopPropagation()}
      >
        <h3 className="text-slate-200 font-semibold text-sm">{title}</h3>
        <p className="text-slate-400 text-xs leading-relaxed">{message}</p>
        
        <div className="flex justify-end gap-2 mt-2">
          {buttons.map((btn, index) => (
            <button
              key={index}
              ref={btn.isDefaultFocus ? defaultBtnRef : null}
              onClick={btn.onClick}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors shadow-sm focus:ring-2 outline-none ${getButtonStyles(btn.variant)}`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};