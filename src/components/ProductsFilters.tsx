import React from 'react';
import cn from 'classnames';
import Select from 'react-select';
import { SingleValue } from 'react-select';

import { Container } from './Container';
import {
  useAppSelector,
  useAppDispatch,
  selectFiltersData,
  selectSingleProductsData,
} from '../redux/store';
import { setFiltersValue, fetchCategories } from '../redux/slices/filtersSlice';

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
  // const selectHandler = (
  //   option: SingleValue<{ value: string; label: string }>
  // ) => {
  //   dispatch(
  //     setFiltersValue({
  //       key: 'select',
  //       value: option?.value,
  //     })
  //   );
  // };

  // const categoriesOptions = categoriesList.map((elem) => ({
  //   value: elem.name,
  //   label: elem.displayName,
  // }));

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
        {/* <Select
          options={categoriesOptions}
          defaultValue={categoriesOptions[2]}
          // placeholder={categoriesOptions[0]?.label}
          onChange={(option) => selectHandler(option)}
        /> */}
        <select
          value={select}
          onChange={(event) => filtersHandler(event, 'select')}
        >
          {categoriesList.map((categoryObj) => (
            <option value={categoryObj.name} key={categoryObj.id}>
              {categoryObj.displayName}
            </option>
          ))}
        </select>
      </Container>
    </aside>
  );
}
