import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { CartBtn } from './CartBtn';
import { ISingleProduct } from '../types/products';
import { useAppDispatch } from '../redux/store';
import { manageProductInCart } from '../redux/slices/usersSlice';

const singleCard = cn('p-4', 'rounded-main', 'bg-primary-gray', 'h-full');
const cardWrapper = cn('min-h-full', 'flex', 'flex-col', 'overflow-hidden');
const image = cn(
  'max-w-full',
  'h-auto',
  'object-cover',
  'rounded-main',
  'mb-4'
);
const productCategory = cn('text-sm', 'text-left', 'text-[#9A9A9A]', 'mb-1.5');
const productTitle = cn('text-left', 'font-semibold', 'mb-4');

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
          <p>{product.price} ₽</p>
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
