import React from 'react';
import { useSelector } from 'react-redux';
import type {RootState} from './store/store'
import Dock from './UI/Dock';
import Wallpaper from './UI/Wallpaper';

const OsDesktop: React.FC = () => {
  const apps = useSelector((state: RootState) => state.os.apps);
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
        {apps.map(app => (
          <div key={app.id} className="text-white">
            App {app.id} is {app.isOpen ? 'Open' : 'Closed'}
          </div>
        ))}
      </main>

      <Dock />
    </div>
  );
};

export default OsDesktop;
