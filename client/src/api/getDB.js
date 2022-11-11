import axios from 'axios';
import axiosRetry from 'axios-retry';
import {actionTypes} from '../сontext/actionTypes';
import {saveToFile} from '../utils/saveToFile';
import {getAuthorizationKey, setUbiTimerKey} from '../utils/localStorage';
import checkToken from './checkToken';

axiosRetry(axios, {retries: 3});

export default dispatch => {
    const token = getAuthorizationKey();
    axios
        .get(
            '/admin/service/export',
            token
                ? {
                      headers: {Authorization: JSON.stringify(token)}
                  }
                : {}
        )
        .then(result => {
            if (result.data.success !== false) {
                saveToFile('db.json', result.data);
                setUbiTimerKey();
                dispatch({
                    type: actionTypes.EXPORT_DB.FULFILLED
                });
            } else {
                checkToken(dispatch);
            }
        })
        .catch(error => {
            dispatch({
                type: actionTypes.EXPORT_DB.REJECTED,
                payload: error.message
            });
            return false;
        });
};
