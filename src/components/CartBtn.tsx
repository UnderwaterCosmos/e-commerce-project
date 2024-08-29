import React from 'react';
import cn from 'classnames';

import {
  useAppSelector,
  selectUsersData,
  useAppDispatch,
} from '../redux/store';
import { setNotification } from '../redux/slices/notificationSlice';

interface IProductId {
  productId?: number;
  onClick: () => void;
  children: React.ReactNode;
}

export function CartBtn({
  productId,
  onClick,
  children,
  ...props
}: IProductId & React.HTMLProps<HTMLButtonElement>) {
  const fullUserInfo = useAppSelector(selectUsersData).fullUserInfo;
  const dispatch = useAppDispatch();

  const isProductInCart = React.useMemo(
    () => fullUserInfo?.cart.some((product) => product.id === productId),
    [fullUserInfo?.cart]
  );

  const cartBtn = cn(
    'bg-primary-blue',
    'transition-all',
    'hover:bg-hover-blue',
    'active:bg-active-blue',
    'rounded-lg',
    'text-white',
    'font-medium',
    'max-w-40',
    'py-2.5',
    'px-4',
    'whitespace-nowrap',
    'flex',
    'justify-center',
    {
      'px-[11px] !py-0.5 text-2xl': children === '+',
      'opacity-50 hover:bg-primary-blue active:bg-primary-blue transition-none cursor-default':
        isProductInCart || !Boolean(fullUserInfo),
      'min-365-max-640:max-w-full min-365-max-640:text-sm min-641-max-904:min-w-[602px] min-641-max-904:mx-auto':
        children === 'Добавить в корзину',
    }
  );

  const clickHandler = () => {
    if (!Boolean(fullUserInfo)) {
      return dispatch(
        setNotification({ type: 'error', message: 'Войдите в профиль!' })
      );
    }
    if (isProductInCart) {
      return dispatch(
        setNotification({
          type: 'error',
          message: 'Товар уже добавлен в корзину!',
        })
      );
    }
    return onClick();
  };

  return (
    <button {...props} className={cartBtn} type="button" onClick={clickHandler}>
      {children}
    </button>
  );
}
