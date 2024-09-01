import { Link } from 'react-router-dom';
import cn from 'classnames';

import { manageProductInCart } from '../redux/slices/usersSlice';
import {
  selectUsersData,
  useAppDispatch,
  useAppSelector,
} from '../redux/store';
import { useTheme } from '../hooks/useTheme';
import { ISingleProduct } from '../types/products';

const listItem = cn(
  'rounded-main',
  'p-3.5',
  'bg-white',
  'flex',
  'p-3',
  'items-center',
  'mb-2',
  'dark:bg-dark-background',
  'min-365-max-640:block'
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
  'active:bg-active-gray',
  'dark:text-white',
  'dark:bg-hover-black',
  'dark:hover:bg-active-black',
  'dark:active:bg-dark-active-black'
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
  'active:bg-active-black',
  'dark:bg-primary-gray',
  'transition-all',
  'dark:hover:bg-hover-gray',
  'dark:active:bg-active-gray',
  'max-904:ml-auto'
);
const mobileWrapper = cn('flex', 'gap-x-3.5', 'items-center', 'mb-3.5');

interface ICartItem {
  cartItem: ISingleProduct;
  index: number;
}

export function CartItem({ cartItem, index }: ICartItem) {
  const quantity =
    useAppSelector(selectUsersData).fullUserInfo?.cart[index].quantity ?? 0;
  const dispatch = useAppDispatch();
  const { theme } = useTheme();

  const screenWidth = document.documentElement.clientWidth;
  const isMobileScreen = screenWidth > 345 && screenWidth < 641;

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
      {isMobileScreen ? (
        <div className={mobileWrapper}>
          <Link to={`/products/${cartItem.id}`}>
            <img
              className="rounded-main"
              src={cartItem.images[0]}
              width={82}
              alt={cartItem.title}
            />
          </Link>
          <div className="mr-auto ml-10 min-365-max-640:ml-0">
            <h4 className="font-semibold mb-4 dark:text-white">
              {cartItem.title}
            </h4>
            <p className="dark:text-white min-365-max-640:text-xs">
              {cartItem.price} ₽
            </p>
          </div>
        </div>
      ) : (
        <>
          <Link to={`/products/${cartItem.id}`}>
            <img
              className="rounded-main"
              src={cartItem.images[0]}
              width={163}
              alt={cartItem.title}
            />
          </Link>
          <div className="mr-auto ml-10">
            <h4 className="font-semibold mb-4 dark:text-white">
              {cartItem.title}
            </h4>
            <p className="dark:text-white">{cartItem.price} ₽</p>
          </div>
        </>
      )}
      <div className="flex gap-x-3 items-center">
        <button
          type="button"
          className={controlBtn}
          onClick={() => quantityHandler('increment')}
        >
          +
        </button>
        <span className="font-semibold dark:text-white">
          {cartItem.quantity}
        </span>
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
          <svg
            className="inline-block"
            width="16"
            height="18"
            viewBox="0 0 16 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.5 0.666504H5.5C4.58083 0.666504 3.83333 1.414 3.83333 2.33317V3.1665H0.5V4.83317H2.16667V15.6665C2.16667 16.5857 2.91417 17.3332 3.83333 17.3332H12.1667C13.0858 17.3332 13.8333 16.5857 13.8333 15.6665V4.83317H15.5V3.1665H12.1667V2.33317C12.1667 1.414 11.4192 0.666504 10.5 0.666504ZM5.5 2.33317H10.5V3.1665H5.5V2.33317ZM12.1667 15.6665H3.83333V4.83317H12.1667V15.6665Z"
              fill={theme === 'light' ? '#fff' : '#1D1D1D'}
            />
          </svg>
        </button>
      </div>
    </li>
  );
}
