import cn from 'classnames';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

import { IUserBasis } from '../types/users';
import {
  IRegistrationInputField,
  RegistrationFieldsNames,
} from '../types/forms';

const inputField = cn('bg-slate-200', 'rounded-full', 'mb-2', 'p-1.5');
const errMessage = cn('mb-0.5', 'text-red-600', 'font-semibold');

interface IProps {
  state: IUserBasis;
  register: UseFormRegister<Omit<IUserBasis, 'type'>>;
  errors: FieldErrors<Omit<IUserBasis, 'type'>>;
  fieldObj: IRegistrationInputField;
  fieldsHandler: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
    key: RegistrationFieldsNames
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
        id={fieldObj.name}
        placeholder={fieldObj.placeholder}
        value={state[fieldObj.name]}
        onChange={(event) => fieldsHandler(event, fieldObj.name)}
      />
      {errors[fieldObj.name] && (
        <p className={errMessage}>{errors[fieldObj.name]?.message}</p>
      )}
    </>
  );
}
