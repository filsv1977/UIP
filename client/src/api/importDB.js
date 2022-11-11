import axios from 'axios';
import axiosRetry from 'axios-retry';
import {actionTypes} from '../сontext/actionTypes';
import {getAuthorizationKey, setUbiTimerKey} from '../utils/localStorage';
import {importFileType, incorrectFormat} from '../constants';
import checkToken from './checkToken';

axiosRetry(axios, {retries: 3});
let fileInput;

export default (dispatch, setActive) => {
    const token = getAuthorizationKey();

    if (token) {
        fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = importFileType;
        fileInput.multiple = false;
        fileInput.click();
        fileInput.onchange = evt => {
            try {
                let file = evt.target.files[0];
                let reader = new FileReader();
                const blob = new Blob([file], {type: importFileType});
                const {type} = evt.target.files[0];

                if (type !== importFileType) {
                    dispatch({
                        type: actionTypes.IMPORT_DB.REJECTED,
                        payload: incorrectFormat
                    });
                    return;
                }

                reader.onload = () => {
                    return axios
                        .post(
                            '/admin/service/import',
                            JSON.parse(reader.result),
                            token
                                ? {
                                      headers: {Authorization: JSON.stringify(token)}
                                  }
                                : {}
                        )
                        .then(result => {
                            if (result.data.success) {
                                dispatch({
                                    type: actionTypes.IMPORT_DB.FULFILLED,
                                    payload: result.data.data
                                });
                                setActive(0);
                                setUbiTimerKey();
                            } else {
                                dispatch({
                                    type: actionTypes.IMPORT_DB.REJECTED,
                                    payload: result.data.message
                                });
                            }
                        });
                };
                reader.onerror = err => {
                    dispatch({
                        type: actionTypes.IMPORT_DB.REJECTED,
                        payload: err
                    });
                };

                reader.readAsText(blob);
            } catch (error) {
                dispatch({
                    type: actionTypes.IMPORT_DB.REJECTED,
                    payload: error
                });
            }
        };
    } else {
        checkToken(dispatch);
    }
};
