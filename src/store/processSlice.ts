import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { WindowState } from './windowSlice';
import { processRegistry } from '../config/processRegistry';

export interface Process {
    id: string,
    icon: string,
    isRunning: boolean,
    reqWindow: boolean,
    windowInfo?: WindowState;
}

export interface ProcessState {
    active: Process[],
}

const initialState: ProcessState = {
    active: []
};

export const processSlice = createSlice({
  name: 'os',
  initialState,
  reducers: {
    addProcess: (state, action: PayloadAction<string>) => {
        state.active.push({...processRegistry[action.payload], id: crypto.randomUUID(), isRunning: true})
     
    },
    removeProcess: (state, action: PayloadAction<string>) => {
      state.active = state.active.filter(process => process.id !== action.payload);
    }
    },

});

export const { removeProcess, addProcess } = processSlice.actions;

export default processSlice.reducer;
