import axios from 'axios';
import axiosRetry from 'axios-retry';
import {actionTypes} from '../Context/actionTypes';

axiosRetry(axios, {retries: 3});

export const getCurrentExchange = async dispatch => {
    try {
        dispatch({type: actionTypes.GET_EXCHANGE_RATE});

        await axios.get('/admin/ubx2usdt').then(result => {
            if (!result.data.success) throw new Error(result.data.message);

            dispatch({
                type: actionTypes.GET_EXCHANGE_RATE_SUCCESS,
                payload: result.data.data
            });
        });
    } catch (e) {
        dispatch({
            type: actionTypes.GET_EXCHANGE_RATE_FAILED,
            payload: e.message
        });
    }
};
