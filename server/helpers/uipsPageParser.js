import {DB} from '../index.js';
import axios from 'axios';

const GIT_URL = 'https://github.com/';
const TASKS_LIST_URL = `${GIT_URL}SilentNotaryEcosystem/UIPS/`;

export const getTaskListFromWeb = async () => {
    try {
        const res = await axios.get(TASKS_LIST_URL);

        let tasksData = res.data.match(/Sil.*mediawiki(?=<)/g);
        const tasks = tasksData.map(e => {
            let urlAndName = e.split('">');
            return {
                url: GIT_URL + urlAndName[0],
                name: urlAndName[1]
            };
        });

        DB.addWebTaskInDb(tasks);
    } catch (error) {
        console.error(error);
    }
};
