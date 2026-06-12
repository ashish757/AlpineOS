import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { processRegistry } from '../config/processRegistry';

export interface WindowState {
  id: string;
  isOpen?: boolean;
  title: string,
  index?: number
  pId?: string;
  component: React.ElementType;
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
    createWindow: (state, action: PayloadAction<string>) => {
      const newWindow: WindowState = {...processRegistry[action.payload].windowInfo,
        isOpen: true,
        index: state.highestIndex + 1,
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
    }

  },
});

export const { closeWindow, createWindow, focusApp } = windowSlice.actions;

export default windowSlice.reducer;
