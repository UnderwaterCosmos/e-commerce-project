import React from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { Container } from './Container';
import { Card } from './Card';
import { Loader } from './Loader';
import { UpBtn } from './UpBtn';
import {
  useAppDispatch,
  useAppSelector,
  selectProductsData,
  selectSingleProductsData,
  selectFiltersData,
} from '../redux/store';
import { fetchProducts } from '../redux/slices/productsSlice';
import { useDebounce } from '../hooks/useDebounce';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

const list = cn('grid', 'gap-4', 'grid-cols-4', 'mb-4');

export function CardList() {
  const isLoading = useAppSelector(selectProductsData).isLoading;
  const productsList = useAppSelector(selectProductsData).productsList;
  const totalPages = useAppSelector(selectProductsData).totalPages;
  const isBackBtnPressed = useAppSelector(
    selectSingleProductsData
  ).isBackBtnPressed;
  const select = useAppSelector(selectFiltersData).select;
  const search = useAppSelector(selectFiltersData).search;
  const dispatch = useAppDispatch();
  const debouncedSearch = useDebounce(search.trim(), 1000);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = React.useState(
    Number(searchParams.get('page')) || 1
  );
  const triggerRef = React.useRef() as React.MutableRefObject<HTMLDivElement>;

  React.useEffect(() => {
    const productsPromise = dispatch(
      fetchProducts({
        _page: 1,
        category_like: select.value,
        title_like: debouncedSearch,
        replace: true,
        preventRequest: isBackBtnPressed,
      })
    );
    window.onbeforeunload = () => {
      window.scrollTo(0, 0);
      setSearchParams({ page: '1' });
    };
    if (!isBackBtnPressed) {
      setCurrentPage(1);
      setSearchParams({ page: '1' });
    }

    return () => {
      productsPromise.abort();
    };
  }, [dispatch, select, debouncedSearch]);

  const onLoadNextProducts = React.useCallback(() => {
    if (!isLoading && currentPage < totalPages) {
      if (!isBackBtnPressed) {
        setCurrentPage((prev) => prev + 1);
      }
      dispatch(
        fetchProducts({
          _page: currentPage + 1,
          category_like: select.value,
          title_like: debouncedSearch,
          replace: false,
          preventRequest: isBackBtnPressed,
        })
      );
      setSearchParams({ page: String(currentPage + 1) });
    }
  }, [dispatch, isLoading, currentPage, isBackBtnPressed]);

  useInfiniteScroll({
    triggerRef,
    callback: onLoadNextProducts,
  });

  return (
    <section className="mb-4 text-center">
      <Container>
        {isLoading && <Loader />}
        <ul className={list}>
          {productsList.map((product) => (
            <Card product={product} key={product.id} />
          ))}
        </ul>
        <UpBtn />
        <div className="h-3" ref={triggerRef} />
      </Container>
    </section>
  );
}
