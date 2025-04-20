import api from './api';

const API_BASE = 'http://localhost:8000';

export const getProducts = async () => {
  return api.get(`${API_BASE}/products`);
};

export const getProduct = async (id) => {
  return api.get(`${API_BASE}/products/${id}`);
};

export const createProduct = async (productData) => {
  return api.post(`${API_BASE}/products`, productData);
};