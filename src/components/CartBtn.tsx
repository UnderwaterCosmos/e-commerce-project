import React from 'react';
import cn from 'classnames';

const cartBtn = cn('bg-emerald-300', 'rounded-xl', 'p-1');

export function CartBtn() {
  return (
    <button className={cartBtn} type="button">
      В корзину
    </button>
  );
}
