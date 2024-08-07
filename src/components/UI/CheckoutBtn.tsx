import React from 'react';
import cn from 'classnames';

const checkoutBtn = cn(
  'px-4',
  'py-[10px]',
  'bg-primary-blue',
  'text-white',
  'rounded-main'
);

export function CheckoutBtn(props: React.HTMLProps<HTMLButtonElement>) {
  return (
    <button {...props} className={checkoutBtn} type="button">
      Оформить заказ
    </button>
  );
}
