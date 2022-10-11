import {DB} from '../index.js';
import axios from 'axios';
import * as cheerio from 'cheerio';

const GIT_URL = 'https://github.com/';
const TASKS_LIST_URL = `${GIT_URL}SilentNotaryEcosystem/UIPS/`;

export const getTaskListFromWeb = () => {
    try {
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
                DB.loadUips(tasks);
            })
            .catch(error => {
                console.error(error);
            });
    } catch (error) {
        console.error(error);
    }
};

export const getTaskStatuses = async tasks => {
    let tasksList = [...tasks];
    try {
        for (let i = 0; i < tasksList.length; i++) {
            await axios
                .get(tasksList[i].url)
                .then(result => {
                    const $ = cheerio.load(result.data);
                    tasksList[i].implemented =
                        $('#user-content-status').parent().next().text().trim() === 'Implemented';

                    let title = $('pre').text();
                    let name = title.match(/(?<=Title:).*/);
                    if (name !== null) {
                        tasksList[i].name = name[0].trim();
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    } catch (error) {
        console.error(error);
    }
    return tasksList;
};
