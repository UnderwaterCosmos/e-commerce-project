import { Link } from 'react-router-dom';
import cn from 'classnames';

import { ThemeSwitcher } from '../../../components/UI/ThemeSwitcher';
import { LogOutBtn } from '../../../components/UI/LogOutBtn';
import { LogInBtn } from '../../../components/UI/LogInBtn';
import { selectUsersData, useAppSelector } from '../../../redux/store';
import { useTheme } from '../../../hooks/useTheme';

const controls = cn('flex', 'gap-x-4', 'items-center', 'max-904:hidden');
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
  'dark:active:bg-active-gray'
);

export function DescTopControlsList() {
  const fullUserInfo = useAppSelector(selectUsersData).fullUserInfo;
  const { theme } = useTheme();

  return (
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
          <li>
            <LogOutBtn />
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
            <LogInBtn />
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
  );
}
