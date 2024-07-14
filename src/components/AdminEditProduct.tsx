import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import cn from 'classnames';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Container } from './Container';
import { Loader } from './Loader';
import { BackBtn } from './BackBtn';
import { FormInputField } from './FormInputField';
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
import {
  EDIT_PRODUCT_INITIAL_DATA,
  EDIT_PRODUCT_INPUT_FIELDS,
} from '../formsSettings/formsData';
import {
  EditProductFieldsNames,
  IProductEditedValueBasis,
} from '../types/forms';

const editProductForm = cn(
  'flex',
  'flex-col',
  'max-w-lg',
  'mx-auto',
  'mb-3',
  'p-5',
  'border-2'
);

export function AdminEditProduct() {
  const isLoading = useAppSelector(selectSingleProductsData).isLoading;
  const singleProduct = useAppSelector(selectSingleProductsData).singleProduct;
  const editProductBasis = useAppSelector(
    selectSingleProductsData
  ).editProductBasis;
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!singleProduct) {
      dispatch(fetchSingleProduct(id!));
    }
  }, [dispatch, id]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(newProductSchema),
  });

  const fieldsHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: EditProductFieldsNames
  ) => {
    dispatch(
      setEditProductBasis({ ...editProductBasis, [key]: event.target.value })
    );
  };

  const submitHandler = () => {
    const editedData: IProductEditedValueBasis = {};
    for (const key in editProductBasis) {
      if (editProductBasis[key] === '') continue;
      editedData[key] = editProductBasis[key];
    }

    dispatch(editSingleProduct(editedData));
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
            <form
              className={editProductForm}
              onSubmit={handleSubmit(submitHandler)}
              onKeyDown={enterKeyHandler}
            >
              <p>ID: {singleProduct?.id}</p>
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
              <p>CATEGORY: {singleProduct?.category.toUpperCase()}</p>
              <button className="bg-emerald-200 rounded-full mt-3">
                ОТРЕДАКТИРОВАТЬ ТОВАР
              </button>
            </form>
          </>
        )}
      </Container>
    </main>
  );
}
