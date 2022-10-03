import React, {useState} from 'react';
import Table from 'react-bootstrap/Table';
import {useTasks} from '../../../Context/reducer';

function TasksTable() {
    const {state} = useTasks();
    const [isSelect, setIsSelect] = useState(null);

    const generateTable = (state?.tasks || []).map(task => (
        <tr
            key={task.id}
            className={+task.id === +isSelect ? 'row-select' : ''}
            onClick={e => selectRowProp(e, task, task.id)}
        >
            <td>{task.name}</td>
            <td>{<a href={task.url}>{task.url}</a>}</td>
            <td>{task.estimationHours}</td>
            <td>{task.ubxPrice}</td>
            <td>{task.usdtPrice}</td>
            <td>{task.performer.nickname + ' ' + task.performer.walletAddress || ''}</td>
        </tr>
    ));

    const selectRowProp = (e, row, id) => {
        e.preventDefault();
        setIsSelect(id);
    };

    return (
        <div className={'table-responsive'}>
            {state.isLoading && <h6>Loading...</h6>}
            {state.error && <h6>{state.error}</h6>}
            <Table className="table" hover data-click-to-select="true">
                <thead>
                    <tr>
                        <th scope="col">Task</th>
                        <th scope="col">URL</th>
                        <th scope="col">Estimation hours</th>
                        <th scope="col">Cost in UBX</th>
                        <th scope="col">Cost in USDT</th>
                        <th scope="col">Performer</th>
                    </tr>
                </thead>
                <tbody>{generateTable}</tbody>
            </Table>
        </div>
    );
}

export default TasksTable;
