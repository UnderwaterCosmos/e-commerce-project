import cn from 'classnames';

import { manageProductInCart } from '../redux/slices/usersSlice';
import {
  selectUsersData,
  useAppDispatch,
  useAppSelector,
} from '../redux/store';
import { ISingleProduct } from '../types/products';

const listItem = cn(
  'rounded-main',
  'p-3.5',
  'bg-white',
  'flex',
  'p-3',
  'items-center',
  'mb-2'
);
const controlBtn = cn(
  'w-[42px]',
  'h-[42px]',
  'px-2',
  'py-0.5',
  'rounded-main',
  'text-2xl',
  'bg-primary-gray',
  'transition-all',
  'hover:bg-hover-gray',
  'active:bg-active-gray'
);
const removeItemBtn = cn(
  'w-[42px]',
  'h-[42px]',
  'px-2',
  'py-0.5',
  'rounded-main',
  'bg-primary-black',
  'transition-all',
  'hover:bg-hover-black',
  'active:bg-active-black'
);

interface ICartItem {
  cartItem: ISingleProduct;
  index: number;
}

export function CartItem({ cartItem, index }: ICartItem) {
  const quantity =
    useAppSelector(selectUsersData).fullUserInfo?.cart[index].quantity ?? 0;
  const dispatch = useAppDispatch();

  const quantityHandler = (name: string) => {
    if (name === 'increment') {
      dispatch(
        manageProductInCart({
          index,
          quantity: quantity + 1,
          type: 'increment',
        })
      );
    } else {
      dispatch(
        manageProductInCart({
          index,
          quantity: quantity - 1,
          type: 'decrement',
        })
      );
    }
  };

  return (
    <li className={listItem}>
      <img
        className="rounded-main"
        src={cartItem.images[0]}
        width={163}
        alt={cartItem.title}
      />
      <div className="mr-auto ml-10">
        <h4 className="font-semibold mb-4">{cartItem.title}</h4>
        <p>{cartItem.price} ₽</p>
      </div>
      <div className="flex gap-x-2 items-center">
        <button
          type="button"
          className={controlBtn}
          onClick={() => quantityHandler('increment')}
        >
          +
        </button>
        <span className="font-semibold">{cartItem.quantity}</span>
        <button
          type="button"
          className={controlBtn}
          onClick={() => quantityHandler('decrement')}
        >
          -
        </button>
        <button
          type="button"
          className={removeItemBtn}
          onClick={() => dispatch(manageProductInCart({ index, quantity: 0 }))}
        >
          <img
            className="inline-block"
            src="/images/trash-empty.svg"
            alt="bucket"
          />
        </button>
      </div>
    </li>
  );
}
