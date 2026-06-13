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
  args?: Record<string, string>;
}

export interface Windows {
  active: WindowState[];
  highestIndex: number;
}

const initialState: Windows = {
  active: [],
  highestIndex: 10
};

const getWindowCords = (spawnCount: number, maxW: number, maxH: number) => {
  const startX = 150;
  const startY = 100;
  const off = 30;
  const winW = 600;
  const winH = 400;

  let posX = startX + (spawnCount * off);
  let posY = startY + (spawnCount * off);

  if (posX + winW > maxW || posY + winH > maxH) {
    const wrap = (spawnCount % 5) * 40;
    posX = startX + wrap;
    posY = startY + wrap;
  }

  return { x: posX, y: posY };
};

export const windowSlice = createSlice({
  name: 'os',
  initialState,
  reducers: {
    createWindow: (state, action: PayloadAction<{id: string, processId: string, config: ProcessConfig, args?: Record<string, string>}>) => {
      const newWindow: WindowState = {
        id: action.payload.id,
        processId: action.payload.processId,
        isOpen: true,
        title: action.payload.config.title,
        index: state.highestIndex + 1,
        componentId: action.payload.config.componentId,
        x: getWindowCords(state.active.length, window.innerWidth, window.innerHeight).x,
        y: getWindowCords(state.active.length, window.innerWidth, window.innerHeight).y,
        args: action.payload.args
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
    },
    updateWindowTitle: (state, action: PayloadAction<{ id: string; title: string }>) => {
      const win = state.active.find(w => w.id === action.payload.id)
      if (win) {
        win.title = action.payload.title
      }
    },
    updateWindowArgs: (state, action: PayloadAction<{ id: string; args: Record<string, string> }>) => {
      const win = state.active.find(w => w.id === action.payload.id);
      if (win) {
        win.args = { ...win.args, ...action.payload.args };
      }
    },
    closeAllWindows: (state) => {
      state.active.forEach(window => {
        window.isOpen = false;
      });
    },
  },
});

export const { closeAllWindows, closeWindow, createWindow, focusApp, moveWindow, updateWindowTitle, updateWindowArgs } = windowSlice.actions;

export default windowSlice.reducer;
