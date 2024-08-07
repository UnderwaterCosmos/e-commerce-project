import { createBrowserRouter, redirect, Navigate } from 'react-router-dom';

import { MainLayout } from './pages/MainLayout';
import { Main } from './pages/Main';
import { Products } from './pages/Products';
import { SingleProduct } from './pages/SingleProduct';
import { LoginForm } from './pages/LoginForm';
import { RegistrationForm } from './pages/RegistrationForm';
import { UserPage } from './pages/UserPage';
import { UserInfo } from './components/UserInfo';
import { OrdersHistory } from './components/OrdersHistory';
import { AdminPage } from './pages/AdminPage';
import { AdminNewProduct } from './components/AdminNewProduct';
import { AdminNewCategory } from './components/AdminNewCategory';
import { AdminEditProduct } from './components/AdminEditProduct';
import { Cart } from './pages/Cart';
import { NotFound } from './pages/NotFound';
import { CheckAccess } from './components/CheckAccess';
import { useLocalStorage } from './hooks/useLocalStorage';

const token = useLocalStorage('token');

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        loader: () => redirect('/main'),
      },
      {
        path: 'main',
        element: <Main />,
      },
      {
        path: 'products',
        element: <Products />,
      },
      {
        path: 'products/:id',
        element: <SingleProduct />,
      },
      {
        path: 'products/:id/edit',
        element: (
          <CheckAccess>
            <AdminEditProduct />
          </CheckAccess>
        ),
      },
      {
        path: 'admin',
        element: <AdminPage />,
        children: [
          {
            index: true,
            element: <Navigate to="addProduct" />,
          },
          {
            path: 'addProduct',
            element: <AdminNewProduct />,
          },
          {
            path: 'addCategory',
            element: <AdminNewCategory />,
          },
        ],
      },
      {
        path: 'registration',
        element: <RegistrationForm />,
      },
      {
        path: 'login',
        element: <LoginForm />,
      },
      {
        path: 'user',
        element: <UserPage />,
        children: [
          {
            path: 'info',
            element: <UserInfo />,
          },
          {
            path: 'history',
            element: <OrdersHistory />,
          },
        ],
      },
      {
        path: 'cart',
        element: <Cart />,
        loader: () => {
          if (!token.getItem()) {
            return redirect('/main');
          }
          return null;
        },
      },
    ],
  },
]);
