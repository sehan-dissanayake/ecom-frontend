import axios from 'axios';

const API_BASE = 'http://localhost:8001';

export const createOrder = async (orderData) => {
  return axios.post(`${API_BASE}/orders`, orderData);
};

export const getOrders = async () => {
  return axios.get(`${API_BASE}/orders`);
};