import axios from 'axios';
import { IGetProductsConfig } from '../types/products';

const BASE_URL = 'http://localhost:3000';

export const getProducts = async (config: IGetProductsConfig) => {
  return await axios.get(`${BASE_URL}/products`, { params: config });
};

export const getCategories = async () => {
  const { data } = await axios.get(`${BASE_URL}/categories`);
  return data;
};

export const getSingleProduct = async (id: string) => {
  const { data } = await axios.get(`${BASE_URL}/products/${id}`);
  return data;
};
