import axios from 'axios';
import axiosRetry from 'axios-retry';
import {actionTypes} from '../сontext/actionTypes';
import {getAuthorizationKey} from '../utils/localStorage';
import {checkToken} from './checkToken';
import {authError} from '../constants';

axiosRetry(axios, {retries: 3});

export const getCurrentExchange = async dispatch => {
    const token = getAuthorizationKey();
    dispatch({type: actionTypes.GET_EXCHANGE_RATE});

    await axios
        .get(
            '/admin/service/ubx2usdt',
            token
                ? {
                      headers: {Authorization: JSON.stringify(token)}
                  }
                : {}
        )
        .then(result => {
            if (!result.data.success) {
                checkToken(dispatch);
                throw new Error(result.data.message);
            }

            dispatch({
                type: actionTypes.GET_EXCHANGE_RATE.FULFILLED,
                payload: result.data.data
            });
        })
        .catch(e =>
            dispatch({
                type: actionTypes.GET_EXCHANGE_RATE.REJECTED,
                payload: authError
            })
        );
};
