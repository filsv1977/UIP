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
  reducers: {},
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

export const {} = tasksSlice.actions;
