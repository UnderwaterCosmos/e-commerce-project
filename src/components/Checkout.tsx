import React from 'react';

import { useAppDispatch } from '../redux/store';
import { manageProductInCart } from '../redux/slices/usersSlice';
import { ISingleProduct } from '../types/products';
import { CheckoutBtn } from './UI/CheckoutBtn';

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
    <div className="text-4xl">
      <h3 className="mb-12 text-xl">Подтвердите информацию о заказе:</h3>
      <ul>
        {usersCart.map((cartItem) => (
          <li className="flex mb-6" key={cartItem.id}>
            <img
              src={cartItem.images[0]}
              width={163}
              height={163}
              alt={cartItem.title}
            />
            <h4>{cartItem.title}</h4>
            <p>
              {cartItem.price}₽ X {cartItem.quantity}шт ={' '}
              {cartItem.quantity * cartItem.price}
            </p>
          </li>
        ))}
      </ul>
      <p>Итого: {totalSum}</p>
      <div className="text-right">
        <button
          type="button"
          className="px-4 py-1 border mr-4"
          onClick={() => setModalActive(false)}
        >
          Назад
        </button>
        <CheckoutBtn onClick={checkoutHandler} />
      </div>
    </div>
  );
}
