import {createSlice} from '@reduxjs/toolkit';
import {fetchData} from "./fetchData";

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    count: 0,
    tasks: [],
    isLoading: false,
    error: ''
  },
  reducers: {
    increment(state) {
      state.count += 1;
    },
    decrement(state) {
      state.count -= 1;
    },
    addTask(state, action) {
      state.tasks.push(action.payload);
    },
    removeTask(state, action) {
      state.tasks.splice(2, 1);
    },
    editTasksSuccess(state, action) {
      state.error = '';
      state.tasks = action.payload;
    },
    editTasksError(state, action) {
      state.error = action.payload;
    },
    // fetchTasks(state) {
    //   state.isLoading = true;
    // },
    // fetchTasksSuccess(state, action) {
    //   state.isLoading = false;
    //   state.error = '';
    //   state.tasks = action.payload;
    // },
    // fetchTasksError(state, action) {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // }
  },
  extraReducers: {
    [fetchData.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.tasks = action.payload;
    },
    [fetchData.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchData.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

export default tasksSlice.reducer;

export const {increment, decrement, addTask, removeTask, fetchTasks, fetchTasksSuccess, fetchTasksError} =
  tasksSlice.actions;
