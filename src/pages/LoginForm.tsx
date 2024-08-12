import { Link } from 'react-router-dom';
import cn from 'classnames';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';

import {
  LOGIN_INPUT_FIELDS,
  LOGIN_INITIAL_USER_DATA,
} from '../formsSettings/formsData';
import { Container } from '../components/UI/Container';
import { Loader } from '../components/UI/Loader';
import { FormBtn } from '../components/UI/FormBtn';
import { FormInputField } from '../components/UI/FormInputField';
import { FormPasswordField } from '../components/UI/FormPasswordField';
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
const regLink = cn(
  'text-primary-blue',
  ' transition-all',
  'hover:text-hover-blue',
  'active:text-active-blue'
);

export function LoginForm() {
  const isLoading = useAppSelector(selectUsersData).isLoading;
  const loginBasis = useAppSelector(selectUsersData).loginBasis;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

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
            <h1 className="text-xl font-semibold">{t('loginForm.title')}</h1>
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
              <FormBtn>{t('loginForm.title')}</FormBtn>
            </form>
            <p>
						{t('loginForm.noAcc')}{' '}
              <Link to={'/registration'} className={regLink}>
							{t('loginForm.reg')}
              </Link>
            </p>
          </div>
        )}
      </Container>
    </main>
  );
}
