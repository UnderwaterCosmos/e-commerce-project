import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { FaRegSun } from 'react-icons/fa6';
import { BsCart4 } from 'react-icons/bs';
import { RiLogoutBoxRLine, RiLogoutBoxLine } from 'react-icons/ri';

import { Container } from './Container';
import { useLocalStorage } from '../hooks/useLocalStorage';
import {
  useAppDispatch,
  useAppSelector,
  selectUsersData,
} from '../redux/store';
import { removeAuthorizedUser } from '../redux/slices/usersSlice';

const headerWrapper = cn('flex', 'justify-between', 'py-4', 'text-white');
const navList = cn('flex', 'gap-x-2');
const controls = cn('flex', 'gap-x-4', 'items-center');

export function Header() {
  const { removeItem } = useLocalStorage('token');
  const authUserInfo = useAppSelector(selectUsersData).authUserInfo;
  const fullUserInfo = useAppSelector(selectUsersData).fullUserInfo;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!authUserInfo) {
      navigate('/');
    }
  }, [authUserInfo]);

  const authUserHandler = () => {
    if (authUserInfo && authUserInfo.id) {
      dispatch(removeAuthorizedUser(authUserInfo.id));
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
            <Link to={'/cart'}>
              <li>
                <BsCart4 size={20} />
              </li>
            </Link>
            {authUserInfo ? (
              <>
                <Link to={'/user'}>
                  <li>
                    <img
                      src={fullUserInfo?.avatarUrl}
                      width={60}
                      height={60}
                      alt="Your's avatar"
                    />
                  </li>
                </Link>
                <li className="cursor-pointer" onClick={authUserHandler}>
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
