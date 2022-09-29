import express from 'express';
import passport from 'passport';
import config from 'config';
import logger from 'morgan';
import DbEngine from './db/dbEngine.js';
import restRoutes from './rest/index.js';
import cors from 'cors';
import {loadDB} from './helpers/db.js';
import {getTaskListFromWeb} from './helpers/uipsPageParser.js';
import {BasicStrategy} from 'passport-http';
import dotenv from 'dotenv';
import {md5} from 'request/lib/helpers.js';
import {startSchedulerGetTasks} from './utils/shedullerGetTask.js';

export const DB = new DbEngine();

loadDB();
getTaskListFromWeb();
startSchedulerGetTasks();

let {USER, PASSWORD} = dotenv.config().parsed;

passport.use(
    new BasicStrategy(function (userid, password, done) {
        if (USER === userid && PASSWORD === md5(password)) {
            return done(null, true);
        }
        return done(null, false);
    })
);

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
