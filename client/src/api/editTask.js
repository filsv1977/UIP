import axios from 'axios';
import axiosRetry from 'axios-retry';
import {actionTypes} from '../Context/actionTypes';

axiosRetry(axios, {retries: 3});

export const editTask = async (body, dispatch) => {
    try {
        await axios.patch(`/admin/tasks/${body.id}`, body).then(result => {
            if (!result.data.success) throw new Error(result.data.message);

            dispatch({
                type: actionTypes.EDIT_TASK_SUCCESS,
                payload: result.data.data
            });
        });
    } catch (e) {
        dispatch({
            type: actionTypes.EDIT_TASK_FAILED,
            payload: e.message
        });
    }
};
