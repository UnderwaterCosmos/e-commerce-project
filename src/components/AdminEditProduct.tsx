import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import cn from 'classnames';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Container } from './UI/Container';
import { Loader } from './UI/Loader';
import { FormBtn } from './UI/FormBtn';
import { BackBtn } from './UI/BackBtn';
import { FormInputField } from './UI/FormInputField';
import { enterKeyHandler } from '../formsSettings/utilsFunctions';
import {
  selectSingleProductsData,
  useAppSelector,
  useAppDispatch,
} from '../redux/store';
import {
  setEditProductBasis,
  editSingleProduct,
  fetchSingleProduct,
} from '../redux/slices/singleProductSlice';
import { setNewImagesBasis } from '../redux/slices/singleProductSlice';
import {
  EDIT_PRODUCT_INITIAL_DATA,
  EDIT_PRODUCT_INPUT_FIELDS,
  ADD_PRODUCT_IMAGES_FIELDS,
  ADD_PRODUCT_IMAGES_OBJ,
} from '../formsSettings/formsData';
import { EditProductFieldsNames } from '../types/forms';
import { editProductSchema } from '../formsSettings/validation/editProductSchema';
import { useLocalStorage } from '../hooks/useLocalStorage';

const editTitle = cn(
  'text-primary-h1',
  'font-semibold',
  'text-center',
  'mt-[-45px]',
  'mb-3'
);
const nonEditableInfo = cn('text-center', 'text-lg', 'mb-3.5');
const editProductForm = cn(
  'text-center',
  'border',
  'max-w-[458px]',
  'mx-auto',
  'rounded-2xl',
  'bg-white',
  'py-5',
  'px-6',
  'flex',
  'flex-col',
  'gap-y-4'
);

export function AdminEditProduct() {
  const isLoading = useAppSelector(selectSingleProductsData).isLoading;
  const singleProduct = useAppSelector(selectSingleProductsData).singleProduct;
  const newImagesObj = useAppSelector(selectSingleProductsData).newImagesObj;
  const editProductBasis = useAppSelector(
    selectSingleProductsData
  ).editProductBasis;
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const refreshedFlag = useLocalStorage('isEditProductRefreshed');

  React.useEffect(() => {
    if (!singleProduct) {
      dispatch(fetchSingleProduct(id!));
      refreshedFlag.setItem(true);
    }
  }, [dispatch, id]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editProductSchema),
  });

  const fieldsHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: EditProductFieldsNames
  ) => {
    dispatch(
      setEditProductBasis({ ...editProductBasis, [key]: event.target.value })
    );
  };

  const imageFieldsHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    dispatch(setNewImagesBasis({ ...newImagesObj, [key]: event.target.value }));
  };

  const submitHandler = () => {
    const newImagesArr = Object.values(newImagesObj).filter(
      (elem) => elem !== ''
    );
    const editedData = Object.fromEntries(
      Object.entries(editProductBasis).filter((elem) => elem[1] !== '')
    );

    dispatch(
      editSingleProduct({
        ...editedData,
        images: newImagesArr.length ? newImagesArr : singleProduct?.images,
      })
    );
    dispatch(setNewImagesBasis(ADD_PRODUCT_IMAGES_OBJ));
    dispatch(setEditProductBasis(EDIT_PRODUCT_INITIAL_DATA));
    reset();
  };

  return (
    <main className="grow">
      <Container>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <BackBtn onClick={() => navigate(-1)} />
            <h1 className={editTitle}>Редактировать товар</h1>
            <p className={nonEditableInfo}>ID: {singleProduct?.id}</p>
            <p className={nonEditableInfo}>
              CATEGORY: {singleProduct?.category?.toUpperCase()}
            </p>
            <form
              className={editProductForm}
              onSubmit={handleSubmit(submitHandler)}
              onKeyDown={enterKeyHandler}
            >
              {singleProduct &&
                EDIT_PRODUCT_INPUT_FIELDS.map((fieldObj) => {
                  const placeholderObj = {
                    ...fieldObj,
                    placeholder: String(singleProduct[fieldObj.name]),
                  };
                  return (
                    <FormInputField
                      state={editProductBasis}
                      register={register}
                      errors={errors}
                      fieldObj={placeholderObj}
                      fieldsHandler={fieldsHandler}
                      key={fieldObj.id}
                    />
                  );
                })}
              {ADD_PRODUCT_IMAGES_FIELDS.map((imageObj) => (
                <FormInputField
                  state={newImagesObj}
                  register={register}
                  errors={errors}
                  fieldObj={imageObj}
                  fieldsHandler={imageFieldsHandler}
                  key={imageObj.id}
                />
              ))}
              <FormBtn>Готово</FormBtn>
            </form>
          </>
        )}
      </Container>
    </main>
  );
}
