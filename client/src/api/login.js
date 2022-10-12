import axios from 'axios';
import axiosRetry from 'axios-retry';
import {actionTypes} from '../Context/actionTypes';
import {fetchData} from './fetchData';
import {addAuthorizationKey} from '../utils/localStorage';

axiosRetry(axios, {retries: 3});

export const logIn = (body, dispatch) => {
    try {
        axios.post('/admin/auth/logon', body).then(result => {
            if (result.data.success) {
                dispatch({
                    type: actionTypes.LOGIN_ADMIN.FULFILLED,
                    payload: result.data.success
                });
                addAuthorizationKey(body.login, body.password);
                fetchData(dispatch, null);
            } else {
                dispatch({
                    type: actionTypes.LOGIN_ADMIN.REJECTED,
                    payload: 'Invalid username/password entered'
                });
            }
        });
    } catch (e) {
        dispatch({
            type: actionTypes.LOGIN_ADMIN.REJECTED,
            payload: e.message
        });
    }
};
