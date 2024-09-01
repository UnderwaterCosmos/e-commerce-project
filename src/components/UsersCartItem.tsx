import React from 'react';
import cn from 'classnames';

import { ISingleProduct } from '../types/products';

const checkoutItem = cn(
  'flex',
  'items-center',
  'gap-x-8',
  'pb-4',
  'mb-4',
  'border-b',
  'dark:border-b-hover-black',
  'min-365-max-640:gap-x-3.5'
);

interface IProps {
  cartItem: ISingleProduct;
}

export default React.memo(function UsersCartItem({ cartItem }: IProps) {
  const screenWidth = document.documentElement.clientWidth;
	const isMobileScreen = screenWidth > 345 && screenWidth < 641

  return (
    <li className={checkoutItem} key={cartItem.id}>
      <img
        className="rounded-main"
        src={cartItem.images[0]}
        width={ isMobileScreen ? 82 : 163}
        alt={cartItem.title}
      />
      <div className="w-full flex justify-between">
        <h4 className="font-semibold dark:text-white min-365-max-640:text-sm">
          {cartItem.title}
        </h4>
        <p className="dark:text-white min-365-max-640:text-sm">
          {cartItem.price}₽ X {cartItem.quantity} шт ={' '}
          {cartItem.quantity * cartItem.price}₽
        </p>
      </div>
    </li>
  );
});
