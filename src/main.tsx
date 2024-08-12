import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { RouterProvider } from 'react-router-dom';
import { store, persistor } from './redux/store.ts';
import { router } from './router.tsx';
import { Loader } from './components/UI/Loader.tsx';
import './utils/i18n.js';
import './main.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Suspense fallback={<Loader />}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </Suspense>
);
