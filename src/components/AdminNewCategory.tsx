import React from 'react';
import cn from 'classnames';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Container } from './Container';
import { Loader } from './Loader';
import { FormBtn } from './FormBtn';
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
          <div className={formWrapper}>
            <form
              className="flex flex-col gap-y-5"
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
              <FormBtn>Добавить категорию</FormBtn>
            </form>
          </div>
        )}
      </Container>
    </main>
  );
}
