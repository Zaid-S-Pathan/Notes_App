import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

// Use backend origin only. Route paths like "/api/token/" will append correctly.
const defaultApiOrigin = "https://notes-app-wpzz.onrender.com";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : defaultApiOrigin,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
