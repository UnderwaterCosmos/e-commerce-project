import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { UseFormRegister } from 'react-hook-form';

import { incorrectInput } from '../../formsSettings/utilsFunctions';

import {
  // RegistrationFieldsNames,
  // LoginFieldsNames,
  State,
  Errors,
  FieldObj,
} from '../../types/forms';

const errMessage = cn('text-rose-500', 'font-semibold');

interface IProps {
  state: State;
  register: UseFormRegister<any>;
  // register:
  // | UseFormRegister<Omit<RegistrationBasis, 'type'>>
  // | UseFormRegister<LoginBasis>;
  errors: Errors;
  fieldObj: FieldObj;
  fieldsHandler: (
    event: React.ChangeEvent<HTMLInputElement>,
    key: any
    // key: LoginFieldsNames | RegistrationFieldsNames
  ) => void;
}

export function FormInputField({
  state,
  register,
  errors,
  fieldObj,
  fieldsHandler,
}: IProps) {
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
    <div className="flex flex-col">
      <label htmlFor={fieldObj.name} className="mb-1 text-left">
        {t(`${fieldObj.label  ?? ''}`)}
      </label>
      <input
        {...register(fieldObj.name)}
        className={inputField}
        type={fieldObj.type}
        id={fieldObj.name}
        placeholder={t(`${fieldObj.placeholder}`)}
        value={state[fieldObj.name as keyof typeof state]}
        onChange={(event) => fieldsHandler(event, fieldObj.name)}
      />
      {errors[fieldObj.name as keyof typeof errors] && (
        <p className={errMessage}>
          {t(`${errors[fieldObj.name as keyof typeof errors]?.message}`)}
        </p>
      )}
    </div>
  );
}
