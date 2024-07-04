import { createBrowserRouter, Outlet, redirect } from 'react-router-dom';

import { Header } from './components/Header';
import { Main } from './pages/Main';
import { Products } from './pages/Products';
import { SingleProduct } from './pages/SingleProduct';
import { LoginForm } from './pages/LoginForm';
import { RegistrationForm } from './pages/RegistrationForm';
import { UserPage } from './pages/UserPage';
import { Cart } from './pages/Cart';
import { Footer } from './components/Footer';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    ),
    children: [
      {
        index: true,
        loader: () => redirect('/main'),
      },
      {
        path: '/main',
        element: <Main />,
      },
      {
        path: '/products',
        element: <Products />,
      },
      {
        path: '/products/:id',
        element: <SingleProduct />,
      },
      {
        path: '/registration',
        element: <RegistrationForm />,
      },
      {
        path: '/login',
        element: <LoginForm />,
      },
      {
        path: '/user',
        element: <UserPage />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
    ],
  },
]);
