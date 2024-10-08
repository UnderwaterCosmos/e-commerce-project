import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { Container } from '../components/UI/Container';
import {
  useAppSelector,
  selectUsersData,
  useAppDispatch,
} from '../redux/store';
import { logInUser } from '../redux/slices/usersSlice';
import { useTheme } from '../hooks/useTheme';

const mainWrapper = cn(
  'mt-16',
  'px-6',
  'flex',
  'gap-x-28',
  'min-365-max-640:flex-col',
  'min-365-max-640:gap-x-0',
  'min-365-max-640:mt-20',
  'min-641-max-904:mt-24'
);
const greeting = cn(
  'max-w-[500px]',
  'text-primary-h1',
  'font-semibold',
  'mb-14',
  'dark:text-white',
  'min-365-max-640:text-xl',
  'min-365-max-640:mb-8'
);
const infoListItem = cn(
  'flex',
  'gap-x-6',
  'mb-4',
  'dark:text-white',
  'min-365-max-640:gap-x-4',
  'min-365-max-640:text-sm/[21px]'
);
const techList = cn(
  'list-disc',
  'max-w-[400px]',
  'mx-auto',
  'flex',
  'flex-wrap',
  'gap-x-8',
  'mb-8',
  'justify-center',
  'dark:text-[#fff]',
  'dark:marker:text-[#fff]',
  'min-641:text-lg'
);
const techTitle = cn(
  'text-center',
  'font-semibold',
  'mb-3',
  'dark:text-[#fff]',
  'min-641:text-lg'
);
const demoData = cn(
  'bg-primary-gray',
  'dark:bg-dark-background',
  'dark:text-white',
  'px-3',
  'p-4',
  'flex',
  'flex-col',
  'rounded-main',
  'cursor-pointer',
  'max-w-2xl',
  'mx-auto',
  'mb-2'
);
const demoListItem = cn(
  'mb-2',
  'bg-hover-gray',
  'hover:bg-active-gray',
  'rounded-main',
  'text-lg',
  'dark:bg-hover-black',
  'dark:hover:bg-active-black'
);
const demoLoginDataItem = cn(
  'mb-2',
  'bg-hover-gray',
  'dark:bg-hover-black',
  'rounded-main',
  'text-lg',
  'flex',
  'items-center',
  'justify-between',
  'px-[155px]',
  'gap-x-4',
  'min-365-max-640:px-3'
);
const enterAccTitle = cn(
  'text-center',
  'text-xl',
  'mb-4',
  'dark:text-white',
  'min-365-max-640:text-lg',
  'min-365-max-640:mb-2'
);

