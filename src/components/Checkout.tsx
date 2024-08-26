import React from 'react';
import cn from 'classnames';

import { useAppDispatch } from '../redux/store';
import { manageProductInCart } from '../redux/slices/usersSlice';
import { ISingleProduct } from '../types/products';
import { CheckoutBtn } from './UI/CheckoutBtn';
import UsersCartItem from './UsersCartItem';
import { useTheme } from '../hooks/useTheme';

const titleWrapper = cn(
  'flex',
  'items-center',
  'mb-12',
  'gap-x-4',
  'border-b',
  'pb-4',
  'dark:border-b-hover-black'
);
const cancelBtn = cn(
  'px-4',
  'py-[10px]',
  'text-primary-black',
  'rounded-main',
  'mr-4',
  'bg-primary-gray',
  'transition-all',
  'hover:bg-hover-gray',
  'active:bg-active-gray',
  'dark:text-white',
  'dark:bg-hover-black',
  'dark:hover:bg-active-black',
  'dark:active:bg-dark-active-black'
);
const totalPrice = cn(
  'max-w-max',
  'ml-auto',
  'font-semibold',
  ' mb-4',
  'dark:text-white'
);

interface IProps {
  usersCart: ISingleProduct[];
  totalSum: number;
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Checkout({ usersCart, totalSum, setModalActive }: IProps) {
  const dispatch = useAppDispatch();
  const { theme } = useTheme();

  const checkoutHandler = () => {
    dispatch(manageProductInCart(usersCart));
    setModalActive(false);
  };

  return (
    <div>
      <div className={titleWrapper}>
        <button type="button" onClick={() => setModalActive(false)}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
              fill={theme === 'light' ? '#1D1D1D' : '#fff'}
            />
          </svg>
        </button>
        <h3 className="text-2xl font-semibold dark:text-white">
          Подтвердите информацию о заказе
        </h3>
      </div>
      <ul className="mb-[14px]">
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
