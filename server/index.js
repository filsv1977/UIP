import express from 'express';
import DbEngine from './db/dbEngine.js';
import restRoutes from './rest/index.js';
import cors from 'cors';
import {getTaskListFromWeb} from './helpers/uipsPageParser.js';
import {startSchedulerGetTasks} from './utils/shedullerGetTask.js';
import serveIndex from 'serve-index';

export const DB = new DbEngine(process.env.DB_FILE_NAME);

getTaskListFromWeb();
startSchedulerGetTasks();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

if (process.env.NODE_ENV === 'production') {
    // app.use('*', serveIndex('client/build')); // shows you the file list
    app.use('*', express.static('client/build')); // serve the actual files
    app.use(express.static('client/build'), serveIndex('client/build', {'icons': true}))
    console.log("here", __dirname)
    // app.use(express.static('client/build'));
    // app.use("*",express.static('client/build'))
    // app.use('/admin', express.static('client/build'));
    // app.use('/open', express.static('client/build'));
    // app.use('/implemented', express.static('client/build'));
}

restRoutes(app);

const serverPort = process.env.PORT || 4000;

app.listen(serverPort, () => {
    console.log(`UIP listening on port ${serverPort}!`);
});

export default app;
