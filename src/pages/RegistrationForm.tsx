import React from 'react';
import cn from 'classnames';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { v4 as uuidv4 } from 'uuid';

import {
  REGISTRATION_INPUT_FIELDS,
  REGISTRATION_INITIAL_USER_DATA,
} from '../formsData';
import { Container } from '../components/Container';
import { Loader } from '../components/Loader';
import { FormInputField } from '../components/FormInputField';
import { registrationSchema } from '../validation/registrationSchema';
import { useAppDispatch, useAppSelector } from '../redux/reduxHooks';
import { addNewUser, setUserBasis } from '../redux/slices/usersSlice';
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
  const { isLoading, userBasis } = useAppSelector((state) => state.usersData);
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
    dispatch(setUserBasis({ ...userBasis, [key]: event.target.value }));
  };

  const submitHandler = () => {
    dispatch(addNewUser({ ...userBasis, id: uuidv4(), basket: [] }));
    dispatch(setUserBasis(REGISTRATION_INITIAL_USER_DATA));
    reset();
  };

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
                  state={userBasis}
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
                value={userBasis.type}
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
              <a className="text-blue-600" href="#">
                войдите
              </a>
            </p>
          </div>
        )}
      </Container>
    </main>
  );
}
