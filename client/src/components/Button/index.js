import React, {useEffect, useState} from 'react';
import useAssignmentActions from '../../hooks/useAssignmentActions';
import {Button, Stack} from 'react-bootstrap';
import {useTasks} from '../../сontext/reducer';
import './index.css';

function AssignmentFilterButtonsActions({activeButton}) {
    const {state} = useTasks();
    const {assignmentFilterActions} = useAssignmentActions(state.isAdmin);

    return (
        <Stack id={'FilterActions'} className="mb-2 p-3 FilterActions" direction="horizontal" gap={2}>
            {assignmentFilterActions.map(x => (
                <Button
                    key={x.id + Date.now()}
                    onClick={e => x.onClick(e)}
                    variant={x.button.variant(state.activeFilterBtn)}
                    size={'sm'}
                >
                    {x.text}
                </Button>
            ))}
        </Stack>
    );
}

export default AssignmentFilterButtonsActions;
