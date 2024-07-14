import { IUser } from './users';

// REGISTRATION
export type RegistrationFieldsNames = Exclude<
  keyof IUser,
  'cart' | 'id' | 'ordersHistory'
>;
export type RegistrationBasis = Omit<IUser, 'cart' | 'id' | 'ordersHistory'>;
export interface IRegistrationInputField {
  id: number;
  name: Exclude<RegistrationFieldsNames, 'type' | 'ordersHistory'>;
  placeholder: string;
  label: 'Почта:' | 'Пароль:' | 'Логин:' | 'Аватар:' | 'Подтвердите пароль:';
  type: string;
}

// LOGIN
export type LoginFieldsNames = Extract<keyof IUser, 'login' | 'password'>;
export type LoginBasis = Pick<IUser, 'password' | 'login'>;
export interface ILoginInputField {
  id: number;
  name: LoginFieldsNames;
  placeholder: string;
  label: 'Пароль:' | 'Логин:';
  type: string;
}

// ADD CATEGORY
export interface IAddNewCategoryInputField {
  id: number;
  name: 'name' | 'displayName';
  placeholder: string;
  label: string;
  type: string;
}
