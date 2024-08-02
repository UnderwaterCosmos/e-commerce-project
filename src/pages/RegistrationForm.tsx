import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Select from 'react-select';

import {
  REGISTRATION_INPUT_FIELDS,
  REGISTRATION_INITIAL_USER_DATA,
} from '../formsSettings/formsData';
import { Container } from '../components/Container';
import { Loader } from '../components/Loader';
import { FormBtn } from '../components/FormBtn';
import { FormInputField } from '../components/FormInputField';
import { FormPasswordField } from '../components/FormPasswordField';
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
  'gap-y-5'
);

const selectOptions = [
  { value: 'customer', label: 'Покупатель' },
  { value: 'admin', label: 'Администратор' },
];

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
    const { confirmPassword, type, ...regData } = registrationBasis;
    dispatch(
      addNewUser({
        ...regData,
        accType: registrationBasis.type!.value,
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
            <h1>Регистрация</h1>
            <form
              className="flex flex-col gap-y-5"
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
                <label htmlFor="userType">Тип пользователя:</label>
                <Select
                  options={selectOptions}
                  value={registrationBasis.type}
                  onChange={(option) => selectHandler(option as ISelect)}
                  styles={{
                    control: (baseStyles) => ({
                      ...baseStyles,
                      width: '410px',
                      height: '42px',
                      borderRadius: '6px',
                      borderColor: '#EEEEEE',
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
              <FormBtn>Зарегистрироваться</FormBtn>
              <button
                type="button"
                className="bg-primary-blue text-white py-2.5 rounded-main"
                onClick={clearFieldsHandler}
              >
                Очистить форму
              </button>
            </form>
            <p>
              Если Вы уже зарегистрированы -{' '}
              <Link to={'/login'} className="text-blue-600">
                войдите
              </Link>
            </p>
          </div>
        )}
      </Container>
    </main>
  );
}
