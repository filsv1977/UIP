// import indexRouter from './api/v0/index.js';
import tasksRouter from './api/v0/tasks/index.js';
// import taskRouter from './api/v0/task.js';

const restRoutes = app => {
    // app.use('/', indexRouter );
    app.use('/tasks', tasksRouter);
};

export default restRoutes;
