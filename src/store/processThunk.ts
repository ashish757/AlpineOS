import { addProcess } from './processSlice'
import {createWindow} from './windowSlice'
import { processRegistry } from '../config/processRegistry'
import type { AppDispatch } from './store';

export const executeProcess = (processId: string) => (dispatch: AppDispatch) => {
  
  
  const processConfig = processRegistry[processId]
  if (!processConfig) return

  dispatch(addProcess(processId))

  if (processConfig.reqWindow) {
    dispatch(createWindow(processId));
  }
}