import axios from 'axios';
import axiosRetry from 'axios-retry';
import {actionTypes} from '../Context/actionTypes';

axiosRetry(axios, {retries: 3});

export const fetchData = async dispatch => {
    try {
        await axios.get('/tasks').then(result => {
            dispatch({
                type: actionTypes.GET_TASKS_SUCCESS,
                payload: result.data.data
            });
        });
    } catch (e) {
        dispatch({
            type: actionTypes.GET_TASKS_FAILED,
            payload: "Ошибка загрузки данных"
        });
    }
};
