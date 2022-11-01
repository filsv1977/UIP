import React from 'react';
import TasksTable from '../Tables/TaskTable';
import AssignmentFilterButtonsActions from '../Button';
import './content.css';

function Content({activeButton}) {
    return (
        <main role="main" className="main ">
            <AssignmentFilterButtonsActions activeButton={activeButton} />
            <div className="text-center p-3">{<TasksTable />}</div>
        </main>
    );
}

export default Content;
