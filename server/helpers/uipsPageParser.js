import {DB} from '../index.js';
import request from 'request';

const URL = 'https://github.com/SilentNotaryEcosystem/UIPS/';

export const getTaskListFromWeb = () => {
    request(URL, function (err, res, body) {
        if (err) throw err;

        let c = body.match(/Sil.*mediawiki(?=<)/g);
        const tasks = c.map(e => {
            let urlAndName = e.split('">');
            return {
                url: urlAndName[0],
                name: urlAndName[1]
            };
        });

        DB.addWebTaskInDb(tasks);
    });
};
