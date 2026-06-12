import { useState, useEffect , type ReactNode } from 'react';
import { type MenuItem } from './contextMenuUtils';
import { ContextMenuContext } from './contextMenuUtils';


export const ContextMenuProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [items, setItems] = useState<MenuItem[]>([]);

  const showMenu = (x: number, y: number, menuItems: MenuItem[]) => {
    setPos({ x, y });
    setItems(menuItems);
    setIsOpen(true);
  };

  const hideMenu = () => setIsOpen(false);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('click', hideMenu);
      window.addEventListener('keydown', (e) => { if(e.key === 'Escape') hideMenu() });
    }
    return () => {
      window.removeEventListener('click', hideMenu);
      window.removeEventListener('keydown', hideMenu);
    };
  }, [isOpen]);

  const isRightHalf = pos.x > window.innerWidth / 2;
  const isBottomHalf = pos.y > window.innerHeight / 2;

  const style: React.CSSProperties = {
    top: isBottomHalf ? undefined : pos.y,
    bottom: isBottomHalf ? window.innerHeight - pos.y : undefined,
    left: isRightHalf ? undefined : pos.x,
    right: isRightHalf ? window.innerWidth - pos.x : undefined,
  };

  return (
    <ContextMenuContext.Provider value={{ showMenu, hideMenu }}>
      {children}
      {isOpen && (
        <div 
          className="fixed z-[9999] min-w-[160px] flex flex-col bg-[#252526]/95 backdrop-blur-md border border-white/10 rounded-lg shadow-2xl py-1 text-sm text-slate-200 overflow-hidden"
          style={style}
          onContextMenu={(e) => e.preventDefault()} 
        >
          {items.map((item, idx) => (
            item.divider ? (
              <div key={idx} className="h-px bg-white/10 my-1 w-full" />
            ) : (
              <button
                key={idx}
                disabled={item.disabled}
                onClick={(e) => {
                  e.stopPropagation();
                  item.action();
                  hideMenu();
                }}
                className="w-full text-left px-4 py-1.5 hover:bg-blue-600/90 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
              >
                {item.label}
              </button>
            )
          ))}
        </div>
      )}
    </ContextMenuContext.Provider>
  );
};