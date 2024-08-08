import { Link, NavLink, useNavigate } from 'react-router-dom';
import cn from 'classnames';
import Select from 'react-select';

import { Container } from './Container';
import { useLocalStorage } from '../../hooks/useLocalStorage';
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
  'text-2xl'
);
const navList = cn('flex', 'gap-x-2', 'bg-primary-gray', 'p-1', 'rounded-main');
const controls = cn('flex', 'gap-x-4', 'items-center');
const controlsCart = cn(
  'px-4',
  'py-2.5',
  'bg-primary-black',
  'rounded-main',
  'flex',
  'gap-x-2.5',
  'transition-all',
  'hover:bg-hover-black',
  'active:bg-active-black'
);
const navListLink = cn(
  'text-primary-black',
  'px-4',
  'py-2',
  'rounded-lg',
  'transition-all',
  'hover:bg-hover-gray',
  'active:bg-active-gray'
);
const logOutBtn = cn(
  'cursor-pointer',
  'flex',
  'gap-x-2.5',
  'px-4',
  'py-2.5',
  'rounded-main',
  'text-black',
  'bg-primary-gray',
  'transition-all',
  'hover:bg-hover-gray',
  'active:bg-active-gray'
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
  'active:bg-active-black'
);
const lightSwitcher = cn(
  'w-14',
  'h-7',
  'flex',
  'gap-x-1',
  'items-center',
  'p-0.5',
  'rounded-full',
  'bg-[#FFDB4D]'
);
const darkSwitcher = cn(
  'w-14',
  'h-7',
  'flex',
  'gap-x-1',
  'items-center',
  'p-0.5',
  'rounded-full',
  'bg-primary-blue'
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
const selectOptions = [
  {
    value: 'ru',
    label: 'RU',
  },
  {
    value: 'en',
    label: 'EN',
  },
];

export function Header() {
  const token = useLocalStorage('token');
  const fullUserInfoStorage = useLocalStorage('persist:usersData');
  const fullUserInfo = useAppSelector(selectUsersData).fullUserInfo;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
          <Link to={'/'} className="flex items-center gap-x-3">
            <img src="/images/logo.svg" width={30} height={30} alt="logo" />
            <p className={logoName}>e-com</p>
          </Link>
          <nav>
            <ul className={navList}>
              {links.map((link) => (
                <li className="py-1.5" key={link.name}>
                  <NavLink
                    to={link.path}
                    className={navListLink}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? 'white' : '',
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
                    <img src="/images/cart.svg" alt="cart" />
                    <span>Корзина</span>
                  </Link>
                </li>
                <li className={logOutBtn} onClick={logOutHandler}>
                  <img src="/images/log-out.svg" alt="log out" />
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
                    src="images/avatar-placeholder.png"
                    width={60}
                    alt="placeholder"
                  />
                </li>
              </>
            )}
            <li>
              <div className={lightSwitcher}>
                <img src="/images/sun.svg" alt="sun" className="ml-auto" />
                <div className="w-6 h-6 rounded-full bg-white" />
              </div>
              {/* <div className={darkSwitcher}>
                <div className="w-6 h-6 rounded-full bg-white" />
                <img src="/images/moon.svg" alt="sun" className="mr-auto" />
              </div> */}
            </li>
            <li>
              <Select
                options={selectOptions}
                defaultValue={selectOptions[0]}
                styles={{
                  control: (baseStyles) => ({
                    ...baseStyles,
                    backgroundColor: '#EEEEEE',
                  }),
                  option: (baseStyles) => ({
                    ...baseStyles,
                    color: '#1D1D1D',
                  }),
                }}
              />
              {/* <select className="text-black">
                <option value="ru">RU</option>
                <option value="en">EN</option>
              </select> */}
            </li>
          </ul>
        </div>
      </Container>
    </header>
  );
}
