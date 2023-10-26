import axios, { AxiosInstance } from "axios";
import { tokenService } from "./services/tokenService";

let modeUrl: string;

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  modeUrl = "http://localhost:5000";
} else {
  modeUrl = "https://wiki-clone.onrender.com";
}

export const API_URL = modeUrl;
export const URL = "http://localhost:3000";

const API: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(async (config) => {
  const token = tokenService.getToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
