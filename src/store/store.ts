import { configureStore, combineReducers } from '@reduxjs/toolkit';
import windowReducer from './windowSlice';
import { fileSystemSlice } from './fileSystemSlice';
import { processSlice } from './processSlice';
import { systemSlice} from './systemSlice';

import {persistStore, persistReducer} from 'redux-persist'
import lf from 'localforage'
import { personalizationSlice } from './personalizationSlice';

const fsConfig = {
  key: 'alpine',
  storage: lf,
  whitelist: ['fileSystem', 'system', 'windows', 'processes', 'personalization']
}

const rootReducer = combineReducers({
  fileSystem: fileSystemSlice.reducer,
  system: systemSlice.reducer,
  windows: windowReducer,
  processes: processSlice.reducer,
  personalization: personalizationSlice.reducer,  
});


const PersistedReducer = persistReducer(fsConfig, rootReducer)

export const store = configureStore({
  reducer: PersistedReducer,
  middleware: (a) => a({serializableCheck: false})
});

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
