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

const loginForm = cn(
  'flex',
  'flex-col',
  'max-w-lg',
  'mx-auto',
  'mb-3',
  'p-5',
  'border-2'
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
    <main className="grow">
      <Container>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="text-center">
            <h1 className="mb-3">ВXОД</h1>
            <form
              className={loginForm}
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
