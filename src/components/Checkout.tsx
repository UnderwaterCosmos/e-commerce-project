import React from 'react';
import cn from 'classnames';

import { useAppDispatch } from '../redux/store';
import { manageProductInCart } from '../redux/slices/usersSlice';
import { ISingleProduct } from '../types/products';
import { CheckoutBtn } from './UI/CheckoutBtn';
import { UsersCartItem } from './UsersCartItem';

const titleWrapper = cn(
  'flex',
  'items-center',
  'mb-12',
  'gap-x-4',
  'border-b',
  'pb-4'
);

const cancelBtn = cn(
  'px-4',
  'py-[10px]',
  'text-primary-black',
  'rounded-main',
  'bg-primary-gray',
  'transition-all',
  'hover:bg-hover-gray',
  'active:bg-active-gray',
  'mr-4'
);
const totalPrice = cn('max-w-max', 'ml-auto', 'font-semibold', ' mb-4');

interface IProps {
  usersCart: ISingleProduct[];
  totalSum: number;
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Checkout({ usersCart, totalSum, setModalActive }: IProps) {
  const dispatch = useAppDispatch();

  const checkoutHandler = () => {
    dispatch(manageProductInCart(usersCart));
    setModalActive(false);
  };

  return (
    <div>
      <div className={titleWrapper}>
        <button type="button" onClick={() => setModalActive(false)}>
          <img src="/images/close.svg" width={28} alt="close" />
        </button>
        <h3 className="text-2xl font-semibold">
          Подтвердите информацию о заказе
        </h3>
      </div>
      <ul className="mb-[14px] ">
        {usersCart.map((cartItem) => (
          <UsersCartItem cartItem={cartItem} />
        ))}
      </ul>
      <p className={totalPrice}>Итого: {totalSum}</p>
      <div className="text-right">
        <button
          type="button"
          className={cancelBtn}
          onClick={() => setModalActive(false)}
        >
          Отмена
        </button>
        <CheckoutBtn onClick={checkoutHandler} />
      </div>
    </div>
  );
}
