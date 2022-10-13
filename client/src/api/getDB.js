import axios from 'axios';
import axiosRetry from 'axios-retry';
import {actionTypes} from '../Context/actionTypes';
import {saveToFile} from '../utils/saveToFile';
import {getAuthorizationKey} from '../utils/localStorage';

axiosRetry(axios, {retries: 3});

export const exportDB = async dispatch => {
    const token = getAuthorizationKey();
    await axios
        .get(
            '/admin/export',
            token
                ? {
                      headers: {Authorization: JSON.stringify(token)}
                  }
                : {}
        )
        .then(result => {
            saveToFile('db.json', result.data);

            dispatch({
                type: actionTypes.EXPORT_DB.FULFILLED
            });
        })
        .catch(e =>
            dispatch({
                type: actionTypes.EXPORT_DB.REJECTED,
                payload: e.message
            })
        );
};
