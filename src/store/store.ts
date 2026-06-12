import { configureStore } from '@reduxjs/toolkit';
import windowReducer from './windowSlice';
import { fileSystemSlice } from './fileSystemSlice';
import { processSlice } from './processSlice';

import {persistStore, persistReducer} from 'redux-persist'
import lf from 'localforage'

const fsConfig = {
  key: 'fs',
  storage: lf,
}

const persistedFsReducer = persistReducer(fsConfig, fileSystemSlice.reducer)

export const store = configureStore({
  reducer: {
    windows: windowReducer,
    fileSystem: persistedFsReducer,
    processes: processSlice.reducer
  },
  middleware: (a) => a({serializableCheck: false})
});

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
