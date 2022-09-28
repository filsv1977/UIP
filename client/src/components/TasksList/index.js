import React, {useState} from 'react';
import Table from 'react-bootstrap/Table';
import data from './data.json';

function TasksList() {
    const [isSelect, setIsSelect] = useState(null);
    const generateTable = data => {
        return Object.keys(data).map((task, index) => (
            <tr
                key={Number(task)}
                className={Number(task) == +isSelect ? 'row-select' : ''}
                onClick={e => selectRowProp(e, data[task], Number(task))}
            >
                <th scope="row">{Number(task)}</th>
                <td>{data[task].name}</td>
                <td>{<a href={data[task].url}>{data[task].url}</a>}</td>
                <td>{data[task].estimationHours}</td>
                <td>{data[task].cost}</td>
                <td>{data[task].performer.nickname + ' ' + data[task].performer.walletAddress || ''}</td>
            </tr>
        ));
    };

    const selectRowProp = (e, row, id) => {
        e.preventDefault();
        setIsSelect(id);
        console.log('selectRowProp', e, row);
    };

    return (
        <div className={'table-responsive'}>
            <Table className="table" hover data-click-to-select="true">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Наименование задачи</th>
                        <th scope="col">Адрес задачи</th>
                        <th scope="col">Оценка задачи</th>
                        <th scope="col">Стоимость</th>
                        <th scope="col">Исполнитель</th>
                    </tr>
                </thead>
                <tbody>{generateTable(data)}</tbody>
            </Table>
        </div>
    );
}

export default TasksList;
