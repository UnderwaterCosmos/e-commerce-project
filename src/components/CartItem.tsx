import React from 'react';
import cn from 'classnames';

import { addProductToCart } from '../redux/slices/usersSlice';
import {
  selectUsersData,
  useAppDispatch,
  useAppSelector,
} from '../redux/store';
import { ISingleProduct } from '../types/products';

const listItem = cn(
  'border-2',
  'border-black',
  'flex',
  'p-3',
  'items-center',
  'mb-2.5'
);
const controlBtn = cn('px-2', 'py-0.5', 'bg-orange-300', 'rounded-full');

interface ICartItem {
  cartItem: ISingleProduct;
}

export function CartItem({ cartItem }: ICartItem) {
  // const [quantity, setQuantity] = React.useState(cartItem.quantity);
  const dispatch = useAppDispatch();

  return (
    <li className={listItem}>
      <img
        src={cartItem.images[0]}
        width={100}
        height={100}
        alt={cartItem.title}
      />
      <div className="mr-auto ml-5">
        <h4>{cartItem.title}</h4>
        <p>{cartItem.price} ₽</p>
      </div>
      <div className="flex gap-x-2">
        <button
          type="button"
          className={controlBtn}
        >
          +
        </button>
        <span>Каунтер</span>
        <button
          type="button"
          className={controlBtn}
        >
          -
        </button>
        <button type="button" className={controlBtn}>
          X
        </button>
      </div>
    </li>
  );
}
