import React from 'react';
import cn from 'classnames';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { incorrectInput } from '../../formsSettings/utilsFunctions';
import {
  RegistrationBasis,
  LoginBasis,
  IRegistrationInputField,
  // RegistrationFieldsNames,
  // LoginFieldsNames,
  ILoginInputField,
} from '../../types/forms';

interface IProps {
  state: RegistrationBasis | LoginBasis;
  register: UseFormRegister<any>;
  // register:
  // | UseFormRegister<Omit<RegistrationBasis, 'type'>>
  // | UseFormRegister<LoginBasis>;
  errors:
    | FieldErrors<Omit<RegistrationBasis, 'type'>>
    | FieldErrors<LoginBasis>;
  fieldObj: IRegistrationInputField | ILoginInputField;
  fieldsHandler: (
    event: React.ChangeEvent<HTMLInputElement>,
    key: any
    // key: LoginFieldsNames | RegistrationFieldsNames
  ) => void;
}

export function FormPasswordField({
  state,
  register,
  errors,
  fieldObj,
  fieldsHandler,
}: IProps) {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const { t } = useTranslation();

  const inputField = cn(
    'rounded-md',
    'py-2.5',
    'px-3',
    'placeholder:text-[#CACACA]',
    'border',
    'transition-all',
    'hover:border-active-gray',
    {
      'border-2 border-rose-500': incorrectInput(errors, fieldObj),
    }
  );

  return (
    <div>
      <div className="flex flex-col relative">
        <label htmlFor={fieldObj.name} className=" text-left mb-1">
          {t(`${fieldObj.label}`)}
        </label>
        <input
          {...register(fieldObj.name)}
          className={inputField}
          type={isPasswordVisible ? 'text' : 'password'}
          id={fieldObj.name}
          placeholder={t(`${fieldObj.placeholder}`)}
          value={state[fieldObj.name as keyof typeof state]}
          onChange={(event) => fieldsHandler(event, fieldObj.name)}
        />
        <div className="absolute right-5 bottom-1.5">
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
      </div>
      {errors[fieldObj.name as keyof typeof errors] && (
        <p className="text-rose-500 font-semibold">
          {t(`${errors[fieldObj.name as keyof typeof errors]?.message}`)}
        </p>
      )}
    </div>
  );
}
