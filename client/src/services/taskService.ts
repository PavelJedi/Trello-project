import API from "../API";
import { AxiosResponse } from "axios";
import { Task } from "../interfaces/interfaces";

export const fetchTasks = async (columnId: string): Promise<Task> => {
  try {
    const response: AxiosResponse<Task> = await API.get(
      `api/tasks/${columnId}`
    );
    return response.data;
  } catch (error: any) {
    throw new Error("Failed to fetch task: " + error.response.data.message);
  }
};

export const createTask = async (
  columnId: string,
  taskData: FormData
): Promise<Task> => {
  try {
    const response: AxiosResponse<Task> = await API.post(
      `api/tasks/${columnId}`,
      taskData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error("Failed to create task: " + error.response.data.message);
  }
};

export const updateTask = async (
  taskId: string,
  updatedTask: Partial<Task>
): Promise<Task> => {
  try {
    const response: AxiosResponse<Task> = await API.patch(
      `/api/tasks/${taskId}`,
      updatedTask
    );
    return response.data;
  } catch (error: any) {
    throw new Error("Failed to update task: " + error.response.data.message);
  }
};

export const deleteTask = async (taskId: string): Promise<void> => {
  try {
    await API.delete(`/api/tasks/${taskId}`);
  } catch (error: any) {
    throw new Error("Failed to delete task: " + error.response.data.message);
  }
};
