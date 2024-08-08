import React from 'react';
import cn from 'classnames';

const checkoutBtn = cn(
  'px-4',
  'py-[10px]',
  'text-white',
  'rounded-main',
  'bg-primary-blue',
  'transition-all',
  'hover:bg-hover-blue',
  'active:bg-active-blue'
);

export function CheckoutBtn(props: React.HTMLProps<HTMLButtonElement>) {
  return (
    <button {...props} className={checkoutBtn} type="button">
      Оформить заказ
    </button>
  );
}
