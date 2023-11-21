import { AxiosResponse } from "axios";
import API from "../API";
import { User } from "../interfaces/interfaces";

export const getUser = async (token: string): Promise<User> => {
  const response: AxiosResponse<User> = await API.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateUserById = async (id: number, body: any): Promise<User> => {
  const response: AxiosResponse<User> = await API.patch(`/api/users/${id}`, {
    ...body,
  });
  return response.data;
};
