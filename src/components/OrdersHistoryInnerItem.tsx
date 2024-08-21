import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { selectUsersData, useAppSelector } from '../redux/store';
import { useTheme } from '../hooks/useTheme';

const ordersListItem = cn(
  'bg-primary-gray',
  'px-3',
  'p-4',
  'flex',
  'flex-col',
  'rounded-main',
  'cursor-pointer',
  'border',
  'dark:bg-dark-background',
  'dark:border-hover-black'
);
const orderItem = cn('flex', 'gap-x-5', 'items-center', 'py-2', 'px-3.5');

export function OrdersHistoryInnerItem({ orderName }: { orderName: string }) {
  const ordersHistory =
    useAppSelector(selectUsersData).fullUserInfo?.ordersHistory ?? {};
  const [isOrderOpened, setIsOrderOpened] = React.useState(false);
  const { theme } = useTheme();

  const orderTimeStamp = cn(
    'flex',
    'items-center',
    'gap-x-2',
    'dark:border-hover-black',
    {
      'mb-4 pb-3 border-b border-b-active-gray': isOrderOpened,
    }
  );
  const orderList = cn({ 'cursor-default': isOrderOpened });
  const triangleIcon = cn({ 'transition-all rotate-90': isOrderOpened });

  const toggleIsOrderOpened = () => {
    setIsOrderOpened((prev) => !prev);
  };

  return (
    <li className="mb-2">
      <div className={ordersListItem} onClick={toggleIsOrderOpened}>
        <div className={orderTimeStamp}>
          <svg
            className={triangleIcon}
            width="16"
            height="16"
            viewBox="0 0 6 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.91683 9.16675L5.0835 5.00008L0.916831 0.833414L0.91683 9.16675Z"
              fill={theme === 'light' ? '#1D1D1D' : '#fff'}
            />
          </svg>
          <span className="dark:text-white">{orderName}</span>
        </div>
        {isOrderOpened && (
          <ul
            className={orderList}
            onClick={(event) => event.stopPropagation()}
          >
            {ordersHistory[orderName].map((order) => (
              <li className={orderItem} key={order.id}>
                <Link to={`/products/${order.id}`}>
                  <img
                    className="rounded-main"
                    src={order.images[0]}
                    width={163}
                    alt={order.title}
                  />
                </Link>
                <p className="font-semibold dark:text-white">{order.title}</p>
                <div className="ml-auto mr-10">
                  <p className="dark:text-white">
                    {order.price}₽ X {order.quantity} шт ={' '}
                    {order.quantity * order.price}₽
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}
