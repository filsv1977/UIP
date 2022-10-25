import axios from 'axios';
import axiosRetry from 'axios-retry';
import {actionTypes} from '../сontext/actionTypes';
import {getAuthorizationKey} from "../utils/localStorage";
import {importFileType} from "../constants";

axiosRetry(axios, {retries: 3});
let fileInput;
let callbackFunction;

export function selectFiles(
  callbackFn,
  accept = "",
  multiple = false,
  readType = "text"
) {
  callbackFunction = callbackFn;
  fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = accept;
  fileInput.multiple = multiple;
  fileInput.onchange = (evt) => {
    console.log(evt)
    readFiles(evt, readType);
  };
  fileInput.click();
}

function readFiles(evt, readType) {
  let input = evt.target;
  let files = input.files;
  fileInput = "";

  for (let i = 0; i < files.length; i++) {
    let reader = new FileReader();
    if (readType === "arrayBuffer") {
      reader.readAsArrayBuffer(files[i]);
    } else {
      reader.readAsText(files[i]);
    }

    reader.onload = () => {
      if (typeof callbackFunction === "function") {
        callbackFunction({
          name: files[i].name,
          data: reader.result,
          file: files[i],
        });
      }
    };

    reader.onerror = () => {
      console.log(reader.error);
      fileInput = "";
    };
  }
}

export async function importDB(dispatch) {
  const token = getAuthorizationKey();
  console.log(dispatch)

  let sendToServer = (file) => {
    console.log("file", file.file?.type, importFileType)

    if(file.file?.type !== importFileType) {
      dispatch({
        type: actionTypes.IMPORT_DB.REJECTED,
        payload: "Incorrect import file format selected"
      });
      return
    }

    if (!file.data) return;

    let fd = new FormData();

    let fileKey = "import-db-main";
    fd.append(fileKey, file.file);
    console.log('@@@@@ file', JSON.parse(file.data))
    axios
      .post('/admin/service/import', file.data, token
        ? {
          headers: {Authorization: JSON.stringify(token)}
        }
        : {})
      .then(result => {
        if (result.data.success) {
          dispatch({
            type: actionTypes.IMPORT_DB.FULFILLED,
            payload: result.data.data
          });
        } else {
          dispatch({
            type: actionTypes.IMPORT_DB.REJECTED,
            payload: result.data.error
          });
        }
      })
      .catch(error =>
        dispatch({
          type: actionTypes.IMPORT_DB.REJECTED,
          payload: error.message
        })
      );
  };
  selectFiles(sendToServer, ".json", false);
}
