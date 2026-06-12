import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { persistor, store } from './store/store.ts'
import './index.css'
import App from './App.tsx'
import { PersistGate } from 'redux-persist/integration/react'
import { ContextMenuProvider } from './UI/ContextMenu.tsx';
import { GlobalDialogsProvider } from './UI/GlobalDialogs.tsx';
import { MenuBarProvider } from './UI/MenuBarContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ContextMenuProvider>
          <MenuBarProvider>
            <GlobalDialogsProvider>
              <App />
            </GlobalDialogsProvider>
          </MenuBarProvider>
        </ContextMenuProvider>
      </PersistGate>
     </Provider>
   </StrictMode>
)
