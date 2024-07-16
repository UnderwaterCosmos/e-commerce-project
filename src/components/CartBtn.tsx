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
}

export function CartBtn({
  productId,
  onClick,
  ...props
}: IProductId & React.HTMLProps<HTMLButtonElement>) {
  const fullUserInfo = useAppSelector(selectUsersData).fullUserInfo;
  const dispatch = useAppDispatch();

  const isProductInCart = React.useMemo(
    () => fullUserInfo?.cart.some((product) => product.id === productId),
    [fullUserInfo?.cart]
  );

  const cartBtn = cn('bg-emerald-300', 'rounded-xl', 'p-1', {
    'bg-red-300 opacity-75 cursor-default':
      isProductInCart || !Boolean(fullUserInfo),
  });

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
      Добавить в корзину
    </button>
  );
}
