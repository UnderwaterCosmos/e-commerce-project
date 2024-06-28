import { IRegistrationInputField, ILoginInputField } from './types/forms';
import { RegistrationBasis, LoginBasis } from './types/forms';

export const REGISTRATION_INITIAL_USER_DATA: RegistrationBasis = {
  email: '',
  password: '',
  login: '',
  avatarUrl: '',
  type: 'customer',
};

export const REGISTRATION_INPUT_FIELDS: IRegistrationInputField[] = [
  {
    id: 1,
    name: 'email',
    placeholder: 'Введите Email',
    label: 'Почта:',
    type: 'email',
  },
  {
    id: 2,
    name: 'password',
    placeholder: 'Введите пароль',
    label: 'Пароль:',
    type: 'text',
  },
  {
    id: 3,
    name: 'login',
    placeholder: 'Введите логин',
    label: 'Логин:',
    type: 'text',
  },
  {
    id: 4,
    name: 'avatarUrl',
    placeholder: 'Добавьте URL аватара',
    label: 'Аватар:',
    type: 'text',
  },
];

export const LOGIN_INITIAL_USER_DATA: LoginBasis = {
  login: '',
  password: '',
};

export const LOGIN_INPUT_FIELDS: ILoginInputField[] = [
  {
    id: 1,
    name: 'login',
    placeholder: 'Введите логин',
    label: 'Логин:',
    type: 'text',
  },
  {
    id: 2,
    name: 'password',
    placeholder: 'Введите пароль',
    label: 'Пароль:',
    type: 'password',
  },
];
