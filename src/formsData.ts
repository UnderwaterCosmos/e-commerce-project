import { IRegistrationInputField } from './types/forms';
import { IUserBasis } from './types/users';

export const REGISTRATION_INITIAL_USER_DATA: IUserBasis = {
  email: '',
  password: '',
  login: '',
  type: '',
  avatarUrl: '',
};

export const REGISTRATION_INPUT_FIELDS: IRegistrationInputField[] = [
  {
    id: 1,
    name: 'email',
    placeholder: 'Введите Email',
    label: 'Почта:',
  },
  {
    id: 2,
    name: 'password',
    placeholder: 'Введите пароль',
    label: 'Пароль:',
  },
  {
    id: 3,
    name: 'login',
    placeholder: 'Введите логин',
    label: 'Логин:',
  },
  {
    id: 4,
    name: 'avatarUrl',
    placeholder: 'Добавьте URL аватара',
    label: 'Аватар:',
  },
];
