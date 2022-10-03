import axios from 'axios';
import axiosRetry from 'axios-retry';
import {actionTypes} from '../Context/actionTypes';

axiosRetry(axios, {retries: 3});

export const fetchData = async (dispatch, id = 0, query = '?closed=0') => {
    try {
        await axios.get(`/tasks${query}`).then(result => {
            dispatch({
                type: actionTypes.GET_TASKS_SUCCESS,
                payload: {data: result.data.data, activeFilterBtn: id}
            });
        });
    } catch (e) {
        dispatch({
            type: actionTypes.GET_TASKS_FAILED,
            payload: 'Data loading error'
        });
    }
};
