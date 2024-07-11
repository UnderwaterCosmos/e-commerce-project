import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { LOGIN_INPUT_FIELDS, LOGIN_INITIAL_USER_DATA } from '../formsData';
import { Container } from '../components/Container';
import { Loader } from '../components/Loader';
import { FormInputField } from '../components/FormInputField';
import { logInUser, setLoginBasis } from '../redux/slices/usersSlice';
import {
  useAppSelector,
  useAppDispatch,
  selectUsersData,
} from '../redux/store';
import { loginSchema } from '../validation/loginSchema';
import { LoginFieldsNames } from '../types/forms';

const loginForm = cn(
  'flex',
  'flex-col',
  'max-w-lg',
  'mx-auto',
  'mb-3',
  'p-5',
  'border-2',
  'relative'
);

export function LoginForm() {
  const isLoading = useAppSelector(selectUsersData).isLoading;
  const loginBasis = useAppSelector(selectUsersData).loginBasis;
  const dispatch = useAppDispatch();
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const fieldsHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: LoginFieldsNames
  ) => {
    dispatch(setLoginBasis({ ...loginBasis, [key]: event.target.value }));
  };

  const submitHandler = () => {
    dispatch(logInUser(loginBasis));
    dispatch(setLoginBasis(LOGIN_INITIAL_USER_DATA));
    reset();
  };

  return (
    <main className="grow">
      <Container>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="text-center">
            <h1 className="mb-3">ВXОД</h1>
            <form className={loginForm} onSubmit={handleSubmit(submitHandler)}>
              {LOGIN_INPUT_FIELDS.map((fieldObj) => {
                const passwordInputType = isPasswordVisible
                  ? 'text'
                  : 'password';
                return (
                  <FormInputField
                    state={loginBasis}
                    register={register}
                    errors={errors}
                    fieldObj={{
                      ...fieldObj,
                      type:
                        fieldObj.name === 'password'
                          ? passwordInputType
                          : fieldObj.type,
                    }}
                    fieldsHandler={fieldsHandler}
                    key={fieldObj.id}
                  />
                );
              })}
              <div className="absolute right-8 bottom-[65px]">
                {isPasswordVisible ? (
                  <button
                    className="w-5 h-5"
                    type="button"
                    onClick={() => setIsPasswordVisible(false)}
                  >
                    <img src="/images/show.svg" alt="Show password" />
                  </button>
                ) : (
                  <button
                    className="w-5 h-5"
                    type="button"
                    onClick={() => setIsPasswordVisible(true)}
                  >
                    <img src="/images/hide.svg" alt="Hide password" />
                  </button>
                )}
              </div>
              <button className="bg-emerald-200 rounded-full mt-3">
                ВОЙТИ
              </button>
            </form>
            <p>
              Если Вы еще не зарегистрированы -{' '}
              <Link to={'/registration'} className="text-blue-600">
                зарегистрируйтесь
              </Link>
            </p>
          </div>
        )}
      </Container>
    </main>
  );
}
