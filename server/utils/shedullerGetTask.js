import {getTaskListFromWeb} from '../helpers/uipsPageParser.js';
import {getExchangeUbx} from '../helpers/getExchangeUbx.js';

const PERIOD_GET_TASK = 600000;

export const startSchedulerGetTasks = () => {
    setInterval(executeFunctions, PERIOD_GET_TASK);
};

function executeFunctions() {
    getTaskListFromWeb();
    getExchangeUbx();
}
