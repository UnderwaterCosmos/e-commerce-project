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
const orderItem = cn(
  'flex',
  'gap-x-5',
  'items-center',
  'py-2',
  'px-3.5',
  'min-365-max-640:gap-x-4.5',
  'min-365-max-640:px-0',
  'min-365-max-640:text-center'
);
const itemTitle = cn(
  'font-semibold',
  'dark:text-white',
  'min-365-max-640:text-xs/[18px]',
  'min-500-max-904:text-sm'
);

export default React.memo(function OrdersHistoryInnerItem({
  orderName,
}: {
  orderName: string;
}) {
  const ordersHistory =
    useAppSelector(selectUsersData).fullUserInfo?.ordersHistory ?? {};
  const [isOrderOpened, setIsOrderOpened] = React.useState(false);
  const { theme } = useTheme();

  const screenWidth = document.documentElement.clientWidth;
	const isMobileScreen = screenWidth > 345 && screenWidth < 641

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
  const orderImg = cn('rounded-main', 'max-w-[163px]', {
    '!max-w-20': isMobileScreen,
  });

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
          <span className="dark:text-white min-365-max-640:text-xs/[18px] min-500-max-904:text-sm">
            {orderName}
          </span>
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
                    className={orderImg}
                    src={order.images[0]}
                    alt={order.title}
                  />
                </Link>
                <p className={itemTitle}>{order.title}</p>
                <div className="ml-auto min-365-max-640:mr-0">
                  <p className="dark:text-white min-365-max-640:text-xs/[18px] min-500-max-904:text-sm">
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
});
