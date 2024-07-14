import React from 'react';
import cn from 'classnames';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Container } from './Container';
import { Loader } from './Loader';
import { FormInputField } from './FormInputField';
import { enterKeyHandler } from '../formsSettings/utilsFunctions';
import {
  selectFiltersData,
  selectProductsData,
  useAppDispatch,
  useAppSelector,
} from '../redux/store';
import { setProductsBasis, addNewProduct } from '../redux/slices/productsSlice';
import {
  fetchCategories,
  setNewImagesBasis,
} from '../redux/slices/filtersSlice';
import {
  ADD_PRODUCT_INITIAL_DATA,
  ADD_PRODUCT_INPUT_FIELDS,
  ADD_PRODUCT_IMAGES_FIELDS,
  ADD_PRODUCT_IMAGES_OBJ,
} from '../formsSettings/formsData';
import { NewProductFieldsNames } from '../types/forms';
import { newProductSchema } from '../formsSettings/validation/newProductSchema';

const newProductForm = cn(
  'flex',
  'flex-col',
  'max-w-lg',
  'mx-auto',
  'mb-3',
  'p-5',
  'border-2'
);

export function AdminNewProduct() {
  const isLoading = useAppSelector(selectProductsData).isLoading;
  const newProductBasis = useAppSelector(selectProductsData).newProductBasis;
  const categoriesList = useAppSelector(selectFiltersData).categoriesList;
  const newImagesObj = useAppSelector(selectFiltersData).newImagesObj;
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (categoriesList.length === 0) {
      dispatch(fetchCategories(false));
    }
  }, [dispatch, categoriesList]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(newProductSchema),
  });

  const fieldsHandler = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
    key: NewProductFieldsNames
  ) => {
    dispatch(
      setProductsBasis({ ...newProductBasis, [key]: event.target.value })
    );
  };

  const imageFieldsHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    dispatch(setNewImagesBasis({ ...newImagesObj, [key]: event.target.value }));
  };

  const submitHandler = () => {
    dispatch(
      addNewProduct({
        ...newProductBasis,
        images: Object.values(newImagesObj),
        // price: Number(newProductBasis['price']),
      })
    );
    dispatch(setProductsBasis(ADD_PRODUCT_INITIAL_DATA));
    dispatch(setNewImagesBasis(ADD_PRODUCT_IMAGES_OBJ));
    reset();
  };

  return (
    <main>
      <Container>
        {isLoading ? (
          <Loader />
        ) : (
          <form
            className={newProductForm}
            onSubmit={handleSubmit(submitHandler)}
            onKeyDown={enterKeyHandler}
          >
            {ADD_PRODUCT_INPUT_FIELDS.map((fieldObj) => (
              <FormInputField
                state={newProductBasis}
                register={register}
                errors={errors}
                fieldObj={fieldObj}
                fieldsHandler={fieldsHandler}
                key={fieldObj.id}
              />
            ))}
            <label htmlFor="selectCategory">Категория товара</label>
            <select
              id="selectCategory"
              value={newProductBasis.category}
              onChange={(event) => fieldsHandler(event, 'category')}
            >
              {categoriesList.slice(1).map((category) => (
                <option value={category.name} key={category.id}>
                  {category.displayName}
                </option>
              ))}
            </select>
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
            <button className="bg-emerald-200 rounded-full mt-3">
              ДОБАВИТЬ ТОВАР
            </button>
          </form>
        )}
      </Container>
    </main>
  );
}
