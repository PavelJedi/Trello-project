import { AxiosResponse } from "axios";
import API from "../API";
import { Board } from "../interfaces/interfaces";

export const getBoards = async (): Promise<Board[]> => {
  try {
    const response: AxiosResponse<Board[]> = await API.get("/api/boards");
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Failed to fetch boards: " + error.message);
    } else {
      throw new Error("Failed to fetch boards: An unexpected error occurred.");
    }
  }
};

export const createBoard = async (
  board: Partial<Board>,
  userId: string
): Promise<Board> => {
  try {
    const response: AxiosResponse<Board> = await API.post("/api/boards", {
      ...board,
      owner: userId,
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Failed to create board: " + error.message);
    } else {
      throw new Error("Failed to create board: An unexpected error occurred.");
    }
  }
};

export const updateBoard = async (
  boardId: string,
  updatedBoard: Partial<Board>
): Promise<Board> => {
  try {
    const response: AxiosResponse<Board> = await API.patch(
      `/api/boards/${boardId}`,
      updatedBoard
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Failed to update board: " + error.message);
    } else {
      throw new Error("Failed to update board: An unexpected error occurred.");
    }
  }
};

export const deleteBoard = async (boardId: string): Promise<void> => {
  try {
    await API.delete(`/api/boards/${boardId}`);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Failed to delete board: " + error.message);
    } else {
      throw new Error("Failed to delete board: An unexpected error occurred.");
    }
  }
};
