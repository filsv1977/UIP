import {useState} from 'react';

export default function useEditButtonActions() {
    const [isEdit, setEdit] = useState(false);
    const filterAction = {
        OPEN: 0,
        SAVE: 1,
        CLOSE: 2
    };

    const editButtonActions = [
        {
            id: filterAction.OPEN,
            text: 'Edit',
            onClick: (e, data, setEditRow, setRowId) => {
                setRowId(data.id);
                setEdit(true);
                setEditRow(true);
            },
            variant: 'outline-primary',
            style: {width: '100px'}
        },
        {
            id: filterAction.SAVE,
            text: 'Save',
            width: '50px',
            onClick: (e, data, setEditRow, setRowId, onEditTask) => {
                onEditTask(data);
                setEdit(false);
            },
            variant: 'outline-danger',
            style: {marginRight: '2px', width: '50px'}
        },
        {
            id: filterAction.CLOSE,
            text: 'Close',
            width: '50px',
            onClick: (e, data, setEditRow, setRowId) => {
                setRowId(null);
                setEdit(false);
                setEditRow(false);
            },
            variant: 'outline-primary',
            style: {marginLeft: '2px', width: '50px'}
        }
    ];

    return {
        editButtonActions,
        isEdit,
        setEdit,
        filterAction
    };
}
