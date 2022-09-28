import {readFile} from './readFile.js';
import {getTablesList} from '../db/consts.js';

export const readDB = dir => {
    const fileList = getTablesList();
    fileList.forEach(tableName => {
        readFile(dir, tableName);
    });
};
