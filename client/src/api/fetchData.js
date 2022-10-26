import axios from 'axios';
import axiosRetry from 'axios-retry';
import {actionTypes} from '../сontext/actionTypes';
import {getAuthorizationKey} from '../utils/localStorage';

axiosRetry(axios, {retries: 3});

export const fetchData = async (dispatch, id, noSetLoading = true, isAdmin = false) => {
    console.log("fetchData", id)
    const admin = isAdmin ? '/admin' : '';
    const url = id == null ? `${admin}/tasks` : `${admin}/tasks?implemented=${id-1}`;
    const token = getAuthorizationKey();
    dispatch({type: actionTypes.GET_TASKS.PENDING, noSetLoading});
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
                type: actionTypes.GET_TASKS.FULFILLED,
                payload: {data: result.data.data, activeFilterBtn: id}
            });
        })
        .catch(e =>
            dispatch({
                type: actionTypes.GET_TASKS.REJECTED,
                payload: e.message
            })
        );
};
