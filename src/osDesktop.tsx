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

const componentMap: Record<string, React.ElementType> = {
  'FINDER_APP': FinderApp,
  'TERMINAL_APP': TerminalApp,
  'TEXTPAD_APP': TextpadApp,
};

const OsDesktop: React.FC = () => {
  const windows = useSelector((state: RootState) => state.windows.active);

  return (
    <div className="w-screen h-screen relative overflow-hidden flex flex-col">
      <Wallpaper />     
      <MenuBar />
      
      <main className="flex-1 relative z-10 p-4">
        {windows.map(window => {
          if(window.isOpen) {
            const Component = componentMap[window.componentId];
            return (
              <Window key={window.id} info={window}>
                {Component ? <Component windowId={window.id} /> : <div>Component Not Found</div>}
              </Window>
            );
          }
          return null;
        })}
      </main>

      <Dock />
    </div>
  );
};

export default OsDesktop;
