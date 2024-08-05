import React from 'react';
import cn from 'classnames';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Select from 'react-select';

import { Container } from './Container';
import { Loader } from './Loader';
import { FormBtn } from './FormBtn';
import { FormInputField } from './FormInputField';
import { enterKeyHandler } from '../formsSettings/utilsFunctions';
import {
  selectFiltersData,
  selectProductsData,
  selectSingleProductsData,
  useAppDispatch,
  useAppSelector,
} from '../redux/store';
import {
  setProductsBasis,
  addNewProduct,
  setNewProductSelectBasis,
} from '../redux/slices/productsSlice';
import { fetchCategories } from '../redux/slices/filtersSlice';
import { setNewImagesBasis } from '../redux/slices/singleProductSlice';
import {
  ADD_PRODUCT_INITIAL_DATA,
  ADD_PRODUCT_INPUT_FIELDS,
  ADD_PRODUCT_IMAGES_FIELDS,
  ADD_PRODUCT_IMAGES_OBJ,
} from '../formsSettings/formsData';
import { NewProductFieldsNames } from '../types/forms';
import { ISelect } from '../types/filters';
import { newProductSchema } from '../formsSettings/validation/newProductSchema';

const formWrapper = cn(
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
  'gap-y-5'
);

export function AdminNewProduct() {
  const isLoading = useAppSelector(selectProductsData).isLoading;
  const newProductBasis = useAppSelector(selectProductsData).newProductBasis;
  const modifiedCategoriesList =
    useAppSelector(selectFiltersData).categoriesList.slice(1);
  const newImagesObj = useAppSelector(selectSingleProductsData).newImagesObj;
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (modifiedCategoriesList.length === 0) {
      dispatch(fetchCategories(false));
    }
  }, [dispatch, modifiedCategoriesList]);

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

  const selectHandler = (option: ISelect) => {
    dispatch(
      setNewProductSelectBasis({
        value: option.value,
        label: option.label,
      })
    );
  };

  const submitHandler = () => {
    const { productGroup, ...productData } = newProductBasis;
    dispatch(
      addNewProduct({
        ...productData,
        category: newProductBasis.productGroup!.value,
        images: Object.values(newImagesObj),
        price: Number(newProductBasis['price']),
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
          <div className={formWrapper}>
            <form
              className="flex flex-col gap-y-5"
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
              <div className="flex justify-center flex-col">
                <label htmlFor="selectCategory" className="text-left mb-1">
                  Категория товара
                </label>
                <Select
                  id="selectCategory"
                  options={modifiedCategoriesList}
                  value={newProductBasis.productGroup}
                  onChange={(option) => selectHandler(option as ISelect)}
                  styles={{
                    control: (baseStyles) => ({
                      ...baseStyles,
                      height: '42px',
                      borderRadius: '6px',
                      borderColor: '#EEEEEE',
                      textAlign: 'left',
                    }),
                    option: (baseStyles, { isSelected, isFocused }) => ({
                      ...baseStyles,
                      backgroundColor: isSelected
                        ? '#0147FF'
                        : isFocused
                        ? 'rgba(163, 179, 217, 0.6)'
                        : '',
                      color: isSelected ? 'white' : '',
                    }),
                  }}
                />
              </div>
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
              <FormBtn>Добавить товар</FormBtn>
            </form>
          </div>
        )}
      </Container>
    </main>
  );
}
