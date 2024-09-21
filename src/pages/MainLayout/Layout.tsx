import { Outlet } from 'react-router-dom';

import Header from './HeaderBlock/Header';
import Footer from './Footer';
import { Notification } from './Notification';

export function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <Notification />
    </>
  );
}
