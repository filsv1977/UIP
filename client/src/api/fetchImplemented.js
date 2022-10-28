import axios from 'axios';
import axiosRetry from 'axios-retry';
import {actionTypes} from '../сontext/actionTypes';

axiosRetry(axios, {retries: 3});

export const fetchImplemented = async (dispatch, id) => {
  const url = `/tasks?implemented=${id}`;

  await axios
    .get(url, {})
    .then(result => {
      if (!result.data.success) throw new Error(result.data.message);

      dispatch({
        type: actionTypes.GET_IMPLEMENTED_TASKS.FULFILLED,
        payload: {data: result.data.data, activeFilterBtn: id}
      });
    })
    .catch(e =>
      dispatch({
        type: actionTypes.GET_IMPLEMENTED_TASKS.REJECTED,
        payload: e.message
      })
    );
};
