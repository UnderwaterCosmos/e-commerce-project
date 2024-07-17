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
  useAppDispatch,
  useAppSelector,
} from '../redux/store';
import { setCategoryBasis, addNewCategory } from '../redux/slices/filtersSlice';
import {
  ADD_CATEGORY_INPUT_FIELDS,
  ADD_CATEGORY_INITIAL_DATA,
} from '../formsSettings/formsData';
import { newCategorySchema } from '../formsSettings/validation/newCategorySchema';

const newCategoryForm = cn(
  'flex',
  'flex-col',
  'max-w-lg',
  'mx-auto',
  'mb-3',
  'p-5',
  'border-2'
);

export function AdminNewCategory() {
  const isLoading = useAppSelector(selectFiltersData).isLoading;
  const newCategoryBasis = useAppSelector(selectFiltersData).newCategoryBasis;
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(newCategorySchema),
  });

  const fieldsHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: 'value' | 'label'
  ) => {
    dispatch(
      setCategoryBasis({ ...newCategoryBasis, [key]: event.target.value })
    );
  };

  const submitHandler = () => {
    dispatch(addNewCategory(newCategoryBasis));
    dispatch(setCategoryBasis(ADD_CATEGORY_INITIAL_DATA));
    reset();
  };

  return (
    <main>
      <Container>
        {isLoading ? (
          <Loader />
        ) : (
          <form
            className={newCategoryForm}
            onSubmit={handleSubmit(submitHandler)}
            onKeyDown={enterKeyHandler}
          >
            {ADD_CATEGORY_INPUT_FIELDS.map((fieldObj) => (
              <FormInputField
                state={newCategoryBasis}
                register={register}
                errors={errors}
                fieldObj={fieldObj}
                fieldsHandler={fieldsHandler}
                key={fieldObj.id}
              />
            ))}
            <button className="bg-emerald-200 rounded-full mt-3">
              ДОБАВИТЬ КАТЕГОРИЮ ТОВАРОВ
            </button>
          </form>
        )}
      </Container>
    </main>
  );
}
