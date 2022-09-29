import {DB_FILE_NAME} from '../db/consts.js';
import fs from 'fs';
import {DB} from '../index.js';

export const loadDB = () => {
    fs.readFile(DB_FILE_NAME, 'utf8', function (error, data) {
        if (error) {
            console.error(error);
            return;
        }

        DB.initDbFromDile(JSON.parse(data));
    });
};

export const saveDB = data => {
    fs.writeFile(DB_FILE_NAME, JSON.stringify(data), error => {
        if (error) {
            console.error(error);
        }
    });
};
