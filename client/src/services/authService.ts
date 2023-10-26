import API, { API_URL } from "../API";
import { tokenService } from "./tokenService";
import { User } from "../interfaces/interfaces";

export const authService = {
  registration: async (user: User) => {
    const data = API.post(`${API_URL}/auth/registration`, user);
    return data;
  },

  login: async (user: User) => {
    const data = await API.post(`${API_URL}/auth/login`, user);
    tokenService.updateToken(data.data.token);
    return data;
  },

  logout: async () => {
    tokenService.removeToken();
  },
};
