import axios from 'axios';
import axiosRetry from 'axios-retry';
import {actionTypes} from '../сontext/actionTypes';
import {getAuthorizationKey, getUbiTimerKey} from '../utils/localStorage';
import fetchData from './fetchData';

axiosRetry(axios, {retries: 3});

export default dispatch => {
    const url = `/admin/auth/checkToken`;
    const token = getAuthorizationKey();
    const timer = getUbiTimerKey();

    if (Date.now() > timer) {
        return dispatch({
            type: actionTypes.SET_VISIBLE,
            payload: true
        });
    }

    axios
        .get(
            url,
            token
                ? {
                      headers: {Authorization: JSON.stringify(token)}
                  }
                : {}
        )
        .then(result => {
            if (result.data.success) {
                dispatch({
                    type: actionTypes.LOGIN_ADMIN.FULFILLED,
                    payload: result.data.success
                });

                fetchData(dispatch, null, null, true);
            } else {
                dispatch({
                    type: actionTypes.LOGIN_ADMIN.REJECTED,
                    payload: result.data.success
                });
            }

            dispatch({
                type: actionTypes.SET_VISIBLE,
                payload: !result.data.success
            });
        })
        .catch(error => {
            dispatch({
                type: actionTypes.TOKEN_ERROR,
                payload: error.message
            });
        });
};
