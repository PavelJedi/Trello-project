import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getBoards,
  createBoard,
  updateBoard as updateBoardService,
  deleteBoard as deleteBoardService,
} from "../../services/boardService";
import { Board } from "../../interfaces/interfaces";

const initialState: { boards: Board[] } = {
  boards: [],
};

export const fetchBoards = createAsyncThunk("boards/fetchAll", async () => {
  const response = await getBoards();
  return response;
});

export const addNewBoard = createAsyncThunk(
  "boards/addNew",
  async (board: Partial<Board>) => {
    const response = await createBoard(board);
    return response;
  }
);

export const updateBoardAsync = createAsyncThunk(
  "boards/updateBoard",
  async (payload: { boardId: string; updatedBoard: Partial<Board> }) => {
    const { boardId, updatedBoard } = payload;
    const response = await updateBoardService(boardId, updatedBoard);
    return response;
  }
);

export const deleteBoardAsync = createAsyncThunk(
  "boards/deleteBoard",
  async (boardId: string) => {
    await deleteBoardService(boardId);
    return boardId;
  }
);

const boardSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.boards = action.payload;
      })
      .addCase(addNewBoard.fulfilled, (state, action) => {
        state.boards.push(action.payload);
      })
      .addCase(updateBoardAsync.fulfilled, (state, action) => {
        const index = state.boards.findIndex(
          (board) => board.id === action.payload.id
        );
        if (index !== -1) {
          state.boards[index] = action.payload;
        }
      })
      .addCase(deleteBoardAsync.fulfilled, (state, action) => {
        state.boards = state.boards.filter(
          (board) => board.id !== action.payload
        );
      });
  },
});

export default boardSlice.reducer;
