import React, {useState} from 'react';
import useAssignmentActions from '../../hooks/useAssignmentActions';
import {Button, Stack} from 'react-bootstrap';
import {useTasks} from '../../Context/reducer';

function AssignmentFilterButtonsActions() {
    const {state} = useTasks();
    const {assignmentFilterActions} = useAssignmentActions(state.isAdmin);
    const [active, setActive] = useState(0);

    return (
        <Stack className="mb-2 p-3" direction="horizontal" gap={2}>
            {assignmentFilterActions.map(x => (
                <Button
                    key={x.id}
                    onClick={e => x.onClick(e, setActive)}
                    variant={x.button.variant(active)}
                    size={'sm'}
                >
                    {x.text}
                </Button>
            ))}
        </Stack>
    );
}

export default AssignmentFilterButtonsActions;
