import {getTaskListFromWeb} from '../helpers/uipsPageParser.js';

const PERIOD_GET_TASK = 50000;
let id_scheduler;

export const startSchedulerGetTasks = () => {
    id_scheduler = setInterval(getTaskListFromWeb, PERIOD_GET_TASK);
};
