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

const filtersBlock = cn('mb-8');
const title = cn('text-[40px]/[60px]', 'font-semibold');
const searchFieldWrapper = cn('flex', 'ml-auto', 'gap-x-4');
const searchFiled = cn(
  'w-full',
  'h-[42px]',
  'px-3',
  'py-2.5',
  'rounded-md',
  'border',
  'placeholder:text-[#CACACA]'
);

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
        <div className="flex">
          <h1 className={title}>Каталог</h1>
          <div className={searchFieldWrapper}>
            <div className="flex w-[400px] relative">
              <input
                type="search"
                className={searchFiled}
                value={search}
                onChange={(event) =>
                  dispatch(setSearchValue(event.target.value))
                }
                placeholder="Поиск по наименованию"
              />
              {!search && (
                <img
                  src="/images/search.svg"
                  className="absolute right-3 top-3"
                  width={20}
                  alt="search"
                />
              )}
            </div>
            <Select
              options={categoriesList}
              value={select}
              onChange={(option) => selectHandler(option as ISelect)}
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  width: '240px',
                  height: '42px',
                  borderRadius: '6px',
                  borderColor: '#EEEEEE',
                }),
                option: (baseStyles, { isSelected, isFocused }) => ({
                  ...baseStyles,
                  backgroundColor: isSelected
                    ? '#0147FF'
                    : isFocused
                    ? 'rgba(163, 179, 217, 0.6)'
                    : '',
                  color: isSelected ? 'white' : '',
                }),
              }}
            />
          </div>
        </div>
      </Container>
    </aside>
  );
}
