import { Errors, FieldObj } from '../types/forms';

export const enterKeyHandler = (
  event: React.KeyboardEvent<HTMLFormElement>
) => {
  if (event.key === 'Enter') event.preventDefault();
};

export const incorrectInput = (errors: Errors, fieldObj: FieldObj) =>
  Object.keys(errors).some((key) => fieldObj.name === key);
