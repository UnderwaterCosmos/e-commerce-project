import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';

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
  'gap-y-5'
);
const clearBtn = cn(
  'bg-primary-blue',
  ' transition-all',
  ' hover:bg-hover-blue',
  ' active:bg-active-blue',
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
  const { t } = useTranslation();

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
            <h1 className="text-xl font-semibold">{t('regForm.title')}</h1>
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
                <p className='mb-1 cursor-default'>{t('regForm.userTypeLabel')}</p>
                <CustomSelect
                  name="registration"
                  options={REG_SELECT_OPTIONS}
                  value={registrationBasis.accType}
                  selectHandler={selectHandler}
                />
              </div>
              <FormBtn>{t('regForm.regButton')}</FormBtn>
              <button
                type="button"
                className={clearBtn}
                onClick={clearFieldsHandler}
              >
                {t('regForm.clearForm')}
              </button>
            </form>
            <p>
              {t('regForm.haveAcc')}{' '}
              <Link to={'/login'} className={loginLink}>
                {t('regForm.login')}
              </Link>
            </p>
          </div>
        )}
      </Container>
    </main>
  );
}
