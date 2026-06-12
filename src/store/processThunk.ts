import { addProcess } from './processSlice'
import { createWindow } from './windowSlice'
import { processRegistry } from '../config/processRegistry'
import type { AppDispatch } from './store';

export const executeProcess = (processName: string) => (dispatch: AppDispatch) => {
  const processConfig = processRegistry[processName]
  if (!processConfig) return

  const processInstanceId = crypto.randomUUID();
  dispatch(addProcess({id: processInstanceId, processName}));

  if (processConfig.reqWindow) {
    const windowId = crypto.randomUUID();
    dispatch(createWindow({
      id: windowId,
      processId: processInstanceId,
      config: processConfig
    }));
  }
}