const infoList = [
  {
    path: '/images/main-accounts.svg',
    text: 'Регистрация и авторизация: Создайте свой аккаунт или выберите ниже один из готовых, чтобы получить доступ ко всем функциям сайта.',
  },
  {
    path: '/images/main-user.svg',
    text: 'Два вида аккаунтов: При регистрации в качестве Администратора, вы получите возможность создавать как категории товаров, так и сами товары.',
  },
  {
    path: '/images/user-circle.svg',
    text: 'Личный кабинет: Просмотрите информацию о пользователе, а также историю его заказов.',
  },
  {
    path: '/images/search-blue.svg',
    text: 'Поиск и фильтрация товаров: Удобный поиск и фильтрация по категориям помогут найти именно то, что вам нужно.',
  },
  {
    path: '/images/more-products.svg',
    text: 'Автоматическая подгрузка товаров (скролл): Реализована пагинация посредством бесконечной ленты.',
  },
  {
    path: '/images/list-ul.svg',
    text: 'Корзина и оформление заказа: Добавляйте товары в корзину, оформляйте заказы и проверяйте их историю.',
  },
  {
    path: '/images/moon-blue.svg',
    text: 'Темная и светлая темы: Меняйте тему на более подходящую вам.',
  },
  {
    path: '/images/devices.svg',
    text: 'Доступность на любом устройстве: Сайт полностью адаптирован под мобильные девайсы.',
  },
];
const technologiesList = [
  'TypeScript',
  'React',
  'Redux-Toolkit',
  'Redux-Persist',
  'React-Router-Dom',
  'React-Toastify',
  'React-Select',
  'React-Hook-Form',
  'Yup',
  'Tailwind CSS',
  'Classnames',
  'JSON Server',
];
const usersDemo = [
  {
    email: 'admin@email.com',
    password: '123123',
    login: 'Admin',
    avatarUrl: 'https://uznayvse.ru/person/winnie-harlow/Winnie_Harlow01.jpg',
    type: 'admin',
    cart: [
      {
        id: 2,
        title: 'Coffee Maker iconic 24',
        price: 3979,
        description: 'Programmable coffee maker with brew strength control.',
        quantity: 5,
        category: 'appliances',
        images: [
          'https://picsum.photos/id/4/280/220',
          'https://picsum.photos/id/5/280/220',
          'https://picsum.photos/id/6/280/220',
        ],
      },
    ],
    ordersHistory: {
      'Thu Aug 08 2024 13:45:29 GMT+0300 (Москва, стандартное время)': [
        {
          id: 7,
          title: 'Eyeliner elegant deluxe 21',
          price: 92697,
          description: 'Precision eyeliner for defined, dramatic eyes.',
          quantity: 1,
          category: 'cosmetics',
          images: [
            'https://picsum.photos/id/19/280/220',
            'https://picsum.photos/id/20/280/220',
            'https://picsum.photos/id/21/280/220',
          ],
        },
        {
          id: 2,
          title: 'Coffee Maker iconic 24',
          price: 3979,
          description: 'Programmable coffee maker with brew strength control.',
          quantity: 1,
          category: 'appliances',
          images: [
            'https://picsum.photos/id/4/280/220',
            'https://picsum.photos/id/5/280/220',
            'https://picsum.photos/id/6/280/220',
          ],
        },
      ],
      'Thu Aug 08 2024 13:45:57 GMT+0300 (Москва, стандартное время)': [
        {
          id: 35,
          title: 'Succulent gorgeous gorgeous gorgeous 3',
          price: 30954,
          description: 'Low-maintenance succulent that thrives in sunlight.',
          quantity: 1,
          category: 'houseplants',
          images: [
            'https://picsum.photos/id/103/280/220',
            'https://picsum.photos/id/104/280/220',
            'https://picsum.photos/id/641/280/220',
          ],
        },
        {
          id: 40,
          title: 'Concealer happy apple 28',
          price: 52321,
          description: 'High-coverage concealer that hides imperfections.',
          quantity: 1,
          category: 'cosmetics',
          images: [
            'https://picsum.photos/id/118/280/220',
            'https://picsum.photos/id/119/280/220',
            'https://picsum.photos/id/642/280/220',
          ],
        },
      ],
      'Thu Aug 08 2024 14:39:26 GMT+0300 (Москва, стандартное время)': [
        {
          id: 9,
          title: 'Foundation happy elegant 14',
          price: 54476,
          description: 'Smooth foundation that provides excellent coverage.',
          quantity: 1,
          category: 'cosmetics',
          images: [
            'https://picsum.photos/id/25/280/220',
            'https://picsum.photos/id/23/280/220',
            'https://picsum.photos/id/27/280/220',
          ],
        },
        {
          id: 14,
          title: 'Dishwasher iconic chocolate 17',
          price: 98020,
          description: 'Energy-efficient dishwasher with multiple wash cycles.',
          quantity: 1,
          category: 'appliances',
          images: [
            'https://picsum.photos/id/40/280/220',
            'https://picsum.photos/id/41/280/220',
            'https://picsum.photos/id/42/280/220',
          ],
        },
      ],
    },
    id: 1,
  },
  {
    email: 'customer@email.com',
    password: '321321',
    login: 'Customer',
    avatarUrl:
      'https://img0.liveinternet.ru/images/attach/b/3/30/172/30172285_ipvpp.jpg',
    type: 'customer',
    cart: [],
    ordersHistory: {},
    id: 2,
  },
];

