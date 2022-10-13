import React from 'react';
import AdminTasksTable from '../Tables/AdminTaskTable';
import TasksTable from '../Tables/TaskTable';
import AssignmentFilterButtonsActions from '../Button';
import './content.css';

function Content({isAdmin}) {
    return (
        <main role="main" className="pb-3 main">
            <AssignmentFilterButtonsActions />
            <div className="text-center">{isAdmin ? <AdminTasksTable /> : <TasksTable />}</div>
        </main>
    );
}

export default Content;
