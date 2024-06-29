import axios from 'axios';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { IGetProductsConfig } from '../types/products';
import { IUser } from '../types/users';
import { LoginBasis } from '../types/forms';

const BASE_URL = 'http://localhost:3000';

const { getItem } = useLocalStorage('token');

const authRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: getItem() || '',
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
    const { data } = await authRequest.get('/users', {
      params: { login_like: loginResponse.data.login },
    });
    return {
      loginData: loginResponse.data,
      fullUserData: data,
    };
  }
  return {
    loginData: loginResponse.data,
    fullUserData: null,
  };
};

export const removeUser = async (id: number) => {
  await authRequest.delete(`/login/${id}`);
  return id;
};
