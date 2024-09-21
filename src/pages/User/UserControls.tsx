import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import cn from 'classnames';

import { Container } from '../../components/UI/Container';
import { Loader } from '../../components/UI/Loader';
import { useAppSelector, selectUsersData } from '../../redux/store';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const welcome = cn(
  'text-[40px]/[60px]',
  'mb-7',
  'font-semibold',
  'dark:text-white',
  'min-365-max-640:text-xl'
);
const btnList = cn('flex', ' gap-x-3', ' mb-8', ' justify-center', 'max-425:flex-col', 'max-425:gap-y-8');
const btn = cn(
  'px-4',
  'py-2.5',
  'rounded-main',
  'text-primary-black',
  'bg-primary-gray',
  'transition-all',
  'hover:bg-hover-gray',
  'active:bg-active-gray',
  'dark:bg-hover-black',
  'dark:hover:bg-active-black',
  'dark:active:bg-dark-active-black',
  'dark:text-white'
);

const buttonsData = [
  { path: '/user/history', name: 'История заказов' },
  { path: '/user/info', name: 'Информация о пользователе' },
];

export function UserControls() {
  const isLoading = useAppSelector(selectUsersData).isLoading;
  const navigate = useNavigate();
  const token = useLocalStorage('token');

  React.useEffect(() => {
    if (!token.getItem()) {
      navigate('/main');
    }
  }, []);

  return (
    <section className="max-904:mt-28">
      <Container>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <h1 className={welcome}>Добро пожаловать! 👋</h1>
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
