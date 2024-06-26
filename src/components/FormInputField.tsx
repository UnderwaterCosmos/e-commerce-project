import cn from 'classnames';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

import {
  RegistrationBasis,
  LoginBasis,
  IRegistrationInputField,
  RegistrationFieldsNames,
  LoginFieldsNames,
  ILoginInputField,
} from '../types/forms';

const inputField = cn('bg-slate-200', 'rounded-full', 'mb-2', 'p-1.5');
const errMessage = cn('mb-0.5', 'text-red-600', 'font-semibold');

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

export function FormInputField({
  state,
  register,
  errors,
  fieldObj,
  fieldsHandler,
}: IProps) {
  return (
    <>
      <label htmlFor={fieldObj.name}>{fieldObj.label}</label>
      <input
        {...register(fieldObj.name)}
        className={inputField}
        type={fieldObj.type}
        id={fieldObj.name}
        placeholder={fieldObj.placeholder}
        value={state[fieldObj.name as keyof typeof state]}
        onChange={(event) => fieldsHandler(event, fieldObj.name)}
      />
      {errors[fieldObj.name as keyof typeof errors] && (
        <p className={errMessage}>
          {errors[fieldObj.name as keyof typeof errors]?.message}
        </p>
      )}
    </>
  );
}
