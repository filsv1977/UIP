import axios from 'axios';
import * as cheerio from 'cheerio';
import axiosRetry from 'axios-retry';
import {DB} from '../index.js';

const GIT_URL = 'https://github.com/';
const TASKS_LIST_URL = `${GIT_URL}SilentNotaryEcosystem/UIPS/`;

axiosRetry(axios, {retries: 3});

export const getTaskListFromWeb = () => {
    axios
        .get(TASKS_LIST_URL)
        .then(async result => {
            const tasksData = result.data.match(/Sil.*mediawiki(?=<)/g);
            let tasks = tasksData.map(e => {
                const urlAndName = e.split('">');
                return {
                    url: GIT_URL + urlAndName[0],
                    name: urlAndName[1]
                };
            });

            tasks = await getTaskStatuses(tasks);
            DB.loadUips(tasks);
        })
        .catch(error => {
            console.error(error.message);
        });
};

export const getTaskStatuses = async tasks => {
    const tasksList = [...tasks];

    for (let i = 0; i < tasksList.length; i++) {
        await axios
            .get(tasksList[i].url)
            .then(result => {
                const $ = cheerio.load(result.data);
                tasksList[i].implemented = $('#user-content-status').parent().next().text().trim() === 'Implemented';

                const title = $('pre').text();
                const uipId = title.match(/(?<=UIP:).*/);
                const name = title.match(/(?<=Title:).*/);

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
