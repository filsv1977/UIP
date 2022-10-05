import React, {useState} from 'react';
import {Table, Form} from 'react-bootstrap';
import {useTasks} from '../../../Context/reducer';
import {editTask} from '../../../api/editTask';
import Error from '../../Error';
import SpinnerBtn from '../../Spinner';
import EditComponent from '../../EditComponent';

function AdminTasksTable() {
    const style = {width: '15vw'};
    const {state, dispatch} = useTasks();
    const [editRow, setEditRow] = useState(false);
    const [rowId, setRowId] = useState(null);
    const [formSubmitted, setFormSubmitted] = useState(true);

    const [estimationHours, setHours] = useState(0);
    const [nickname, setNickname] = useState('');
    const [wallet, setWallet] = useState('');

    const onEditTask = editData => {
        if (estimationHours < 0) return;
        let newData = {...editData};
        if (estimationHours) newData.estimationHours = Number(estimationHours);
        newData.performer = {
            nickname: nickname || editData.performer.nickname,
            walletAddress: wallet || editData.performer.walletAddress
        };

        editTask(newData, dispatch);
        setRowId(null);
        setEditRow(false);
        setHours(0);
        setNickname('');
        setWallet('');
    };

    const onSetHours = e => {
        const isValid = e.target.value > 0;
        setFormSubmitted(isValid);
        setHours(+e.target.value);
    };

    const generateTable = (state?.tasks || []).map(task => (
        <tr key={task.id}>
            <td>
                {
                    <a href={task.url} target="_blank" rel="noreferrer">
                        {task.name}
                    </a>
                }
            </td>
            <td style={style}>
                {editRow && +task.id === +rowId ? (
                    <>
                        <Form.Control
                            className="form-control form-control-sm"
                            placeholder="Enter hours"
                            id={'estimationHours' + task.id}
                            aria-label="estimationHours"
                            min="0"
                            aria-describedby="basic-addon1"
                            defaultValue={task.estimationHours}
                            onChange={onSetHours}
                            type={'number'}
                            isInvalid={estimationHours < 0 || +estimationHours < 0}
                        />
                        <Form.Control.Feedback type="invalid" />
                    </>
                ) : (
                    task.estimationHours
                )}
            </td>
            <td>{task.ubxPrice}</td>
            <td>{task.usdtPrice}</td>
            <td style={style}>
                {editRow && +task.id === +rowId ? (
                    <Form.Control
                        className="form-control form-control-sm"
                        aria-label="Name"
                        id={'nickname' + task.id}
                        placeholder="Enter name"
                        defaultValue={task.performer.nickname || ''}
                        onChange={e => setNickname(e.target.value)}
                    />
                ) : (
                    task.performer.nickname || ''
                )}
            </td>
            <td style={style}>
                {editRow && +task.id === +rowId ? (
                    <Form.Control
                        className="form-control form-control-sm"
                        aria-label="Wallet"
                        placeholder="Enter wallet"
                        id={'walletAddress' + task.id}
                        defaultValue={task.performer.walletAddress || ''}
                        onChange={e => setWallet(e.target.value)}
                    />
                ) : (
                    task.performer.walletAddress || ''
                )}
            </td>
            <td>
                {
                    <div className="d-flex flex-row justify-content-center align-items-center">
                        <EditComponent
                            data={task}
                            rowId={rowId}
                            taskId={task.id}
                            setEditRow={setEditRow}
                            setRowId={setRowId}
                            onEditTask={onEditTask}
                            formSubmitted={formSubmitted}
                            setHours={setHours}
                            setNickname={setNickname}
                            setWallet={setWallet}
                            setFormSubmitted={setFormSubmitted}
                        />
                    </div>
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
                        <th scope="col">Edit</th>
                    </tr>
                </thead>
                <tbody>{generateTable}</tbody>
            </Table>
        </div>
    );
}

export default AdminTasksTable;
