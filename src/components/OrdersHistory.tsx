import { Container } from './UI/Container';
import { PathToProductsBtn } from './UI/PathToProductsBtn';
import { OrdersHistoryInnerItem } from './OrdersHistoryInnerItem';
import { selectUsersData, useAppSelector } from '../redux/store';

export function OrdersHistory() {
  const ordersHistory =
    useAppSelector(selectUsersData).fullUserInfo?.ordersHistory;

  const ordersHistoryKeys = Object.keys(ordersHistory ?? []);
  const orderItemsList = ordersHistoryKeys
    .map((orderName) => (
      <OrdersHistoryInnerItem orderName={orderName} key={orderName} />
    ))
    .reverse();

  return (
    <main>
      <Container>
        {ordersHistoryKeys.length === 0 ? (
          <>
            <h1 className="text-4xl mt-36 mb-6">
              У Вас еще нет ни одного заказа! ;(
            </h1>
            <PathToProductsBtn>Перейти к каталогу товаров</PathToProductsBtn>
          </>
        ) : (
          <ul className="text-left">{orderItemsList}</ul>
        )}
      </Container>
    </main>
  );
}
