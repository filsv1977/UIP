import tasksRouter from './api/tasks/index.js';
import adminRouter from './api/admin/index.js';

const restRoutes = app => {
    app.use('/tasks', tasksRouter);
    app.use('/admin', adminRouter);
};

export default restRoutes;
