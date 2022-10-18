import {useState} from 'react';
import {getCurrentExchange} from '../api/getCurrentExchange';
import {useTasks} from '../Context/reducer';

export default function useEditButtonActions() {
    const [isEdit, setEdit] = useState(false);
    const {dispatch} = useTasks();

    const filterAction = {
        OPEN: 0,
        SAVE: 1,
        CLOSE: 2
    };

    const editButtonActions = [
        {
            id: filterAction.OPEN,
            text: 'Edit',
            onClick: (
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
            ) => {
                getCurrentExchange(dispatch).then(_ => {
                    setRowId(data.id);
                    setEdit(true);
                    setEditRow(true);
                    setHours(data.estimationHours || 0);
                    setNickname(data.performer?.nickname || '');
                    setWallet(data.performer?.walletAddress || '');
                    setTeam(data.performer?.hasImplementedByUbixTeam || false);
                });
            },
            variant: 'outline-primary'
        },
        {
            id: filterAction.SAVE,
            text: 'Save',
            width: '50px',
            onClick: (
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
            ) => {
                onEditTask(data);
                setEdit(false);
                setTeam(false);
            },
            variant: 'outline-danger'
        },
        {
            id: filterAction.CLOSE,
            text: 'Close',
            width: '50px',
            onClick: (
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
            ) => {
                setRowId(null);
                setEdit(false);
                setEditRow(false);
                setHours(0);
                setNickname('');
                setWallet('');
                setFormSubmitted(true);
                setTeam(false);
            },
            variant: 'outline-primary'
        }
    ];

    return {
        editButtonActions,
        isEdit,
        setEdit,
        filterAction
    };
}
