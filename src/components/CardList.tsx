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
  const { productsList, isLoading, totalPages, hasMore } = useAppSelector(
    (state) => state.productsList
  );
  const { select, search } = useAppSelector((state) => state.filtersData);
  const dispatch = useAppDispatch();
  // const debouncedSearch = useDebounce(search.trim(), 1000);
  const [currentPage, setCurrentPage] = React.useState(1);
  const triggerRef = React.useRef() as React.MutableRefObject<HTMLDivElement>;

  React.useEffect(() => {
    const productsPromise = dispatch(
      fetchProducts({
        _page: 1,
        category: select,
        replace: true,
      })
    );
    window.onbeforeunload = () => {
      window.scrollTo(0, 0);
    };
    setCurrentPage(1);

    return () => {
      productsPromise.abort();
    };
  }, [dispatch, select]);

  const onLoadNextProducts = React.useCallback(() => {
    if (hasMore && !isLoading && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      dispatch(
        fetchProducts({
          _page: currentPage + 1,
          category: select,
          replace: false,
        })
      );
    }
  }, [dispatch, isLoading, hasMore, currentPage]);

  useInfiniteScroll({
    triggerRef,
    callback: onLoadNextProducts,
  });

  const filteredProductsList = productsList.filter((product) =>
    product.title.toUpperCase().includes(search.trim().toUpperCase())
  );

  return (
    <section className="mb-4 text-center">
      <Container>
        {isLoading && <Loader />}
        <ul className={list}>
          {filteredProductsList.map((product) => (
            <Card product={product} key={product.id} />
          ))}
        </ul>
        <div className="h-2.5 bg-red-500" ref={triggerRef} />
      </Container>
    </section>
  );
}
