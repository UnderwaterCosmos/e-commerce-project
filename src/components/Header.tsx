import { Link } from 'react-router-dom';
import cn from 'classnames';
import { FaRegSun } from 'react-icons/fa6';
import { BsCart4 } from 'react-icons/bs';
import { RiLogoutBoxRLine, RiLogoutBoxLine } from 'react-icons/ri';

import { Container } from './Container';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { removeAuthorizedUser } from '../redux/slices/usersSlice';

const headerWrapper = cn('flex', 'justify-between', 'py-4', 'text-white');
const navList = cn('flex', 'gap-x-2');
const controls = cn('flex', 'gap-x-4', 'items-center');

export function Header() {
  const { removeItem } = useLocalStorage('token');
  const { authUser } = useAppSelector((state) => state.usersData);
  const dispatch = useAppDispatch();

  const authUserHandler = () => {
    if (authUser && authUser.id) {
      dispatch(removeAuthorizedUser(authUser.id));
      removeItem();
    }
  };

  return (
    <header className="bg-slate-800 mb-4">
      <Container>
        <div className={headerWrapper}>
          <Link to={'/products'}>WB 2.0</Link>
          <nav>
            <ul className={navList}>
              <Link to={'/'}>
                <li>Главная</li>
              </Link>
              <Link to={'/products'}>
                <li>Товары</li>
              </Link>
            </ul>
          </nav>
          <ul className={controls}>
            <li>
              <FaRegSun size={20} />
            </li>
            <li>
              <BsCart4 size={20} />
            </li>
            <li>
              <img src="#" alt="Your's avatar" />
            </li>
            {authUser ? (
              <Link to={'/'}>
                <li onClick={authUserHandler}>
                  <RiLogoutBoxLine size={20} />
                </li>
              </Link>
            ) : (
              <Link to={'/login'}>
                <li>
                  <RiLogoutBoxRLine size={20} />
                </li>
              </Link>
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
