import { Link } from 'react-router-dom';
import cn from 'classnames';

import {
  selectMobileMenuData,
  useAppDispatch,
  useAppSelector,
} from '../../redux/store';
import { setMobileMenuActive } from '../../redux/slices/mobileMenuSlice';

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
  'dark:text-primary-black'
);

export function LogInBtn() {
  const mobileIsActive = useAppSelector(selectMobileMenuData);
  const dispatch = useAppDispatch();

  const logInHandler = () => {
    if (mobileIsActive) {
      dispatch(setMobileMenuActive(false));
    }
  };

  return (
    <Link className={logInBtn} to={'/login'} onClick={logInHandler}>
      Войти
    </Link>
  );
}
