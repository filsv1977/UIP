import {useState} from 'react';
import getCurrentExchange from '../api/getCurrentExchange';
import {useTasks} from '../сontext/reducer';
import {filterAction} from '../constants';
import {setUbiTimerKey} from '../utils/localStorage';

export default function useEditButtonActions() {
    const [isEdit, setEdit] = useState(false);
    const {dispatch} = useTasks();

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
                setTeam,
                setUbxPrice,
                setUsdtPrice
            ) => {
                getCurrentExchange(dispatch).then(_ => {
                    setRowId(data.id);
                    setEdit(true);
                    setEditRow(true);
                    setHours(data.estimationHours || 0);
                    setUbxPrice(data.ubxPrice || 0);
                    setUsdtPrice(data.usdtPrice || 0);
                    setNickname(data.performer?.nickname || '');
                    setWallet(data.performer?.walletAddress || '');
                    setTeam(data.performer?.hasImplementedByUbixTeam || false);
                    setUbiTimerKey();
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
            text: 'Cancel',
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
                setTeam,
                setUbxPrice,
                setUsdtPrice
            ) => {
                setRowId(null);
                setEdit(false);
                setEditRow(false);
                setHours(0);
                setUbxPrice(0);
                setUsdtPrice(0);
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
