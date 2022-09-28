import {combineReducers, configureStore} from '@reduxjs/toolkit';
import tasksSlice from './tasks/tasksSlice';

export const rootReducer = combineReducers({
    tasks: tasksSlice
});

export const store = configureStore({
    reducer: rootReducer
});
