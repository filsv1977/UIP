import fs from 'fs';
import {DB} from '../index.js';

export const readFile = (dir, tableName) => {
    fs.readFile(`./${dir}/${tableName}.json`, 'utf8', function (error, data) {
        if (error) throw error;

        DB.addTable(tableName, JSON.parse(data));
        return data;
    });
};
