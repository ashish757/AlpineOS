import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ProcessConfig } from '../config/processRegistry';

export interface WindowState {
  id: string;
  processId: string; 
  isOpen: boolean;
  title: string;
  index: number;
  componentId: string;
  x: number;
  y: number;
}

export interface Windows {
  active: WindowState[];
  highestIndex: number;
}

const initialState: Windows = {
  active: [],
  highestIndex: 10
};

export const windowSlice = createSlice({
  name: 'os',
  initialState,
  reducers: {
    createWindow: (state, action: PayloadAction<{id: string, processId: string, config: ProcessConfig}>) => {
      const newWindow: WindowState = {
        id: action.payload.id,
        processId: action.payload.processId,
        isOpen: true,
        title: action.payload.config.title,
        index: state.highestIndex + 1,
        componentId: action.payload.config.componentId,
        x: 150 + (state.active.length * 30),
        y: 100 + (state.active.length * 30),
      };
      state.active.push(newWindow);
      state.highestIndex += 1;
    },
    closeWindow: (state, action: PayloadAction<string>) => {
      const window = state.active.find((window) => window.id === action.payload);
      if (window) {
        window.isOpen = false;
      }
    },
    focusApp: (state, action: PayloadAction<string>) => {
      const targetWindow = state.active.find((window) => window.id === action.payload);
      if (targetWindow && targetWindow.index !== state.highestIndex) {
        state.highestIndex += 1;
        targetWindow.index = state.highestIndex;
      }
    },
    moveWindow: (state, action: PayloadAction<{id: string, x: number, y: number}>) => {
      const window = state.active.find((window) => window.id === action.payload.id);
      if (window) {
        window.x = action.payload.x;
        window.y = action.payload.y;
      }
    }
  },
});

export const { closeWindow, createWindow, focusApp, moveWindow } = windowSlice.actions;

export default windowSlice.reducer;
