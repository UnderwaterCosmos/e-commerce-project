import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import { Container } from './UI/Container';
import { Loader } from './UI/Loader';
import { useAppSelector, selectUsersData } from '../redux/store';
import { useTheme } from '../hooks/useTheme';

const list = cn(
  'flex',
  'gap-x-3',
  'mb-8',
  'justify-center',
  'mt-2',
  'max-904:mt-20',
  'max-904:mb-5',
);
const btn = cn(
  'text-primary-black',
  'px-4',
  'py-3',
  'rounded-main',
  'bg-primary-gray',
  'transition-all',
  'hover:bg-hover-gray',
  'active:bg-active-gray',
  'flex',
  'dark:bg-hover-black',
  'dark:hover:bg-active-black',
  'dark:active:bg-dark-active-black',
  'dark:text-white',
  'min-365-max-640:p-1.5',
  'min-365-max-640:px-1',
	'min-641-max-904:mt-10',
);

const links = [
  {
    name: 'Добавить товар',
    path: '/admin/addProduct',
  },
  {
    name: 'Добавить категорию товаров',
    path: '/admin/addCategory',
  },
];

export function AdminControls() {
  const isLoading = useAppSelector(selectUsersData).isLoading;
  const { theme } = useTheme();

  return (
    <section>
      <Container>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <ul className={list}>
              {links.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    className={btn}
                    style={({ isActive }) => ({
                      backgroundColor: isActive
                        ? theme === 'light'
                          ? '#1D1D1D'
                          : '#fff'
                        : '',
                      color: isActive
                        ? theme === 'light'
                          ? '#fff'
                          : '#1D1D1D'
                        : '',
                    })}
                  >
                    {link.name}
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
