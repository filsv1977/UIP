import axios from 'axios';
import axiosRetry from 'axios-retry';
import {actionTypes} from '../сontext/actionTypes';
import {delAuthorizationKey} from '../utils/localStorage';

axiosRetry(axios, {retries: 3});

export default dispatch => {
    return axios
        .get('/admin/auth/logoff')
        .then(result => {
            dispatch({
                type: actionTypes.LOGOUT_ADMIN.FULFILLED,
                payload: result
            });
            delAuthorizationKey();
        })
        .catch(error =>
            dispatch({
                type: actionTypes.LOGOUT_ADMIN.REJECTED,
                payload: error.message
            })
        );
};
