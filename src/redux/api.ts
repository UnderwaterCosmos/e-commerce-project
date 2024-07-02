import axios from 'axios';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { IGetProductsConfig, ISingleProduct } from '../types/products';
import { IUser } from '../types/users';
import { LoginBasis } from '../types/forms';

const BASE_URL = 'http://localhost:3000';

const { getItem, setItem } = useLocalStorage('token');

const authRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    authorization: getItem() || '',
  },
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

export const authorizeUser = async (config: LoginBasis) => {
  const loginResponse = await axios.post(`${BASE_URL}/login`, config);
  if (loginResponse.status === 201) {
    setItem(Math.ceil(Math.random() * 100000000));
    const { data } = await authRequest.get('/users', {
      params: { login: loginResponse.data.login },
    });
    return {
      loginData: loginResponse.data,
      fullUserData: data[0],
    };
  }
  return {
    loginData: null,
    fullUserData: null,
  };
};

export const removeUser = async (id: number) => {
  await authRequest.delete(`/login/${id}`);
  return id;
};

export const addToCart = async (
  userId: number | undefined,
  value: { cart: ISingleProduct[] | undefined }
) => {
  const { data } = await authRequest.patch(`/users/${userId}`, value);
  return data;
};
