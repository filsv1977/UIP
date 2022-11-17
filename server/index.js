import express from 'express';
import cors from 'cors';

import restRoutes from './rest/index.js';
import {getTaskListFromWeb} from './helpers/uipsPageParser.js';
import {startSchedulerGetTasks} from './utils/shedullerGetTask.js';

getTaskListFromWeb();
startSchedulerGetTasks();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

restRoutes(app);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.use('/admin', express.static('client/build'));
    app.use('/open', express.static('client/build'));
    app.use('/implemented', express.static('client/build'));
    app.use('/*', (req, res) => {
        res.redirect('/open');
    });
}

const serverPort = process.env.PORT || 4000;

app.listen(serverPort, () => {
    console.log(`Server listening on port: ${serverPort}!`);
});

export default app;
