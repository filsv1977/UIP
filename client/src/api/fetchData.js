import axios from 'axios';
import axiosRetry from 'axios-retry';
import {actionTypes} from '../Context/actionTypes';

axiosRetry(axios, {retries: 3});

export const fetchData = async (dispatch, id = 0) => {
    try {
        dispatch({type: actionTypes.GET_TASKS});
        await axios.get(`/tasks?implemented=${id}`).then(result => {
        // await axios.get(`/tasks`).then(result => {
            if (!result.data.success) throw new Error(result.data.message);

            dispatch({
                type: actionTypes.GET_TASKS_SUCCESS,
                payload: {data: result.data.data, activeFilterBtn: id}
            });
        });
    } catch (e) {
        dispatch({
            type: actionTypes.GET_TASKS_FAILED,
            payload: e.message
        });
    }
};
