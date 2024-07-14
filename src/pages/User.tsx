import { Link } from 'react-router-dom';
import cn from 'classnames';

import { Container } from '../components/Container';
import { Loader } from '../components/Loader';
import { useAppSelector, selectUsersData } from '../redux/store';

const btn = cn('p-1', 'bg-black', 'rounded-lg', 'text-white');

export function User() {
  const isLoading = useAppSelector(selectUsersData).isLoading;

  return (
    <section>
      <Container>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <h1 className="mb-5">Добро пожаловать 👋!</h1>
            <ul className="flex gap-x-3 mb-4">
              <li className={btn}>
                <Link to={'/user/history'}>История заказов</Link>
              </li>
              <li className={btn}>
                <Link to={'/user/info'}>Информация о пользователе</Link>
              </li>
            </ul>
          </>
        )}
      </Container>
    </section>
  );
}
