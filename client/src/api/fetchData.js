import axios from 'axios';
import axiosRetry from 'axios-retry';
import {actionTypes} from '../сontext/actionTypes';
import {getAuthorizationKey} from '../utils/localStorage';

axiosRetry(axios, {retries: 3});

const cache = [];

export default (dispatch, id, noSetLoading = true, isAdmin = false) => {
    const admin = isAdmin ? '/admin' : '';
    const url = id == null ? `${admin}/tasks` : `${admin}/tasks?implemented=${id}`;
    const token = getAuthorizationKey();
    dispatch({type: actionTypes.GET_TASKS.PENDING, noSetLoading});

    if (!isAdmin && cache[id]) {
        return Promise.resolve(
            dispatch({
                type: actionTypes.GET_TASKS.FULFILLED,
                payload: {data: cache[id], activeFilterBtn: id}
            })
        );
    }

    return axios
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

            if (!isAdmin) {
                cache[id] = result.data.data;
            }

            dispatch({
                type: actionTypes.GET_TASKS.FULFILLED,
                payload: {data: result.data.data, activeFilterBtn: id}
            });
        })
        .catch(error =>
            dispatch({
                type: actionTypes.GET_TASKS.REJECTED,
                payload: error.message
            })
        );
};
