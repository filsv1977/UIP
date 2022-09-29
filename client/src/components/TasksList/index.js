import React, {useState} from 'react';
import Table from 'react-bootstrap/Table';
import Button from "react-bootstrap/Button";
import EditModal from "../Modal/EditModal";
import {tasksAPI} from "../../services/TaskService";

function TasksList() {
    const {data, error, isLoading}=tasksAPI.useFetchAllTasksQuery("")
    const [isSelect, setIsSelect] = useState(null);
    const [editData, setData] = useState({})
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const generateTable = (data?.data || []).map(task => (
            <tr
                key={task.id}
                className={task.id == isSelect ? 'row-select' : ''}
                onClick={e => selectRowProp(e, task, task.id)}
            >
                <th scope="row">{task.id+1}</th>
                <td>{task.name}</td>
                <td>{<a href={task.url}>{task.url}</a>}</td>
                <td>{task.estimationHours}</td>
                <td>{task.cost}</td>
                <td>{task.performer.nickname + ' ' + task.performer.walletAddress || ''}</td>
                <td>{<Button onClick={handleShow} type="button"  className="btn btn-primary btn-sm">Редактировать</Button>}</td>
            </tr>
        ));

    const selectRowProp = (e, row, id) => {
        e.preventDefault();
        setIsSelect(id);
        setData(row)
    };

    return (
        <div className={'table-responsive'}>
            {isLoading && <h1>Идет загрузка</h1>}
            {error && <h1>{error}</h1>}
            <Table className="table" hover data-click-to-select="true">
                <thead>
                    <tr>
                        <th scope="col">{<Button type="button" className="btn btn-primary btn-sm">Добавить</Button>}</th>
                        <th scope="col">Наименование задачи</th>
                        <th scope="col">Адрес задачи</th>
                        <th scope="col">Оценка задачи</th>
                        <th scope="col">Стоимость</th>
                        <th scope="col">Исполнитель</th>
                        <th scope={"col"}>Редактировать</th>
                    </tr>
                </thead>
                <tbody>{generateTable}</tbody>
            </Table>
            <EditModal
              editData={editData}
              show={show}
              handleShow={handleShow}
              handleClose={handleClose}
            />
        </div>
    );
}

export default TasksList;
