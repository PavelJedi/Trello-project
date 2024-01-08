import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getColumns,
  createColumn,
  updateColumn as updateColumnService,
  deleteColumn as deleteColumnService,
} from "../../services/columnService";
import { Column } from "../../interfaces/interfaces";

const initialState: { columns: Column[] } = {
  columns: [],
};

export const fetchColumns = createAsyncThunk(
  "columns/fetchAll",
  async (boardId: string) => {
    const response = await getColumns(boardId);
    return response;
  }
);

export const addNewColumn = createAsyncThunk(
  "columns/addNew",
  async (columnData: { column: Partial<Column> }) => {
    const { column } = columnData;
    const response = await createColumn(column);
    return response;
  }
);

export const updateColumnAsync = createAsyncThunk(
  "columns/updateColumn",
  async (payload: { columnId: string; updatedColumn: Partial<Column> }) => {
    const { columnId, updatedColumn } = payload;
    const response = await updateColumnService(columnId, updatedColumn);
    return response;
  }
);

export const deleteColumnAsync = createAsyncThunk(
  "columns/deleteColumn",
  async (columnId: string) => {
    await deleteColumnService(columnId);
    return columnId;
  }
);

const columnSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchColumns.fulfilled, (state, action) => {
        state.columns = action.payload;
      })
      .addCase(addNewColumn.fulfilled, (state, action) => {
        state.columns.push(action.payload);
      })
      .addCase(updateColumnAsync.fulfilled, (state, action) => {
        const index = state.columns.findIndex(
          (column) => column._id === action.payload._id
        );
        if (index !== -1) {
          state.columns[index] = action.payload;
        }
      })
      .addCase(deleteColumnAsync.fulfilled, (state, action) => {
        state.columns = state.columns.filter(
          (column) => column._id !== action.payload
        );
      });
  },
});

export default columnSlice.reducer;
