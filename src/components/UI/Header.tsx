import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import cn from 'classnames';

import { Container } from './Container';
import { ThemeSwitcher } from './ThemeSwitcher';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useTheme } from '../../hooks/useTheme';
import {
  useAppSelector,
  selectUsersData,
  useAppDispatch,
} from '../../redux/store';
import { resetFullUserInfo } from '../../redux/slices/usersSlice';
import { setNotification } from '../../redux/slices/notificationSlice';

const headerWrapper = cn(
  'flex',
  'justify-between',
  'items-center',
  'py-5',
  'text-white'
);
const logoName = cn(
  'text-primary-black',
  'font-[InterTightSemiBold]',
  'text-2xl',
  'dark:text-white'
);
const navList = cn(
  'flex',
  'gap-x-2',
  'bg-primary-gray',
  'p-1',
  'rounded-main',
  'dark:bg-[#282828]'
);
const controls = cn('flex', 'gap-x-4', 'items-center');
const controlsCart = cn(
  'px-4',
  'py-2.5',
  'bg-primary-black',
  'rounded-main',
  'flex',
  'items-center',
  'gap-x-2.5',
  'transition-all',
  'hover:bg-hover-black',
  'active:bg-active-black',
  'dark:bg-white',
  'dark:text-primary-black',
	'dark:hover:bg-hover-gray',
  'dark:active:bg-active-gray',
);
const navListLink = cn(
  'text-primary-black',
  'px-4',
  'py-2',
  'rounded-lg',
  'transition-all',
  'hover:bg-hover-gray',
  'active:bg-active-gray',
  'dark:text-white',
  'dark:hover:bg-hover-black'
);
const logOutBtn = cn(
  'cursor-pointer',
  'flex',
	'items-center',
  'gap-x-2.5',
  'px-4',
  'py-2.5',
  'rounded-main',
  'text-black',
  'bg-primary-gray',
  'transition-all',
  'hover:bg-hover-gray',
  'active:bg-active-gray',
  'dark:bg-hover-black',
  'dark:text-white',
	'dark:hover:bg-active-black'
);
const logInBtn = cn(
  'cursor-pointer',
  'bg-primary-black',
  'px-4',
  'py-2.5',
  'rounded-main',
  'text-white',
  'transition-all',
  'hover:bg-hover-black',
  'active:bg-active-black',
	'dark:bg-white',
	'dark:text-primary-black',
);

const customerLinks = [
  {
    name: 'Главная',
    path: '/main',
  },
  {
    name: 'Товары',
    path: '/products',
  },
];
const adminLinks = [
  ...customerLinks,
  {
    name: 'Администрирование',
    path: '/admin',
  },
];

