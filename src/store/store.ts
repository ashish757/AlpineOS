import { configureStore } from '@reduxjs/toolkit';
import windowReducer from './windowSlice';

export const store = configureStore({
  reducer: {
    windows: windowReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
