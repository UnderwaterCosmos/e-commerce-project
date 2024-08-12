import axios from 'axios';

import { useLocalStorage } from '../hooks/useLocalStorage';
import { IGetProductsConfig, ISingleProduct } from '../types/products';
import { IUser } from '../types/users';
import { LoginBasis, IProductEditedValueBasis } from '../types/forms';
import { ICategoriesElem } from '../types/filters';

const BASE_URL = 'http://localhost:3000';

const token = useLocalStorage('token');

const authRequest = axios.create({
  baseURL: BASE_URL,
});
authRequest.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization = token.getItem() || '';
  }
  return config;
});

export const getProducts = async (config: IGetProductsConfig) => {
  return await axios.get(`${BASE_URL}/products`, { params: config });
};

export const getSingleProduct = async (id: string) => {
  const { data } = await axios.get(`${BASE_URL}/products/${id}`);
  return data;
};

export const getCategories = async () => {
  const { data } = await axios.get(`${BASE_URL}/categories`);
  return data;
};

export const createUser = async (registrationData: IUser) => {
  const { data } = await axios.post(`${BASE_URL}/users`, registrationData);
  return data;
};

export const authorizeUser = async (loginData: LoginBasis) => {
  const { data } = await axios.post(`${BASE_URL}/login`, loginData);
  return data;
};

export const manageProduct = async (
  value:
    | { cart: ISingleProduct[] }
    | { ordersHistory: { [key: string]: ISingleProduct[] }; cart: [] },
  userId?: number
) => {
  const { data } = await authRequest.patch(`/users/${userId}`, value);
  return data;
};

export const createCategory = async (categoryData: ICategoriesElem) => {
  const { data } = await authRequest.post('/categories', categoryData);
  return data;
};

export const createProduct = async (productData: ISingleProduct) => {
  const { data } = await authRequest.post('/products', productData);
  return data;
};

export const editProduct = async (
  value: IProductEditedValueBasis,
  productId?: number
) => {
  const { data } = await authRequest.patch(`/products/${productId}`, value);
  return data;
};
