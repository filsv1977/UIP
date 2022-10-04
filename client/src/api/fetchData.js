import axios from 'axios';
import axiosRetry from 'axios-retry';
import {actionTypes} from '../Context/actionTypes';

axiosRetry(axios, {retries: 3});

export const fetchData = async (dispatch, id = 0) => {
    try {
        dispatch({type: actionTypes.GET_TASKS});
        await axios.get(`/tasks?closed=${id}`).then(result => {
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
