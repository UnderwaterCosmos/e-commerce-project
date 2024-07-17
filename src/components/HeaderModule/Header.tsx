import { Link, useLocation, useNavigate } from 'react-router-dom';
import cn from 'classnames';
import Select from 'react-select';

import { Container } from '../Container';
import { NavListItem } from './NavListItem';
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
  'py-4',
  'text-white'
);
const logoName = cn('text-main-black', 'font-[InterTightSemiBold]', 'text-2xl');
const navList = cn('flex', 'gap-x-2', 'bg-main-gray', 'p-1', 'rounded-[10px]');
const controls = cn('flex', 'gap-x-4', 'items-center');
const controlsCart = cn('px-4', 'py-2.5', 'bg-main-black rounded-[10px]');
const logOutBtn = cn(
  'cursor-pointer',
  'flex',
  'gap-x-2.5',
  'bg-main-gray',
  'px-4',
  'py-2.5',
  'rounded-[10px]',
  'text-black'
);
const logInBtn = cn(
  'cursor-pointer',
  'bg-main-black',
  'px-4',
  'py-2.5',
  'rounded-[10px]',
  'text-white'
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
  'bg-[#0147FF]'
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
  const location = useLocation();

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
    <header className="mb-4">
      <Container>
        <div className={headerWrapper}>
          <Link to={'/products'} className="flex items-center gap-x-3">
            <img src="/images/logo.svg" width={30} height={30} alt="logo" />
            <p className={logoName}>e-com</p>
          </Link>
          <nav>
            <ul className={navList}>
              {links.map((link) => (
                <NavListItem
                  link={link}
                  path={location.pathname}
                  key={link.name}
                />
              ))}
            </ul>
          </nav>
          <ul className={controls}>
            {fullUserInfo ? (
              <>
                <li className={controlsCart}>
                  <Link to={'/cart'} className="flex gap-x-2.5">
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
                <li className={logInBtn}>
                  <Link to={'/login'}>Войти</Link>
                </li>
                <li>
                  <img
                    src="images/avatar-placeholder.png"
                    width={60}
                    height={60}
                    alt="Your's avatar"
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
              {/* <Select
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
              /> */}
              <select className="text-black">
                <option value="ru">RU</option>
                <option value="en">EN</option>
              </select>
            </li>
          </ul>
        </div>
      </Container>
    </header>
  );
}
