import axios from 'axios';

const API_BASE = 'http://localhost:8000';

export const getProducts = async () => {
  return axios.get(`${API_BASE}/products`);
};

export const getProduct = async (id) => {
  return axios.get(`${API_BASE}/products/${id}`);
};

export const createProduct = async (productData) => {
  return axios.post(`${API_BASE}/products`, productData);
};