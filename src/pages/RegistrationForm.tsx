import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  REGISTRATION_INPUT_FIELDS,
  REGISTRATION_INITIAL_USER_DATA,
  REG_SELECT_OPTIONS,
} from '../formsSettings/formsData';
import { Container } from '../components/UI/Container';
import { Loader } from '../components/UI/Loader';
import { CustomSelect } from '../components/UI/CustomSelect';
import { FormBtn } from '../components/UI/FormBtn';
import { FormInputField } from '../components/UI/FormInputField';
import { FormPasswordField } from '../components/UI/FormPasswordField';
import { registrationSchema } from '../formsSettings/validation/registrationSchema';
import {
  useAppDispatch,
  useAppSelector,
  selectUsersData,
} from '../redux/store';
import {
  addNewUser,
  setRegistrationBasis,
  setRegSelectBasis,
} from '../redux/slices/usersSlice';
import { enterKeyHandler } from '../formsSettings/utilsFunctions';
import { RegistrationFieldsNames } from '../types/forms';
import { ISelect } from '../types/filters';

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
  'mt-16',
  'dark:bg-dark-background',
  'dark:border-hover-black',
  'min-365-max-640:bg-transparent',
  'min-365-max-640:border-none',
  'min-365-max-640:px-1.5',
  'min-365-max-640:py-3',
  'min-500-max-640:max-w-full',
  'min-641-max-904:mt-20'
);
const clearBtn = cn(
  'bg-primary-blue',
  'transition-all',
  'hover:bg-hover-blue',
  'active:bg-active-blue',
  'text-white',
  'py-2.5',
  'rounded-main'
);
const loginLink = cn(
  'text-blue-600',
  'transition-all',
  'hover:text-hover-blue',
  'active:text-active-blue'
);

export function RegistrationForm() {
  const isLoading = useAppSelector(selectUsersData).isLoading;
  const registrationBasis = useAppSelector(selectUsersData).registrationBasis;
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registrationSchema),
  });

  const fieldsHandler = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
    key: RegistrationFieldsNames
  ) => {
    dispatch(
      setRegistrationBasis({ ...registrationBasis, [key]: event.target.value })
    );
  };

  const selectHandler = (option: ISelect) => {
    dispatch(
      setRegSelectBasis({
        value: option.value,
        label: option.label,
      })
    );
  };

  const clearFieldsHandler = () => {
    dispatch(setRegistrationBasis(REGISTRATION_INITIAL_USER_DATA));
    reset();
  };

  const submitHandler = () => {
    const { confirmPassword, accType, ...regData } = registrationBasis;
    dispatch(
      addNewUser({
        ...regData,
        type: registrationBasis.accType!.value,
        cart: [],
        ordersHistory: {},
      })
    );
    clearFieldsHandler();
  };

  return (
    <main className="grow">
      <Container>
        {isLoading ? (
          <Loader />
        ) : (
          <div className={formWrapper}>
            <h1 className="text-xl font-semibold dark:text-white">
              Регистрация
            </h1>
            <form
              className="flex flex-col gap-y-4"
              onSubmit={handleSubmit(submitHandler)}
              onKeyDown={enterKeyHandler}
            >
              {REGISTRATION_INPUT_FIELDS.map((fieldObj) =>
                fieldObj.type === 'password' ? (
                  <FormPasswordField
                    state={registrationBasis}
                    register={register}
                    errors={errors}
                    fieldObj={fieldObj}
                    fieldsHandler={fieldsHandler}
                    key={fieldObj.id}
                  />
                ) : (
                  <FormInputField
                    state={registrationBasis}
                    register={register}
                    errors={errors}
                    fieldObj={fieldObj}
                    fieldsHandler={fieldsHandler}
                    key={fieldObj.id}
                  />
                )
              )}
              <div className="text-left">
                <p className="mb-1 cursor-default dark:text-white">
                  Тип пользователя:
                </p>
                <CustomSelect
                  name="registration"
                  options={REG_SELECT_OPTIONS}
                  value={registrationBasis.accType}
                  selectHandler={selectHandler}
                />
              </div>
              <FormBtn>Зарегистрироваться</FormBtn>
              <button
                type="button"
                className={clearBtn}
                onClick={clearFieldsHandler}
              >
                Очистить форму
              </button>
            </form>
            <p className="dark:text-white">
              Если Вы уже зарегистрированы -{' '}
              <Link to={'/login'} className={loginLink}>
                войдите
              </Link>
            </p>
          </div>
        )}
      </Container>
    </main>
  );
}
