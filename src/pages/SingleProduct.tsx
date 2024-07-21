import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import cn from 'classnames';

import { Container } from '../components/Container';
import { CartBtn } from '../components/CartBtn';
import { Loader } from '../components/Loader';
import { BackBtn } from '../components/BackBtn';
import {
  useAppDispatch,
  useAppSelector,
  selectSingleProductsData,
  selectUsersData,
  selectProductsData,
} from '../redux/store';
import {
  fetchSingleProduct,
  setBackBtnStatus,
} from '../redux/slices/singleProductSlice';
import { manageProductInCart } from '../redux/slices/usersSlice';
import { ISingleProduct } from '../types/products';
import { fetchProducts } from '../redux/slices/productsSlice';
import { fetchCategories } from '../redux/slices/filtersSlice';
import { useLocalStorage } from '../hooks/useLocalStorage';

const description = cn('flex', 'flex-col', 'gap-y-8');
const mainImage = cn('max-w-full', 'h-auto', 'object-cover', 'rounded-main');

export function SingleProduct() {
  const isLoading = useAppSelector(selectSingleProductsData).isLoading;
  const singleProduct = useAppSelector(selectSingleProductsData).singleProduct;
  const fullUserInfo = useAppSelector(selectUsersData).fullUserInfo;
  const productsList = useAppSelector(selectProductsData).productsList;
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [mainImageUrl, setMainImageUrl] = React.useState('');
  const refreshedFlag = useLocalStorage('isEditProductRefreshed');

  React.useEffect(() => {
    const fetchData = async () => {
      const singleProductPromise = await dispatch(fetchSingleProduct(id!));

      if (!singleProductPromise.payload) {
        navigate('/products');
      }
    };

    fetchData();
    return () => {
      dispatch(setBackBtnStatus(false));
      if (productsList.length === 0) {
        dispatch(fetchCategories(false));
        dispatch(fetchProducts({ _page: 1 }));
      }
    };
  }, [dispatch, id]);

  const backBtnHandler = () => {
    dispatch(setBackBtnStatus(true));
    if (refreshedFlag.getItem()) {
      navigate('/products');
      refreshedFlag.removeItem();
    } else {
      navigate(-1);
    }
  };

  return (
    <main className="grow">
      <Container>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="flex gap-x-[60px]">
            <BackBtn onClick={backBtnHandler} />
            <article className="flex items-center gap-x-4">
              <div>
                {singleProduct?.images.map((url, index) => (
                  <img
                    className="mb-2 rounded-main cursor-pointer"
                    src={url}
                    width={115}
                    alt={`Image ${index + 1}`}
                    onClick={() => setMainImageUrl(url)}
                    key={url}
                  />
                ))}
              </div>
              <div>
                <img
                  src={mainImageUrl ? mainImageUrl : singleProduct?.images[0]}
                  className={mainImage}
                  width={602}
                  height={602}
                  alt={singleProduct?.description}
                />
              </div>
            </article>
            <div className="flex items-center">
              <article className={description}>
                <h1 className="text-primary-h1 font-semibold">
                  {singleProduct?.title}
                </h1>
                <h2>{singleProduct?.description}</h2>
                <p className="text-primary-h1 font-medium">
                  {singleProduct?.price} ₽
                </p>
                <CartBtn
                  productId={singleProduct?.id}
                  onClick={() =>
                    dispatch(
                      manageProductInCart(singleProduct as ISingleProduct)
                    )
                  }
                >
                  Добавить в корзину
                </CartBtn>
                {fullUserInfo?.type === 'admin' && (
                  <Link
                    to={`/products/${id}/edit`}
                    className="text-primary-blue font-medium flex gap-x-2.5"
                  >
                    <img src="/images/edit.svg" width={20} alt="edit" />
                    Редактировать товар
                  </Link>
                )}
              </article>
            </div>
          </div>
        )}
      </Container>
    </main>
  );
}
