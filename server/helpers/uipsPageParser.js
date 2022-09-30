import {DB} from '../index.js';
import request from 'request';

const GIT_URL = 'https://github.com/';
const TASKS_LIST_URL = `${GIT_URL}SilentNotaryEcosystem/UIPS/`;

export const getTaskListFromWeb = () => {
    request(TASKS_LIST_URL, function (err, res, body) {
        if (err) throw err;

        let c = body.match(/Sil.*mediawiki(?=<)/g);
        const tasks = c.map(e => {
            let urlAndName = e.split('">');
            return {
                url: GIT_URL + urlAndName[0],
                name: urlAndName[1]
            };
        });

        DB.addWebTaskInDb(tasks);
    });
};
