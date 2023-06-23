import axios from 'axios';
import { SERVER_BASE_URL } from './constants';

const headers = {
  'Content-Type': 'application/json',
  accept: 'application/json',
};

const http = axios.create({
  baseURL: SERVER_BASE_URL,
});

http.interceptors.request.use(
  (config) => {
    config.headers = {
      ...headers,
    };
    return config;
  },
  (error) => Promise.reject(error)
);

export default http;
