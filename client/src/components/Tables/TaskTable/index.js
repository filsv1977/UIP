import React, {useState} from 'react';
import Table from 'react-bootstrap/Table';
import {useTasks} from "../../../Context/reducer";

function TasksTable() {
  const {state} = useTasks()
  const [isSelect, setIsSelect] = useState(null);

  const generateTable = (state?.tasks || []).map(task => (
    <tr
      key={task.id}
      className={task.id == isSelect ? 'row-select' : ''}
      onClick={e => selectRowProp(e, task, task.id)}
    >
      <td>{task.name}</td>
      <td>{<a href={task.url}>{task.url}</a>}</td>
      <td>{task.estimationHours}</td>
      <td>{task.cost}</td>
      <td>{task.performer.nickname + ' ' + task.performer.walletAddress || ''}</td>
    </tr>
  ));

  const selectRowProp = (e, row, id) => {
    e.preventDefault();
    setIsSelect(id);
  };

  return (
    <div className={'table-responsive'}>
      {state.isLoading && <h1>Идет загрузка</h1>}
      {state.error && <h1>{state.error}</h1>}
      <Table className="table" hover data-click-to-select="true">
        <thead>
        <tr>
          <th scope="col">Наименование задачи</th>
          <th scope="col">Адрес задачи</th>
          <th scope="col">Оценка задачи</th>
          <th scope="col">Стоимость</th>
          <th scope="col">Исполнитель</th>
        </tr>
        </thead>
        <tbody>{generateTable}</tbody>
      </Table>
    </div>
  );
}

export default TasksTable;
