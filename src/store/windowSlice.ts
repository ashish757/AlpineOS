import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface WindowState {
  id: string;
  isOpen: boolean;
  title: string,
  index: number
}

export interface Windows {
  active: WindowState[];
  highestIndex: number;
}

const initialState: Windows = {
  active: [
   {
    id: '1', isOpen: true, title: "win1", index: 0
   },
    {
    id: '2', isOpen: true, title: "win2", index : 0
   }
   ,
    {
    id: '3', isOpen: true, title: "win3", index : 0
   }
  ],
  highestIndex: 10
};

export const windowSlice = createSlice({
  name: 'os',
  initialState,
  reducers: {
    closeApp: (state, action: PayloadAction<string>) => {
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

export const { closeApp, focusApp } = windowSlice.actions;

export default windowSlice.reducer;
