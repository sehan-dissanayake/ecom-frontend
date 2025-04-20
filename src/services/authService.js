import api from './api';

const API_BASE = 'http://localhost:8002';

export const login = async (email, password) => {
  const formData = new FormData();
  formData.append('username', email);
  formData.append('password', password);

  return api.post(`${API_BASE}/token`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const register = async (email, password) => {
  return api.post(`${API_BASE}/register`, {
    email,
    password
  });
};