export function Main() {
  const fullUserInfo = useAppSelector(selectUsersData).fullUserInfo;
  const [openDemo, setOpenDemo] = React.useState<{
    list: boolean;
    loginData: boolean;
  }>({
    list: false,
    loginData: false,
  });
  const dispatch = useAppDispatch();
  const { theme } = useTheme();

  const accountsListOpener = cn('flex', 'items-center', 'gap-x-2', {
    'mb-4 pb-3 border-b border-b-active-gray': openDemo.list,
  });
  const loginDataOpener = cn('flex', 'items-center', 'gap-x-2', {
    'mb-4 pb-3 border-b border-b-active-gray': openDemo.loginData,
  });
  const triangleIconList = cn({ 'transition-all rotate-90': openDemo.list });
  const triangleIconData = cn({
    'transition-all rotate-90': openDemo.loginData,
  });
  const accountsList = cn({ 'cursor-default': openDemo });

  const demoUsersDataToggler = (name: 'list' | 'loginData') => {
    setOpenDemo((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const submitHandler = (
    event: React.FormEvent<HTMLFormElement>,
    loginData: {
      login: string;
      password: string;
    }
  ) => {
    event.preventDefault();
    dispatch(logInUser(loginData));
  };

  return (
    <main className="grow">
      <Container>
        <section className={mainWrapper}>
          <div>
            <img
              src="/images/eyes.png"
              className="mb-4 min-365-max-640:w-6"
              alt="eyes"
            />
            <h2 className={greeting}>
              Привет! Я рад видеть Вас на моем проекте - аналоге известного
              маркетплейса.
            </h2>
          </div>
          <div className="min-365-max-640:mb-4">
            <p className="font-semibold mb-6 dark:text-white">
              Какой функционал здесь представлен?
            </p>
            <ul className="mb-16 min-365-max-640:mb-8 min-641-max-904:mb-6">
              {infoList.map((listItem) => (
                <li className={infoListItem} key={listItem.path}>
                  <img src={listItem.path} width={18} alt="" />
                  <p>{listItem.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section>
          <h3 className={techTitle}>Список использованных технологий:</h3>
          <ul className={techList}>
            {technologiesList.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </section>
        {!fullUserInfo && (
          <section>
            <h2 className={enterAccTitle}>
              Вы можете войти в аккаунт с помощью готового профиля или{' '}
              <Link
                to="/registration"
                className="text-primary-blue hover:text-hover-blue active:text-active-blue"
              >
                создать собственный
              </Link>
            </h2>
            <div
              className={demoData}
              onClick={() => demoUsersDataToggler('list')}
            >
              <div className={accountsListOpener}>
                <svg
                  className={triangleIconList}
                  width="16"
                  height="16"
                  viewBox="0 0 6 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.91683 9.16675L5.0835 5.00008L0.916831 0.833414L0.91683 9.16675Z"
                    fill={theme === 'light' ? '#1D1D1D' : 'white'}
                  />
                </svg>
                Список готовых профилей для автоматического входа
              </div>
              {openDemo.list && (
                <ul
                  className={accountsList}
                  onClick={(event) => event.stopPropagation()}
                >
                  {usersDemo.map((user) => (
                    <li className={demoListItem} key={user.id}>
                      <form
                        onSubmit={(event) =>
                          submitHandler(event, {
                            login: user.login,
                            password: user.password,
                          })
                        }
                      >
                        <button className="w-full text-center p-1.5">
                          {user.login}
                        </button>
                      </form>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div
              className={demoData}
              onClick={() => demoUsersDataToggler('loginData')}
            >
              <div className={loginDataOpener}>
                <svg
                  className={triangleIconData}
                  width="16"
                  height="16"
                  viewBox="0 0 6 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.91683 9.16675L5.0835 5.00008L0.916831 0.833414L0.91683 9.16675Z"
                    fill={theme === 'light' ? '#1D1D1D' : 'white'}
                  />
                </svg>
                Данные готовых профилей для ручного входа
              </div>
              {openDemo.loginData && (
                <ul
                  className={accountsList}
                  onClick={(event) => event.stopPropagation()}
                >
                  {usersDemo.map((user) => (
                    <li className={demoLoginDataItem} key={user.id}>
                      <p>{user.type.toUpperCase()}:</p>
                      <div className="flex flex-col">
                        <span>login - {user.login}</span>
                        <span>password - {user.password}</span>
                      </div>
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
