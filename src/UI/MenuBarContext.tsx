import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { MenuItem } from './contextMenuUtils';

export interface MenuBarConfig {
  [menuHeader: string]: MenuItem[];
}

interface MenuBarContextType {
  menusByWindowId: Record<string, MenuBarConfig>;
  setMenuConfig: (windowId: string, config: MenuBarConfig) => void;
  removeMenuConfig: (windowId: string) => void;
}

const MenuBarContext = createContext<MenuBarContextType | undefined>(undefined);

export const MenuBarProvider = ({ children }: { children: ReactNode }) => {
  const [menusByWindowId, setMenusByWindowId] = useState<Record<string, MenuBarConfig>>({});

  const setMenuConfig = (windowId: string, config: MenuBarConfig) => {
    setMenusByWindowId(prev => ({ ...prev, [windowId]: config }));
  };

  const removeMenuConfig = (windowId: string) => {
    setMenusByWindowId(prev => {
      const next = { ...prev };
      delete next[windowId];
      return next;
    });
  };

  return (
    <MenuBarContext.Provider value={{ menusByWindowId, setMenuConfig, removeMenuConfig }}>
      {children}
    </MenuBarContext.Provider>
  );
};

export const useMenuBarRegistry = () => {
  const context = useContext(MenuBarContext);
  if (!context) throw new Error("useMenuBarRegistry must be used within MenuBarProvider");
  return context;
};

// Hook for applications to dynamically register their menu bar configuration
export const useAppMenuBar = (windowId: string, config: MenuBarConfig, deps: any[] = []) => {
  const { setMenuConfig, removeMenuConfig } = useMenuBarRegistry();

  useEffect(() => {
    if (windowId) {
      setMenuConfig(windowId, config);
    }
    return () => {
      if (windowId) {
        removeMenuConfig(windowId);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowId, ...deps]);
};
