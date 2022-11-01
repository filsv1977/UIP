import React from 'react';
import AdminTasksTable from '../Tables/AdminTaskTable';
import AssignmentFilterButtonsActions from '../Button';
import './content.css';

function ContentAdmin({activeButton}) {
    return (
        <main role="main" className="main ">
            <AssignmentFilterButtonsActions activeButton={activeButton} />
            <div className="text-center p-3">{<AdminTasksTable />}</div>
        </main>
    );
}

export default ContentAdmin;
