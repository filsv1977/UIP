import axios from 'axios';
import axiosRetry from 'axios-retry';
import {actionTypes} from "../Context/actionTypes";

axiosRetry(axios, {retries: 3});

export const logIn = async (body,dispatch) => {
  try {
    await axios.post('/admin/auth/logon', body).then(result => {
      dispatch({
        type: actionTypes.LOGIN_ADMIN_SUCCESS,
      })
    })
  } catch (e) {
    dispatch({
      type: actionTypes.LOGIN_ADMIN_FAILED,
      payload: e.message
    })
  }
}
