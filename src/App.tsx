import { useSelector } from 'react-redux';
import OsDesktop from './osDesktop'
import type { RootState } from './store/store';
import { PowerOffScreen } from './UI/PowerOffScreen';
import { BIOSAPP } from './apps/BIOSAPP';

function App() {
  const powerState = useSelector((state: RootState) => state.system.powerState);
  const Out = {OFF: PowerOffScreen, ON: OsDesktop, BOOTING: BIOSAPP}[powerState];
  return (
    <Out />
  )
}

export default App
