import axios from 'axios';
import axiosRetry from 'axios-retry';
import {actionTypes} from '../Context/actionTypes';
import {fetchData} from "./fetchData";

axiosRetry(axios, {retries: 3});

export const logIn = (body, dispatch) => {
    try {
        axios.post('/admin/auth/logon', body).then(result => {
            if (result.data.success) {
                dispatch({
                    type: actionTypes.LOGIN_ADMIN_SUCCESS,
                    payload: result.data.success
                });
                fetchData(dispatch, null);
            } else {
                dispatch({
                    type: actionTypes.LOGIN_ADMIN_FAILED,
                    payload: 'Invalid username/password entered'
                });
            }
        });
    } catch (e) {
        dispatch({
            type: actionTypes.LOGIN_ADMIN_FAILED,
            payload: e.message
        });
    }
};
