import cn from 'classnames';

import { ISingleProduct } from '../types/products';

const checkoutItem = cn(
  'flex',
  'items-center',
  'gap-x-8',
  'pb-4',
  'mb-4',
  'border-b'
);

interface IProps {
  cartItem: ISingleProduct;
}

export function UsersCartItem({ cartItem }: IProps) {
  return (
    <li className={checkoutItem} key={cartItem.id}>
      <img
        className="rounded-main"
        src={cartItem.images[0]}
        width={163}
        alt={cartItem.title}
      />
      <div className="w-full flex justify-between">
        <h4 className="font-semibold">{cartItem.title}</h4>
        <p>
          {cartItem.price}₽ X {cartItem.quantity} шт ={' '}
          {cartItem.quantity * cartItem.price}₽
        </p> 
      </div>
    </li>
  );
}
