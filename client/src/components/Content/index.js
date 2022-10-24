import React from 'react';
import AdminTasksTable from '../Tables/AdminTaskTable';
import TasksTable from '../Tables/TaskTable';
import AssignmentFilterButtonsActions from '../Button';
import './content.css';

function Content({isAdmin, activeButton}) {
    return (
        <main role="main" className="main ">
            <AssignmentFilterButtonsActions activeButton={activeButton} />
            <div className="text-center p-3">{isAdmin ? <AdminTasksTable /> : <TasksTable />}</div>
        </main>
    );
}

export default Content;
