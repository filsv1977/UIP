import axios from 'axios';
import axiosRetry from 'axios-retry';
import {actionTypes} from '../Context/actionTypes';
import {getAuthorizationKey} from '../utils/localStorage';
import {fetchData} from './fetchData';

axiosRetry(axios, {retries: 3});

export const checkToken = async dispatch => {
        const url = `/admin/auth/checkToken`;
        const token = getAuthorizationKey();

        await axios
            .get(
                url,
                token
                    ? {
                          headers: {Authorization: JSON.stringify(token)}
                      }
                    : {}
            )
            .then(result => {
                dispatch({
                    type: actionTypes.LOGIN_ADMIN.FULFILLED,
                    payload: result.data.success
                });

                dispatch({
                    type: actionTypes.SET_VISIBLE,
                    payload: !result.data.success
                });
                if (result.data.success) {
                    fetchData(dispatch, null);
                }
            }).catch(e => dispatch({
              type: actionTypes.TOKEN_ERROR,
              payload: e.message
          }))
};
