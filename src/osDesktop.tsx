import React from 'react';
import { useSelector } from 'react-redux';
import type {RootState} from './store/store'
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

const componentMap: Record<string, React.ElementType> = {
  'FINDER_APP': FinderApp,
  'TERMINAL_APP': TerminalApp,
  'TEXTPAD_APP': TextpadApp,
  'BROWSER_APP': BrowserApp,
  'SAVE_DIALOG_APP': SaveDialogApp
};

const OsDesktop: React.FC = () => {

  const windows = useSelector((state: RootState) => state.windows.active);
  const { showMenu } = useContextMenu();

  const handleDesktopContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    showMenu(e.pageX, e.pageY, [
      { label: 'New Folder', action: () => alert('Create New Folder') },
      { label: 'Refresh', action: () => alert('Refresh Desktop') },
      { label: 'Change Wallpaper', action: () => alert('Change Wallpaper') },
    ]);
  }

  return (
    <div className="w-screen h-screen relative overflow-hidden flex flex-col" >

      <Wallpaper />     
      <MenuBar />

      
      <main className="flex-1 relative z-10 p-4" onContextMenu={handleDesktopContextMenu}>
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
      </main>
      
      <DesktopIcons />


      <Dock />
    </div>
  );
};

export default OsDesktop;
