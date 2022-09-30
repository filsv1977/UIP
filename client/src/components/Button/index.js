import React from 'react';
import useAssignmentFilterActions from '../../hooks/useAssignmentFilterActions';
import {Button, Stack} from 'react-bootstrap';
import {useTasks} from '../../Context/reducer';
import {fetchData} from '../../api/fetchData';
import {logOut} from '../../api/logout';
import {useNavigate} from 'react-router-dom';
import {exportDB} from "../../api/getDB";

function AssignmentFilterButtonsActions() {
  const {assignmentFilterActions} = useAssignmentFilterActions();
  const {state, dispatch} = useTasks();
  const navigate = useNavigate();

  const onLogout = () => {
    logOut(dispatch).then(() => {
      navigate('/');
    });
  };

  const onExportDB = () => {
    exportDB(dispatch);
  };

  return (
    <Stack direction="horizontal" gap={2}>
      {assignmentFilterActions.map(x => (
        <Button
          key={x.id}
          onClick={() => fetchData(dispatch, x.id, x.meta.query)}
          variant={x.button.variant(state.activeFilterBtn === x.id)}
          size={'sm'}
        >
          {x.text}
        </Button>
      ))}

      {state.isAdmin && (
        <Button
          type="button"
          className="btn btn-sm"
          onClick={onExportDB}
          variant={'outline-primary'}
        >
          Экспорт
        </Button>
      )}
      {state.isAdmin && (
        <Button key={'logout'} onClick={onLogout} variant={'outline-secondary'} size={'sm'}>
          Выйти
        </Button>
      )}
    </Stack>
  );
}

export default AssignmentFilterButtonsActions;
