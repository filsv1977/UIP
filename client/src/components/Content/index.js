import React from 'react';
import AdminTasksTable from '../Tables/AdminTaskTable';
import TasksTable from '../Tables/TaskTable';

function Content({isAdmin}) {
    return (
        <main role="main" className="pb-3">
            <div className="text-center">
                <h4 className="display-4">Ubix network Improvement Proposal (UIP)</h4>
                <p>
                    The Ubix Improvement Proposal is a method to improve and develop the capabilities of Ubix.network.
                </p>
            </div>
            <div className="text-center">
                <h4 className="display-4">Process</h4>
                <p>
                    New UIPs will be introduced by the Ubix.Network team or the Ubix.Network DAO. A reward for
                    implementing is assigned to each UIP. The rewards will be in UBX, funded by the development fund.
                    Interested developers can apply to implement certain UIPs.
                </p>
            </div>
            <div className="text-center">{isAdmin ? <AdminTasksTable /> : <TasksTable />}</div>
        </main>
    );
}

export default Content;
