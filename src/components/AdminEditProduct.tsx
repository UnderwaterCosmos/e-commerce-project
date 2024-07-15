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
  selectFiltersData,
} from '../redux/store';
import {
  setEditProductBasis,
  editSingleProduct,
  fetchSingleProduct,
} from '../redux/slices/singleProductSlice';
import { setNewImagesBasis } from '../redux/slices/filtersSlice';
import {
  EDIT_PRODUCT_INITIAL_DATA,
  EDIT_PRODUCT_INPUT_FIELDS,
  ADD_PRODUCT_IMAGES_FIELDS,
  ADD_PRODUCT_IMAGES_OBJ,
} from '../formsSettings/formsData';
import {
  EditProductFieldsNames,
  IProductEditedValueBasis,
} from '../types/forms';
import { editProductSchema } from '../formsSettings/validation/editProductSchema';

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
  const newImagesObj = useAppSelector(selectFiltersData).newImagesObj;
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
    // const editedData: IProductEditedValueBasis = {};
    // for (const key in editProductBasis) {
    //   if (editProductBasis[key] === '') continue;
    //   editedData[key] = editProductBasis[key];
    // }

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
            <form
              className={editProductForm}
              onSubmit={handleSubmit(submitHandler)}
              onKeyDown={enterKeyHandler}
            >
              <p>ID: {singleProduct?.id}</p>
              <p>CATEGORY: {singleProduct?.category.toUpperCase()}</p>
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
              <p>
                При изменении хотя бы одного URL остальные фото будут удалены!
              </p>
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
