import axios from 'axios';

const api = axios.create({
  baseURL: 'https://front-school-strapi.ktsdev.ru/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
