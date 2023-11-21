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

const boardSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    setBoards: (state, action) => {
      state.boards = action.payload;
    },
    addBoard: (state, action) => {
      state.boards.push(action.payload);
    },
    updateBoard: (state, action) => {
      const updatedBoard = action.payload;
      const boardIndex = state.boards.findIndex(
        (board) => board.id === updatedBoard.id
      );
      if (boardIndex !== -1) {
        state.boards[boardIndex] = updatedBoard;
      }
    },
    deleteBoard: (state, action) => {
      const boardIdToDelete = action.payload;
      state.boards = state.boards.filter(
        (board) => board.id !== boardIdToDelete
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBoards.fulfilled, (state, action) => {
      state.boards = action.payload;
    });
    builder.addCase(addNewBoard.fulfilled, (state, action) => {
      state.boards.push(action.payload);
    });
  },
});

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

export const { setBoards, addBoard, updateBoard, deleteBoard } =
  boardSlice.actions;

export default boardSlice.reducer;
