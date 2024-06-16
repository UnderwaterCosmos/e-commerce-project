import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export const getProducts = async () => {
  const { data } = await axios.get(`${BASE_URL}/products`);
  return data;
};
