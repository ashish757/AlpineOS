import React from 'react';
import { useSelector } from 'react-redux';
import type {RootState} from './store/store'
import Dock from './UI/Dock';
import Wallpaper from './UI/Wallpaper';
import { Window } from './UI/Window';
import MenuBar from './UI/MenuBar';

const OsDesktop: React.FC = () => {
  const processes = useSelector((state: RootState) => state.processes.active);
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

      <MenuBar />
      
      <main className="flex-1 relative z-10 p-4">
        {processes.map(process => {
          if(process.isRunning && process.reqWindow && process.windowInfo) {
            return( <Window key={process.windowInfo.id} info={process.windowInfo}/>);
          }
          return null;
        })}

      </main>


      <Dock />
    </div>
  );
};

export default OsDesktop;
