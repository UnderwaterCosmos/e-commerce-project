import { Link } from 'react-router-dom';
import cn from 'classnames';

import { CartBtn } from './CartBtn';
import { ISingleProduct } from '../types/products';
import { useAppDispatch } from '../redux/store';
import { addProductToCart } from '../redux/slices/usersSlice';

const singleCard = cn('border-2', 'border-black', 'p-1.5');
const image = cn('max-w-full', 'h-auto', 'object-cover');

interface IProduct {
  product: ISingleProduct;
}

export function Card({ product }: IProduct) {
  const dispatch = useAppDispatch();

  return (
    <li className={singleCard}>
      <Link to={`/products/${product.id}`}>
        <div>
          <img
            className={image}
            src={product.images[0]}
            alt={`${product.title}'s photo`}
            width={250}
            loading="lazy"
          />
        </div>
        <h3 className="text-center">{product.title}</h3>
        <h4 className="text-sm text-left">{product.category}</h4>
      </Link>
      <div className="flex justify-between z-50">
        <p>{product.price}р</p>
        <CartBtn
          productId={product.id}
          onClick={() => dispatch(addProductToCart(product))}
        />
      </div>
    </li>
  );
}
