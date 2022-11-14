import axios from 'axios';
import {load} from 'cheerio';
import axiosRetry from 'axios-retry';

import DbEngine from '../db/dbEngine.js';

const GIT_URL = 'https://github.com/';
const TASKS_LIST_URL = `${GIT_URL}SilentNotaryEcosystem/UIPS/`;

axiosRetry(axios, {retries: 3});

export const getTaskListFromWeb = () => {
    const db = new DbEngine(process.env.DB_FILE_NAME);

    axios
        .get(TASKS_LIST_URL)
        .then(async result => {
            const tasksData = result.data.match(/Sil.*mediawiki(?=<)/g);
            let tasks = tasksData.map(e => {
                let urlAndName = e.split('">');
                return {
                    url: GIT_URL + urlAndName[0],
                    name: urlAndName[1]
                };
            });

            tasks = await getTaskStatuses(tasks);
            db.loadUips(tasks);
        })
        .catch(error => {
            console.error(error.message);
        });
};

export const getTaskStatuses = async tasks => {
    let tasksList = [...tasks];

    for (let i = 0; i < tasksList.length; i++) {
        await axios
            .get(tasksList[i].url)
            .then(result => {
                const $ = load(result.data);
                tasksList[i].implemented = $('#user-content-status').parent().next().text().trim() === 'Implemented';

                let title = $('pre').text();
                let uipId = title.match(/(?<=UIP:).*/);
                let name = title.match(/(?<=Title:).*/);

                if (name !== null) {
                    tasksList[i].uipId = +uipId[0].trim();
                    tasksList[i].name = name[0].trim();
                }
            })
            .catch(error => {
                console.log(error.message);
            });
    }
    return tasksList;
};
