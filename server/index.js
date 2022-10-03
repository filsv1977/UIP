// import http from 'http';
import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
// import config from 'config';
import logger from 'morgan';
import DbEngine from './db/dbEngine.js';
import restRoutes from './rest/index.js';
import cors from 'cors';
import {getTaskListFromWeb} from './helpers/uipsPageParser.js';
import {startSchedulerGetTasks} from './utils/shedullerGetTask.js';
import {getExchangeUbx} from './helpers/getExchangeUbx.js';
import {DB_FILE_NAME} from './db/consts.js';
import * as path from 'path';
import {fileURLToPath} from 'url';
// import adminRouter from './rest/api/admin/index.js';
// import logoff from './rest/api/admin/auth/logoff.js';
// import router from './rest/api/admin/index.js';

export const DB = new DbEngine(DB_FILE_NAME);

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

getTaskListFromWeb();
getExchangeUbx();
startSchedulerGetTasks();

const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.use('/admin', express.static(path.join(__dirname, '/build')));
}
// else {
//     app.use(express.static(path.join(__dirname, '/build')));
//     app.use('/admin', express.static(path.join(__dirname, '/build')))
// }

restRoutes(app);

const serverPort = process.env.PORT || 4000;

// const server = http.createServer(app)

app.listen(serverPort, () => {
    console.log(`Example app listening on port ${serverPort}!`);
});

export default app;
