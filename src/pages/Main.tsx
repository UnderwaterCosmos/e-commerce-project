import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { Container } from '../components/UI/Container';
import {
  useAppSelector,
  selectUsersData,
  useAppDispatch,
} from '../redux/store';
import { fetchUsersList, logInUser } from '../redux/slices/usersSlice';
import { IUser } from '../types/users';

const mainWrapper = cn('mt-16', 'px-6', 'flex', 'gap-x-28');
const greeting = cn(
  'max-w-[500px]',
  'text-primary-h1',
  'font-semibold',
  'mb-14'
);
const accountsListItem = cn(
  'bg-primary-gray',
  'px-3',
  'p-4',
  'flex',
  'flex-col',
  'rounded-main',
  'cursor-pointer',
  'max-w-2xl',
  'mx-auto'
);

const infoList = [
  {
    path: '/images/main-user.svg',
    text: 'Регистрация и авторизация: Создайте свой аккаунт, чтобы получить доступ ко всем функциям сайта.',
  },
  {
    path: '/images/search-blue.svg',
    text: 'Поиск и фильтрация товаров: Удобный поиск помогут найти именно то, что вам нужно.',
  },
  {
    path: '/images/list-ul.svg',
    text: 'Корзина и оформление заказа: Добавляйте товары в корзину, оформляйте заказы и проверяйте их историю.',
  },
];

export function Main() {
  const fullUserInfo = useAppSelector(selectUsersData).fullUserInfo;
  const usersList = useAppSelector(selectUsersData).usersList;
  const [openList, setOpenList] = React.useState(false);
  const dispatch = useAppDispatch();

  const accountsListOpener = cn('flex', 'items-center', 'gap-x-2', {
    'mb-4 pb-3 border-b border-b-active-gray': openList,
  });
  const triangleIcon = cn({ 'transition-all rotate-90': openList });
  const accountsList = cn({ 'cursor-default': openList });

  React.useEffect(() => {
    const usersListPromise = dispatch(fetchUsersList());

    return () => {
      usersListPromise.abort();
    };
  }, [dispatch]);

  const accountsListToggler = () => {
    setOpenList((prev) => !prev);
  };

  const submitHandler = (
    event: React.FormEvent<HTMLFormElement>,
    user: IUser
  ) => {
    event.preventDefault();
    dispatch(
      logInUser({
        login: user.login,
        password: user.password,
      })
    );
  };

  return (
    <main className="grow">
      <Container>
        <section className={mainWrapper}>
          <div>
            <img src="/images/eyes.png" className="mb-4" alt="eyes" />
            <h2 className={greeting}>
              Привет! Я рад приветствовать вас на моем небольшом проекте
              маркетплейса для портфолио.
            </h2>
          </div>
          <div>
            <p className="font-semibold mb-6">Что вас ждет:</p>
            <ul className="mb-16">
              {infoList.map((listItem) => (
                <li className="flex gap-x-6 mb-4" key={listItem.path}>
                  <img src={listItem.path} width={18} alt="" />
                  <p>{listItem.text}</p>
                </li>
              ))}
            </ul>
            <p>
              При регистрации в качестве Администратора, вы получите возможность
              создавать как категории товаров, так и сами товары.
            </p>
          </div>
        </section>
        {!fullUserInfo && (
          <section>
            <h2 className="text-center text-xl mb-4">
              Вы можете войти в аккаунт с помощью готового профиля или{' '}
              <Link to="/registration" className="text-primary-blue">
                создать собственный
              </Link>
            </h2>
            <div className={accountsListItem} onClick={accountsListToggler}>
              <div className={accountsListOpener}>
                <img
                  className={triangleIcon}
                  src="/images/history-arrow.svg"
                  width={10}
                  alt=""
                />
                Список готовых профилей
              </div>
              {openList && (
                <ul
                  className={accountsList}
                  onClick={(event) => event.stopPropagation()}
                >
                  {usersList.map((user) => (
                    <li
                      className="mb-2 bg-hover-gray rounded-main text-lg"
                      key={user.id}
                    >
                      <form onSubmit={(event) => submitHandler(event, user)}>
                        <button className="w-full text-center p-1.5">
                          {user.login}
                        </button>
                      </form>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        )}
      </Container>
    </main>
  );
}
