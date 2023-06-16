import axios from "axios";
import { readToken } from "../readToken";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

api.interceptors.request.use(
  (config) => {
    const token = readToken();
    console.log(token)

    /* eslint-disable */
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    /* eslint-enable */
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
