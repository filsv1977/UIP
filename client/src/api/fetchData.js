import axios from 'axios';
import axiosRetry from 'axios-retry';
import {actionTypes} from '../Context/actionTypes';

axiosRetry(axios, {retries: 3});

export const fetchData = async (dispatch, id, noSetLoading = true) => {
    try {
        const url = id == null ? '/tasks' : `/tasks?implemented=${id}`;

        dispatch({type: actionTypes.GET_TASKS.PENDING, noSetLoading});
        await axios.get(url).then(result => {
            if (!result.data.success) throw new Error(result.data.message);

            dispatch({
                type: actionTypes.GET_TASKS.FULFILLED,
                payload: {data: result.data.data, activeFilterBtn: id}
            });
        });
    } catch (e) {
        dispatch({
            type: actionTypes.GET_TASKS.REJECTED,
            payload: e.message
        });
    }
};
