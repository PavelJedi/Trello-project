import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchTasks,
  createTask,
  updateTask as updateTaskService,
  deleteTask as deleteTaskService,
} from "../../services/taskService";
import { Task } from "../../interfaces/interfaces";

const initialState: { tasks: Task[] } = {
  tasks: [],
};

export const getTasks = createAsyncThunk(
  "tasks/fetchAll",
  async (taskId: string) => {
    const response = await fetchTasks(taskId);
    return response;
  }
);

export const addNewTask = createAsyncThunk(
  "tasks/addNew",
  async ({ columnId, taskData }: { columnId: string; taskData: FormData }) => {
    const response = await createTask(columnId, taskData);
    return response;
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    //   .addCase(getTasks.fulfilled, (state, action) => {
    //     state.tasks = action.payload;
    //   })
      .addCase(addNewTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      });
  },
});


export default taskSlice.reducer;
