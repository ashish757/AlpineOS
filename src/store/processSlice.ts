import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { processRegistry } from '../config/processRegistry';

export interface Process {
    id: string; 
    processName: string; 
    icon: string;
    isRunning: boolean;
    reqWindow: boolean;
    title: string;
    componentId: string;
}

export interface ProcessState {
    active: Process[];
}

const initialState: ProcessState = {
    active: []
};

export const processSlice = createSlice({
  name: 'os',
  initialState,
  reducers: {
    addProcess: (state, action: PayloadAction<{id: string, processName: string}>) => {
        const config = processRegistry[action.payload.processName];
        if (config) {
            state.active.push({
                ...config, 
                id: action.payload.id, 
                processName: action.payload.processName, 
                isRunning: true
            });
        }
    },
    removeProcess: (state, action: PayloadAction<string>) => {
      state.active = state.active.filter(process => process.id !== action.payload);
    },
    closeAllProcesses: (state) => {
      state.active.forEach(process => {
        process.isRunning = false;
      });
    },
  },
});

export const { removeProcess, addProcess, closeAllProcesses } = processSlice.actions;

export default processSlice.reducer;
