import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { FaArrowLeftLong } from 'react-icons/fa6';

import { Container } from '../components/Container';
import { CartBtn } from '../components/CartBtn';
import { Loader } from '../components/Loader';
import { useAppDispatch, useAppSelector } from '../redux/reduxHooks';
import {
  fetchSingleProduct,
  // setBackBtnStatus,
} from '../redux/slices/singleProductSlice';

const backBtn = cn('h-8', 'p-2', 'bg-slate-300', 'rounded-full');
const description = cn('flex', 'flex-col', 'justify-center');

export function SingleProduct() {
  const { singleProduct, isLoading } = useAppSelector(
    (state) => state.singleProductData
  );
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [mainImageUrl, setMainImageUrl] = React.useState('');

  React.useEffect(() => {
    const singleProductPromise = dispatch(fetchSingleProduct(id!));

    return () => {
      // dispatch(setBackBtnStatus(false));
      singleProductPromise.abort();
    };
  }, [dispatch, id]);

  // const backBtnHandler = () => {
  //   dispatch(setBackBtnStatus(true));
  //   ;
  // };

  return (
    <main className="grow">
      <Container>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="flex gap-3">
            <button
              type="button"
              className={backBtn}
              onClick={() => navigate(-1)}
            >
              <FaArrowLeftLong />
            </button>
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
              <CartBtn />
            </article>
          </div>
        )}
      </Container>
    </main>
  );
}
