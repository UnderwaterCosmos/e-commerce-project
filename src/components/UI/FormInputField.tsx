import cn from 'classnames';
import { UseFormRegister } from 'react-hook-form';

import { incorrectInput } from '../../formsSettings/utilsFunctions';

import { State, Errors, FieldObj } from '../../types/forms';
interface IProps {
  state: State;
  register: UseFormRegister<any>;
  errors: Errors;
  fieldObj: FieldObj;
  fieldsHandler: (event: React.ChangeEvent<HTMLInputElement>, key: any) => void;
}

export function FormInputField({
  state,
  register,
  errors,
  fieldObj,
  fieldsHandler,
}: IProps) {
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
    <div className="flex flex-col">
      <label htmlFor={fieldObj.name} className="mb-1 text-left dark:text-white">
        {fieldObj.label}
      </label>
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
        <p className="text-rose-500 font-semibold">
          {errors[fieldObj.name as keyof typeof errors]?.message}
        </p>
      )}
    </div>
  );
}
