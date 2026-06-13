import { createContext, useContext, useState, useCallback, useMemo, useEffect, type ReactNode } from 'react';

export interface MenuItem {
  label?: string;
  action: () => void;
  divider?: boolean;
  disabled?: boolean;
}

export interface MenuBarConfig {
  [menuHeader: string]: MenuItem[];
}

interface MenuBarDispatch {
  setMenuConfig: (windowId: string, config: MenuBarConfig) => void;
  removeMenuConfig: (windowId: string) => void;
}

const MenuBarStateContext = createContext<Record<string, MenuBarConfig> | undefined>(undefined);
const MenuBarDispatchContext = createContext<MenuBarDispatch | undefined>(undefined);

export const MenuBarProvider = ({ children }: { children: ReactNode }) => {
  const [menusByWindowId, setMenusByWindowId] = useState<Record<string, MenuBarConfig>>({});

  const setMenuConfig = useCallback((windowId: string, config: MenuBarConfig) => {
    setMenusByWindowId(prev => ({ ...prev, [windowId]: config }));
  }, []);

  const removeMenuConfig = useCallback((windowId: string) => {
    setMenusByWindowId(prev => {
      const next = { ...prev };
      delete next[windowId];
      return next;
    });
  }, []);

  const dispatchValue = useMemo(() => ({ setMenuConfig, removeMenuConfig }), [setMenuConfig, removeMenuConfig]);

  return (
    <MenuBarStateContext.Provider value={menusByWindowId}>
      <MenuBarDispatchContext.Provider value={dispatchValue}>
        {children}
      </MenuBarDispatchContext.Provider>
    </MenuBarStateContext.Provider>
  );
};

export const useMenuBarState = () => {
  const context = useContext(MenuBarStateContext);
  if (!context) throw new Error("Error");
  return context;
};

export const useMenuBarDispatch = () => {
  const context = useContext(MenuBarDispatchContext);
  if (!context) throw new Error("Error");
  return context;
};

export const useMenuBarRegistry = () => {
  const state = useMenuBarState();
  const dispatch = useMenuBarDispatch();
  return { menusByWindowId: state, ...dispatch };
};

export const useAppMenuBar = (windowId: string, config: MenuBarConfig, deps: any[] = []) => {
  const { setMenuConfig, removeMenuConfig } = useMenuBarDispatch();

  useEffect(() => {
    if (windowId) {
      setMenuConfig(windowId, config);
    }
    return () => {
      if (windowId) {
        removeMenuConfig(windowId);
      }
    };
  }, [windowId, ...deps]);
};