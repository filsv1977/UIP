import express from 'express';
import logger from 'morgan';
import DbEngine from './db/dbEngine.js';
import restRoutes from './rest/index.js';
import cors from 'cors';
import {getTaskListFromWeb} from './helpers/uipsPageParser.js';
import {startSchedulerGetTasks} from './utils/shedullerGetTask.js';

export const DB = new DbEngine(process.env.DB_FILE_NAME);

getTaskListFromWeb();
startSchedulerGetTasks();

const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.use('/admin', express.static('client/build'));
    app.use('/open', express.static('client/build'));
    app.use('/implemented', express.static('client/build'));
}

restRoutes(app);

const serverPort = process.env.PORT || 4000;

app.listen(serverPort, () => {
    console.log(`Example app listening on port ${serverPort}!`);
});

export default app;
