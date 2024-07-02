import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  REGISTRATION_INPUT_FIELDS,
  REGISTRATION_INITIAL_USER_DATA,
} from '../formsData';
import { Container } from '../components/Container';
import { Loader } from '../components/Loader';
import { FormInputField } from '../components/FormInputField';
import { registrationSchema } from '../validation/registrationSchema';
import {
  useAppDispatch,
  useAppSelector,
  selectUsersData,
} from '../redux/store';
import {
  addNewUser,
  setRegistrationBasis,
  // setFormBasis,
} from '../redux/slices/usersSlice';
import { RegistrationFieldsNames } from '../types/forms';

const regForm = cn(
  'flex',
  'flex-col',
  'max-w-lg',
  'mx-auto',
  'mb-3',
  'p-5',
  'border-2'
);
const inputField = cn('bg-slate-200', 'rounded-full', 'mb-2', 'p-1.5');

export function RegistrationForm() {
  const isLoading = useAppSelector(selectUsersData).isLoading;
  const registrationBasis = useAppSelector(selectUsersData).registrationBasis;
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registrationSchema) });

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

  const submitHandler = () => {
    dispatch(addNewUser({ ...registrationBasis, cart: [] }));
    dispatch(setRegistrationBasis(REGISTRATION_INITIAL_USER_DATA));
    reset();
  };

  // const fieldsHandler = (
  //   event:
  //     | React.ChangeEvent<HTMLInputElement>
  //     | React.ChangeEvent<HTMLSelectElement>,
  //   key: RegistrationFieldsNames
  // ) => {
  //   dispatch(
  //     setFormBasis({
  //       key: 'registrationBasis',
  //       value: { ...registrationBasis, [key]: event.target.value },
  //     })
  //   );
  // };

  // const submitHandler = () => {
  //   dispatch(addNewUser({ ...registrationBasis, cart: [] }));
  //   dispatch(
  //     setFormBasis({
  //       key: '',
  //       value: REGISTRATION_INITIAL_USER_DATA,
  //     })
  //   );
  //   reset();
  // };

  return (
    <main className="grow">
      <Container>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="text-center">
            <h1 className="mb-3">РЕГИСТРАЦИЯ</h1>
            <form className={regForm} onSubmit={handleSubmit(submitHandler)}>
              {REGISTRATION_INPUT_FIELDS.map((fieldObj) => (
                <FormInputField
                  state={registrationBasis}
                  register={register}
                  errors={errors}
                  fieldObj={fieldObj}
                  fieldsHandler={fieldsHandler}
                  key={fieldObj.id}
                />
              ))}
              <label htmlFor="userType">Тип пользователя:</label>
              <select
                className={inputField}
                id="userType"
                value={registrationBasis.type}
                onChange={(event) => fieldsHandler(event, 'type')}
              >
                <option value="customer">Покупатель</option>
                <option value="admin">Администратор</option>
              </select>
              <button className="bg-emerald-200 rounded-full mt-2">
                ЗАРЕГИСТРИРОВАТЬСЯ
              </button>
              {/* <button type="reset" className="bg-emerald-200 rounded-full mt-2">
                ОЧИСТИТЬ ФОРМУ
              </button> */}
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
