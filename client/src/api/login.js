import axios from 'axios';
import axiosRetry from 'axios-retry';
import {actionTypes} from '../Context/actionTypes';
import {fetchData} from './fetchData';
import {addAuthorizationKey} from '../utils/localStorage';

axiosRetry(axios, {retries: 3});

export const logIn = (body, dispatch) => {
    axios
        .post('/admin/auth/logon', body)
        .then(result => {
            if (result.data.success) {
                dispatch({
                    type: actionTypes.LOGIN_ADMIN.FULFILLED,
                    payload: result.data.success
                });

                addAuthorizationKey(body.login, body.password);

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
