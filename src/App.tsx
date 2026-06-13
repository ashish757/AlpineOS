import { useSelector } from 'react-redux';
import OsDesktop from './osDesktop'
import type { RootState } from './store/store';
import { PowerOffScreen } from './UI/PowerOffScreen';
import { BootupApp } from './apps/BootupApp';

function App() {
  const powerState = useSelector((state: RootState) => state.system.powerState);
  const Out = {OFF: PowerOffScreen, ON: OsDesktop, BOOTING: BootupApp}[powerState];
  return (
    <Out />
  )
}

export default App
