import axios from 'axios';
import axiosRetry from 'axios-retry';
import {actionTypes} from '../сontext/actionTypes';
import {getAuthorizationKey} from '../utils/localStorage';
import {importFileType} from '../constants';

axiosRetry(axios, {retries: 3});
let fileInput;

export const importDB = (dispatch, setActive) => {
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
                            } else {
                                dispatch({
                                    type: actionTypes.IMPORT_DB.REJECTED,
                                    payload: result.data.error
                                });
                            }
                        });
                };
                reader.onerror = error => {
                    dispatch({
                        type: actionTypes.IMPORT_DB.REJECTED,
                        payload: error
                    });
                };

                reader.readAsText(blob);
            } catch (err) {
                dispatch({
                    type: actionTypes.IMPORT_DB.REJECTED,
                    payload: err
                });
            }
        };
    }
};
