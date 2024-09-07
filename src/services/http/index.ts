import axios from 'axios';
import { ACCESS_TOKEN } from '@/utils/constants';

const http = axios.create({
  baseURL: 'http://localhost:3000/dev/api',
  timeout: 30000,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
http.interceptors.request.use(async (config: any) => {
  config.headers.authorization = `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`;
  return config;
});

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error.response);
  },
);

export default http;
