import React from 'react';
import {Table, InputGroup, Form} from 'react-bootstrap';
import {useTasks} from '../../../Context/reducer';
import {editTask} from '../../../api/editTask';

function AdminTasksTable() {
    const {state, dispatch} = useTasks();

    const onEditTask = (e, editData) => {
        let newData = {...editData};
        if (e.target.id === 'estimationHours') {
            newData.estimationHours = +e.target.value;
        }
        if (e.target.id === 'nickname') {
            newData.performer = {...editData.performer, nickname: e.target.value};
        }
        if (e.target.id === 'walletAddress') {
            newData.performer = {...editData.performer, walletAddress: e.target.value};
        }
        editTask(newData, dispatch);
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
                    <InputGroup className="mb-sm-1">
                        <Form.Control
                            placeholder="Enter hours"
                            id={'estimationHours'}
                            aria-label="estimationHours"
                            aria-describedby="basic-addon1"
                            defaultValue={task.estimationHours}
                            onBlur={e => onEditTask(e, task)}
                        />
                    </InputGroup>
                }
            </td>
            <td>{task.ubxPrice}</td>
            <td>{task.usdtPrice}</td>
            <td>
                {
                    <InputGroup className="mb-sm-1">
                        <Form.Control
                            aria-label="Name"
                            id={'nickname'}
                            placeholder="Enter name"
                            defaultValue={task.performer.nickname || ''}
                            onBlur={e => onEditTask(e, task)}
                        />
                    </InputGroup>
                }
            </td>
            <td>
                {
                    <InputGroup className="mb-sm-1">
                        <Form.Control
                            aria-label="Wallet"
                            placeholder="Enter wallet"
                            id={'walletAddress'}
                            defaultValue={task.performer.walletAddress || ''}
                            onBlur={e => onEditTask(e, task)}
                        />
                    </InputGroup>
                }
            </td>
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

export default AdminTasksTable;
