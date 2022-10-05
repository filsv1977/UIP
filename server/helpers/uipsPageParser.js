import {DB} from '../index.js';
import axios from 'axios';
import * as cheerio from 'cheerio';

const GIT_URL = 'https://github.com/';
const TASKS_LIST_URL = `${GIT_URL}SilentNotaryEcosystem/UIPS/`;

export const getTaskListFromWeb = async () => {
    try {
        const result = await axios.get(TASKS_LIST_URL);

        const tasksData = result.data.match(/Sil.*mediawiki(?=<)/g);
        let tasks = tasksData.map(e => {
            let urlAndName = e.split('">');
            return {
                url: GIT_URL + urlAndName[0],
                name: urlAndName[1]
            };
        });

        tasks = await getTaskStatuses(tasks);
        DB.addWebTaskInDb(tasks);
    } catch (error) {
        console.error(error);
    }
};

export const getTaskStatuses = async tasks => {
    let tasksList = [...tasks];
    try {
        for (let i = 0; i < tasksList.length; i++) {
            await axios.get(tasksList[i].url).then(result => {
                const $ = cheerio.load(result.data);
                tasksList[i].implemented = $('#user-content-status').parent().next().text().trim() === 'Implemented';
            });
        }
    } catch (error) {
        console.error(error);
    }
    return tasksList;
};
