import { configureStore } from '@reduxjs/toolkit';
import windowReducer from './windowSlice';
import { fileSystemSlice } from './fileSystemSlice';
import { processSlice } from './processSlice';

export const store = configureStore({
  reducer: {
    windows: windowReducer,
    fileSystem: fileSystemSlice.reducer,
    processes: processSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
