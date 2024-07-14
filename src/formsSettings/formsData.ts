import {
  IRegistrationInputField,
  ILoginInputField,
  RegistrationBasis,
  LoginBasis,
  IAddNewCategoryInputField,
} from '../types/forms';
import { ICategoriesElem } from '../types/filters';

export const REGISTRATION_INITIAL_USER_DATA: RegistrationBasis = {
  email: '',
  password: '',
  confirmPassword: '',
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
    type: 'password',
  },
  {
    id: 3,
    name: 'confirmPassword',
    placeholder: 'Введите пароль повторно',
    label: 'Подтвердите пароль:',
    type: 'password',
  },
  {
    id: 4,
    name: 'login',
    placeholder: 'Введите логин',
    label: 'Логин:',
    type: 'text',
  },
  {
    id: 5,
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

export const ADD_CATEGORY_INITIAL_DATA: ICategoriesElem = {
  name: '',
  displayName: '',
};

export const ADD_CATEGORY_INPUT_FIELDS: IAddNewCategoryInputField[] = [
  {
    id: 1,
    name: 'name',
    placeholder: 'dishes',
    label: 'Название на английском с маленькой буквы',
    type: 'text',
  },
  {
    id: 2,
    name: 'displayName',
    placeholder: 'Посуда',
    label: 'Название на русском с заглавной буквы:',
    type: 'text',
  },
];
