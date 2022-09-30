import axios from 'axios';
import axiosRetry from 'axios-retry';
import {actionTypes} from '../Context/actionTypes';
import {saveToFile} from '../utils/saveToFile';

axiosRetry(axios, {retries: 3});

export const exportDB = async dispatch => {
    try {
        await axios.get('/admin/export').then(result => {
            console.log('@@@@', result.data);

            saveToFile('db.json', result.data);

            dispatch({
                type: actionTypes.EXPORT_DB_SUCCESS
                // payload: result.data.data
            });
        });
    } catch (e) {
        dispatch({
            type: actionTypes.EXPORT_DB_FAILED,
            payload: e.message
        });
    }
};
