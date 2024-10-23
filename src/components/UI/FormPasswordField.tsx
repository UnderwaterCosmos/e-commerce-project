import React from 'react';
import cn from 'classnames';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

import { incorrectInput } from '../../formsSettings/utilsFunctions';
import { useTheme } from '../../hooks/useTheme';
import {
  RegistrationBasis,
  LoginBasis,
  IRegistrationInputField,
  ILoginInputField,
} from '../../types/forms';

interface IProps {
  state: RegistrationBasis | LoginBasis;
  register: UseFormRegister<any>;
  errors:
    | FieldErrors<Omit<RegistrationBasis, 'type'>>
    | FieldErrors<LoginBasis>;
  fieldObj: IRegistrationInputField | ILoginInputField;
  fieldsHandler: (event: React.ChangeEvent<HTMLInputElement>, key: any) => void;
}

export function FormPasswordField({
  state,
  register,
  errors,
  fieldObj,
  fieldsHandler,
}: IProps) {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const { theme } = useTheme();

  const inputField = cn(
    'rounded-md',
    'py-2.5',
    'px-3',
    'placeholder:text-active-gray',
    'border',
    'transition-all',
    'hover:border-active-gray',
    'dark:placeholder:text-active-black',
    'dark:bg-dark-background',
    'dark:border-hover-black',
    'dark:text-white',
    'dark:hover:border-active-black',
    {
      'border-2 !border-rose-500': incorrectInput(errors, fieldObj),
    }
  );

  return (
    <>
      <div className="flex flex-col relative">
        <label
          htmlFor={fieldObj.name}
          className="text-left mb-1 dark:text-white"
        >
          {fieldObj.label}
        </label>
        <input
          {...register(fieldObj.name)}
          className={inputField}
          type={isPasswordVisible ? 'text' : 'password'}
          id={fieldObj.name}
          placeholder={fieldObj.placeholder}
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
              <svg
                width="20"
                height="14"
                viewBox="0 0 20 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 4C8.358 4 7 5.359 7 7C7 8.642 8.358 10 10 10C11.641 10 13 8.642 13 7C13 5.359 11.641 4 10 4Z"
                  fill={theme === 'light' ? '#1D1D1D' : '#fff'}
                />
                <path
                  d="M10 0C2.408 0 0.126318 6.617 0.105431 6.684L0 7L0.104436 7.316C0.126318 7.383 2.408 14 10 14C17.592 14 19.8737 7.383 19.8946 7.316L20 7L19.8956 6.684C19.8737 6.617 17.592 0 10 0ZM10 12C4.67774 12 2.61587 8.154 2.11657 7C2.61786 5.842 4.68072 2 10 2C15.3223 2 17.3841 5.846 17.8834 7C17.3821 8.158 15.3193 12 10 12Z"
                  fill={theme === 'light' ? '#1D1D1D' : '#fff'}
                />
              </svg>
            </button>
          ) : (
            <button
              className="w-5 h-5"
              type="button"
              onClick={() => setIsPasswordVisible(true)}
            >
              <svg
                width="20"
                height="17"
                viewBox="0 0 20 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.67707 0.501465L16.8178 14.6422L16.8192 14.6407L16.8207 14.6421L15.6422 15.8207L12.8448 13.0233C11.7974 13.5118 10.5277 13.8333 9.00002 13.8333C2.67335 13.8333 0.771952 8.31917 0.753717 8.26334L0.666687 8L0.754546 7.73667C0.765542 7.7014 1.52839 5.48786 3.68375 3.86224L1.50002 1.67852L2.67707 0.501465ZM11.5723 11.7508L10.0746 10.2531C9.74802 10.4111 9.38325 10.5 9.00002 10.5C7.63169 10.5 6.50002 9.36834 6.50002 8C6.50002 7.61678 6.5889 7.252 6.74695 6.92544L4.86362 5.04211C3.39084 6.05494 2.6795 7.4248 2.4305 8C2.84658 8.96167 4.5648 12.1667 9.00002 12.1667C9.98669 12.1667 10.8389 12.008 11.5723 11.7508Z"
                  fill={theme === 'light' ? '#1D1D1D' : '#fff'}
                />
                <path
                  d="M6.91687 2.38424C7.55093 2.24544 8.24387 2.16667 9.00002 2.16667C15.3267 2.16667 17.2281 7.68084 17.2463 7.73667L17.3334 8L17.2455 8.26334C17.2369 8.29086 16.7707 9.64428 15.5426 11.0099L14.3828 9.85022C15.0382 9.10801 15.4049 8.38031 15.5695 8C15.1535 7.03834 13.4352 3.83334 9.00002 3.83334C8.78963 3.83334 8.58534 3.84055 8.38702 3.85439L6.91687 2.38424Z"
                  fill={theme === 'light' ? '#1D1D1D' : '#fff'}
                />
              </svg>
            </button>
          )}
        </div>
      </div>
      {errors[fieldObj.name as keyof typeof errors] && (
        <p className="text-rose-500 font-semibold">
          {errors[fieldObj.name as keyof typeof errors]?.message}
        </p>
      )}
    </>
  );
}
