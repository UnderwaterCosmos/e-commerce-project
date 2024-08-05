import { Link } from 'react-router-dom';
import cn from 'classnames';

import { Container } from '../components/Container';
import { Loader } from '../components/Loader';
import { useAppSelector, selectUsersData } from '../redux/store';

const list = cn('flex', 'gap-x-3', 'mb-8', 'justify-center', 'mt-2');
const btn = cn(
  'text-white',
  'px-4',
  'py-3',
  'bg-primary-black',
  'rounded-main'
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

export function Admin() {
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
                  <Link to={link.path} className={btn}>
                    {link.name}
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
