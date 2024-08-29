import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { CartBtn } from './CartBtn';
import { ISingleProduct } from '../types/products';
import { useAppDispatch } from '../redux/store';
import { manageProductInCart } from '../redux/slices/usersSlice';

const singleCard = cn(
  'p-4',
  'rounded-main',
  'bg-primary-gray',
  'h-full',
  'dark:bg-dark-background'
);
const cardWrapper = cn('min-h-full', 'flex', 'flex-col', 'overflow-hidden');
const image = cn(
  'max-w-full',
  'h-auto',
  'object-cover',
  'rounded-main',
  'mb-4',
  'max-904:mb-2'
);
const productCategory = cn('text-sm', 'text-left', 'text-[#9A9A9A]', 'mb-1.5');
const productTitle = cn(
  'text-left',
  'font-semibold',
  'mb-4',
  'dark:text-white',
  'min-365-max-640:text-sm',
  'min-365-max-640:mb-3'
);

interface IProduct {
  product: ISingleProduct;
}

export default React.memo(function Card({ product }: IProduct) {
  const dispatch = useAppDispatch();

  return (
    <li className={singleCard}>
      <div className={cardWrapper}>
        <Link to={`/products/${product.id}`} className="grow">
          <img
            className={image}
            src={product.images[0]}
            alt={`${product.title}'s photo`}
            loading="lazy"
          />
          <h4 className={productCategory}>{product.category}</h4>
          <h3 className={productTitle}>{product.title}</h3>
        </Link>
        <div className="flex justify-between items-center">
          <p className="dark:text-white min-365-max-640:text-sm">{product.price} ₽</p>
          <CartBtn
            productId={product.id}
            onClick={() => dispatch(manageProductInCart(product))}
          >
            +
          </CartBtn>
        </div>
      </div>
    </li>
  );
});
