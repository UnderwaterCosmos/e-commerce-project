import React from 'react';
import cn from 'classnames';

import { Container } from '../components/Container';
import { Loader } from '../components/Loader';
import { UserInfo } from '../components/UserInfo';
import { OrdersHistory } from '../components/OrdersHistory';
import { useAppSelector, selectUsersData } from '../redux/store';

const btn = cn('p-1', 'bg-black', 'rounded-lg', 'text-white');

export function UserPage() {
  const isLoading = useAppSelector(selectUsersData).isLoading;
  const [openHistory, setOpenHistory] = React.useState(false);

  return (
    <main className="grow text-center">
      <Container>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <h1 className="mb-5">Добро пожаловать 👋!</h1>
            <ul className="flex gap-x-3 mb-4">
              <li>
                <button
                  className={btn}
                  type="button"
                  onClick={() => setOpenHistory(true)}
                >
                  История заказов
                </button>
              </li>
              <li>
                <button
                  className={btn}
                  type="button"
                  onClick={() => setOpenHistory(false)}
                >
                  Информация о пользователе
                </button>
              </li>
            </ul>
            {openHistory ? <OrdersHistory /> : <UserInfo />}
          </>
        )}
      </Container>
    </main>
  );
}
