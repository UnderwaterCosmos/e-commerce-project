import { Container } from '../components/Container';
import { CartItem } from '../components/CartItem';
import { selectUsersData, useAppSelector } from '../redux/store';

export function Cart() {
  const usersCart = useAppSelector(selectUsersData).fullUserInfo!.cart;

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
        <button type="button">Оформить заказ</button>
      </Container>
    </main>
  );
}