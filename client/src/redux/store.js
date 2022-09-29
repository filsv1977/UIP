import {combineReducers, configureStore} from '@reduxjs/toolkit';
import tasksSlice from './tasks/tasksSlice';
import {tasksAPI} from "../services/TaskService";

export const rootReducer = combineReducers({
    tasks: tasksSlice,
    [tasksAPI.reducerPath]: tasksAPI.reducer
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware)=>
      getDefaultMiddleware().concat(tasksAPI.middleware)
});
