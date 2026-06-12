import { createContext, useContext } from 'react';

export interface MenuItem {
  label?: string;
  action: () => void;
  divider?: boolean;
  disabled?: boolean;
}

interface ContextMenuContextType {
  showMenu: (x: number, y: number, items: MenuItem[]) => void;
  hideMenu: () => void;
}

export const ContextMenuContext = createContext<ContextMenuContextType | undefined>(undefined);


export const useContextMenu = () => {
  const context = useContext(ContextMenuContext);
  if (!context) throw new Error("useContextMenu must be used within ContextMenuProvider");
  return context;
};

// Helper hook to easily attach context menus to any element
export const useContextMenuTrigger = () => {
  const { showMenu } = useContextMenu();
  
  return (items: MenuItem[]) => ({
    onContextMenu: (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      showMenu(e.clientX, e.clientY, items);
    }
  });
};
