import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import { Container } from './UI/Container';
import { Loader } from './UI/Loader';
import { useAppSelector, selectUsersData } from '../redux/store';

const list = cn('flex', 'gap-x-3', 'mb-8', 'justify-center', 'mt-2');
const btn = cn(
  'text-primary-black',
  'px-4',
  'py-3',
  'rounded-main',
  'bg-primary-gray',
  'transition-all',
  'hover:bg-hover-gray',
  'active:bg-active-gray',
  'flex'
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
                      backgroundColor: isActive ? 'rgba(29, 29, 29, 1)' : '',
                      color: isActive ? 'white' : '',
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
