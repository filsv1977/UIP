import React from 'react';
import Table from 'react-bootstrap/Table';
import {useTasks} from '../../../Context/reducer';
import Error from '../../Error';
import SpinnerBtn from '../../Spinner';

function TasksTable() {
    const {state} = useTasks();

    const generateTable = (state?.tasks || []).map(task => (
        <tr key={task.id}>
            <td className="text-truncate">
                {
                    <a href={task.url} target="_blank" rel="noreferrer">
                        {task.name}
                    </a>
                }
            </td>
            <td className="text-truncate">{task.estimationHours ? task.estimationHours : '-'}</td>
            <td className="text-truncate">{task.ubxPrice ? task.ubxPrice : '-'}</td>
            <td className="text-truncate">{task.usdtPrice ? task.ubxPrice : '-'}</td>
            <td className="text-truncate">{task.performer.nickname}</td>
        </tr>
    ));

    let spinnerTh = {
        fontSize: '1px',
        lineHeight: 0,
        padding: 0
    };

    return (
        <div className={'table-responsive'}>
            <Table className="align-middle" hover data-click-to-select="true">
                <thead>
                    <tr>
                        <th className="text-truncate" scope="col">
                            Task
                        </th>
                        <th className="text-truncate" scope="col">Estimation hours</th>
                        <th className="text-truncate" scope="col">Cost in UBX</th>
                        <th className="text-truncate" scope="col">Cost in USDT</th>
                        <th className="text-truncate" scope="col">Nickname</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className={'justify-content-center align-items-center'}>
                        <td style={spinnerTh} scope="col" colSpan="5">
                            <SpinnerBtn />
                        </td>
                    </tr>
                    {generateTable}
                </tbody>
            </Table>
            {state.error && <Error message={state.error} />}
        </div>
    );
}

export default TasksTable;
