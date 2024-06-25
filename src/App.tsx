import { Routes, Route } from 'react-router-dom';

import { Header } from './components/Header';
import { Main } from './pages/Main';
import { Products } from './pages/Products';
import { SingleProduct } from './pages/SingleProduct';
import { LoginForm } from './pages/LoginForm';
import { RegistrationForm } from './pages/RegistrationForm';
import { CustomerPage } from './pages/CustomerPage';
import { Footer } from './components/Footer';

export function App() {
  return (
    <>
      <Header />
      {/* <Main /> */}
      {/* <Products /> */}
      {/* <SingleProduct /> */}
      {/* <LoginForm /> */}
      {/* <RegistrationForm /> */}
      {/* <CustomerPage /> */}

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="/registration" element={<RegistrationForm />} />
      </Routes>
      <Footer />
    </>
  );
}
