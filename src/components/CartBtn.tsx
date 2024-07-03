import React from 'react';
import cn from 'classnames';

import { useAppSelector, selectUsersData } from '../redux/store';

interface IProductId {
  productId?: number;
}

export function CartBtn({
  productId,
  ...props
}: IProductId & React.HTMLProps<HTMLButtonElement>) {
  const fullUserInfo = useAppSelector(selectUsersData).fullUserInfo;

  const isProductInCart = React.useMemo(
    () => fullUserInfo?.cart.some((product) => product.id === productId),
    [fullUserInfo?.cart]
  );

  const cartBtn = cn('bg-emerald-300', 'rounded-xl', 'p-1', {
    'bg-red-300': isProductInCart || !Boolean(fullUserInfo),
  });

  return (
    <button
      {...props}
      disabled={isProductInCart || !Boolean(fullUserInfo)}
      className={cartBtn}
      type="button"
    >
      В корзину
    </button>
  );
}
