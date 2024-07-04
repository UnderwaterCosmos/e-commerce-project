import cn from 'classnames';

import { manageProductInCart } from '../redux/slices/usersSlice';
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
  index: number;
}

export function CartItem({ cartItem, index }: ICartItem) {
  const quantity =
    useAppSelector(selectUsersData).fullUserInfo!.cart[index].quantity;
  const dispatch = useAppDispatch();

  const quantityHandler = (name: string) => {
    if (name === 'increment') {
      dispatch(manageProductInCart({ index, quantity: quantity + 1 }));
    } else {
      dispatch(manageProductInCart({ index, quantity: quantity - 1 }));
    }
  };

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
          onClick={() => quantityHandler('increment')}
        >
          +
        </button>
        <span>{cartItem.quantity}</span>
        <button
          type="button"
          className={controlBtn}
          onClick={() => quantityHandler('decrement')}
        >
          -
        </button>
        <button
          type="button"
          className={controlBtn}
          onClick={() => dispatch(manageProductInCart({ index, quantity: 0 }))}
        >
          X
        </button>
      </div>
    </li>
  );
}
