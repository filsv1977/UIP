import axios from 'axios';
import axiosRetry from 'axios-retry';
import {actionTypes} from '../Context/actionTypes';
import {getAuthorizationKey} from '../utils/localStorage';

axiosRetry(axios, {retries: 3});

export const checkToken = async (dispatch) => {
  try {
    const url = `/admin/auth/checkToken`;
    const token = getAuthorizationKey();
    dispatch({type: actionTypes.CHECK_TOKEN.PENDING});
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
        if (!result.data.success) throw new Error(result.data.message);

        dispatch({
          type: actionTypes.CHECK_TOKEN.FULFILLED,
          payload: true
        });
      });
  } catch (e) {
    dispatch({
      type: actionTypes.CHECK_TOKEN.REJECTED,
      payload: false
    });
  }
};
