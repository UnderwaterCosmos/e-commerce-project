import {
  createBrowserRouter,
  Outlet,
  redirect,
  Navigate,
} from 'react-router-dom';

import { Header } from './components/Header';
import { Main } from './pages/Main';
import { Products } from './pages/Products';
import { SingleProduct } from './pages/SingleProduct';
import { LoginForm } from './pages/LoginForm';
import { RegistrationForm } from './pages/RegistrationForm';
import { User } from './pages/User';
import { UserInfo } from './components/UserInfo';
import { OrdersHistory } from './components/OrdersHistory';
import { Admin } from './pages/Admin';
import { AdminNewProduct } from './components/AdminNewProduct';
import { AdminNewCategory } from './components/AdminNewCategory';
import { AdminEditProduct } from './components/AdminEditProduct';
import { Cart } from './pages/Cart';
import { Footer } from './components/Footer';
import { Notification } from './components/Notification';
import { NotFound } from './pages/NotFound';
import { CheckAccess } from './components/CheckAccess';
import { useLocalStorage } from './hooks/useLocalStorage';

const token = useLocalStorage('token');

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />
        <Outlet />
        <Footer />
        <Notification />
      </>
    ),
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
        element: (
          <div className="grow text-center">
            <CheckAccess>
              <Admin />
              <Outlet />
            </CheckAccess>
          </div>
        ),
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
        element: (
          <div className="grow text-center">
            <User />
            <Outlet />
          </div>
        ),
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
