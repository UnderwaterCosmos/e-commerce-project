import React from 'react';
import cn from 'classnames';

import { Container } from './UI/Container';
import { CustomSelect } from './UI/CustomSelect';
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
import { useTheme } from '../hooks/useTheme';
import { ISelect } from '../types/filters';

const searchFiled = cn(
  'w-full',
  'h-[42px]',
  'px-3',
  'py-2.5',
  'rounded-md',
  'border',
  'placeholder:text-active-gray',
  'dark:bg-dark-background',
  'dark:border-hover-black',
  'dark:placeholder:text-active-black',
	'dark:caret-white',
	'dark:text-white'
);

export function ProductsFilters() {
  const select = useAppSelector(selectFiltersData).select;
  const search = useAppSelector(selectFiltersData).search;
  const categoriesList = useAppSelector(selectFiltersData).categoriesList;
  const isBackBtnPressed = useAppSelector(
    selectSingleProductsData
  ).isBackBtnPressed;
  const dispatch = useAppDispatch();
  const { theme } = useTheme();

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
    <aside className="mb-8">
      <Container>
        <div className="flex">
          <h1 className="text-[40px]/[60px] font-semibold dark:text-white">
            Каталог
          </h1>
          <div className="flex ml-auto gap-x-4">
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
                  <svg
                    className="absolute right-3 top-3"
                    width="20"
                    height="20"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.86181 6.67503C8.94088 5.04631 8.76292 2.83029 7.32792 1.39529C5.68976 -0.242872 3.03377 -0.242872 1.39561 1.39529C-0.242548 3.03345 -0.242548 5.68943 1.39561 7.32759C2.83061 8.76259 5.04663 8.94056 6.67535 7.86149L10.6472 11.8333L11.8337 10.6469L7.86181 6.67503ZM6.14146 2.58175C7.12435 3.56465 7.12435 5.15824 6.14146 6.14113C5.15856 7.12403 3.56497 7.12403 2.58207 6.14113C1.59918 5.15824 1.59918 3.56465 2.58207 2.58175C3.56497 1.59885 5.15856 1.59885 6.14146 2.58175Z"
                      fill={theme === 'light' ? '#1D1D1D' : '#fff'}
                    />
                  </svg>
              )}
            </div>
            <CustomSelect
              name="filters"
              options={categoriesList}
              value={select}
              selectHandler={selectHandler}
            />
          </div>
        </div>
      </Container>
    </aside>
  );
}
