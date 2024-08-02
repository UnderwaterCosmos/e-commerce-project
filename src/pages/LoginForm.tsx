import { Link } from 'react-router-dom';
import cn from 'classnames';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  LOGIN_INPUT_FIELDS,
  LOGIN_INITIAL_USER_DATA,
} from '../formsSettings/formsData';
import { Container } from '../components/Container';
import { Loader } from '../components/Loader';
import { FormBtn } from '../components/FormBtn';
import { FormInputField } from '../components/FormInputField';
import { FormPasswordField } from '../components/FormPasswordField';
import { logInUser, setLoginBasis } from '../redux/slices/usersSlice';
import {
  useAppSelector,
  useAppDispatch,
  selectUsersData,
} from '../redux/store';
import { enterKeyHandler } from '../formsSettings/utilsFunctions';
import { loginSchema } from '../formsSettings/validation/loginSchema';
import { LoginFieldsNames } from '../types/forms';

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

export function LoginForm() {
  const isLoading = useAppSelector(selectUsersData).isLoading;
  const loginBasis = useAppSelector(selectUsersData).loginBasis;
  const dispatch = useAppDispatch();

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
    <main className="grow mt-36">
      <Container>
        {isLoading ? (
          <Loader />
        ) : (
          <div className={formWrapper}>
            <h1 className="text-xl font-semibold">Войти</h1>
            <form
              className="flex flex-col gap-y-5"
              onSubmit={handleSubmit(submitHandler)}
              onKeyDown={enterKeyHandler}
            >
              {LOGIN_INPUT_FIELDS.map((fieldObj) =>
                fieldObj.type === 'password' ? (
                  <FormPasswordField
                    state={loginBasis}
                    register={register}
                    errors={errors}
                    fieldObj={fieldObj}
                    fieldsHandler={fieldsHandler}
                    key={fieldObj.id}
                  />
                ) : (
                  <FormInputField
                    state={loginBasis}
                    register={register}
                    errors={errors}
                    fieldObj={fieldObj}
                    fieldsHandler={fieldsHandler}
                    key={fieldObj.id}
                  />
                )
              )}
              <FormBtn>Войти</FormBtn>
            </form>
            <p>
              Нет аккаунта?{' '}
              <Link to={'/registration'} className="text-primary-blue">
                Зарегистироваться
              </Link>
            </p>
          </div>
        )}
      </Container>
    </main>
  );
}
