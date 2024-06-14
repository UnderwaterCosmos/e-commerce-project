import React from 'react';
import cn from 'classnames';
import { CartBtn } from './CartBtn';

const singleCard = cn('border-2', 'border-black', 'p-1.5');

export function Card() {
  return (
    <article className={singleCard}>
      <div>
        <img src="/images/square.png" alt="Квадрат!!!" />
      </div>
      <h3 className="text-center">Название Товара</h3>
      <h4 className="text-sm text-left">Категория Товара</h4>
      <div className="flex justify-between">
        <p>98765 РР</p>
        <CartBtn />
      </div>
    </article>
  );
}
