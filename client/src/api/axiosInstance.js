import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || '';

const api = axios.create({ baseURL });

// Delete Content-Type for FormData requests so axios sets it automatically
// with the correct multipart/form-data boundary
api.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  }
  return config;
});

export default api;