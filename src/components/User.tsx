import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import cn from 'classnames';

import { Container } from './UI/Container';
import { Loader } from './UI/Loader';
import { useAppSelector, selectUsersData } from '../redux/store';
import { useLocalStorage } from '../hooks/useLocalStorage';

const btn = cn('p-1', 'bg-black', 'rounded-lg', 'text-white');

const buttonsData = [
  { path: '/user/history', name: 'История заказов' },
  { path: '/user/info', name: 'Информация о пользователе' },
];

export function User() {
  const isLoading = useAppSelector(selectUsersData).isLoading;
  const navigate = useNavigate();
  const token = useLocalStorage('token');

  React.useEffect(() => {
    if (!token.getItem()) {
      navigate('/main');
    }
  }, []);

  return (
    <section>
      <Container>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <h1 className="mb-5">Добро пожаловать 👋!</h1>
            <ul className="flex gap-x-3 mb-4">
              {buttonsData.map((data) => (
                <li key={data.name}>
                  <Link to={data.path} className={btn}>
                    {data.name}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </Container>
    </section>
  );
}
