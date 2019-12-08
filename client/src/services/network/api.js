import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '/';

const instance = axios.create({
  baseURL,
  timeout: 5000,
});

instance.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    return Promise.reject(error.response);
  },
);

export default instance;
