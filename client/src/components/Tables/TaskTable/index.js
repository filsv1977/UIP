import React from 'react';
import Table from 'react-bootstrap/Table';
import {useTasks} from '../../../Context/reducer';

function TasksTable() {
    const {state} = useTasks();

    const generateTable = (state?.tasks || []).map(task => (
        <tr
            key={task.id}
        >
            <td>{<a href={task.url} target='_blank'>{task.name}</a>}</td>
            <td>{task.estimationHours}</td>
            <td>{task.ubx}</td>
            <td>{task.usdt}</td>
            <td>{task.performer.nickname || ''}</td>
            <td>{task.performer.walletAddress || ''}</td>
        </tr>
    ));

    return (
        <div className={'table-responsive'}>
            {state.isLoading && <h6>Loading...</h6>}
            {state.error && <h6>{state.error}</h6>}
            <Table className="taskTable" hover data-click-to-select="true">
                <thead>
                    <tr>
                        <th scope="col">Task</th>
                        <th scope="col">Estimation hours</th>
                        <th scope="col">Cost in UBX</th>
                        <th scope="col">Cost in USDT</th>
                        <th scope="col">Nickname</th>
                        <th scope="col">Wallet</th>
                    </tr>
                </thead>
                <tbody>{generateTable}</tbody>
            </Table>
        </div>
    );
}

export default TasksTable;
