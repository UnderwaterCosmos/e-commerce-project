import React from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

import { Container } from '../components/UI/Container';
import { CartItem } from '../components/CartItem';
import { Modal } from '../components/UI/Modal';
import { BackBtn } from '../components/UI/BackBtn';
import { Checkout } from '../components/Checkout';
import { CheckoutBtn } from '../components/UI/CheckoutBtn';
import { PathToProductsBtn } from '../components/UI/PathToProductsBtn';
import { selectUsersData, useAppSelector } from '../redux/store';

const emptyCartTitle = cn(
  'mb-8',
  'mt-32',
  'text-6xl',
  'dark:text-white',
  'min-365-max-640:text-4xl'
);
const cartTitle = cn(
  'text-[40px]/[60px]',
  'mb-8',
  'mt-10',
  'font-semibold',
  'dark:text-white',
  'min-365-max-640:mt-4',
  'min-365-max-640:mb-6',
  'min-365-max-640:text-primary-h1'
);
const checkoutWrapper = cn('flex', 'justify-center', 'items-center', 'gap-x-6', 'min-365-max-640:justify-between');

export function Cart() {
  const usersCart = useAppSelector(selectUsersData).fullUserInfo?.cart ?? [];
  const [modalActive, setModalActive] = React.useState(false);
  const navigate = useNavigate();

  const totalSum = usersCart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="grow max-904:mt-20">
      <Container>
        {usersCart.length === 0 ? (
          <div className="text-center min-365-max-640:mt-[350px]">
            <h1 className={emptyCartTitle}>Корзина пуста ;(</h1>
            <PathToProductsBtn>Перейти к каталогу товаров</PathToProductsBtn>
          </div>
        ) : (
          <>
            <BackBtn onClick={() => navigate(-1)} />
            <h1 className={cartTitle}>Корзина</h1>
            <ul className="mb-6">
              {usersCart.map((cartItem, index) => (
                <CartItem cartItem={cartItem} index={index} key={cartItem.id} />
              ))}
            </ul>
            <div className={checkoutWrapper}>
              <h3 className="font-semibold dark:text-white">
                Итого: {totalSum}₽
              </h3>
              <CheckoutBtn onClick={() => setModalActive(true)} />
            </div>
            <Modal modalActive={modalActive} setModalActive={setModalActive}>
              <Checkout
                usersCart={usersCart}
                totalSum={totalSum}
                setModalActive={setModalActive}
              />
            </Modal>
          </>
        )}
      </Container>
    </main>
  );
}
