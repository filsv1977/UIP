import {getTaskListFromWeb} from '../helpers/uipsPageParser.js';
import ExchangeUbx from '../helpers/exchangeUbx.js';

const PERIOD_GET_TASK = 600000;

export const startSchedulerGetTasks = () => {
    setInterval(executeFunctions, PERIOD_GET_TASK);
};

const executeFunctions = () => {
    getTaskListFromWeb();
    new ExchangeUbx(true);
};
