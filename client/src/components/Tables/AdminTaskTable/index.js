import React from 'react';
import {Table, Form} from 'react-bootstrap';
import {useTasks} from '../../../Context/reducer';
import {editTask} from '../../../api/editTask';
import Error from '../../Error';
import SpinnerBtn from '../../Spinner';

function AdminTasksTable() {
    const {state, dispatch} = useTasks();

    const onEditTask = (e, editData) => {
        let newData = {...editData};
        if (e.target.id.includes('estimationHours')) {
            newData.estimationHours = Number(e.target.value);
        }
        if (e.target.id.includes('nickname')) {
            newData.performer = {...editData.performer, nickname: e.target.value};
        }
        if (e.target.id.includes('walletAddress')) {
            newData.performer = {...editData.performer, walletAddress: e.target.value};
        }
        editTask(newData, dispatch);
    };

    const handleKeyDown = (e, editData) => {
        if (e.key === 'Enter') {
            onEditTask(e, editData);
            const el = document.getElementById(e.target.id);
            if (el) el.blur();
        }
    };

    const generateTable = (state?.tasks || []).map(task => (
        <tr key={task.id}>
            <td>
                {
                    <a href={task.url} target="_blank">
                        {task.name}
                    </a>
                }
            </td>
            <td>
                {
                    <Form.Control
                        className="form-control form-control-sm"
                        placeholder="Enter hours"
                        id={'estimationHours' + task.id}
                        aria-label="estimationHours"
                        aria-describedby="basic-addon1"
                        defaultValue={task.estimationHours}
                        onBlur={e => onEditTask(e, task)}
                        onKeyDown={e => handleKeyDown(e, task)}
                        type={'number'}
                    />
                }
            </td>
            <td>{task.ubxPrice}</td>
            <td>{task.usdtPrice}</td>
            <td>
                {
                    <Form.Control
                        className="form-control form-control-sm"
                        aria-label="Name"
                        id={'nickname' + task.id}
                        placeholder="Enter name"
                        defaultValue={task.performer.nickname || ''}
                        onBlur={e => onEditTask(e, task)}
                        onKeyDown={e => handleKeyDown(e, task)}
                    />
                }
            </td>
            <td>
                {
                    <Form.Control
                        className="form-control form-control-sm"
                        aria-label="Wallet"
                        placeholder="Enter wallet"
                        id={'walletAddress' + task.id}
                        defaultValue={task.performer.walletAddress || ''}
                        onBlur={e => onEditTask(e, task)}
                        onKeyDown={e => handleKeyDown(e, task)}
                    />
                }
            </td>
        </tr>
    ));

    return (
        <div className={'table-responsive'}>
            {state.isLoading && <SpinnerBtn />}
            {state.error && <Error message={state.error} />}
            <Table className="align-middle" hover data-click-to-select="true">
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

export default AdminTasksTable;
