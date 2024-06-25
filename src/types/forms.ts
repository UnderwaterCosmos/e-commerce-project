import { IUser } from './users';

export type RegistrationFieldsNames = Exclude<keyof IUser, 'basket' | 'id'>;

export interface IRegistrationInputField {
  id: number;
  name: Exclude<RegistrationFieldsNames, 'type'>;
  placeholder: string;
  label: 'Почта:' | 'Пароль:' | 'Логин:' | 'Аватар:';
}
