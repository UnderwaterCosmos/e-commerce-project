import { Routes, Route } from 'react-router-dom';

import { Header } from './components/Header';
import { Main } from './pages/Main';
import { Products } from './pages/Products';
import { SingleProduct } from './pages/SingleProduct';
import { LoginForm } from './pages/LoginForm';
import { RegistrationForm } from './pages/RegistrationForm';
import { UserPage } from './pages/UserPage';
import { Cart } from './components/Cart';
import { Footer } from './components/Footer';

export function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </>
  );
}
