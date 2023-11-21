import API, { API_URL } from "../API";
import { tokenService } from "./tokenService";
import { User, LoginData } from "../interfaces/interfaces";

export const authService = {
  registration: async (user: User) => {
    const data = API.post(`${API_URL}/auth/registration`, user);
    return data;
  },

  login: async (data: LoginData) => {
    const response = await API.post(`${API_URL}/auth/login`, data);
    tokenService.updateToken(response.data.token);
    return response;
  },

  logout: async () => {
    tokenService.removeToken();
  },
};
