import axios from "axios";

const API_BASE_URL = "http://diagnosis.runasp.net";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor لإضافة Authorization Header تلقائيًا
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
//   console.log("Token from localStorage:", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
