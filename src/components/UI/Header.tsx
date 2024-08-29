import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import cn from 'classnames';

import { Container } from './Container';
import { BurgerBtn } from './BurgerBtn';
import { MobileMenu } from './MobileMenu';
import { MobileControlsList } from './MobileControlsList';
import { DescTopControlsList } from './DescTopControlsList';
import {
  useAppSelector,
  selectUsersData,
  useAppDispatch,
} from '../../redux/store';
import { setMobileMenuActive } from '../../redux/slices/mobileMenuSlice';
import { useTheme } from '../../hooks/useTheme';

const parentHeader = cn(
  'mb-8',
  'max-904:fixed',
  'max-904:bg-primary-gray',
  'max-904:w-full',
  'max-904:border-b',
  'dark:min-365-max-640:border-b-active-black',
  'dark:min-365-max-640:bg-hover-black',
  'max-904:z-[10]'
);
const headerWrapper = cn(
  'flex',
  'justify-between',
  'items-center',
  'py-5',
  'text-white',
  'max-904:py-3',
  'min-641-max-904:!py-1'
);
const logoName = cn(
  'text-primary-black',
  'font-[InterTightSemiBold]',
  'text-2xl',
  'dark:text-white',
  'whitespace-nowrap'
);
const navList = cn(
  'flex',
  'gap-x-2',
  'bg-primary-gray',
  'p-1',
  'rounded-main',
  'dark:bg-dark-background'
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
  'dark:hover:bg-hover-black',
  'dark:active:bg-dark-active-black'
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
  const fullUserInfo = useAppSelector(selectUsersData).fullUserInfo;
  const dispatch = useAppDispatch();
  const { theme } = useTheme();

  const logoLink = cn(
    'flex',
    'items-center',
    'gap-x-3',
    'mr-16',
    'max-904:ml-20',
    'min-905:mr-auto',
    { 'min-365-max-640:mr-10': fullUserInfo }
  );

  const links = fullUserInfo?.type === 'admin' ? adminLinks : customerLinks;

  return (
    <header className={parentHeader}>
      <Container>
        <div className={headerWrapper}>
          <BurgerBtn />
          <Link
            to={'/'}
            className={logoLink}
            onClick={() => dispatch(setMobileMenuActive(false))}
          >
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
          <nav className="mr-auto max-904:hidden">
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
          <MobileControlsList />
          <DescTopControlsList />
          <MobileMenu links={links} />
        </div>
      </Container>
    </header>
  );
});
