import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import cn from 'classnames';

import { Container } from './UI/Container';
import { Loader } from './UI/Loader';
import { useAppSelector, selectUsersData } from '../redux/store';
import { useLocalStorage } from '../hooks/useLocalStorage';

const btnList = cn('flex', ' gap-x-3', ' mb-8', ' justify-center');
const btn = cn(
  'px-4',
  'py-2.5',
  'rounded-main',
  'text-primary-black',
  'bg-primary-gray',
  'transition-all',
  'hover:bg-hover-gray',
  'active:bg-active-gray'
);

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
            <h1 className="text-[40px]/[60px] mb-7 font-semibold">
              Добро пожаловать! 👋
            </h1>
            <ul className={btnList}>
              {buttonsData.map((data) => (
                <li key={data.name}>
                  <NavLink
                    to={data.path}
                    className={btn}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? 'rgba(1, 71, 255, 1)' : '',
                      color: isActive ? 'white' : '',
                    })}
                  >
                    {data.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </>
        )}
      </Container>
    </section>
  );
}
