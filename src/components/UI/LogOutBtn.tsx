import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

import { useTheme } from '../../hooks/useTheme';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import {
  selectMobileMenuData,
  useAppDispatch,
  useAppSelector,
} from '../../redux/store';
import { resetFullUserInfo } from '../../redux/slices/usersSlice';
import { setNotification } from '../../redux/slices/notificationSlice';
import { setMobileMenuActive } from '../../redux/slices/mobileMenuSlice';

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

export function LogOutBtn() {
  const mobileIsActive = useAppSelector(selectMobileMenuData);
  const token = useLocalStorage('token');
  const fullUserInfoStorage = useLocalStorage('persist:usersData');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { theme } = useTheme();

  const logOutHandler = () => {
    dispatch(resetFullUserInfo());
    fullUserInfoStorage.removeItem();
    token.removeItem();
    if (mobileIsActive) {
      dispatch(setMobileMenuActive(false));
    }
    navigate('/main');
    dispatch(
      setNotification({
        type: 'success',
        message: 'Вы успешно вышли из профиля!',
      })
    );
  };

  return (
    <button type="button" className={logOutBtn} onClick={logOutHandler}>
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
    </button>
  );
}
