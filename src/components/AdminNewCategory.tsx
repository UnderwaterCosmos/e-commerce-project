import React from 'react';
import cn from 'classnames';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Container } from './UI/Container';
import { Loader } from './UI/Loader';
import { FormBtn } from './UI/FormBtn';
import { FormInputField } from './UI/FormInputField';
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
  'gap-y-5',
	'dark:bg-dark-background',
	'dark:border-hover-black',
	'mobile:bg-transparent',
  'mobile:border-none',
  'mobile:px-1.5',
  'mobile:py-3',
  'min-500-max-640:max-w-full',
  'min-641-max-904:mt-14',
	'min-365-max-640:bg-transparent',
  'min-365-max-640:border-none',
  'min-365-max-640:px-1.5',
  'min-365-max-640:py-3',
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
