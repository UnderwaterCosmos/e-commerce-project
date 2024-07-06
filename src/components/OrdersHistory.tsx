import React from 'react';
import cn from 'classnames';
import { VscTriangleRight } from 'react-icons/vsc';

const order = cn(
  'bg-slate-300',
  'border-[1px]',
  'mb-2',
  'px-2',
  'flex',
  'items-center',
  'gap-x-1.5'
);

export function OrdersHistory() {
  const today = new Date();

  return (
    <main>
      <ul className="text-left">
        <li className={order}>
          <VscTriangleRight />
          {today.toString()}
        </li>
        <li className={order}>
          <VscTriangleRight />
          {today.toString()}
        </li>
        <li className={order}>
          <VscTriangleRight />
          {today.toString()}
        </li>
        <li className={order}>
          <VscTriangleRight />
          {today.toString()}
        </li>
        <li className={order}>
          <VscTriangleRight />
          {today.toString()}
        </li>
        <li className={order}>
          <VscTriangleRight />
          {today.toString()}
        </li>
      </ul>
    </main>
  );
}
