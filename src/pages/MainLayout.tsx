import { Outlet } from 'react-router-dom';

import { Header } from '../components/UI/Header';
import { Footer } from '../components/UI/Footer';
import { Notification } from '../components/UI/Notification';

export function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <Notification />
    </>
  );
}
