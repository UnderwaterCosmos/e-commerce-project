import React from 'react';
import cn from 'classnames';
import { VscTriangleRight, VscTriangleDown } from 'react-icons/vsc';

import { selectUsersData, useAppSelector } from '../redux/store';

const ordersListItem = cn(
  'bg-slate-300',
  'border-[1px]',
  'px-2',
  'flex',
  'items-center',
  'gap-x-1.5'
);
const orderItem = cn('flex', 'gap-x-5', 'items-center', 'py-2', 'px-3.5');

export function OrdersHistoryInnerItem({ orderName }: { orderName: string }) {
  const ordersHistory =
    useAppSelector(selectUsersData).fullUserInfo!.ordersHistory;
  const [isOrderOpened, setIsOrderOpened] = React.useState(false);

  const toggleIsOrderOpened = () => {
    setIsOrderOpened((prev) => !prev);
  };

  return (
    <li className="mb-2 cursor-pointer" key={orderName}>
      <div className={ordersListItem} onClick={toggleIsOrderOpened}>
        {isOrderOpened ? <VscTriangleDown /> : <VscTriangleRight />}
        {orderName}
      </div>
      {isOrderOpened && (
        <ul>
          {ordersHistory[orderName].map((order) => (
            <li className={orderItem} key={order.id}>
              <img
                src={order.images[0]}
                width={150}
                height={150}
                alt={order.title}
              />
              <div>
                <p>{order.title}</p>
              </div>
              <div className="ml-auto">
                <p>{order.quantity} шт.</p>
                <p>{order.price} ₽</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
