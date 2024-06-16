import React from 'react';
import cn from 'classnames';

import { Container } from './Container';
import { Card } from './Card';
import { useAppDispatch, useAppSelector } from '../redux/reduxHooks';
import { fetchProducts } from '../redux/slices/productsSlice';

const list = cn('grid', 'gap-4', 'grid-cols-4', 'mb-4');
const showMoreBtn = cn(
  'max-w-80',
  'mx-auto',
  'bg-slate-300',
  'p-1.5',
  'rounded-full'
);

export function CardList() {
  const productsList = useAppSelector((state) => state.productsList);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const productsPromise = dispatch(fetchProducts());

    return () => {
      productsPromise.abort();
    };
  }, [dispatch]);

  return (
    <section className="mb-4 text-center">
      <Container>
        <ul className={list}>
          {productsList.map((product) => (
            <Card product={product} key={product.id} />
          ))}
        </ul>
        <button type="button" className={showMoreBtn}>
          Показать еще
        </button>
      </Container>
    </section>
  );
}
