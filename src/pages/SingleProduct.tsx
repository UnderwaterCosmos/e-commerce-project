import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import cn from 'classnames';

import { Container } from '../components/Container';
import { CartBtn } from '../components/CartBtn';
import { Loader } from '../components/Loader';
import { BackBtn } from '../components/BackBtn';
import {
  useAppDispatch,
  useAppSelector,
  selectSingleProductsData,
} from '../redux/store';
import {
  fetchSingleProduct,
  setBackBtnStatus,
} from '../redux/slices/singleProductSlice';
import { addProductToCart } from '../redux/slices/usersSlice';
import { ISingleProduct } from '../types/products';

const description = cn('flex', 'flex-col', 'justify-center');

export function SingleProduct() {
  const isLoading = useAppSelector(selectSingleProductsData).isLoading;
  const singleProduct = useAppSelector(selectSingleProductsData).singleProduct;
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [mainImageUrl, setMainImageUrl] = React.useState('');

  React.useEffect(() => {
    const singleProductPromise = dispatch(fetchSingleProduct(id!));

    return () => {
      dispatch(setBackBtnStatus(false));
      singleProductPromise.abort();
    };
  }, [dispatch, id]);

  const backBtnHandler = () => {
    dispatch(setBackBtnStatus(true));
    navigate(-1);
  };

  return (
    <main className="grow">
      <Container>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="flex gap-3">
            <BackBtn onClick={backBtnHandler} />
            <article className="flex items-center gap-x-4">
              <div>
                {singleProduct?.images.map((url, index) => (
                  <img
                    className="mb-2 border-2 border-black"
                    src={url}
                    width={115}
                    height={115}
                    alt={`Image ${index + 1}`}
                    onClick={() => setMainImageUrl(url)}
                    key={url}
                  />
                ))}
              </div>
              <img
                src={mainImageUrl ? mainImageUrl : singleProduct?.images[0]}
                width={650}
                height={650}
                alt={singleProduct?.description}
              />
            </article>
            <article className={description}>
              <h1>{singleProduct?.title}</h1>
              <h2>{singleProduct?.description}</h2>
              <p>{singleProduct?.price} Р</p>
              <CartBtn
                productId={singleProduct?.id}
                onClick={() =>
                  dispatch(addProductToCart(singleProduct as ISingleProduct))
                }
              />
            </article>
          </div>
        )}
      </Container>
    </main>
  );
}
