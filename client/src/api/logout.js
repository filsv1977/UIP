import axios from 'axios';
import axiosRetry from 'axios-retry';
import {actionTypes} from '../Context/actionTypes';
import {delAuthorizationKey} from '../utils/localStorage';

axiosRetry(axios, {retries: 3});

export const logOut = async dispatch => {
    await axios
        .get('/admin/auth/logoff')
        .then(result => {
            dispatch({
                type: actionTypes.LOGOUT_ADMIN.FULFILLED,
                payload: result
            });
            delAuthorizationKey();
        })
        .catch(e =>
            dispatch({
                type: actionTypes.LOGOUT_ADMIN.REJECTED,
                payload: e.message
            })
        );
};
