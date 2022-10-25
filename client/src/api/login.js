import axios from 'axios';
import axiosRetry from 'axios-retry';
import {actionTypes} from '../сontext/actionTypes';
import {fetchData} from './fetchData';
import {addAuthorizationKey} from '../utils/localStorage';
import {logonTimer} from '../utils/timer';

axiosRetry(axios, {retries: 3});

export const logIn = (body, dispatch, navigate) => {
    axios
        .post('/admin/auth/logon', body)
        .then(result => {
            if (result.data.success) {
                dispatch({
                    type: actionTypes.LOGIN_ADMIN.FULFILLED,
                    payload: result.data.success
                });

                addAuthorizationKey(body.login, body.password);

                logonTimer(dispatch, navigate);

                dispatch({
                    type: actionTypes.SET_VISIBLE,
                    payload: false
                });

                fetchData(dispatch, null, null, true);
            } else {
                dispatch({
                    type: actionTypes.LOGIN_ADMIN.REJECTED,
                    payload: 'Invalid username/password entered'
                });
                dispatch({
                    type: actionTypes.SET_VISIBLE,
                    payload: true
                });
            }
        })
        .catch(error =>
            dispatch({
                type: actionTypes.LOGIN_ADMIN.REJECTED,
                payload: error.message
            })
        );
};
