import React from 'react';
import Table from 'react-bootstrap/Table';
import {useTasks} from '../../../сontext/reducer';
import Error from '../../Error';
import SpinnerBtn from '../../Spinner';
import useDataAvailability from "../../../hooks/useDataAvailability";

function TasksTable() {
    const {tasks} = useDataAvailability()
    const {state} = useTasks();
    console.log('task table', tasks)
    const generateTable = (tasks || []).map(task => (
        <tr key={task.id}>
            <td>
                {
                    <a href={task.url} target="_blank" rel="noreferrer">
                        {task.name}
                    </a>
                }
            </td>
            <td>{task.estimationHours ? task.estimationHours : '-'}</td>
            <td>{task.ubxPrice ? task.ubxPrice : '-'}</td>
            <td>{task.usdtPrice ? task.usdtPrice : '-'}</td>
            <td>{task.performer.nickname}</td>
        </tr>
    ));

    let spinnerTh = {
        fontSize: '1px',
        lineHeight: 0,
        padding: 0
    };

    const withStyle = {minWidth: '50px'};

    return (
        <div className={'table-responsive'}>
            <Table className="align-middle table-bordered" hover data-click-to-select="true">
                <thead>
                    <tr>
                        <th className="text-truncate w-25" style={withStyle} scope="col">
                            Task
                        </th>
                        <th className="text-truncate" style={withStyle} scope="col">
                            Estimation hours
                        </th>
                        <th className="text-truncate" style={withStyle} scope="col">
                            Cost in UBX
                        </th>
                        <th className="text-truncate" style={withStyle} scope="col">
                            Cost in USDT
                        </th>
                        <th className="text-truncate" style={withStyle} scope="col">
                            Nickname
                        </th>
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
