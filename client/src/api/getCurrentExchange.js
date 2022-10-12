import axios from 'axios';
import axiosRetry from 'axios-retry';
import {actionTypes} from '../Context/actionTypes';
import {getAuthorizationKey} from '../utils/localStorage';

axiosRetry(axios, {retries: 3});

export const getCurrentExchange = async dispatch => {
        const token = getAuthorizationKey();
        dispatch({type: actionTypes.GET_EXCHANGE_RATE});

        await axios
            .get(
                '/admin/ubx2usdt',
                token
                    ? {
                          headers: {Authorization: JSON.stringify(token)}
                      }
                    : {}
            )
            .then(result => {
                if (!result.data.success) throw new Error(result.data.message);

                dispatch({
                    type: actionTypes.GET_EXCHANGE_RATE.FULFILLED,
                    payload: result.data.data
                });
            }).catch(e => dispatch({
              type: actionTypes.GET_EXCHANGE_RATE.REJECTED,
              payload: e.message
          }));
};
