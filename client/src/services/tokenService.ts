const TOKEN_NAME = "token";

export const tokenService = {
  getToken: (): string | null => {
    const token = localStorage.getItem(TOKEN_NAME);
    return token ? JSON.parse(token) : null;
  },
  updateToken: (token: string) => {
    localStorage.setItem(TOKEN_NAME, JSON.stringify(token));
  },
  removeToken: () => {
    localStorage.removeItem(TOKEN_NAME);
  },
};
