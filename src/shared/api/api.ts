import axios from 'axios';

const AUTH_TOKEN_KEY = 'auth_token';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'https://front-school-strapi.ktsdev.ru/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
