import React from 'react';
import cn from 'classnames';
import { Container } from './Container';

const filtersBlock = cn('my-3');
const search = cn('w-full', 'p-3', 'bg-slate-200', 'rounded-full', 'mb-2');

export function ProductsFilters() {
  return (
    <aside className={filtersBlock}>
      <Container>
        <input className={search} placeholder="Поиск по названию товара" />
        <select>
          <option value="all">Все товары</option>
          <option value="appliances">Бытовая техника</option>
          <option value="houseplants">Комнатные растения</option>
          <option value="cloth">Одежда</option>
          <option value="shoes">Обувь</option>
        </select>
      </Container>
    </aside>
  );
}
