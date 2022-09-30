import express from 'express';
import config from 'config';
import logger from 'morgan';
import DbEngine from './db/dbEngine.js';
import restRoutes from './rest/index.js';
import cors from 'cors';
import {getTaskListFromWeb} from './helpers/uipsPageParser.js';
import {startSchedulerGetTasks} from './utils/shedullerGetTask.js';
import {getExchangeUbx} from './helpers/getExchangeUbx.js';
import {DB_FILE_NAME} from './db/consts.js';

export const DB = new DbEngine(DB_FILE_NAME);

getTaskListFromWeb();
getExchangeUbx();
startSchedulerGetTasks();

const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

restRoutes(app);

const serverPort = config.get('server.port');

app.listen(serverPort, () => {
    console.log(`Example app listening on port ${serverPort}!`);
});

export default app;
