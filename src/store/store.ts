import { configureStore } from '@reduxjs/toolkit';
import osReducer from './osSlice';

export const store = configureStore({
  reducer: {
    os: osReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
