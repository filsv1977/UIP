import fs from 'fs';

export const saveFile = (dir, tableName, data) => {
    fs.writeFile(`./${dir}/${tableName}.json`, JSON.stringify(data), error => {
        if (error) throw error;
        fs.readFileSync(`./${dir}/${tableName}.json`, 'utf8');
    });
};
