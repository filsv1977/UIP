import React, {useState} from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import EditModal from '../../Modals/EditModal';
import {useTasks} from '../../../Context/reducer';
import {exportDB} from '../../../api/getDB';

function AdminTasksTable() {
    const {state, dispatch} = useTasks();
    const [isSelect, setIsSelect] = useState(null);
    const [editData, setData] = useState({});
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const generateTable = (state?.tasks || []).map(task => (
        <tr
            key={task.id}
            className={+task.id === +isSelect ? 'row-select' : ''}
            onClick={e => selectRowProp(e, task, task.id)}
        >
            <th scope="row">{task.id}</th>
            <td>{task.name}</td>
            <td>{<a href={task.url}>{task.url}</a>}</td>
            <td>{task.estimationHours}</td>
            <td>{task.ubx}</td>
            <td>{task.usdt}</td>
            <td>{task.performer.nickname + ' ' + task.performer.walletAddress || ''}</td>
            <td>
                {
                    <Button onClick={handleShow} variant={'outline-primary'} type="button" className="btn btn-sm">
                        Редактировать
                    </Button>
                }
            </td>
        </tr>
    ));

    const selectRowProp = (e, row, id) => {
        e.preventDefault();
        setIsSelect(id);
        setData(row);
    };

    const onExportDB = () => {
        exportDB(dispatch);
    };

    return (
        <div className={'table-responsive'}>
            {state.isLoading && <h6>Идет загрузка</h6>}
            {state.error && <h6>{state.error}</h6>}
            <Table className="table" hover data-click-to-select="true">
                <thead>
                    <tr>
                        <th scope="col">
                            {
                                <Button
                                    type="button"
                                    className="btn btn-sm"
                                    onClick={onExportDB}
                                    variant={'outline-primary'}
                                >
                                    Экспорт
                                </Button>
                            }
                        </th>
                        <th scope="col">Наименование задачи</th>
                        <th scope="col">Адрес задачи</th>
                        <th scope="col">Оценка задачи</th>
                        <th scope="col">Стоимость в UBX</th>
                        <th scope="col">Стоимость в USD</th>
                        <th scope="col">Исполнитель</th>
                        <th scope={'col'}>Редактировать</th>
                    </tr>
                </thead>
                <tbody>{generateTable}</tbody>
            </Table>
            <EditModal editData={editData} show={show} handleShow={handleShow} handleClose={handleClose} />
        </div>
    );
}

export default AdminTasksTable;
