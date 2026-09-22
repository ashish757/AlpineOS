import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type {AppDispatch, RootState} from './store/store'
import Dock from './UI/Dock';
import Wallpaper from './UI/Wallpaper';
import { Window } from './UI/Window';
import MenuBar from './UI/MenuBar';

import { FinderApp } from './apps/FinderApp';
import { TerminalApp } from './apps/TerminalApp';
import { TextpadApp } from './apps/TextpadApp';
import { BrowserApp } from './apps/BrowserApp';
import { DesktopIcons } from './UI/DesktopIcons';
import { SaveDialogApp } from './apps/SaveDialogApp';

import {useContextMenu} from './UI/contextMenuUtils';
import { closeAllProcesses } from './store/processSlice';
import { closeAllWindows } from './store/windowSlice';
import { setPowerState } from './store/systemSlice';
import { ActivityManagerApp } from './apps/ActivityManagerApp';
import { SettingsApp } from './apps/SettingsApp';
import { executeProcess } from './store/processThunk';
import { AnimatePresence } from 'framer-motion';
import {WidgetManager} from "./apps/widgets/WidgetManager.tsx";
import {createFolder} from "./store/fileSystemSlice.ts";

const componentMap: Record<string, React.ElementType> = {
  'FINDER_APP': FinderApp,
  'TERMINAL_APP': TerminalApp,
  'TEXTPAD_APP': TextpadApp,
  'BROWSER_APP': BrowserApp,
  'SAVE_DIALOG_APP': SaveDialogApp,
  'ACTIVITY_MANAGER_APP': ActivityManagerApp,
  'SETTINGS_APP': SettingsApp,
};

const OsDesktop: React.FC = () => {
  const windows = useSelector((state: RootState) => state.windows.active);
  const { showMenu } = useContextMenu();
  const dispatch = useDispatch<AppDispatch>();

  const handleShutdown = () => {
    dispatch(closeAllProcesses());
    dispatch(closeAllWindows());
    dispatch(setPowerState('OFF'));
  }
  const handlePersonalize = () => {
    dispatch(executeProcess('settings', { defaultTab: 'personalization' }));
  }

  const handleWidgets = () => {
    dispatch(executeProcess('settings', { defaultTab: 'widgets' }));
  }

  const handleCreateFolder = () => {
    const name = prompt("Folder Name: ")
    if(!name) return;
    dispatch(createFolder({id: "123", name, parentId: "desk"}));
  }

  const handleDesktopContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    showMenu(e.pageX, e.pageY, [
      { label: 'New Folder', action: handleCreateFolder },
      { label: 'Refresh', action: () => null},
      { label: 'Personalize', action: handlePersonalize },
      { label: 'Add Widgets', action: handleWidgets },
      { label: 'Shutdown', action: handleShutdown},
    ]);
  }

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  return (
      <div className="w-screen h-screen relative overflow-hidden flex flex-col" >
        <Wallpaper />
        <MenuBar />

        <main className="flex-1 relative z-0 p-4" onContextMenu={handleDesktopContextMenu} onClick={() => setSelectedIds([])} >
          <WidgetManager/>
          <DesktopIcons setSelectedIds={setSelectedIds} selectedIds={selectedIds} />

          <AnimatePresence>
            {windows.map(window => {
              if(window.isOpen) {
                const Component = componentMap[window.componentId];
                return (
                    <Window key={window.id} info={window}>
                      {Component ? <Component winInfo={window} /> : <div>Component Not Found</div>}
                    </Window>
                );
              }
              return null;
            })}
          </AnimatePresence>
        </main>

        <Dock />
      </div>
  );
};

export default OsDesktop;