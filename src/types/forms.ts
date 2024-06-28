import { IUser } from './users';

// export interface IFormBasis {
//   key: string;
//   value: RegistrationBasis | LoginBasis;
// }

// REGISTRATION
export type RegistrationFieldsNames = Exclude<keyof IUser, 'basket' | 'id'>;
export type RegistrationBasis = Omit<IUser, 'basket' | 'id'>;
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
  'basket' | 'id' | 'email' | 'avatarUrl' | 'type'
>;
export type LoginBasis = Pick<IUser, 'password' | 'login' | 'id'>;
export interface ILoginInputField {
  id: number;
  name: LoginFieldsNames;
  placeholder: string;
  label: 'Пароль:' | 'Логин:';
  type: string;
}
