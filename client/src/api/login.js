import axios from 'axios';
import axiosRetry from 'axios-retry';
import {actionTypes} from "../Context/actionTypes";

axiosRetry(axios, {retries: 3});

export const logIn = (body, dispatch) => {
  try {
    axios.post('/admin/auth/logon', body).then(result => {
      if(result.data.success){
        dispatch({
          type: actionTypes.LOGIN_ADMIN_SUCCESS,
          payload: result.data.success
        })
      } else {
        dispatch({
          type: actionTypes.LOGIN_ADMIN_FAILED,
          payload: "Введен не верный логин/пароль"
        })
      }
    })
  } catch (e) {
    dispatch({
      type: actionTypes.LOGIN_ADMIN_FAILED,
      payload: e.message
    })
  }
}
