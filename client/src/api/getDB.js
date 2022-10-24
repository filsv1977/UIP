import axios from 'axios';
import axiosRetry from 'axios-retry';
import {actionTypes} from '../сontext/actionTypes';
import {saveToFile} from '../utils/saveToFile';
import {getAuthorizationKey} from '../utils/localStorage';
import {checkToken} from './checkToken';

axiosRetry(axios, {retries: 3});

export const exportDB = async dispatch => {
    const token = getAuthorizationKey();
    await axios
        .get(
            '/admin/service/export',
            token
                ? {
                      headers: {Authorization: JSON.stringify(token, null, 4)}
                  }
                : {}
        )
        .then(result => {
            if (result.data.success !== false) {
                saveToFile('db.json', result.data);

                dispatch({
                    type: actionTypes.EXPORT_DB.FULFILLED
                });
            } else {
                checkToken(dispatch);
            }
        })
        .catch(e => {
            dispatch({
                type: actionTypes.EXPORT_DB.REJECTED,
                payload: e.message
            });
            return false;
        });
};
