import React from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

import { Container } from '../components/UI/Container';
import { CartItem } from '../components/CartItem';
import { Modal } from '../components/UI/Modal';
import { BackBtn } from '../components/UI/BackBtn';
import { Checkout } from '../components/Checkout';
import { selectUsersData, useAppSelector } from '../redux/store';
import { CheckoutBtn } from '../components/UI/CheckoutBtn';

const cartTitle = cn('text-[40px]/[60px]', 'mb-8', 'mt-10', 'font-semibold');
const checkoutWrapper = cn('flex', 'justify-center', 'items-center', 'gap-x-6');

export function Cart() {
  const usersCart = useAppSelector(selectUsersData).fullUserInfo?.cart ?? [];
  const [modalActive, setModalActive] = React.useState(false);
  const navigate = useNavigate();

  const totalSum = usersCart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="grow">
      <Container>
        <BackBtn onClick={() => navigate(-1)} />
        <h1 className={cartTitle}>Корзина</h1>
        <ul className="mb-6">
          {usersCart.map((cartItem, index) => (
            <CartItem cartItem={cartItem} index={index} key={cartItem.id} />
          ))}
        </ul>
        <div className={checkoutWrapper}>
          <h3 className="font-semibold">Итого: {totalSum}₽</h3>
          <CheckoutBtn onClick={() => setModalActive(true)} />
        </div>
        <Modal modalActive={modalActive} setModalActive={setModalActive}>
          <Checkout
            usersCart={usersCart}
            totalSum={totalSum}
            setModalActive={setModalActive}
          />
        </Modal>
      </Container>
    </main>
  );
}
