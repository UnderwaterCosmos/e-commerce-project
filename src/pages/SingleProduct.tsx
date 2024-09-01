import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import cn from 'classnames';

import { Container } from '../components/UI/Container';
import { CartBtn } from '../components/CartBtn';
import { Loader } from '../components/UI/Loader';
import { BackBtn } from '../components/UI/BackBtn';
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

const mainImage = cn(
  'max-w-full',
  'h-auto',
  'object-cover',
  'rounded-main',
  'max-904:mb-1.5',
  'max-904:mx-auto'
);
const productTitle = cn(
  'text-primary-h1',
  'font-semibold',
  'dark:text-white',
  'max-640:text-xl'
);
const productWrapper = cn(
  'flex',
  'gap-x-[60px]',
  'max-904:mt-20',
  'max-904:flex-col',
  'max-904:gap-y-6'
);
const productImages = cn('flex', 'items-center', 'gap-x-4', 'max-904:block');
const productDescription = cn('flex', 'flex-col', 'gap-y-8', 'max-904:gap-y-6', 'min-641-max-904:items-center');
const editProductLink = cn(
  'text-primary-blue',
  'font-medium',
  'flex',
  'gap-x-2.5',
  'transition-all',
  'hover:text-hover-blue',
  'active:text-active-blue',
  'max-904:justify-center',
  'max-904:text-sm'
);

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

  const screenWidth = document.documentElement.clientWidth;
  const isMobileScreen = screenWidth > 345 && screenWidth < 905;
  const isScreenMedium = screenWidth > 499 && screenWidth < 641;
  const isScreenLarge = screenWidth > 640;

  const onLeavePage = () => {
    dispatch(setBackBtnStatus(false));
    if (productsList.length === 0) {
      dispatch(fetchCategories(false));
      dispatch(fetchProducts({ _page: 1 }));
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const singleProductPromise = await dispatch(fetchSingleProduct(id!));

      if (!singleProductPromise.payload) {
        navigate('/products');
      }
    };

    fetchData();
    return () => onLeavePage();
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
        ) : isMobileScreen ? (
          <div className={productWrapper}>
            <BackBtn onClick={backBtnHandler} />
            <article className={productDescription}>
              <h1 className={productTitle}>{singleProduct?.title}</h1>
              <h2 className="dark:text-white max-640:text-sm">
                {singleProduct?.description}
              </h2>
              <p className="text-primary-h1 dark:text-white max-640:text-lg">
                {singleProduct?.price} ₽
              </p>
            </article>
            <article className={productImages}>
              <img
                src={mainImageUrl ? mainImageUrl : singleProduct?.images[0]}
                className={mainImage}
                width={isScreenLarge ? 602 : isScreenMedium ? 500 : 345}
                alt={singleProduct?.description}
              />
              <div className="max-904:flex max-904:gap-x-2 max-904:justify-center">
                {singleProduct?.images.map((url, index) => (
                  <img
                    className="mb-2 rounded-main cursor-pointer"
                    src={url}
                    width={isScreenLarge ? 115 : isScreenMedium ? 90 : 61}
                    alt={`Image ${index + 1}`}
                    onClick={() => setMainImageUrl(url)}
                    key={url}
                  />
                ))}
              </div>
            </article>
            <CartBtn
              productId={singleProduct?.id}
              onClick={() =>
                dispatch(manageProductInCart(singleProduct as ISingleProduct))
              }
            >
              Добавить в корзину
            </CartBtn>
            {fullUserInfo?.type === 'admin' && (
              <Link to={`/products/${id}/edit`} className={editProductLink}>
                <img src="/images/edit.svg" width={20} alt="edit" />
                Редактировать товар
              </Link>
            )}
          </div>
        ) : (
          <div className={productWrapper}>
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
              <img
                src={mainImageUrl ? mainImageUrl : singleProduct?.images[0]}
                className={mainImage}
                width={602}
                alt={singleProduct?.description}
              />
            </article>
            <div className="flex items-center">
              <article className="flex flex-col gap-y-8">
                <h1 className={productTitle}>{singleProduct?.title}</h1>
                <h2 className="dark:text-white max-904:text-sm">
                  {singleProduct?.description}
                </h2>
                <p className="text-primary-h1 dark:text-white max-904:text-lg">
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
                  <Link to={`/products/${id}/edit`} className={editProductLink}>
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
