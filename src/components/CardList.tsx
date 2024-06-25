import React from 'react';
import cn from 'classnames';

import { Container } from './Container';
import { Card } from './Card';
import { Loader } from './Loader';
import { useAppDispatch, useAppSelector } from '../redux/reduxHooks';
import { fetchProducts } from '../redux/slices/productsSlice';
import { useDebounce } from '../hooks/useDebounce';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

const list = cn('grid', 'gap-4', 'grid-cols-4', 'mb-4');

export function CardList() {
  const { productsList, isLoading, totalPages } = useAppSelector(
    (state) => state.productsData
  );
  const { select, search } = useAppSelector((state) => state.filtersData);
  // const { isBackBtnPressed } = useAppSelector(
  //   (state) => state.singleProductData
  // );
  const dispatch = useAppDispatch();
  const debouncedSearch = useDebounce(search.trim(), 1000);
  const [currentPage, setCurrentPage] = React.useState(1);
  const triggerRef = React.useRef() as React.MutableRefObject<HTMLDivElement>;

  React.useEffect(() => {
    const productsPromise = dispatch(
      fetchProducts({
        _page: 1,
        category_like: select,
        title_like: debouncedSearch,
        replace: true,
        // preventRequest: isBackBtnPressed,
      })
    );
    window.onbeforeunload = () => {
      window.scrollTo(0, 0);
    };
    setCurrentPage(1);

    return () => {
      productsPromise.abort();
    };
  }, [dispatch, select, debouncedSearch]);

  const onLoadNextProducts = React.useCallback(() => {
    if (!isLoading && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      dispatch(
        fetchProducts({
          _page: currentPage + 1,
          category_like: select,
          title_like: debouncedSearch,
          replace: false,
          // preventRequest: isBackBtnPressed,
        })
      );
    }
  }, [dispatch, isLoading, currentPage]);

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
        <div className="h-2.5" ref={triggerRef} />
      </Container>
    </section>
  );
}
