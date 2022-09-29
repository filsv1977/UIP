import axios from 'axios';
import axiosRetry from 'axios-retry';
import {createAsyncThunk} from "@reduxjs/toolkit";

axiosRetry(axios, {retries: 3});

export const fetchData = createAsyncThunk('tasks.fetchTasks',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/tasks')
      return response.data.data
    } catch (e) {
      return thunkAPI.rejectWithValue("Не удалось загрузить задачи")
    }
  })

