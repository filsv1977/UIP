import {getTaskListFromWeb} from '../helpers/uipsPageParser.js';
import exchangeUbx from '../helpers/exchangeUbx.js';

const PERIOD_GET_TASK = 600000;

export const startSchedulerGetTasks = () => {
    setInterval(executeFunctions, PERIOD_GET_TASK);
};

function executeFunctions() {
    getTaskListFromWeb();
    exchangeUbx.loadUbx2Usdt();
}
