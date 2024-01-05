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

const columnSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchColumns.fulfilled, (state, action) => {
      state.columns = action.payload;
    });
    builder.addCase(addNewColumn.fulfilled, (state, action) => {
      state.columns.push(action.payload);
    });
  },
});

export default columnSlice.reducer;
