import React from 'react';
import cn from 'classnames';
import { FaArrowLeftLong } from 'react-icons/fa6';

import { Container } from '../components/Container';
import { CartBtn } from '../components/CartBtn';

const backBtn = cn('h-8', 'p-2', 'bg-slate-300', 'rounded-full');
const description = cn('flex', 'flex-col', 'justify-center');

export function SingleProduct() {
  return (
    <main className="grow">
      <Container>
        <div className="flex gap-3">
          <button type="button" className={backBtn}>
            <FaArrowLeftLong />
          </button>
          <article>
            <img
              src="/images/square.png"
              width={650}
              height={650}
              alt="Квадрат???"
            />
          </article>
          <article className={description}>
            <h1>НАЗВАНИЕ ТОВАРА</h1>
            <h2>Описание Товара</h2>
            <p>987453 РР</p>
            <CartBtn />
          </article>
        </div>
      </Container>
    </main>
  );
}
