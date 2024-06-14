import React from 'react';
import cn from 'classnames';
import { Container } from './Container';
import { Card } from './Card';

const list = cn('flex', 'gap-4', 'justify-center', 'flex-wrap', 'mb-4');
const showMoreBtn = cn(
  'max-w-80',
  'mx-auto',
  'bg-slate-300',
  'p-1.5',
  'rounded-full'
);

export function CardList() {
  return (
    <section className="mb-4 text-center">
      <Container>
        <div className={list}>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
        <button type="button" className={showMoreBtn}>
          Показать еще
        </button>
      </Container>
    </section>
  );
}
