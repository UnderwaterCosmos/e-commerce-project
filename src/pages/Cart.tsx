import React from 'react';

import { Container } from '../components/Container';
import { CartItem } from '../components/CartItem';
import { Modal } from '../components/Modal';
import { Checkout } from '../components/Checkout';
import { selectUsersData, useAppSelector } from '../redux/store';

export function Cart() {
  const usersCart = useAppSelector(selectUsersData).fullUserInfo!.cart;
  const [modalActive, setModalActive] = React.useState(false);

  const totalSum = usersCart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="grow">
      <Container>
        <h2>Товаров в корзине на сумму: {totalSum}₽</h2>
        <ul>
          {usersCart.map((cartItem, index) => (
            <CartItem cartItem={cartItem} index={index} key={cartItem.id} />
          ))}
        </ul>
        <button type="button" onClick={() => setModalActive(true)}>
          Оформить заказ
        </button>
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
