import api from './api';

const API_BASE = 'http://localhost:8001';

export const createOrder = async (orderData) => {
  return api.post(`${API_BASE}/orders`, orderData);
};

export const getOrders = async () => {
  return api.get(`${API_BASE}/orders`);
};