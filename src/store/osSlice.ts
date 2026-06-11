import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  id: string;
  isOpen: boolean;
  isMax: boolean;
}

export interface OsState {
  apps: AppState[];
}

const initialState: OsState = {
  apps: [
   {
    id: '1', isOpen: false, isMax: false
   },
    {
    id: '2', isOpen: false, isMax: false
   }
  ],
};

export const osSlice = createSlice({
  name: 'os',
  initialState,
  reducers: {
    openApp: (state, action: PayloadAction<string>) => {
      const existingApp = state.apps.find((app) => app.id === action.payload);
      if (existingApp) {
        existingApp.isOpen = true;
        state.apps = state.apps.filter(app => app.id !== action.payload);
        state.apps.push(existingApp);
      } else {
        state.apps.push({ id: action.payload, isOpen: true, isMax: false });
      }
    },
    closeApp: (state, action: PayloadAction<string>) => {
      const app = state.apps.find((app) => app.id === action.payload);
      if (app) {
        app.isOpen = false;
      }
    },
  
  },
});

export const { openApp, closeApp, } = osSlice.actions;

export default osSlice.reducer;
