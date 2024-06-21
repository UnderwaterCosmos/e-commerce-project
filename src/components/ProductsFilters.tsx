import React from 'react';
import cn from 'classnames';

import { useAppSelector, useAppDispatch } from '../redux/reduxHooks';
import { setFiltersValue, fetchCategories } from '../redux/slices/filtersSlice';
import { Container } from './Container';

const filtersBlock = cn('my-3');
const searchFiled = cn('w-full', 'p-3', 'bg-slate-200', 'rounded-full', 'mb-2');

export function ProductsFilters() {
  const { select, search, categoriesList } = useAppSelector(
    (state) => state.filtersData
  );
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const categoriesPromise = dispatch(fetchCategories());

    return () => {
      categoriesPromise.abort();
    };
  }, [dispatch]);

  const filtersHandler = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
    name: 'select' | 'search'
  ) => {
    dispatch(
      setFiltersValue({
        key: name,
        value: event.target.value,
      })
    );
  };

  return (
    <aside className={filtersBlock}>
      <Container>
        <input
          type="search"
          className={searchFiled}
          value={search}
          onChange={(event) => filtersHandler(event, 'search')}
          placeholder="Поиск по названию товара"
        />
        <select
          value={select}
          onChange={(event) => filtersHandler(event, 'select')}
        >
          {categoriesList.map((categoryObj) => (
            <option value={categoryObj.name} key={categoryObj.name}>
              {categoryObj.displayName}
            </option>
          ))}
        </select>
      </Container>
    </aside>
  );
}
