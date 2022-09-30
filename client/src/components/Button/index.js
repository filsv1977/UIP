import React from 'react';
import useAssignmentFilterActions from '../../hooks/test';
import {Button, Stack} from 'react-bootstrap';
import {useTasks} from '../../Context/reducer';
import {fetchData} from '../../api/fetchData';

function AssignmentFilterButtonsActions() {
    const {assignmentFilterActions} = useAssignmentFilterActions();
    const {state, dispatch} = useTasks();

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
        </Stack>
    );
}

export default AssignmentFilterButtonsActions;
