import { AxiosResponse } from "axios";
import API from "../API";
import { Column } from "../interfaces/interfaces";

export const getColumns = async (boardId: string): Promise<Column[]> => {
  try {
    const response: AxiosResponse<Column[]> = await API.get(
      `/api/columns/${boardId}`
    );
    return response.data;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred.";
    throw new Error(`Failed to fetch columns: ${errorMessage}`);
  }
};

  export const createColumn = async (column: Partial<Column>): Promise<Column> => {
    try {
      const response: AxiosResponse<Column> = await API.post("/api/columns", {...column});
      console.log(response);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error("Failed to create column " + error.message);
      } else {
        throw new Error("Failed to create column: An unexpected error occurred.");
      }
    }
  };

  export const updateColumn = async (
    columnId: string,
    updatedColumn: Partial<Column>
  ): Promise<Column> => {
    try {
      const response: AxiosResponse<Column> = await API.patch(
        `/api/columns/${columnId}`,
        updatedColumn
      );
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error("Failed to update column: " + error.message);
      } else {
        throw new Error("Failed to update column: An unexpected error occurred.");
      }
    }
  };

  export const deleteColumn = async (columnId: string): Promise<void> => {
    try {
      await API.delete(`/api/columns/${columnId}`);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error("Failed to delete column: " + error.message);
      } else {
        throw new Error("Failed to delete column: An unexpected error occurred.");
      }
    }
  };
