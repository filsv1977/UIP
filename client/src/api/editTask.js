import axios from 'axios';
import axiosRetry from 'axios-retry';
import {actionTypes} from '../Context/actionTypes';
import {getAuthorizationKey} from '../utils/localStorage';

axiosRetry(axios, {retries: 3});

export const editTask = async (body, dispatch) => {
    const token = getAuthorizationKey();
    await axios
        .patch(
            `/admin/tasks/${body.id}`,
            body,
            token
                ? {
                      headers: {Authorization: JSON.stringify(token)}
                  }
                : {}
        )
        .then(result => {
            if (!result.data.success) throw new Error(result.data.message);

            dispatch({
                type: actionTypes.EDIT_TASK.FULFILLED,
                payload: result.data.data
            });
        })
        .catch(e =>
            dispatch({
                type: actionTypes.EDIT_TASK.REJECTED,
                payload: e.message
            })
        );
};
