import React from 'react';
import Table from 'react-bootstrap/Table';
import {useTasks} from '../../../Context/reducer';
import Error from '../../Error';
import SpinnerBtn from '../../Spinner';

function TasksTable() {
    const {state} = useTasks();

    const generateTable = (state?.tasks || []).map(task => (
        <tr key={task.id}>
            <td>
                {
                    <a href={task.url} target="_blank" rel="noreferrer">
                        {task.name}
                    </a>
                }
            </td>
            <td>{task.estimationHours}</td>
            <td>{task.ubxPrice}</td>
            <td>{task.usdtPrice}</td>
            <td>{task.performer.nickname}</td>
        </tr>
    ));

    return (
        <div className={'table-responsive'}>
            <Table className="align-middle" hover data-click-to-select="true">
                <thead>
                    <tr>
                        <th scope="col">Task</th>
                        <th scope="col">Estimation hours</th>
                        <th scope="col">Cost in UBX</th>
                        <th scope="col">Cost in USDT</th>
                        <th scope="col">Nickname</th>
                    </tr>
                </thead>
                <SpinnerBtn />
                <tbody>{generateTable}</tbody>
                {state.error && <Error message={state.error} />}
            </Table>
        </div>
    );
}

export default TasksTable;
