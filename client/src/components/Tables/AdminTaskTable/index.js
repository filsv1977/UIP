import React, {useState} from 'react';
import {Table, Form} from 'react-bootstrap';
import {useTasks} from '../../../Context/reducer';
import {editTask} from '../../../api/editTask';
import Error from '../../Error';
import SpinnerBtn from '../../Spinner';
import EditComponent from '../../EditComponent';
import {actionTypes} from '../../../Context/actionTypes';

function AdminTasksTable() {
    const style = {width: '15vw'};
    const {state, dispatch} = useTasks();
    const [editRow, setEditRow] = useState(false);
    const [rowId, setRowId] = useState(null);
    const [formSubmitted, setFormSubmitted] = useState(true);

    const [estimationHours, setHours] = useState(0);
    const [nickname, setNickname] = useState('');
    const [wallet, setWallet] = useState('');

    const [teamBox, setTeam] = useState(false);

    let spinnerTh = {
        fontSize: '1px',
        lineHeight: 0,
        padding: 0
    };

    const withStyle = {minWidth: '50px'};

    const onEditTask = editData => {
        if (estimationHours < 0) return;
        let newData = {...editData};
        if (estimationHours) newData.estimationHours = Number(estimationHours);
        newData.performer = {
            nickname: nickname,
            walletAddress: wallet,
            hasImplementedByUbixTeam: teamBox
        };

        if (teamBox) {
            newData.estimationHours = 0;
            newData.ubxPrice = 0;
            newData.usdtPrice = 0;
        }

        editTask(newData, dispatch).then(_ => {
            setRowId(null);
            setEditRow(false);
            setHours(0);
            setNickname('');
            setWallet('');
        });
    };

    const onSetHours = (e, id) => {
        const isValid = e.target.value > 0;
        setFormSubmitted(isValid);
        setHours(+e.target.value);

        const {rate, ubx2usdt} = state.currentExchange;

        dispatch({
            type: actionTypes.SET_COST_VALUES,
            payload: {
                id,
                data: {
                    rate: rate * +e.target.value,
                    ubx2usdt: +(ubx2usdt * rate * +e.target.value).toFixed(2)
                }
            }
        });
    };

    const setTeamWork = (e, task) => {
        if (e.target.checked) {
            setNickname('UBIX Team');
            setWallet('');
            setHours(0);
        } else {
            setNickname(task.performer?.nickname || '');
        }

        setTeam(e.target.checked);
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
                {editRow && +task.id === +rowId && !teamBox ? (
                    <>
                        <Form.Control
                            className="form-control form-control-sm"
                            placeholder="Enter hours"
                            id={'estimationHours' + task.id}
                            aria-label="estimationHours"
                            min="0"
                            aria-describedby="basic-addon1"
                            defaultValue={task.estimationHours}
                            onChange={e => onSetHours(e, task.id)}
                            type={'number'}
                            isInvalid={+estimationHours < 0}
                        />
                        <Form.Control.Feedback type="invalid" />
                    </>
                ) : editRow && +task.id === +rowId && teamBox ? (
                    '-'
                ) : (
                    task.estimationHours || ''
                )}
            </td>
            <td>{editRow && +task.id === +rowId && teamBox ? '-' : task.ubxPrice || ''}</td>
            <td>{editRow && +task.id === +rowId && teamBox ? '-' : task.usdtPrice || ''}</td>
            <td style={style}>
                {editRow && +task.id === +rowId && !teamBox ? (
                    <Form.Control
                        className="form-control form-control-sm"
                        aria-label="Name"
                        id={'nickname' + task.id}
                        placeholder="Enter name"
                        value={nickname}
                        onChange={e => setNickname(e.target.value)}
                    />
                ) : editRow && +task.id === +rowId && teamBox ? (
                    nickname
                ) : (
                    task.performer.nickname || ''
                )}
            </td>
            <td style={style}>
                {editRow && +task.id === +rowId && !teamBox ? (
                    <Form.Control
                        className="form-control form-control-sm"
                        aria-label="Wallet"
                        placeholder="Enter wallet"
                        id={'walletAddress' + task.id}
                        defaultValue={task.performer.walletAddress || ''}
                        onChange={e => setWallet(e.target.value)}
                    />
                ) : editRow && +task.id === +rowId && teamBox ? (
                    '-'
                ) : (
                    task.performer.walletAddress || ''
                )}
            </td>
            <td style={style}>
                <input
                    className="form-check-input"
                    type="checkbox"
                    id={'hasImplemented' + task.id}
                    disabled={!editRow || (editRow && task.id !== rowId)}
                    checked={editRow && +task.id === +rowId ? teamBox : task.performer.hasImplementedByUbixTeam}
                    onChange={e => setTeamWork(e, task)}
                />
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
                            setTeam={setTeam}
                        />
                    </div>
                }
            </td>
        </tr>
    ));

    return (
        <div className={'table-responsive'}>
            <Table className="align-middle table-bordered " hover data-click-to-select="true">
                <thead>
                    <tr>
                        <th className="text-truncate w-25" scope="col">
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
                        <th className="text-truncate" style={withStyle} scope="col">
                            Wallet
                        </th>
                        <th className="text-truncate" style={withStyle} scope="col">
                            Implemented By Ubix Team
                        </th>
                        <th scope="col">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={spinnerTh} scope="col" colSpan="7">
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

export default AdminTasksTable;
