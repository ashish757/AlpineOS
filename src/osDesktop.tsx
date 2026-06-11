import React from 'react';
import { useSelector } from 'react-redux';
import type {RootState} from './store/store'
import Dock from './UI/Dock';
import Wallpaper from './UI/Wallpaper';
import { Window } from './UI/Window';

const OsDesktop: React.FC = () => {
  const windows = useSelector((state: RootState) => state.windows.active);
  // keeping context menu for development 
  // useEffect(() => {
  //   const handleContextMenu = (e: MouseEvent) => {
  //     e.preventDefault();
  //   };
  //   document.addEventListener('contextmenu', handleContextMenu);
  //   return () => {
  //     document.removeEventListener('contextmenu', handleContextMenu);
  //   };
  // }, []);

  return (
    <div className="w-screen h-screen relative overflow-hidden flex flex-col">
    <Wallpaper />     

      <main className="flex-1 relative z-10 p-4">
        {windows.map(window => window.isOpen && <Window key={window.id} info={window} />)}
      </main>

      <Dock />
    </div>
  );
};

export default OsDesktop;
