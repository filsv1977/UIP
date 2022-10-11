import axios from 'axios';
import axiosRetry from 'axios-retry';
import {actionTypes} from '../Context/actionTypes';

axiosRetry(axios, {retries: 3});

export const logOut = async dispatch => {
    try {
        await axios.get('/admin/auth/logoff').then(result => {
            dispatch({
                type: actionTypes.LOGOUT_ADMIN.FULFILLED,
                payload: result
            });
        });
    } catch (e) {
        dispatch({
            type: actionTypes.LOGOUT_ADMIN.REJECTED,
            payload: e.message
        });
    }
};
