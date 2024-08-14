import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { selectUsersData, useAppSelector } from '../redux/store';

const ordersListItem = cn(
  'bg-primary-gray',
  'px-3',
  'p-4',
  'flex',
  'flex-col',
  'rounded-main',
  'cursor-pointer'
);
const orderItem = cn('flex', 'gap-x-5', 'items-center', 'py-2', 'px-3.5');

export function OrdersHistoryInnerItem({ orderName }: { orderName: string }) {
  const ordersHistory =
    useAppSelector(selectUsersData).fullUserInfo?.ordersHistory ?? {};
  const [isOrderOpened, setIsOrderOpened] = React.useState(false);

  const orderTimeStamp = cn('flex', 'items-center', 'gap-x-2', {
    'mb-4 pb-3 border-b border-b-active-gray': isOrderOpened,
  });
  const orderList = cn({ 'cursor-default': isOrderOpened });
  const triangleIcon = cn({ 'transition-all rotate-90': isOrderOpened });

  const toggleIsOrderOpened = () => {
    setIsOrderOpened((prev) => !prev);
  };

  return (
    <li className="mb-2">
      <div className={ordersListItem} onClick={toggleIsOrderOpened}>
        <div className={orderTimeStamp}>
          <img
            className={triangleIcon}
            src="/images/history-arrow.svg"
            width={10}
            alt=""
          />
          {orderName}
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
                <p className="font-semibold">{order.title}</p>
                <div className="ml-auto mr-10">
                  <p>
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
