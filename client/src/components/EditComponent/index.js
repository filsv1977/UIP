import React from 'react';
import {Button} from 'react-bootstrap';
import useEditButtonActions from '../../hooks/useEditButtonActions';
import './index.css';

function EditComponent({
    data,
    setEditRow,
    setRowId,
    taskId,
    rowId,
    onEditTask,
    formSubmitted,
    setHours,
    setNickname,
    setWallet,
    setFormSubmitted,
    setTeam
}) {
    const {editButtonActions, isEdit, filterAction} = useEditButtonActions();

    const buttons =
        isEdit && taskId === +rowId
            ? editButtonActions.filter(btn => +btn.id !== +filterAction.OPEN)
            : editButtonActions.filter(btn => +btn.id === +filterAction.OPEN);
    return (
        <div id="EditButton" className={'d-flex'}>
            {buttons.map(x => (
                <Button
                    disabled={+x.id === +filterAction.SAVE ? !formSubmitted : false}
                    key={x.id}
                    id={`EditButton${x.id}`}
                    onClick={e =>
                        x.onClick(
                            e,
                            data,
                            setEditRow,
                            setRowId,
                            onEditTask,
                            setHours,
                            setNickname,
                            setWallet,
                            setFormSubmitted,
                            setTeam
                        )
                    }
                    variant={x.variant}
                    size={'sm'}
                >
                    {x.text}
                </Button>
            ))}
        </div>
    );
}

export default EditComponent;
