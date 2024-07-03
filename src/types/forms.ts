import { IUser } from './users';

// export interface IFormBasis {
//   key: string;
//   value: RegistrationBasis | LoginBasis;
// }

// REGISTRATION
export type RegistrationFieldsNames = Exclude<keyof IUser, 'cart' | 'id'>;
export type RegistrationBasis = Omit<IUser, 'cart' | 'id'>;
export interface IRegistrationInputField {
  id: number;
  name: Exclude<RegistrationFieldsNames, 'type'>;
  placeholder: string;
  label: 'Почта:' | 'Пароль:' | 'Логин:' | 'Аватар:';
  type: string;
}

// LOGIN
export type LoginFieldsNames = Exclude<
  keyof IUser,
  'cart' | 'id' | 'email' | 'avatarUrl' | 'type'
>;
export type LoginBasis = Pick<IUser, 'password' | 'login'>;
export interface ILoginInputField {
  id: number;
  name: LoginFieldsNames;
  placeholder: string;
  label: 'Пароль:' | 'Логин:';
  type: string;
}
