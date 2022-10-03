import {getTaskListFromWeb} from '../helpers/uipsPageParser.js';

const PERIOD_GET_TASK = 60000;

export const startSchedulerGetTasks = () => {
    setInterval(getTaskListFromWeb, PERIOD_GET_TASK);
};