export default React.memo(function Header() {
  const token = useLocalStorage('token');
  const fullUserInfoStorage = useLocalStorage('persist:usersData');
  const fullUserInfo = useAppSelector(selectUsersData).fullUserInfo;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const links = fullUserInfo?.type === 'admin' ? adminLinks : customerLinks;

  const logOutHandler = () => {
    dispatch(resetFullUserInfo());
    fullUserInfoStorage.removeItem();
    token.removeItem();
    navigate('/main');
    dispatch(
      setNotification({
        type: 'success',
        message: 'Вы успешно вышли из профиля!',
      })
    );
  };

  return (
    <header className="mb-8">
      <Container>
        <div className={headerWrapper}>
          <Link to={'/'} className="flex items-center gap-x-3 mr-16">
            <svg
              width="29"
              height="30"
              viewBox="0 0 29 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 0.5C4.47715 0.5 0 4.97715 0 10.5V19.5C0 25.0228 4.47715 29.5 10 29.5H19C24.5228 29.5 29 25.0228 29 19.5V10.5C29 4.97715 24.5228 0.5 19 0.5H10ZM16.9411 8.72378C15.379 7.16168 12.8463 7.16168 11.2842 8.72378L8.22375 11.7843C6.66166 13.3463 6.66166 15.879 8.22375 17.4411L11.2842 20.5016C12.8463 22.0637 15.379 22.0637 16.9411 20.5016L20.0016 17.4411C21.5637 15.879 21.5637 13.3463 20.0016 11.7842L16.9411 8.72378Z"
                fill={theme === 'light' ? '#1D1D1D' : '#D9D9D9'}
              />
            </svg>
            <p className={logoName}>e-com</p>
          </Link>
          <nav className="mr-auto">
            <ul className={navList}>
              {links.map((link) => (
                <li className="py-1.5" key={link.path}>
                  <NavLink
                    to={link.path}
                    className={navListLink}
                    style={({ isActive }) => ({
                      backgroundColor: isActive
                        ? theme === 'light'
                          ? '#fff'
                          : '#545454'
                        : '',
                    })}
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <ul className={controls}>
            {fullUserInfo ? (
              <>
                <li>
                  <Link to={'/cart'} className={controlsCart}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.91664 6.20016C5.91664 5.78595 5.58085 5.45016 5.16664 5.45016C4.75243 5.45016 4.41665 5.78595 4.41665 6.20016C4.41665 8.18421 6.01685 9.8001 7.99998 9.8001C9.98312 9.8001 11.5833 8.1842 11.5833 6.20016C11.5833 5.78595 11.2475 5.45016 10.8333 5.45016C10.4191 5.45016 10.0833 5.78595 10.0833 6.20016C10.0833 7.36407 9.14642 8.30011 7.99998 8.30011C6.85352 8.30011 5.91664 7.36406 5.91664 6.20016Z"
                        fill={theme === 'light' ? '#fff' : '#1D1D1D'}
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2.77378 0.426808C2.91533 0.236963 3.13823 0.125122 3.37504 0.125122H12.625C12.8618 0.125122 13.0847 0.236963 13.2262 0.426808L15.343 3.26582C15.4119 3.35458 15.4612 3.4592 15.4846 3.57327C15.4955 3.62602 15.5005 3.67953 15.5 3.73282V14.3749C15.5 15.2033 14.8284 15.8749 14 15.8749H2.00004C1.1716 15.8749 0.500046 15.2033 0.500046 14.3749V3.73282C0.499458 3.67952 0.504527 3.62602 0.515392 3.57327C0.538822 3.4592 0.588154 3.35457 0.656974 3.2658L2.77378 0.426808ZM12.2486 1.62511L13.2551 2.97496H2.74489L3.75136 1.62511H12.2486ZM2.00004 4.47495V14.3749H14V4.47495H2.00004Z"
                        fill={theme === 'light' ? '#fff' : '#1D1D1D'}
                      />
                    </svg>
                    <span>Корзина</span>
                  </Link>
                </li>
                <li className={logOutBtn} onClick={logOutHandler}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 11.3333L12.1667 8L8 4.66667V7.16667H0.5V8.83333H8V11.3333Z"
                      fill={theme === 'dark' ? '#fff' : '#1D1D1D'}
                    />
                    <path
                      d="M13.8333 0.5H6.33333C5.41417 0.5 4.66667 1.2475 4.66667 2.16667V5.5H6.33333V2.16667H13.8333V13.8333H6.33333V10.5H4.66667V13.8333C4.66667 14.7525 5.41417 15.5 6.33333 15.5H13.8333C14.7525 15.5 15.5 14.7525 15.5 13.8333V2.16667C15.5 1.2475 14.7525 0.5 13.8333 0.5Z"
                      fill={theme === 'dark' ? '#fff' : '#1D1D1D'}
                    />
                  </svg>
                  <span>Выйти</span>
                </li>
                <li>
                  <Link to={'/user/info'}>
                    <img
                      src={fullUserInfo?.avatarUrl}
                      className="rounded-full"
                      width={50}
                      alt="Your's avatar"
                    />
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link className={logInBtn} to={'/login'}>
                    Войти
                  </Link>
                </li>
                <li>
                  <img
                    src="/images/avatar-placeholder.png"
                    width={60}
                    alt="placeholder"
                  />
                </li>
              </>
            )}
            <li>
              <ThemeSwitcher />
            </li>
          </ul>
        </div>
      </Container>
    </header>
  );
});
