import axios from 'axios';
import axiosRetry from 'axios-retry';
import {fetchTasks, fetchTasksSuccess, fetchTasksError} from './tasksSlice';
axiosRetry(axios, {retries: 3});

export const fetchData = () => async dispatch => {
    try {
        dispatch(fetchTasks());
        await axios
            .get('http://jsonplaceholder.typicode.com/todos')
            .then(response => dispatch(fetchTasksSuccess(response.data)));
    } catch (e) {
        dispatch(fetchTasksError(e.message));
    }
};
