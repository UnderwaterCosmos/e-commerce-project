import {
  IRegistrationInputField,
  ILoginInputField,
  RegistrationBasis,
  LoginBasis,
  IAddNewCategoryInputField,
  IAddNewProductInputField,
  IAddNewProductsImageInputField,
  IAddNewProductImagesBasis,
  IProductEditedValueBasis,
  IEditProductInputField,
} from '../types/forms';
import { ICategoriesElem, ISelect } from '../types/filters';
import { ISingleProduct } from '../types/products';

// REGISTRATION
export const REGISTRATION_INITIAL_USER_DATA: RegistrationBasis = {
  email: '',
  password: '',
  confirmPassword: '',
  login: '',
  avatarUrl: '',
  accType: {
    value: 'customer',
    label: 'regForm.typeCustomer',
  },
};
export const REGISTRATION_INPUT_FIELDS: IRegistrationInputField[] = [
  {
    id: 1,
    name: 'email',
    placeholder: 'regForm.emailPlaceholder',
    label: 'regForm.emailLabel',
    type: 'email',
  },
  {
    id: 2,
    name: 'password',
    placeholder: 'regForm.passwordPlaceholder',
    label: 'regForm.passwordLabel',
    type: 'password',
  },
  {
    id: 3,
    name: 'confirmPassword',
    placeholder: 'regForm.confirmPasswordPlaceholder',
    label: 'regForm.confirmPasswordLabel',
    type: 'password',
  },
  {
    id: 4,
    name: 'login',
    placeholder: 'regForm.loginPlaceholder',
    label: 'regForm.loginLabel',
    type: 'text',
  },
  {
    id: 5,
    name: 'avatarUrl',
    placeholder: 'regForm.avatarPlaceholder',
    label: 'regForm.avatarLabel',
    type: 'text',
  },
];
export const REG_SELECT_OPTIONS: ISelect[] = [
  { value: 'customer', label: 'regForm.typeCustomer' },
  { value: 'admin', label: 'regForm.typeAdmin' },
];

// LOGIN
export const LOGIN_INITIAL_USER_DATA: LoginBasis = {
  login: '',
  password: '',
};
export const LOGIN_INPUT_FIELDS: ILoginInputField[] = [
  {
    id: 1,
    name: 'login',
    placeholder: 'loginForm.loginPlaceholder',
    label: 'loginForm.loginLabel',
    type: 'text',
  },
  {
    id: 2,
    name: 'password',
    placeholder: 'loginForm.passwordPlaceholder',
    label: 'loginForm.passwordLabel',
    type: 'password',
  },
];

// ADD CATEGORY
export const ADD_CATEGORY_INITIAL_DATA: ICategoriesElem = {
  value: '',
  label: '',
};
export const ADD_CATEGORY_INPUT_FIELDS: IAddNewCategoryInputField[] = [
  {
    id: 1,
    name: 'value',
    placeholder: 'dishes',
    label: 'Название на английском с маленькой буквы',
    type: 'text',
  },
  {
    id: 2,
    name: 'label',
    placeholder: 'Посуда',
    label: 'Название на русском с заглавной буквы:',
    type: 'text',
  },
];

//ADD PRODUCT
export const ADD_PRODUCT_INITIAL_DATA: ISingleProduct = {
  title: '',
  price: -Infinity,
  quantity: 1,
  description: '',
  productGroup: { value: 'houseplants', label: 'Комнатные растения' },
  images: [],
};
export const ADD_PRODUCT_INPUT_FIELDS: IAddNewProductInputField[] = [
  {
    id: 1,
    name: 'title',
    placeholder: 'Введите название товара',
    label: 'Название товара',
    type: 'text',
  },
  {
    id: 2,
    name: 'price',
    placeholder: 'Введите стоимость товара',
    label: 'Стоимость товара',
    type: 'number',
  },
  {
    id: 3,
    name: 'description',
    placeholder: 'Введите описание товара',
    label: 'Описание товара',
    type: 'text',
  },
];
export const ADD_PRODUCT_IMAGES_OBJ: IAddNewProductImagesBasis = {
  image1: '',
  image2: '',
  image3: '',
};
export const ADD_PRODUCT_IMAGES_FIELDS: IAddNewProductsImageInputField[] = [
  {
    id: 1,
    name: 'image1',
    placeholder: 'URL изображения',
    label: 'Изображения товара',
    type: 'text',
  },
  {
    id: 2,
    name: 'image2',
    placeholder: 'URL изображения',
    type: 'text',
  },
  {
    id: 3,
    name: 'image3',
    placeholder: 'URL изображения',
    type: 'text',
  },
];

// EDIT PRODUCT
export const EDIT_PRODUCT_INITIAL_DATA: IProductEditedValueBasis = {
  title: '',
  price: '',
  description: '',
  images: [],
};
export const EDIT_PRODUCT_INPUT_FIELDS: IEditProductInputField[] = [
  {
    id: 1,
    name: 'title',
    label: 'TITLE',
    type: 'text',
  },
  {
    id: 2,
    name: 'price',
    label: 'PRICE',
    type: 'text',
  },
  {
    id: 3,
    name: 'description',
    label: 'DESCRIPTION',
    type: 'text',
  },
];
