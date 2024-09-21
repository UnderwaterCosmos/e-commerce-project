import { createBrowserRouter, redirect, Navigate } from 'react-router-dom';

import { Layout } from './pages/MainLayout/Layout';
import { Main } from './pages/Main';
import { ProductsPage } from './pages/Products/ProductsPage';
import { SingleProduct } from './pages/SingleProduct';
import { LoginForm } from './pages/LoginForm';
import { RegistrationForm } from './pages/RegistrationForm';
import { UserPage } from './pages/User/UserPage';
import { UserInfo } from './components/UserInfo';
import { OrdersHistory } from './components/OrdersHistory';
import { AdminPage } from './pages/Admin/AdminPage';
import { AdminNewProduct } from './components/AdminNewProduct';
import { AdminNewCategory } from './components/AdminNewCategory';
import { AdminEditProduct } from './components/AdminEditProduct';
import { CartPage } from './pages/Cart/CartPage';
import { NotFound } from './pages/NotFound';
import { CheckAccess } from './pages/Admin/CheckAccess';
import { useLocalStorage } from './hooks/useLocalStorage';

const token = useLocalStorage('token');

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
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
        element: <ProductsPage />,
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
        element: <CartPage />,
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
