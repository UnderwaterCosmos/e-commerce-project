import React from 'react';
import cn from 'classnames';

import { Container } from '../components/Container';
import { CustomerInfo } from '../components/CustomerInfo';
import { OrdersHistory } from '../components/OrdersHistory';

const btn = cn('p-1', 'bg-black', 'rounded-lg', 'text-white');

export function CustomerPage() {
  return (
    <main className="grow text-center">
      <Container>
        <h1 className="mb-5">Добро пожаловать *ПОЛЬЗОВАТЕЛЬ* !</h1>
        <ul className="flex gap-x-3 mb-4">
          <li>
            <button className={btn} type="button">
              История заказов
            </button>
          </li>
          <li>
            <button className={btn} type="button">
              Информация о пользователе
            </button>
          </li>
        </ul>
        {/* <CustomerInfo /> */}
        <OrdersHistory />
      </Container>
    </main>
  );
}
