import axios from 'axios';
import axiosRetry from 'axios-retry';
// import {fetchTasks, fetchTasksSuccess, fetchTasksError} from './tasksSlice';
axiosRetry(axios, {retries: 3});

// export const editTask = () => async dispatch => {
//     try {
//         dispatch(fetchTasks());
//         const resp =  await axios.post('/tasks')
//           .then(response => dispatch(fetchTasksSuccess(response.data.data)));
//     } catch (e) {
//         dispatch(fetchTasksError(e.message));
//     }
// };
