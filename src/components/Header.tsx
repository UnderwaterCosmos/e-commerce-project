import { Link, useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { FaRegSun } from 'react-icons/fa6';
import { BsCart4 } from 'react-icons/bs';
import { RiLogoutBoxRLine, RiLogoutBoxLine } from 'react-icons/ri';

import { Container } from './Container';
import { useLocalStorage } from '../hooks/useLocalStorage';
import {
  useAppSelector,
  selectUsersData,
  useAppDispatch,
} from '../redux/store';
import { resetFullUserInfo } from '../redux/slices/usersSlice';
import { setNotification } from '../redux/slices/notificationSlice';

const headerWrapper = cn('flex', 'justify-between', 'py-4', 'text-white');
const navList = cn('flex', 'gap-x-2');
const controls = cn('flex', 'gap-x-4', 'items-center');

const customerLinks = [
  {
    name: 'Главная',
    path: '/',
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
    <header className="bg-slate-800 mb-4">
      <Container>
        <div className={headerWrapper}>
          <Link to={'/products'}>WB 2.0</Link>
          <nav>
            <ul className={navList}>
              {links.map((link) => (
                <li key={link.name}>
                  <Link to={link.path}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <ul className={controls}>
            <li>
              <FaRegSun size={20} />
            </li>
            {fullUserInfo ? (
              <>
                <Link to={'/cart'}>
                  <li>
                    <BsCart4 size={20} />
                  </li>
                </Link>
                <Link to={'/user/info'}>
                  <li>
                    <img
                      src={fullUserInfo?.avatarUrl}
                      width={60}
                      height={60}
                      alt="Your's avatar"
                    />
                  </li>
                </Link>
                <li className="cursor-pointer" onClick={logOutHandler}>
                  <RiLogoutBoxLine size={20} />
                </li>
              </>
            ) : (
              <>
                <li>
                  <img
                    src="images/avatar-placeholder.png"
                    width={60}
                    height={60}
                    alt="Your's avatar"
                  />
                </li>
                <Link to={'/login'}>
                  <li>
                    <RiLogoutBoxRLine size={20} />
                  </li>
                </Link>
              </>
            )}
            <li>
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
