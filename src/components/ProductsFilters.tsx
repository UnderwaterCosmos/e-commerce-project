import React from 'react';
import cn from 'classnames';
import Select from 'react-select';

import { Container } from './Container';
import {
  useAppSelector,
  useAppDispatch,
  selectFiltersData,
  selectSingleProductsData,
} from '../redux/store';
import {
  setSearchValue,
  setSelectValue,
  fetchCategories,
} from '../redux/slices/filtersSlice';
import { ISelect } from '../types/filters';

const filtersBlock = cn('my-3');
const searchFiled = cn('w-full', 'p-3', 'bg-slate-200', 'rounded-full', 'mb-2');

export function ProductsFilters() {
  const select = useAppSelector(selectFiltersData).select;
  const search = useAppSelector(selectFiltersData).search;
  const categoriesList = useAppSelector(selectFiltersData).categoriesList;
  const isBackBtnPressed = useAppSelector(
    selectSingleProductsData
  ).isBackBtnPressed;
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const categoriesPromise = dispatch(fetchCategories(isBackBtnPressed));

    return () => {
      categoriesPromise.abort();
    };
  }, [dispatch]);

  const selectHandler = (option: ISelect) => {
    dispatch(
      setSelectValue({
        value: option.value,
        label: option.label,
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
          onChange={(event) => dispatch(setSearchValue(event.target.value))}
          placeholder="Поиск по названию товара"
        />
        <Select
          options={categoriesList}
          value={select}
          onChange={(option) => selectHandler(option as ISelect)}
        />
      </Container>
    </aside>
  );
}
