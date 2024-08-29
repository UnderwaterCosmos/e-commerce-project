import React from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import {
  selectMobileMenuData,
  selectUsersData,
  useAppDispatch,
  useAppSelector,
} from '../../redux/store';
import { setMobileMenuActive } from '../../redux/slices/mobileMenuSlice';
import { ThemeSwitcher } from './ThemeSwitcher';
import { LogOutBtn } from './LogOutBtn';
import { LogInBtn } from './LogInBtn';

const menuContent = cn(
  'w-full',
  'h-full',
  'bg-[#F6F6F6]',
  'flex',
  'justify-center',
  'items-center',
  'text-center',
  'dark:bg-dark-background'
);
const menuLink = cn(
  'text-primary-black',
  'font-semibold',
  'text-xl',
  'dark:text-[#fff]'
);
const themeSwitcherWrapper = cn(
  'absolute',
  'flex',
  'justify-between',
  'w-full',
  'px-4',
  'items-center',
  'bottom-20'
);

interface IProps {
  links: {
    name: string;
    path: string;
  }[];
}

export function MobileMenu({ links }: IProps) {
  const fullUserInfo = useAppSelector(selectUsersData).fullUserInfo;
  const mobileIsActive = useAppSelector(selectMobileMenuData);
  const dispatch = useAppDispatch();

  const menu = cn(
    'fixed',
    'w-screen',
    'h-screen',
    'top-14',
    'left-0',
    'translate-x-[-100%]',
    'transition-all',
    { '!translate-x-0': mobileIsActive }
  );

  React.useEffect(() => {
    if (mobileIsActive) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [mobileIsActive]);

  return (
    <div className={menu}>
      <div className={menuContent}>
        <ul className="flex flex-col gap-y-8">
          {links.map((link) => (
            <li
              key={link.path}
              onClick={() => dispatch(setMobileMenuActive(false))}
            >
              <NavLink to={link.path} className={menuLink}>
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className={themeSwitcherWrapper}>
          <ThemeSwitcher />
          {fullUserInfo ? <LogOutBtn /> : <LogInBtn />}
        </div>
      </div>
    </div>
  );
}
