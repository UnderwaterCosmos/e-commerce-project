import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { RouterProvider } from 'react-router-dom';

import { store, persistor } from './redux/store.ts';
import { router } from './router.tsx';
import { ThemeProvider } from './theme/ThemeProvider.tsx';
import './main.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </PersistGate>
  </Provider>
);
