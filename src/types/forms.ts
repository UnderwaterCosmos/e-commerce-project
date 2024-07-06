import { IUser } from './users';

// REGISTRATION
export type RegistrationFieldsNames = Exclude<keyof IUser, 'cart' | 'id'>;
export type RegistrationBasis = Omit<IUser, 'cart' | 'id' | 'ordersHistory'>;
export interface IRegistrationInputField {
  id: number;
  name: Exclude<RegistrationFieldsNames, 'type' | 'ordersHistory'>;
  placeholder: string;
  label: 'Почта:' | 'Пароль:' | 'Логин:' | 'Аватар:';
  type: string;
}

// LOGIN
export type LoginFieldsNames = Exclude<
  keyof IUser,
  'cart' | 'id' | 'email' | 'avatarUrl' | 'type' | 'ordersHistory'
>;
export type LoginBasis = Pick<IUser, 'password' | 'login'>;
export interface ILoginInputField {
  id: number;
  name: LoginFieldsNames;
  placeholder: string;
  label: 'Пароль:' | 'Логин:';
  type: string;
}
